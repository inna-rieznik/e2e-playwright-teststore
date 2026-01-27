import { chromium, FullConfig } from "@playwright/test";
import LoginPage from "./app/pages/LoginPage/LoginPage";
import { requireEnv } from "./support";

interface User {
  validEmail: string;
  validPassword: string;
}

//TODO after lesson check if done correct (using of .env values) !!!!
const user: User = {
  validEmail: requireEnv('EMAIL'),
  validPassword: requireEnv('PASSWORD'),
};

export default async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const context = await browser.newContext({'baseURL': process.env.BASE_URL});
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.performSignIn({ email: user.validEmail, password: user.validPassword });
    await page.waitForLoadState('networkidle');
}