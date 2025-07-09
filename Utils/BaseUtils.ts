import { Locator } from "@playwright/test";

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

export async function selectStoresForEmployees(checkboxAccess: Locator, dropdownRole: Locator, selectValueFromDropdown: Locator) {

  // Get count of all checkboxes like storeRoles[0].hasAccess, storeRoles[1].hasAccess, etc.
  const count = await checkboxAccess.count();
  console.log(`Found ${count} checkboxes.`);

  // Loop and check each one
  for (let i = 0; i < count; i++) {
    const checkboxCount = checkboxAccess.nth(i);
    const isChecked = await checkboxCount.isChecked();

    if (!isChecked) {
      await checkboxCount.check(); // ✅ checks the checkbox if not already
    }

    console.log(`Checkbox at index ${i} is now selected.`);
  }

  const selectDropdownCount = await dropdownRole.count();
  const valueCount = await selectValueFromDropdown.count();
  console.log(`Found ${selectDropdownCount} checkboxes.`);
  for (let i = 1; i < count; i++) {
    await dropdownRole.nth(i + 1).click();
    for(let j=0; j < valueCount; j++){
      await selectValueFromDropdown.nth(j).click();
    //const isChecked = await checkboxCount.click();
    }
   

    

    //await dropdownRole.nth(i + 1).click();;
    //const isSelected = await selectdropdownValue.click();

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