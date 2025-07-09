import { test, expect, Locator } from '@playwright/test';
import { Page } from '@playwright/test';


export class DashboardPage {
    productText: Locator;
    clicStoreSelectionDropdown: Locator;
    selectStoreFromDropdown: Locator;
    page: Page;

    constructor(page: Page) {

        this.page = page;
        this.productText = page.locator('.text-4xl.mt-2.mb-2.text-center');
        this.clicStoreSelectionDropdown = page.locator("button[data-state='closed']");
        this.selectStoreFromDropdown = page.locator("span.text-xs.font-normal.ml-1");

    }


    async selectStore(productName: string) {
        console.log(await this.page.title());
        await this.productText.textContent();
        await this.clicStoreSelectionDropdown.nth(1).click();

        const storeList = await this.selectStoreFromDropdown.allTextContents();
        const match = storeList.find(item => item === productName);

        if (match) {
            await this.page.click(`text=${productName}`);
        } else {
            throw new Error(`Store "${productName}" not found in dropdown.`);
        }

    }

    async addAnnouncement() {

    }

    async verifyRssFeed() {


    }

}

module.exports = { DashboardPage }