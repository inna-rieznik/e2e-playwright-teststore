# E-commerce Test Automation

A Playwright-based test automation framework for e-commerce website testing using the Page Object Model (POM) pattern with component composition.

## Overview

This project contains automated end-to-end tests for the test store at `https://teststore.automationtesting.co.uk`. The framework is built with Playwright and TypeScript, following the Page Object Model pattern with reusable components for maintainable and scalable test code.

## Technologies

- **Playwright** - End-to-end testing framework
- **TypeScript** - Type-safe JavaScript
- **Node.js** - Runtime environment
- **dotenv** - Environment variable management
- **ESLint** + **Prettier** - Code quality and formatting
- **GitHub Actions** - CI/CD pipeline

## Installation

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers:

```bash
npx playwright install
```

3. Set up environment variables:

Copy the template and fill in your values:

```bash
cp .env.template .env
```

Then edit `.env` with the required values:

```env
BASE_URL=https://teststore.automationtesting.co.uk/index.php
EMAIL=your-email@example.com
PASSWORD=your-password
TEST_USERNAME=Your Username
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

Run tests with UI mode:

```bash
npm run ui
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.ts
```

Run tests by tag:

```bash
# Run smoke tests
npx playwright test --grep @smoke

# Run regression tests
npx playwright test --grep @regression

# Run auth tests
npx playwright test --grep @auth
```

View test reports:

```bash
npx playwright show-report
```

## Available Scripts

| Script              | Description                                  |
| ------------------- | -------------------------------------------- |
| `npm run lint`      | Run ESLint to check code quality             |
| `npm run lint:fix`  | Run ESLint and automatically fix issues      |
| `npm run format`    | Format code with Prettier                    |
| `npm run format:check` | Check if code is formatted correctly      |
| `npm run check`     | Run both lint and format checks              |
| `npm run ui`        | Run Playwright tests in UI mode              |

## Test Tags

Tags are used to categorize and selectively run tests:

| Tag           | Purpose                                       |
| ------------- | --------------------------------------------- |
| `@smoke`      | Critical path tests. Run on every deploy / PR |
| `@regression` | Full stable suite. Run nightly or pre-release |
| `@auth`       | Authentication-related tests                  |
