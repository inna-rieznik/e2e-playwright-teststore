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

Create a `.env` file in the root directory with the following variables:

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

## Project Structure

```
├── app/
│   ├── components/                  # Reusable UI components
│   │   ├── Base/
│   │   │   └── BaseComponent.ts
│   │   ├── AddressSection/
│   │   │   ├── AddressSection.ts
│   │   │   └── AddressSectionLocators.ts
│   │   ├── Header/
│   │   │   ├── Header.ts
│   │   │   └── HeaderLocators.ts
│   │   ├── modals/
│   │   │   ├── AddToCart/
│   │   │   │   ├── AddToCartModal.ts
│   │   │   │   └── AddToCartModalLocators.ts
│   │   │   └── MyWishlists/
│   │   │       ├── MyWishlists.ts
│   │   │       └── MyWishlistsLocators.ts
│   │   ├── PersonalInfoSection/
│   │   │   ├── PersonalInfoSection.ts
│   │   │   └── PersonalInfoSectionLocators.ts
│   │   ├── ProductCartItem/
│   │   │   ├── ProductCartItem.ts
│   │   │   └── ProductCartItemLocators.ts
│   │   ├── ProductContainer/
│   │   │   ├── ProductContainer.ts
│   │   │   └── ProductContainerLocators.ts
│   │   ├── ProductItem/
│   │   │   ├── ProductItem.ts
│   │   │   └── ProductItemLocators.ts
│   │   └── ShippingSection/
│   │       ├── ShippingSection.ts
│   │       └── ShippingSectionLocators.ts
│   └── pages/                       # Page objects
│       ├── Base/
│       │   ├── BasePage.ts
│       │   └── BaseLocators.ts
│       ├── AccessoriesPage/
│       ├── CheckoutPage/
│       ├── HomePage/
│       ├── LoginPage/
│       ├── ProductDetailsPage/
│       ├── SearchResultsPage/
│       └── ShoppingCartPage/
├── data/                            # Test data
│   └── products.ts
├── enums/                           # Enumerations
│   └── tags.ts
├── tests/                           # Test specifications
│   ├── buy-product.spec.ts
│   ├── cart-actions.spec.ts
│   ├── create-user.spec.ts
│   ├── filter-products.spec.ts
│   ├── login.spec.ts
│   └── search-product.spec.ts
├── types/                           # TypeScript type definitions
│   ├── productTypes.ts
│   └── userTypes.ts
├── .github/workflows/               # CI/CD
│   └── playwright.yml
├── fixture.ts                       # Custom Playwright fixtures
├── support.ts                       # Utility functions
├── playwright.config.ts             # Playwright configuration
├── tsconfig.json                    # TypeScript configuration
├── eslint.config.mts                # ESLint configuration
└── .prettierrc                      # Prettier configuration
```

## Architecture

### Page Object Model with Component Composition

Each page and component follows a two-file pattern:

- **`<Name>.ts`** - Actions and methods (click, fill, get text, etc.)
- **`<Name>Locators.ts`** - Locator definitions (selectors)

**Base classes** provide shared behavior:

- `BasePage` - Abstract page with `navigateTo()`, `waitForNetworkIdle()`, shared `header` and `myWishlistsModal`
- `BaseLocators` - Abstract base for all locator classes
- `BaseComponent` - Abstract base for reusable components

**Pages** represent full application pages (HomePage, LoginPage, etc.) and **components** represent reusable UI sections (Header, ProductItem, etc.). Pages compose components — for example, every page inherits a `header` component from `BasePage`.

### Authentication

Tests that require a logged-in user leverage API-based authentication through the `userToLogin` fixture option. The flow:

1. Test declares `test.use({ userToLogin: { email, password } })`
2. The fixture calls the store's authentication API directly
3. The resulting storage state (cookies/session) is cached in `.auth/`
4. The browser context is initialized with the cached state — no UI login needed

### Custom Fixtures

Defined in `fixture.ts`, the following fixtures are available in tests:

| Fixture                | Description                                         |
| ---------------------- | --------------------------------------------------- |
| `homePage`             | HomePage instance                                   |
| `loginPage`            | LoginPage instance                                  |
| `productDetailsPage`   | ProductDetailsPage instance                         |
| `shoppingCartPage`     | ShoppingCartPage instance                           |
| `checkoutPage`         | CheckoutPage instance                               |
| `accessoriesPage`      | AccessoriesPage instance                            |
| `searchResultsPage`    | SearchResultsPage instance                          |
| `addProductToTheCart`   | API helper to add a product to the cart             |
| `createUserViaApi`     | API helper to create a user                         |
| `userToLogin`          | Triggers automatic API-based authentication         |

## Test Suites

