import { defineConfig, devices } from '@playwright/test';
import fs from 'fs';


fs.mkdirSync('results', { recursive: true });

export default defineConfig({
  testDir: './tests',
  retries: 0, //Number of retries for failed test cases
  workers: 1, //Running parallel execution
  timeout: 40 * 1000,
  expect: {
    timeout: 50000
  },

  reporter: [
    ['list'],
    ['junit', { outputFile: 'results/test-results.xml' }],
    ['allure-playwright']
  ],
  //reporter: 'html',
  projects: [
    {
      name: 'Safari',
      use: {

        browserName: 'webkit',
        headless: false,
        screenshot: 'on',
        trace: 'on',
        viewport: null,
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        video: 'retain-on-failure'
        //viewport : {width:123, height:123},
        //...devices['iPhone 11']
      }
    },
    {
      name: 'Chrome',
      use: {

        browserName: 'chromium',
        headless: true,
        screenshot: 'on',
        trace: 'on',
        viewport: null,
        ignoreHTTPSErrors: true,
        permissions: ['geolocation'],
        video: 'retain-on-failure'
      }
    }


  ],
});
//module.exports = config