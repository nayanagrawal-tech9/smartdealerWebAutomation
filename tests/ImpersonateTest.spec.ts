import { test } from '@playwright/test';
import { customTest } from '../Utils/test-base.ts';
import { POManager } from '../PageObjects/POManager.ts';

const dataSet = JSON.parse(JSON.stringify(require('../Utils/PlaceholderTestData.json')));

//for(const data of dataSet){
    customTest(`@web SmartDealer login`, async ({page, testDataForStoreSelection})=>
{

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo(testDataForStoreSelection.url);
    await loginPage.validLogin(testDataForStoreSelection.userName, testDataForStoreSelection.password);

    await loginPage.verifyLoginSuccess();

    const impersonate = poManager.getImpersonatePage();
    await impersonate.clickImparsonateUser();
    await impersonate.verifyImpersonatePopup();
    await impersonate.enterEmailAndClickImpersonate();

    await impersonate.verifyUserIsImpersonated();
    await impersonate.cancelImpersonation();

    await loginPage.logout();


});