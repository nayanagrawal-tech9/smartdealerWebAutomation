import { test } from '@playwright/test';
import { customTest } from '../Utils/test-base.js';
import { POManager } from '../PageObjects/POManager.js';


test.describe.configure({ mode: 'serial' });
customTest(`@web Create Employee`, async ({ page, testDataForStoreSelection }) => {

    test.setTimeout(90000);

    const poManager = new POManager(page);

    //Login to the application
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo(testDataForStoreSelection.url);
    await loginPage.validLogin(testDataForStoreSelection.userName, testDataForStoreSelection.password);

    //Navigate to employee screen
    const employeePage = poManager.getEmployeePage();


    await employeePage.navigateToEmployeePage();
    await employeePage.verifyEmployeePage();
    await employeePage.clickOnCreateNewEmployee();
    await employeePage.verifyEmployeeFormPage();
    await employeePage.fillEmployeeCreationForm();
    await employeePage.addStep2Details();
    await employeePage.clickOnFinishAndAddEmployee();
    await employeePage.verifyEmployeeCreatedSuccessfully();

    await loginPage.logout();

    await employeePage.fetchActivationLinkFromYopmail("automationuser20250710_144930@yopmail.com");


    //await page.pause();



}

)