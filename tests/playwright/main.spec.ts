import { expect, test } from '@playwright/test';

const URL = 'http://localhost:3000/';
//const URL = 'https://northwind-traders-kmvx.vercel.app/';

test('has title', async ({ page }) => {
  await page.goto(URL);
  await expect(page).toHaveTitle(/Northwind/);
});

test('filter field', async ({ page }) => {
  await page.goto(URL);
  const clearFiltersText = page.getByText('Clear filters', { exact: true });
  await expect(clearFiltersText).toHaveCount(0);
  await page.getByText('Employees').click();
  await expect(clearFiltersText).toHaveCount(1);
  console.log('Filters count', await clearFiltersText.count());
  await expect(clearFiltersText).toBeVisible();
});
