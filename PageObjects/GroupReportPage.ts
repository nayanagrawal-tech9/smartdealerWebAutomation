import { test, expect, Locator } from '@playwright/test';
import { Page } from '@playwright/test';


export class GroupReportPage {
    page: Page;
    groupHeader: Locator;
    clicIncomeStatementTab: Locator;
    clicStoreSelectionDropdown: Locator;
    clickOnApplyButton: Locator;
    verifyIncomeStatemntTab: Locator;


    constructor(page: Page) {

        this.page = page;
        this.groupHeader = page.locator("button[id='Group']");
        this.clicIncomeStatementTab = page.locator("//p[normalize-space()='Income Statement']");
        this.verifyIncomeStatemntTab = page.locator("span[class='text-2xl mt-1']");
        this.clicStoreSelectionDropdown = page.locator("span[class='text-sm']");
        this.clickOnApplyButton = page.locator("//button[normalize-space()='Apply']");

    }

    async navigateToGroupReportIncomeStatement(){
        await this.groupHeader.click();
        await this.clicIncomeStatementTab.click();
    }

    async verifyIncomeStatemntReport(){
        await this.verifyIncomeStatemntTab.textContent();
    }

    async selectDropdownGroup(storeNames: string[]){
        await this.clicStoreSelectionDropdown.click();

        for (const store of storeNames) {
            const storeLocator = this.page.locator(`xpath=//span[normalize-space()='${store}']`);
            await storeLocator.waitFor({ state: 'visible', timeout: 5000 });
            await storeLocator.click();
            console.log(`✅ Selected: ${store}`);
          }
        
          // Click the Apply button after all selections
          const applyButton = this.page.locator(`//button[normalize-space()='Apply']`);
          await applyButton.waitFor({ state: 'visible', timeout: 5000 });
          await applyButton.click();
          console.log(`🚀 Applied selection.`);

    }

    async groupreportVerifyStoresInReport(){



    }

}