### Login (`login.spec.ts`) - 5 tests

| ID          | Description                                      | Tags                  |
| ----------- | ------------------------------------------------ | --------------------- |
| E2E-LGN-001 | Should NOT login with invalid email + valid password | Regression, Auth    |
| E2E-LGN-002 | Should NOT login with valid email + invalid password | Regression, Auth    |
| E2E-LGN-003 | Should NOT login with invalid email + invalid password | Regression, Auth  |
| E2E-LGN-004 | Should NOT login with empty email + empty password | Regression, Auth     |
| E2E-LGN-005 | Should login with valid credentials              | Smoke, Regression, Auth |

### Search Product (`search-product.spec.ts`) - 4 tests

| ID           | Description                                                   | Tags              |
| ------------ | ------------------------------------------------------------- | ----------------- |
| E2E-SRCH-001 | Show all products containing the search query in the dropdown | Smoke, Regression |
| E2E-SRCH-002 | Show all products containing the search query in search results | Smoke, Regression |
| E2E-SRCH-003 | Search existing product by name and click on it               | Regression        |
| E2E-SRCH-004 | Search non-existing product by name                           | Regression        |

### Buy Product (`buy-product.spec.ts`) - 3 tests

| ID          | Description                                                     | Tags              |
| ----------- | --------------------------------------------------------------- | ----------------- |
| E2E-BUY-001 | Add products to cart from home page and verify total price      | Smoke, Regression |
| E2E-BUY-002 | Add product to favorites from home page                         | Regression        |
| E2E-BUY-003 | Select product color and size from details page and add to cart | Regression        |

### Cart Actions (`cart-actions.spec.ts`) - 4 tests

| ID           | Description                              | Tags              |
| ------------ | ---------------------------------------- | ----------------- |
| E2E-CART-001 | Increment items count in the cart        | Smoke, Regression |
| E2E-CART-002 | Decrement items count in the cart        | Smoke, Regression |
| E2E-CART-003 | Delete item from cart                    | Smoke, Regression |
| E2E-CART-004 | Calculate total price for all products   | Smoke, Regression |

### Filter Products (`filter-products.spec.ts`) - 3 tests

| ID           | Description                | Tags              |
| ------------ | -------------------------- | ----------------- |
| E2E-FLTR-001 | Check only 1 facet at a time | Smoke, Regression |
| E2E-FLTR-002 | Check 2 facets at a time   | Smoke, Regression |
| E2E-FLTR-003 | Clear all filters          | Smoke, Regression |

### Create User (`create-user.spec.ts`) - 1 test

| ID          | Description                         | Tags              |
| ----------- | ----------------------------------- | ----------------- |
| E2E-CRT-001 | Create user with unique email via API | Smoke, Regression |

**Total: 20 tests across 6 suites**

## Test Tags

Tags are used to categorize and selectively run tests:

| Tag           | Purpose                                       |
| ------------- | --------------------------------------------- |
| `@smoke`      | Critical path tests. Run on every deploy / PR |
| `@regression` | Full stable suite. Run nightly or pre-release |
| `@auth`       | Authentication-related tests                  |

## Configuration

### Playwright (`playwright.config.ts`)

- **Test directory:** `./tests`
- **Parallel execution:** Enabled (`fullyParallel: true`)
- **Retries:** 0 locally, 2 on CI
- **Workers:** Unlimited locally, 1 on CI
- **Reporter:** HTML
- **Trace:** Always on
- **Browser:** Chromium (Desktop Chrome)

### TypeScript (`tsconfig.json`)

- Target: ES2016
- Module: CommonJS
- Strict mode enabled

### ESLint (`eslint.config.mts`)

- TypeScript ESLint recommended rules
- Prettier integration
- Playwright plugin with rules (`no-focused-test`, `no-networkidle`, etc.)

### Prettier (`.prettierrc`)

- Single quotes, semicolons
- Tab width: 2, print width: 100
- Trailing comma: ES5
- Arrow parens: avoid

## CI/CD

The project uses **GitHub Actions** (`.github/workflows/playwright.yml`):

- **Triggers:** Push/PR to `main`, `master`, `develop`, and manual dispatch
- **Steps:**
  1. Checkout repository
  2. Setup Node.js (LTS)
  3. Install dependencies (`npm ci`)
  4. Install Playwright browsers
  5. Run tests
  6. Upload `playwright-report` artifact (30-day retention)
- **Secrets required:** `BASE_URL`, `EMAIL`, `PASSWORD`

## Recommended VS Code Extensions

The project includes recommended extensions in `.vscode/extensions.json`:

- **ESLint** - Linting integration
- **Prettier** - Formatting integration
- **Playwright Test for VS Code** - Test runner and debugging
