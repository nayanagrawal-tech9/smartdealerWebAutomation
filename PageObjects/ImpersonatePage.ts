
import { test, expect, Locator } from '@playwright/test';
import { Page } from '@playwright/test';
import { generateAutomationEmail, retry } from '../Utils/BaseUtils'

export class Impersonate {

    page: Page;
    impersonateButton: Locator;
    selectUserDropdown: Locator;
    verifyImpersonatePopupHeading: Locator;
    enterImpersonationUser: Locator;
    selectFromSuggestion: Locator;
    clickOnImpersonateButton: Locator;
    verifyimpersonateSuccess: Locator;
    clickCrossInImpersonatedScreen: Locator;


    constructor(page: Page) {

        this.page = page;

        this.selectUserDropdown = page.locator('.flex.gap-3');
        this.impersonateButton = page.locator("//div[normalize-space()='Impersonate User']");
        this.verifyImpersonatePopupHeading = page.locator('.text-2xl.font-semibold');
        this.enterImpersonationUser = page.locator("input[placeholder='Enter the email of the user to impersonate']");
        this.selectFromSuggestion = page.locator("div[id='radix-:r19:'] li:nth-child(1)");
        this.clickOnImpersonateButton = page.locator("//button[normalize-space()='Impersonate']")
        this.verifyimpersonateSuccess = page.locator(".text-sm.text-gray-700");
        this.clickCrossInImpersonatedScreen = page.locator("//button[contains(@class, 'text-gray-400') and contains(@class, 'p-2')]");



    }

    async clickImparsonateUser(){
        await this.selectUserDropdown.click();
        await this.impersonateButton.click();
     }

     async verifyImpersonatePopup(){
        await this.verifyImpersonatePopupHeading.textContent();
     }

     async enterEmailAndClickImpersonate(){
        await this.enterImpersonationUser.fill("nayan.admin.123@yopmail.com");
        //await this.selectFromSuggestion.click();
        await this.clickOnImpersonateButton.click();
     }

     async verifyUserIsImpersonated(){
      const actualText = await this.verifyimpersonateSuccess.textContent();
      expect(actualText).toContain("You're currently impersonating");
     }

     async cancelImpersonation(){
      await this.clickCrossInImpersonatedScreen.click();
     }


}
module.exports = { Impersonate }