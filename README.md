# E-commerce Test Automation

A Playwright-based test automation framework for e-commerce website testing using the Page Object Model (POM) pattern.

## Overview

This project contains automated tests for the test store at `https://teststore.automationtesting.co.uk`. The framework is built with Playwright and TypeScript, following the Page Object Model pattern for maintainable and scalable test code.

## Technologies

- **Playwright** - End-to-end testing framework
- **TypeScript** - Type-safe JavaScript
- **Node.js** - Runtime environment
- **dotenv** - Environment variable management
- **ESLint** - Code linting
- **Prettier** - Code formatting

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

Create a `.env` file in the root directory with the following variables:

```env
BASE_URL=https://teststore.automationtesting.co.uk
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

- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Run ESLint and automatically fix issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted correctly
- `npm run check` - Run both lint and format checks
- `npm run ui` - Run Playwright tests in UI mode

## Project Structure

```
├── app/                      # Application page objects and components
│   ├── components/          # Reusable component classes
│   │   ├── Base/
│   │   │   └── BaseComponent.ts
│   │   ├── AddToCartModal/
│   │   ├── AddressSection/
│   │   ├── CartLineItem/
│   │   ├── Header/
│   │   ├── PersonalInfoSection/
│   │   ├── ProductContainer/
│   │   ├── ProductItem/
│   │   └── ShippingSection/
│   └── pages/               # Page classes
│       ├── Base/
│       │   ├── BasePage.ts
│       │   └── BaseLocators.ts
│       ├── AllProductsPage/
│       ├── CheckoutPage/
│       ├── HomePage/
│       ├── LoginPage/
│       ├── ProductPage/
│       ├── ShoppingCartPage/
│       └── SignInPage/
├── api/                     # API testing utilities
├── tests/                   # Test specifications
│   ├── buy-product.spec.ts
│   ├── create-user.spec.ts
│   ├── filter-products.spec.ts
│   ├── login.spec.ts
│   └── search-product.spec.ts
├── fixture.ts               # Custom Playwright fixtures
├── support.ts               # Utility functions
├── playwright.config.ts     # Playwright configuration
├── tsconfig.json            # TypeScript configuration
└── eslint.config.mts        # ESLint configuration
```

## Custom Fixtures

The project uses custom Playwright fixtures defined in `fixture.ts`:

- `loginPage` - LoginPage instance
- `homePage` - HomePage instance
- `productPage` - ProductPage instance
- `shoppingCartPage` - ShoppingCartPage instance
- `loginBeforeTest` - Automatically logs in before test execution
- `logOutAfterTest` - Automatically logs out after test execution

## Configuration

The test configuration is set in `playwright.config.ts`. The base URL is configured via environment variables, and tests run on Chromium by default. The configuration includes:

- Parallel test execution
- Automatic retries on CI
- HTML reporter
- Trace collection on retry

## Test Tags

Tags are used to categorize and selectively run tests:

### Execution Tags
- **@smoke** - Minimal critical path. Runs on every deploy / PR.
- **@regression** - Full stable suite. Runs nightly or before release.
- **@blocking** - Failure = release stopper.
- **@slow** - Excluded from fast pipelines.
- **@flaky** - Tracked separately, often excluded or retried.

### Test Lifecycle / Maturity Tags
- **@new** - Newly added tests
- **@legacy** - Older tests that may need refactoring
- **@refactor-needed** - Tests that need refactoring

### Risk / Business-Domain Tags
- **@auth** - Authentication-related tests
- **@payment** - Payment-related tests
- **@checkout** - Checkout flow tests
