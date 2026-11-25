
# HireFlow – Recruitment Management System

A full-stack recruitment management platform designed to simplify the hiring process through candidate management, recruiter tools, AI-assisted resume processing, and software testing.

## About the Project

HireFlow is a recruitment management system developed as an STQA mini-project. It provides separate experiences for candidates, recruiters, and administrators while demonstrating manual testing, Selenium automation testing, and AI-based testing concepts.

## Key Features

- Candidate and recruiter authentication
- Candidate dashboard and profile management
- Job browsing and application management
- Recruiter dashboard and job management
- Applicant and interview management
- AI-powered resume assistance
- AI integration using Ollama
- Admin dashboard and analytics

## Technology Stack

| Category | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API routes, Node.js |
| Database | PostgreSQL |
| ORM | Prisma |
| AI Integration | Ollama |
| Automation Testing | Python, Selenium, Pytest |
| Version Control | Git, GitHub |

## Project Structure

```text
HireFlow/
├── docs/
│   └── HireFlow_STQA_Final_Report.pdf
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   ├── components/
│   └── lib/
├── tests/
│   ├── selenium_tests/
│   └── unit/
├── STQA_Evidence/
│   └── Selenium/
├── package.json
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Khushipancholi/HireFlow.git
cd HireFlow
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Copy `.env.example` to `.env` and configure the required database and AI settings.

Do not upload your actual `.env` file or private credentials to GitHub.

### 4. Configure the Database

Configure PostgreSQL and the connection string according to your environment.

Generate the Prisma client:

```bash
npx prisma generate
```

### 5. Start the Development Server

```bash
npm run dev
```

Open http://localhost:3000

## Software Testing

The project includes three testing areas:

- **Manual Testing:** Functional verification of HireFlow modules.
- **Automation Testing:** Selenium-based browser testing using Python and Pytest.
- **AI-Based Testing:** AI-assisted testing and resume-processing functionality.

### Testing Evidence

The Selenium reports and screenshots are available in:

`STQA_Evidence/Selenium/`

## Project Documentation

The complete STQA mini-project report is available here:

[View Final STQA Report](docs/HireFlow_STQA_Final_Report.pdf)

## Author

**Khushi Pancholi**

- GitHub: [Khushipancholi](https://github.com/Khushipancholi)
- LinkedIn: [Khushi Pancholi](https://www.linkedin.com/in/khushipancholi29/)

---

Developed as a Software Testing and Quality Assurance mini-project.
