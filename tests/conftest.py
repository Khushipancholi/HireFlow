from __future__ import annotations

import base64
import html
import os
from datetime import datetime
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import urlopen

import pytest


PROJECT_ROOT = Path(__file__).resolve().parents[1]
EVIDENCE_DIR = PROJECT_ROOT / "STQA_Evidence" / "Selenium"
SCREENSHOTS_DIR = EVIDENCE_DIR / "Screenshots"
REPORT_PATH = EVIDENCE_DIR / "Selenium_Test_Report.html"
SUMMARY_PATH = EVIDENCE_DIR / "Execution_Summary.txt"

TEST_CASES = {
    "test_tc_01_login_page_opens": (
        "TC-01",
        "Verify that the Login Page opens successfully.",
    ),
    "test_tc_02_empty_login_validation": (
        "TC-02",
        "Verify validation when the Login form is submitted empty.",
    ),
    "test_tc_03_registration_page_opens": (
        "TC-03",
        "Verify that the Registration Page opens successfully.",
    ),
    "test_tc_04_registration_role_options": (
        "TC-04",
        "Verify that the available user role selection options are displayed.",
    ),
    "test_tc_05_job_sorting": (
        "TC-05",
        "Verify Job Sorting Functionality.",
    ),
    "test_tc_06_duplicate_job_different_locations": (
        "TC-06",
        "Verify Duplicate Job Creation with Different Locations.",
    ),
    "test_tc_07_cancel_job_deletion": (
        "TC-07",
        "Verify Cancel Job Deletion Functionality.",
    ),
}


def pytest_collection_modifyitems(items: list[pytest.Item]) -> None:
    for item in items:
        case = TEST_CASES.get(item.originalname or item.name)
        if case is not None:
            item.stqa_test_id, item.stqa_test_name = case


@pytest.fixture(scope="session")
def base_url() -> str:
    return os.environ.get("STQA_BASE_URL", "http://localhost:3000").rstrip("/")


@pytest.fixture(scope="session")
def application_available(base_url: str) -> None:
    try:
        with urlopen(base_url, timeout=5):
            return
    except HTTPError:
        return
    except (URLError, TimeoutError, OSError) as exc:
        pytest.skip(f"HireFlow is unavailable at {base_url}: {exc}")


@pytest.fixture
def driver(application_available: None):
    from selenium import webdriver
    from selenium.webdriver.chrome.options import Options

    options = Options()
    if os.environ.get("STQA_HEADLESS", "true").strip().lower() in {
        "1",
        "true",
        "yes",
    }:
        options.add_argument("--headless=new")
    options.add_argument("--window-size=1440,1000")
    options.add_argument("--disable-gpu")

    browser = webdriver.Chrome(options=options)
    browser.implicitly_wait(1)
    try:
        yield browser
    finally:
        browser.quit()


@pytest.fixture
def selenium_components():
    from selenium.webdriver.common.by import By
    from selenium.webdriver.support import expected_conditions
    from selenium.webdriver.support.ui import WebDriverWait

    return By, expected_conditions, WebDriverWait


@pytest.fixture
def open_page(driver, base_url: str):
    def navigate(route: str) -> None:
        target_url = f"{base_url}{route}"
        try:
            with urlopen(target_url, timeout=5) as response:
                if response.status >= 400:
                    pytest.skip(
                        f"HireFlow route {route} returned HTTP {response.status}"
                    )
        except HTTPError as exc:
            if exc.code >= 400:
                pytest.skip(f"HireFlow route {route} returned HTTP {exc.code}")
        except (URLError, TimeoutError, OSError) as exc:
            pytest.skip(f"HireFlow route {route} is unavailable: {exc}")

        driver.get(target_url)

    return navigate


@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item: pytest.Item, call):
    outcome = yield
    report = outcome.get_result()
    phase_reports = getattr(item, "stqa_phase_reports", {})
    phase_reports[report.when] = report
    item.stqa_phase_reports = phase_reports

    if report.failed and not getattr(item, "stqa_screenshot_path", None):
        browser = getattr(item, "funcargs", {}).get("driver")
        if browser is not None:
            SCREENSHOTS_DIR.mkdir(parents=True, exist_ok=True)
            test_id = getattr(item, "stqa_test_id", item.name.split("[")[0])
            screenshot_path = SCREENSHOTS_DIR / f"{test_id}-failed.png"
            try:
                from selenium.common.exceptions import WebDriverException

                if browser.save_screenshot(str(screenshot_path)):
                    item.stqa_screenshot_path = screenshot_path
                else:
                    item.stqa_screenshot_error = (
                        "ChromeDriver returned false while saving the screenshot."
                    )
            except (OSError, WebDriverException) as exc:
                item.stqa_screenshot_error = str(exc)


def _report_status(phase_reports: dict[str, pytest.TestReport]) -> str:
    failed_phases = [
        phase
        for phase in ("setup", "call", "teardown")
        if phase in phase_reports and phase_reports[phase].failed
    ]
    if failed_phases:
        return "FAIL" if "call" in failed_phases else "ERROR"
    if any(report.skipped for report in phase_reports.values()):
        return "SKIPPED"
    return "PASS"


def _actual_result(
    status: str, phase_reports: dict[str, pytest.TestReport]
) -> str:
    if status == "PASS":
        return "All expected browser observations matched."

    if status == "SKIPPED":
        skipped_report = next(
            report for report in phase_reports.values() if report.skipped
        )
        return str(skipped_report.longrepr)

    failed_report = next(
        phase_reports[phase]
        for phase in ("call", "setup", "teardown")
        if phase in phase_reports and phase_reports[phase].failed
    )
    reprcrash = getattr(failed_report.longrepr, "reprcrash", None)
    if reprcrash is not None:
        return reprcrash.message
    return str(failed_report.longrepr)


