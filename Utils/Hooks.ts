import fs from 'fs';
import { afterEach } from "node:test";
import path from 'path';

afterEach(async function () {
    if (this.currentTest?.state === 'failed') {
      const screenshotsDir = path.resolve('screenshots');
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
      }
  
      const filePath = `${screenshotsDir}/failure-${Date.now()}.png`;
      await this.page.screenshot({ path: filePath });
      console.log(`📷 Screenshot saved to: ${filePath}`);
    }
  });