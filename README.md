# E-commerce Test Automation

A Playwright-based test automation framework for e-commerce website testing using the Page Object Model (POM) pattern.

## Overview

This project contains automated tests for the test store at `https://teststore.automationtesting.co.uk`. The framework is built with Playwright and TypeScript, following the Page Object Model pattern for maintainable and scalable test code.

## Technologies

- **Playwright** - End-to-end testing framework
- **TypeScript** - Type-safe JavaScript
- **Node.js** - Runtime environment

## Installation

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers:

```bash
npx playwright install
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

View test reports:

```bash
npx playwright show-report
```

## Project Structure

```
├── tests/                    # Test specifications
│   ├── buyProduct.spec.ts
│   ├── login.spec.ts
│   └── example.spec.ts
├── pageObjects/             # Page Object Model implementation
│   ├── pages/               # Page classes
│   │   ├── HomePage/
│   │   ├── LoginPage.ts
│   │   └── ProductPage/
│   └── components/          # Reusable component classes
│       ├── HeaderComponent/
│       └── ProductItemComponent/
└── playwright.config.ts     # Playwright configuration
```

## Configuration

The test configuration is set in `playwright.config.ts`. The base URL is configured to point to the test store, and tests run on Chromium by default.


## Tags for executing specific tests

These tags decide when tests run.
- **@smoke** - Minimal critical path. Runs on every deploy / PR.
- **@regression** - Full stable suite. Runs nightly or before release.
- **@blocking** - Failure = release stopper.
- **@slow** - Excluded from fast pipelines.
- **@flaky** - Tracked separately, often excluded or retried.
- ****

Test lifecycle / maturity
- **@new**
- **@legacy**
- **@refactor-needed**

Risk / business-domain tags
- **@auth**
- **@payment**
- **@checkout**
