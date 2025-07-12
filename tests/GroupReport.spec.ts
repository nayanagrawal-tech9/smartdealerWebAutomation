import { test } from '@playwright/test';
import { customTest } from '../Utils/test-base.ts';
import { POManager } from '../PageObjects/POManager.ts';
import { Page } from '@playwright/test';

const dataSet = JSON.parse(JSON.stringify(require('../Utils/PlaceholderTestData.json')));

//for(const data of dataSet){
customTest(`@web SmartDealer login`, async ({ page, testDataForGroupReports }) => {

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo(testDataForGroupReports.url);
    await loginPage.validLogin(testDataForGroupReports.userName, testDataForGroupReports.password);

    await loginPage.verifyLoginSuccess();

    const groupReportPage = poManager.getGroupReportPage();
    groupReportPage.navigateToGroupReportIncomeStatement();
    groupReportPage.verifyIncomeStatemntReport();
    groupReportPage.selectDropdownGroup(testDataForGroupReports.listOfStores);
    groupReportPage.groupreportVerifyStoresInReport()



    await loginPage.logout();


});