def _write_reports(session: pytest.Session) -> None:
    records = []
    for item in session.items:
        test_id = getattr(item, "stqa_test_id", item.name.split("[")[0])
        test_name = getattr(item, "stqa_test_name", item.name)
        phase_reports = getattr(item, "stqa_phase_reports", {})
        status = _report_status(phase_reports) if phase_reports else "NOT RUN"
        actual_result = (
            _actual_result(status, phase_reports)
            if phase_reports
            else "No result recorded."
        )
        records.append(
            {
                "test_id": test_id,
                "test_name": test_name,
                "status": status,
                "actual_result": actual_result,
                "screenshot_path": getattr(item, "stqa_screenshot_path", None),
                "screenshot_error": getattr(item, "stqa_screenshot_error", None),
            }
        )

    EVIDENCE_DIR.mkdir(parents=True, exist_ok=True)
    counts = {
        status: sum(record["status"] == status for record in records)
        for status in ("PASS", "FAIL", "ERROR", "SKIPPED", "NOT RUN")
    }

    report_rows = []
    summary_lines = [
        "HireFlow Selenium Execution Summary",
        f"Execution time: {datetime.now().astimezone().isoformat(timespec='seconds')}",
        f"Target URL: {os.environ.get('STQA_BASE_URL', 'http://localhost:3000')}",
        f"Total test cases: {len(records)}",
        "Expected results: PASS=4, FAIL=3 (actual outcomes are not forced).",
        f"Actual PASS: {counts['PASS']}",
        f"Actual FAIL: {counts['FAIL']}",
        f"Execution ERROR: {counts['ERROR']}",
        f"SKIPPED: {counts['SKIPPED']}",
        f"NOT RUN: {counts['NOT RUN']}",
        "",
        "Test results:",
    ]

    for record in records:
        escaped_id = html.escape(record["test_id"])
        escaped_name = html.escape(record["test_name"])
        escaped_result = html.escape(record["actual_result"])
        screenshot_html = "Not captured"
        screenshot_reference = "None"
        if record["screenshot_path"] is not None:
            screenshot_path = Path(record["screenshot_path"])
            screenshot_reference = str(screenshot_path.relative_to(PROJECT_ROOT))
            image_data = base64.b64encode(screenshot_path.read_bytes()).decode("ascii")
            screenshot_html = (
                f'<img alt="Failure screenshot for {escaped_id}" '
                f'src="data:image/png;base64,{image_data}">'
            )
        elif record["screenshot_error"]:
            screenshot_html = (
                "Capture error: " + html.escape(record["screenshot_error"])
            )

        report_rows.append(
            "<tr>"
            f"<td>{escaped_id}</td>"
            f"<td>{escaped_name}</td>"
            f"<td class=\"result\">{escaped_result}</td>"
            f"<td class=\"status {record['status'].lower().replace(' ', '-')}\" "
            f">{record['status']}</td>"
            f"<td>{screenshot_html}</td>"
            "</tr>"
        )
        summary_lines.extend(
            [
                f"{record['test_id']} | {record['test_name']}",
                f"  Status: {record['status']}",
                f"  Actual result: {record['actual_result']}",
                f"  Screenshot: {screenshot_reference}",
            ]
        )

    document = f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>HireFlow Selenium Test Report</title>
  <style>
    body {{ font: 14px/1.5 Arial, sans-serif; color: #172033; margin: 2rem; }}
    h1 {{ margin-bottom: .25rem; }}
    .counts {{ color: #475569; margin-bottom: 1.5rem; }}
    table {{ border-collapse: collapse; width: 100%; }}
    th, td {{ border: 1px solid #cbd5e1; padding: .65rem; text-align: left; vertical-align: top; }}
    th {{ background: #f1f5f9; }}
    td.result {{ white-space: pre-wrap; overflow-wrap: anywhere; max-width: 38rem; }}
    td.status {{ font-weight: 700; }}
    .pass {{ color: #15803d; }}
    .fail {{ color: #b91c1c; }}
    .error {{ color: #c2410c; }}
    .skipped, .not-run {{ color: #64748b; }}
    img {{ display: block; max-width: 420px; height: auto; }}
  </style>
</head>
<body>
  <h1>HireFlow Selenium Test Report</h1>
  <p>Generated: {html.escape(datetime.now().astimezone().isoformat(timespec='seconds'))}</p>
  <p>Target URL: {html.escape(os.environ.get('STQA_BASE_URL', 'http://localhost:3000'))}</p>
  <p class="counts">Total: {len(records)} | PASS: {counts['PASS']} | FAIL: {counts['FAIL']} | ERROR: {counts['ERROR']} | SKIPPED: {counts['SKIPPED']} | NOT RUN: {counts['NOT RUN']}</p>
  <table>
    <thead><tr><th>Test ID</th><th>Test name</th><th>Actual result</th><th>Status</th><th>Failure screenshot</th></tr></thead>
    <tbody>{''.join(report_rows)}</tbody>
  </table>
</body>
</html>
"""
    REPORT_PATH.write_text(document, encoding="utf-8")
    SUMMARY_PATH.write_text("\n".join(summary_lines) + "\n", encoding="utf-8")


def pytest_sessionfinish(session: pytest.Session, exitstatus: int) -> None:
    _write_reports(session)
