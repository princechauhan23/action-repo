import { test, expect } from '@playwright/test';

test('has title and dashboard elements', async ({ page }) => {
  await page.goto('/');

  // Check title
  await expect(page).toHaveTitle(/DevDeck/);

  // Check widgets
  await expect(page.getByText('GitHub')).toBeVisible();
  await expect(page.getByText('LeetCode')).toBeVisible();

  // Check gallery
  await expect(page.getByText('Knowledge Base')).toBeVisible();

  // Test search
  await page.getByPlaceholder(/Search docs/i).fill('test');
  await expect(page.getByText('test-playwright')).toBeVisible();
});
