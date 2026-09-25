const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: {
    timeout: 10_000
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],

  use: {
    channel: process.env.BROWSER_CHANNEL || undefined,
    baseURL: process.env.BASE_URL || 'https://www.testmuai.com/selenium-playground/',
    headless: process.env.HEADED !== 'true',

    // Assignment requires screenshots, videos and console/network evidence.
    screenshot: 'on',
    video: 'on',
    trace: 'on-first-retry',

    actionTimeout: 15_000,
    navigationTimeout: 30_000,

    viewport: { width: 1440, height: 900 }
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
