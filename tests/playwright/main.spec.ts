import { expect, test } from '@playwright/test';

const URL = 'http://localhost:3000/';
//const URL = 'https://northwind-traders-kmvx.vercel.app/';

test('has title', async ({ page }) => {
  await page.goto(URL);
  await expect(page).toHaveTitle(/Northwind/);
});

test('find text', async ({ page }) => {
  await page.goto(URL);
  const findedText = page.getByText('9 employees', { exact: true });
  await expect(findedText).toHaveCount(0);
  await page.getByText('Employees').click();
  await expect(findedText).toHaveCount(1);
  console.log('finded texts count', await findedText.count());
  await expect(findedText).toBeVisible();
});
