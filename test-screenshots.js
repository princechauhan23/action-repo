import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:5173/');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'dashboard.png', fullPage: true });

  await page.goto('http://localhost:5173/dev-tracker');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'devtracker.png', fullPage: true });

  await page.goto('http://localhost:5173/roadmap');
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'roadmap.png', fullPage: true });

  await browser.close();
})();
