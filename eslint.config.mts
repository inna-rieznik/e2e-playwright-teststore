import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import playwright from "eslint-plugin-playwright";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    ignores: [
      "node_modules/**",
      "playwright-report/**",
      "test-results/**",
      "dist/**",
      ".git/**",
    ],
  },

  {
    files: ["**/*.{ts,mts,cts}"],
    plugins: {
      prettier,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      "prettier/prettier": "warn",

      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      "@typescript-eslint/no-explicit-any": "warn",

      "@typescript-eslint/explicit-function-return-type": "off",

      "@typescript-eslint/no-non-null-assertion": "warn",
    },
  },

  {
    ...playwright.configs["flat/recommended"],
    files: ["tests/**/*.spec.ts", "specs/**/*.spec.ts"],
    rules: {
      ...playwright.configs["flat/recommended"].rules,

      "playwright/expect-expect": "warn",

      "playwright/no-conditional-in-test": "warn",

      "playwright/no-focused-test": "error",

      "playwright/no-skipped-test": "warn",

      "playwright/valid-expect": "error",

      "playwright/no-wait-for-timeout": "warn",

      "playwright/no-useless-await": "warn",

      "playwright/prefer-web-first-assertions": "warn",

      "playwright/no-networkidle": "error",
    },
  }
);
