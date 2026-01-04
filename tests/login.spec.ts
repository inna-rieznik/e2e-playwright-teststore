import { test, expect } from '@playwright/test';

//email: user.ir@gmail.com
//password: 12345Qwerty!

test('has title', async ({ page }) => {
  await page.goto('/index.php?controller=authentication?back=https%3A%2F%2Fteststore.automationtesting.co.uk%2Findex.php');

});
