import { test } from '@playwright/test';
import { customTest } from '../Utils/test-base.js';
import { POManager } from '../PageObjects/POManager.js';


test.describe.configure({mode : 'serial'});
customTest(`@web Game Day date verification for ETL`, async ({page, testDataForStoreSelection})=>
{

    test.setTimeout(90000);

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo(testDataForStoreSelection.url);
    await loginPage.validLogin(testDataForStoreSelection.userName, testDataForStoreSelection.password);
    
    const gameDayTotalStore = poManager.getGameDayTotalStorePage(); 
    await gameDayTotalStore.asofDate(testDataForStoreSelection.listOfStores);

}

)