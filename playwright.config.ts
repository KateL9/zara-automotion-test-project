import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 30000,

  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  use: {
    baseURL: 'https://www.zara.com/ca/en/',
    trace: 'on-first-retry',
    timeout: 30000,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        screenshot: 'only-on-failure',
        outputDir: 'test-results/screenshots',
        headless: true,
        timeout: 50000,
      },
    },
    {
      name: 'firefox',
      use: { 
        ...devices['Desktop Firefox'],
        screenshot: 'only-on-failure',
        outputDir: 'test-results/screenshots',
        headless: true,
        timeout: 30000,
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        screenshot: 'only-on-failure',
        outputDir: 'test-result/screenshots',
        headless: true,
        timeout: 30000,
      },
    },
  ],
});
