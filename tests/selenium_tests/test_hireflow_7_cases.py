from __future__ import annotations


def test_tc_01_login_page_opens(driver, open_page, selenium_components):
    By, _, _ = selenium_components
    open_page("/login")

    assert driver.find_element(
        By.XPATH, "//h2[normalize-space()='Welcome Back']"
    ).is_displayed()
    assert driver.find_element(By.CSS_SELECTOR, "form").is_displayed()
    assert driver.find_element(By.CSS_SELECTOR, 'input[type="email"]').is_displayed()
    assert driver.find_element(
        By.CSS_SELECTOR, 'input[type="password"]'
    ).is_displayed()


def test_tc_02_empty_login_validation(driver, open_page, selenium_components):
    By, _, _ = selenium_components
    open_page("/login")
    email = driver.find_element(By.CSS_SELECTOR, 'input[type="email"]')
    password = driver.find_element(By.CSS_SELECTOR, 'input[type="password"]')
    submit = driver.find_element(By.CSS_SELECTOR, 'form button[type="submit"]')

    submit.click()

    assert driver.execute_script(
        "return arguments[0].validity.valueMissing", email
    ), "The empty email field should be rejected by the required-field validation."
    assert driver.execute_script(
        "return arguments[0].validity.valueMissing", password
    ), "The empty password field should be rejected by the required-field validation."
    assert driver.current_url.endswith("/login")


def test_tc_03_registration_page_opens(driver, open_page, selenium_components):
    By, _, _ = selenium_components
    open_page("/register")

    assert driver.find_element(
        By.XPATH, "//h2[normalize-space()='Create Account']"
    ).is_displayed()
    assert driver.find_element(
        By.XPATH, "//label[normalize-space()='Full Name']/following-sibling::div/input"
    ).is_displayed()
    assert driver.find_element(By.CSS_SELECTOR, 'input[type="email"]').is_displayed()
    assert driver.find_element(
        By.CSS_SELECTOR, 'input[type="password"]'
    ).is_displayed()


def test_tc_04_registration_role_options(driver, open_page, selenium_components):
    By, _, _ = selenium_components
    open_page("/register")
    candidate_role = driver.find_element(
        By.XPATH, "//button[normalize-space()='Candidate / Job Seeker']"
    )
    recruiter_role = driver.find_element(
        By.XPATH, "//button[normalize-space()='Employer / Recruiter']"
    )

    assert candidate_role.is_displayed()
    assert recruiter_role.is_displayed()


def test_tc_05_job_sorting(driver, open_page, selenium_components):
    By, _, _ = selenium_components
    open_page("/recruiter/jobs")
    table = driver.find_element(By.CSS_SELECTOR, "table")
    title_header = table.find_element(
        By.XPATH, ".//thead//th[normalize-space()='Job Title']"
    )

    title_header.click()
    titles = [
        cell.text.strip()
        for cell in table.find_elements(By.CSS_SELECTOR, "tbody tr td:first-child")
    ]

    assert titles, "The recruiter jobs table should contain job titles to sort."
    assert titles == sorted(titles, key=str.casefold), (
        "Clicking the Job Title column should sort job listings alphabetically; "
        f"the displayed order was {titles!r}."
    )


def test_tc_06_duplicate_job_different_locations(
    driver, open_page, selenium_components
):
    By, EC, WebDriverWait = selenium_components
    open_page("/recruiter/jobs")
    existing_row = driver.find_element(
        By.XPATH,
        "//tbody/tr[td[normalize-space()='Senior Full Stack Engineer']]",
    )
    job_title = existing_row.find_element(By.CSS_SELECTOR, "td:first-child").text
    original_location = existing_row.find_elements(By.TAG_NAME, "td")[3].text

    driver.find_element(
        By.XPATH, "//a[normalize-space()='Create New Job']"
    ).click()
    title_input = driver.find_element(
        By.XPATH, "//label[normalize-space()='Job Title']/following-sibling::input"
    )
    location_input = driver.find_element(
        By.XPATH, "//label[normalize-space()='Location']/following-sibling::input"
    )
    title_input.send_keys(job_title)
    location_input.send_keys("STQA Automation Test Location")
    driver.find_element(
        By.XPATH, "//button[normalize-space()='Publish to Job Board']"
    ).click()

    alert = WebDriverWait(driver, 5).until(EC.alert_is_present())
    alert_text = alert.text
    alert.accept()
    WebDriverWait(driver, 5).until(
        lambda browser: browser.current_url.endswith("/recruiter/jobs")
    )

    matching_rows = driver.find_elements(
        By.XPATH, f"//tbody/tr[td[normalize-space()={job_title!r}]]"
    )
    locations = [row.find_elements(By.TAG_NAME, "td")[3].text for row in matching_rows]

    assert original_location in locations
    assert "STQA Automation Test Location" in locations, (
        "The publish action reported success "
        f"({alert_text!r}) but the duplicate job at a different location "
        f"was not listed. Found locations: {locations!r}."
    )
    assert len(locations) == 2, (
        "A job with the same title at a different location should be listed "
        f"as a separate posting; found {len(locations)} matching row(s)."
    )


def test_tc_07_cancel_job_deletion(driver, open_page, selenium_components):
    By, EC, WebDriverWait = selenium_components
    open_page("/recruiter/jobs")
    target_row = driver.find_element(By.CSS_SELECTOR, "tbody tr")
    title = target_row.find_element(By.CSS_SELECTOR, "td:first-child").text
    target_row.find_element(By.CSS_SELECTOR, 'button[title="Delete Job"]').click()

    WebDriverWait(driver, 5).until(EC.alert_is_present())
    driver.switch_to.alert.dismiss()

    remaining_titles = [
        cell.text.strip()
        for cell in driver.find_elements(
            By.CSS_SELECTOR, "tbody tr td:first-child"
        )
    ]
    assert title in remaining_titles, (
        f"Job {title!r} should remain listed after the deletion confirmation is cancelled."
    )
