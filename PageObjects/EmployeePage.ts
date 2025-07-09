import { test, expect, Locator } from '@playwright/test';
import { Page } from '@playwright/test';
import { generateAutomationEmail, retry, selectStoresForEmployees } from '../Utils/BaseUtils'

export class EmployeePage {

    page: Page;
    adminHeader: Locator;
    clicEmployeeTab: Locator;
    verifyEmployeeTab: Locator;
    addNewEmployee: Locator;
    verifyAddEmployeePage: Locator;
    addFirstName: Locator;
    addLastName: Locator;
    addEmail: Locator;
    contDealershipButton: Locator;
    verifystep2Page: Locator;
    checkboxAccess: Locator;
    addCellPhone: Locator;
    selectDropdown: Locator;
    selectValueFromDropdown: Locator;


    constructor(page: Page) {

        this.page = page;
        this.adminHeader = page.locator("button[id='Admin']");
        this.clicEmployeeTab = page.locator("//p[normalize-space()='Employees']");
        this.verifyEmployeeTab = page.locator(".text-black.font-bold.pl-2.text-3xl.font-roboto");


        //Step 1 selectors
        this.addNewEmployee = page.locator(".ml-2.text-md");
        this.verifyAddEmployeePage = page.locator(".text-black.font-bold.pl-2.text-2xl.font-roboto");
        this.addFirstName = page.locator("#first_name");
        this.addLastName = page.locator("#last_name");
        this.addEmail = page.locator("#email");
        this.addCellPhone = page.locator('#cell_phone')
        this.contDealershipButton = page.locator("//button[normalize-space()='Continue to Dealership & Roles']")

        //Step 2 selectors 
        this.verifystep2Page = page.locator('.mx-4.text-gray-600.font-bold');
        this.checkboxAccess = page.locator("input[name^='storeRoles'][name$='hasAccess']");
        this.selectDropdown = page.locator("button[role='combobox']")
        this.selectValueFromDropdown = page.locator('select[name="storeRoles[${storeIndex}].role"]')


    }

    async navigateToEmployeePage() {
        //console.log(await this.page.title());
        await this.adminHeader.click();
        await this.clicEmployeeTab.click();
    }

    async verifyEmployeePage() {
        //console.log(await this.page.title());
        await this.verifyEmployeeTab.textContent();
    }


    async clickOnCreateNewEmployee() {
        await this.addNewEmployee.click();
        await this.verifyAddEmployeePage.textContent();
    }

    async verifyEmployeeFormPage() {

        await this.verifyAddEmployeePage.textContent();

    }

    async fillEmployeeCreationForm() {
        await this.addFirstName.fill('Automation');
        await this.addLastName.fill('User');
        const email = generateAutomationEmail();
        console.log(email);
        await this.addEmail.fill(email);
        await this.addCellPhone.fill('1234567890')

        await retry(() => this.page.click("//button[normalize-space()='Continue to Dealership & Roles']"), 3, 1000);

        await this.contDealershipButton.click();
    }

    async addStep2Details() {

        await this.verifystep2Page.textContent();

        selectStoresForEmployees(this.checkboxAccess, this.selectDropdown, this.selectValueFromDropdown)



    }

}
module.exports = { EmployeePage }