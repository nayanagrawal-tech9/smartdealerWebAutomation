import { test, expect, Locator } from '@playwright/test';
import { Page } from '@playwright/test';
import { calculatePaceForMTDColumn } from '../Utils/BaseUtils'
import { SettingsSchedulingPage } from '../PageObjects/SettingsSchedulingPage'



export class GameDayTotalStorePage {

    page: Page;
    gameDayHeader: Locator;
    clicTotalStoreTab: Locator;
    asOfdate: Locator;
    clicStoreSelectionDropdown: Locator;
    selectStoreFromDropdown: Locator;
    clicNewTab: Locator;
    verifyNewTabSuccess: Locator;




    constructor(page: Page) {

        this.page = page;
        this.gameDayHeader = page.locator("button[id='Game Day']");
        this.clicTotalStoreTab = page.locator("//p[normalize-space()='Total Store']");
        this.asOfdate = page.locator("div[class='p-6 pt-4'] p[class='text-gray-500 mb-0 text-sm']");
        this.clicStoreSelectionDropdown = page.locator("button[data-state='closed']");
        this.selectStoreFromDropdown = page.locator("span.text-xs.font-normal.ml-1");

        //New Tab
        this.clicNewTab = page.locator("//p[normalize-space()='New']");
        this.verifyNewTabSuccess = page.locator("//strong[normalize-space()='Total New']");

    }


    async asofDate(listOfStores: string[]) {
        //console.log(await this.page.title());
        await this.gameDayHeader.click();
        await this.clicTotalStoreTab.click();

        const today = new Date();
        const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit' };
        const todayFormatted: string = today.toLocaleString('en-US', options); // e.g., "Jul 06"

        for (const store of listOfStores) {
            await this.clicStoreSelectionDropdown.nth(1).click();
            const storeList = await this.selectStoreFromDropdown.allTextContents();
            const match = storeList.find(item => item === store);
            await this.page.click(`text=${store}`)


            const uiDateText = await this.asOfdate.textContent();
            console.log('As of Date:', uiDateText);

            // Assertion: check if inputText contains todayFormatted
            expect(uiDateText).toContain(todayFormatted);

        }

    }

    async newTab(groupName: string, storeName: string) {

        const settingsSchedulingPageObject = new SettingsSchedulingPage(this.page);
        await settingsSchedulingPageObject.navigateToSchedulingTab();
        await settingsSchedulingPageObject.selectedRequiredStoreInScheduling(groupName, storeName);
        await settingsSchedulingPageObject.verifySchedulingTabSuccess();

        

        const {
            adjustedWorkingDays,
            workedUntilYesterday,
        } = await settingsSchedulingPageObject.getAdjustedWorkingDaysSummary(this.page, await settingsSchedulingPageObject.getSelectedWeekdays());

        await this.gameDayHeader.click();
        await this.clicNewTab.click();
        await this.verifyNewTabSuccess.textContent();

        //Get MTD value and pace calculation
        await calculatePaceForMTDColumn(this.page, workedUntilYesterday, adjustedWorkingDays);
    }

}
module.exports = { GameDayTotalStorePage }