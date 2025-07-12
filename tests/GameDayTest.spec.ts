import { test } from '@playwright/test';
import { customTest } from '../Utils/test-base.js';
import { POManager } from '../PageObjects/POManager.js';
import { GameDayTotalStorePage } from '../PageObjects/GameDayTotalStorePage.js';


//test.describe.configure({mode : 'serial'});
customTest(`@web Game Day date verification for ETL`, async ({page, testDataForStoreSelection})=>
{

    test.setTimeout(90000);

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo(testDataForStoreSelection.url);
    await loginPage.validLogin(testDataForStoreSelection.userName, testDataForStoreSelection.password);
    
    const gameDayTotalStore = poManager.getGameDayTotalStorePage(); 
    await gameDayTotalStore.asofDate(testDataForStoreSelection.listOfStores);

}),

//test.describe.configure();
customTest(`@web @Pace Calculation for New Tab`, async ({page, testDataForScheduling})=>
{

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo(testDataForScheduling.url);
    await loginPage.validLogin(testDataForScheduling.userName, testDataForScheduling.password);
    await loginPage.verifyLoginSuccess();

    const gameDayTotalStorePage = poManager.getGameDayTotalStorePage();
    await gameDayTotalStorePage.newTab(testDataForScheduling.groupName, testDataForScheduling.storeName);


});