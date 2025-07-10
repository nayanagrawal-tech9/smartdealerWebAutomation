import { test, expect, Locator } from '@playwright/test';
import { Page } from '@playwright/test';
import { generateAutomationEmail, retryClickUntilTargetVisible, wait } from '../Utils/BaseUtils'
import axios from 'axios';

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
    verifyRequiredRow: Locator;
    finishAndAddEmployeeButton: Locator;
    email!: string | string;
    searchBox: Locator;
    verifySearchResult: Locator;
    verifyGridData: Locator;
    clickToSendEmailInvite: Locator







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
        this.verifystep2Page = page.locator("//div[contains(@class, 'text-gray-600') and contains(text(), 'Step 2')]");
        this.verifyRequiredRow = page.locator('div[row-id]');
        this.checkboxAccess = page.locator('input[type="checkbox"]');
        this.selectDropdown = page.locator('div[role="option"]')
        this.finishAndAddEmployeeButton = page.locator("//button[normalize-space()='Finish and Add Employee']");
        this.searchBox = page.locator("input[placeholder='Search']");
        this.verifySearchResult = page.locator("//div[@col-id='email'][@role='gridcell']");
        this.verifyGridData = page.locator('div:nth-child(6) div:nth-child(5) div:nth-child(1) div:nth-child(1) button:nth-child(3) svg');

        this.clickToSendEmailInvite = page.locator("button[class='inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground text-[#2563EB] p-0 m-0 h-auto focus:outline-none active:outline-none'] svg")
        let email: string;
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

    async sendEmailInvite() {
        await this.clickToSendEmailInvite.click();
    }

    async fillEmployeeCreationForm() {
        await this.addFirstName.fill('Automation');
        await this.addLastName.fill('User');
        this.email = generateAutomationEmail();
        console.log(this.email);
        await this.addEmail.fill(this.email);
        await this.addCellPhone.fill('1234567890')

        //await retry(() => this.page.click("//button[normalize-space()='Continue to Dealership & Roles']"), 3, 1000);

        await retryClickUntilTargetVisible(this.page, this.contDealershipButton
            , this.verifystep2Page, {
            retries: 5,
            delayMs: 1000
        });

        await wait(5000);

    }


    async addStep2Details() {
        await this.verifystep2Page.textContent();
        await this.assignFirstRoleToAllRows(this.page);
    }

    async clickOnFinishAndAddEmployee() {
        await this.finishAndAddEmployeeButton.click();
    }

    async verifyEmployeeCreatedSuccessfully() {

        await this.verifyGridData.textContent();

        await this.searchBox.fill(this.email);
        const actualText = await this.verifySearchResult.textContent();
        expect(actualText).toContain(this.email);
        //expect(this.verifySearchResult.textContent()).toEqual(this.email);
    }

    async assignFirstRoleToAllRows(page: Page) {
        // Get all row-ids (e.g., AG Grid has 14 rows total, virtualized)
        const rowElements = page.locator('div[row-id]');
        const visibleCount = await rowElements.count();

        const rowIds = [];

        // First collect all row-ids that are rendered initially
        for (let i = 0; i < visibleCount; i++) {
            const rowId = await rowElements.nth(i).getAttribute('row-id');
            if (rowId) rowIds.push(rowId);
        }

        // Now loop through each row by row-id to force scroll & interact
        for (const rowId of rowIds) {
            try {
                const row = page.locator(`div[row-id="${rowId}"]`);
                await row.scrollIntoViewIfNeeded();


                const checkbox = row.locator('input[type="checkbox"]');

                if (!(await checkbox.isChecked())) {
                    await checkbox.check();
                    console.log(`🟢 Checked access for row-id="${rowId}"`);
                } else {
                    console.log(`⚠️ Checkbox already checked for row-id="${rowId}"`);
                }

                const dropdown = row.locator('button[role="combobox"]');
                await dropdown.click();

                const options = this.selectDropdown;
                await expect(options.first()).toBeVisible({ timeout: 3000 });

                const firstOption = options.first();
                const text = await firstOption.innerText();
                await firstOption.click();

                await wait(2000);

                console.log(`✅ Selected "${text}" for row-id=${rowId}`);
            } catch (err: any) {
                console.warn(`❌ Failed on row-id=${rowId}: ${err.message}`);
            }
        }
    }

    async fetchActivationLinkFromYopmail(emailId: string) {
        // Open Yopmail home and input the email
        const yopmailPage = await this.page.context().newPage();
        await yopmailPage.goto('https://yopmail.com/en/');
        await this.page.fill('#login', emailId); // without @yopmail.com
        await this.page.click('.material-icons-outlined.f36');

        // Wait for inbox iframe to load
        const inboxFrame = this.page.frameLocator('#ifinbox');
        await inboxFrame.locator("//span[text()='support@getsmartdealer.com']").waitFor();

        // Click the latest email
        await inboxFrame.locator("//span[text()='support@getsmartdealer.com']").click();

        // Switch to the mail content iframe
        const mailFrame = this.page.frameLocator('#ifmail');


        const activationLink = await mailFrame.locator("//a[contains(text(), 'Complete Account Setup')]").getAttribute('href');
        console.log('Activation Link:', activationLink);

        //const emailText = await mailFrame.locator("//a[contains(text(), 'Complete Account Setup')]").g.innerText();

        // Extract the activation link from the email

    }
}
module.exports = { EmployeePage }