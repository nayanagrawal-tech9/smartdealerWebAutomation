import { Locator, Page, expect } from "@playwright/test";
import { TIMEOUT } from "dns";

export const wait = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export function generateAutomationEmail(): string {
  const now = new Date();
  const pad = (num: number): string => num.toString().padStart(2, '0');

  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1);
  const day = pad(now.getDate());
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  const timestamp = `${year}${month}${day}_${hours}${minutes}${seconds}`;
  return `AutomationUser${timestamp}@yopmail.com`;
}

export async function retryClickUntilTargetVisible(
  page: Page,
  clickLocator: Locator,
  targetLocator: Locator,
  options: {
    retries?: number;
    delayMs?: number;
    timeoutMs?: number;
  } = {}
) {
  const { retries = 5, delayMs = 1000, timeoutMs = 10000 } = options;

  for (let i = 0; i < retries; i++) {
    try {
      console.log(`🔁 Attempt ${i + 1}: clicking the button...`);
      await clickLocator.click({ timeout: 3000 });

      // Try waiting for the target element to appear
      await expect(targetLocator).toBeVisible({ timeout: timeoutMs });
      console.log(`✅ Target appeared after click`);
      return; // Success!
    } catch (err: any) {
      console.warn(`⚠️ Attempt ${i + 1} failed: ${err.message}`);
      if (i === retries - 1) {
        throw new Error(`❌ Failed to click and wait for target after ${retries} retries.`);
      }

      await page.waitForTimeout(delayMs);
    }
  }
}



export async function retry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 1000
): Promise<T> {
  let lastError: any;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      console.warn(`Retry ${i + 1} failed. Retrying...`);
      await new Promise(res => setTimeout(res, delayMs));
    }
  }
  throw lastError;
}