import {test, expect, Locator} from '@playwright/test';
import {Page} from '@playwright/test';


export class GameDayTotalStorePage{

    page : Page;
    gameDayHeader : Locator;
    clicTotalStoreTab: Locator;
    asOfdate: Locator;
    clicStoreSelectionDropdown: Locator;
    selectStoreFromDropdown: Locator;


        constructor(page : Page){
    
            this.page = page;
            this.gameDayHeader   = page.locator("button[id='Game Day']");
            this.clicTotalStoreTab = page.locator("//p[normalize-space()='Total Store']");
            this.asOfdate = page.locator("div[class='p-6 pt-4'] p[class='text-gray-500 mb-0 text-sm']");
            this.clicStoreSelectionDropdown = page.locator("button[data-state='closed']");
            this.selectStoreFromDropdown =  page.locator("span.text-xs.font-normal.ml-1");
           
        }


        async asofDate(listOfStores: string[]){
            //console.log(await this.page.title());
            await this.gameDayHeader.click();
            await this.clicTotalStoreTab.click();
        
            const today = new Date();
            const options: Intl.DateTimeFormatOptions = { month: 'short', day: '2-digit' };
            const todayFormatted : string = today.toLocaleString('en-US', options); // e.g., "Jul 06"
            
            for (const store of listOfStores) {
                await this.clicStoreSelectionDropdown.nth(1).click();
                const storeList = await this.selectStoreFromDropdown.allTextContents();
                const match = storeList.find(item => item === store);
                await this.page.click(`text=${store}`)


                const uiDateText = await this.asOfdate.textContent();
                console.log('As of Date:', uiDateText);

                // Assertion: check if inputText contains todayFormatted
                await expect(uiDateText).toContain(todayFormatted);

            }

        }   
    
}
module.exports  = { GameDayTotalStorePage }