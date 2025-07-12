import { test, expect, Locator } from '@playwright/test';
import { Page } from '@playwright/test';
import { wait } from '../Utils/BaseUtils';


export class SettingsSchedulingPage {

    page: Page;
    adminHeader: Locator;
    clicStoreSettingsTab: Locator;
    clickSchedulingTab: Locator;
    verifySchedulingSuccess: Locator;
    selectGroupDropdown: Locator;
    groupName: Locator;
    togglePopup: Locator;
    removeButton: Locator;



    constructor(page: Page) {
        this.page = page;
        this.adminHeader = page.locator("button[id='Admin']");
        this.clicStoreSettingsTab = page.locator("//p[normalize-space()='Store Settings']");
        this.clickSchedulingTab = page.locator("(//button[normalize-space()='Scheduling'])");
        this.verifySchedulingSuccess = page.locator("//h2[normalize-space()='Which days is the Sales Department open?']")
        this.selectGroupDropdown = page.locator("button[aria-haspopup='menu'] >> nth=1")
        this.groupName = page.locator("xpath=//div[normalize-space()='${this.storeName}']");
        this.togglePopup = page.locator(".text-2xl.font-semibold");
        this.removeButton = page.locator("//button[normalize-space()='Remove']");
    }


    async navigateToSchedulingTab() {
        //console.log(await this.page.title());
        await this.adminHeader.click();
        await this.clicStoreSettingsTab.click();
        await this.clickSchedulingTab.click();
    }

    async verifySchedulingTabSuccess() {
        await wait(5000)
        await this.verifySchedulingSuccess.textContent();

        const selectedDates = await this.selectDateIfNotAlreadySet(this.page);

        if (selectedDates && selectedDates.length > 0) {
            console.log('🗓️ You had already selected:', selectedDates);
        } else {
            console.log('📅 A new date was selected.');
        }

    }

    async selectedRequiredStoreInScheduling(grpupName: string, storeName: string) {

        await this.selectGroupDropdown.textContent();
        await this.selectGroupDropdown.click();


        const selectGroup = this.page.locator(`div[role="menuitem"]:has-text('${grpupName}')`);
        await selectGroup.click();

        

        // const isDisabled = await this.groupName.isDisabled();

        // if (isDisabled) {
        //     console.log('🔴 Toggle is ENABLED (button is DISABLED)');
        // } else {
        //     console.log('🟢 Toggle is DISABLED (button is ACTIVE)');
        // }

        //const storeLocator = this.page.locator(`xpath=//div[normalize-space()='${storeName}']`);
        //await storeLocator.click();
        //selectStore
        //div[normalize-space()='Cycle City']

        const toggleOn = this.page.locator('[data-testid="ToggleOnIcon"]');
        const toggleOff = this.page.locator('[data-testid="ToggleOffOutlinedIcon"]');

        const isEnabled = await toggleOn.isVisible();

        if (isEnabled) {
            console.log('🔵 Toggle is currently ON. Disabling it...');
            await this.togglePopup.textContent();
            this.removeButton.click;

            await toggleOn.click();
            await expect(toggleOff).toBeVisible(); // confirm it's off
        } else {
            console.log('⚪️ Toggle is already OFF. Proceeding...');
        }

        const dropdownVal = this.page.locator(`xpath=//div[contains(normalize-space(), '${storeName}')]`);
        await dropdownVal.click();



    }

    async getNumberOfDaysWorkedInaWeek() {
        await this.getSelectedWeekdays()
    }

    async getNumberOFworkingdaysData() {
        await this.getAdjustedWorkingDaysSummary(this.page, await this.getSelectedWeekdays())

    }

    async getSelectedWeekdays(): Promise<string[]> {
        await this.page.waitForTimeout(10000); // or use an explicit wait for button if needed

        const dayButtons = this.page.locator('//div[contains(@class,"space-x-1")]/button');
        const count = await dayButtons.count();

        const selectedDays: string[] = [];

        for (let i = 0; i < count; i++) {
            const button = dayButtons.nth(i);
            const text = (await button.textContent())?.trim();
            const classAttr = await button.getAttribute('class');

            const isSelected = classAttr?.includes('bg-blue-600') && classAttr?.includes('text-white');

            if (isSelected && text) {
                selectedDays.push(text);
            }
        }

        console.log('Selected weekdays', selectedDays);

        return selectedDays;
    }

    async getAdjustedWorkingDaysSummary(
        page: Page,
        selectedWeekdays: string[]
    ): Promise<{
        //totalWorkingDays: number;
        adjustedWorkingDays: number;
        workedUntilYesterday: number;
    }> {
        const dayMap: Record<string, number> = {
            Sun: 0,
            Mon: 1,
            Tue: 2,
            Wed: 3,
            Thu: 4,
            Fri: 5,
            Sat: 6,
        };

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth(); // 0-indexed
        const today = now.getDate();
        const currentMonthName = now.toLocaleString('default', { month: 'long' });
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const selectedDayIndexes = selectedWeekdays.map(day => dayMap[day]);

        // --- Step 1: Fetch holiday dates from UI ---
        const holidayBlocks = page.locator('//div[contains(@class, "pb-1")]');
        const holidayCount = await holidayBlocks.count();
        const holidayDates: number[] = [];

        for (let i = 0; i < holidayCount; i++) {
            const block = holidayBlocks.nth(i);

            // get the checkbox inside the block
            const checkbox = block.locator('input[type="checkbox"]');

            // ✅ Only include if checkbox is checked
            const isChecked = await checkbox.isChecked();
            if (!isChecked) continue;

            // get the date span
            const dateText = (await block.locator('span').nth(1).textContent())?.trim() ?? '';

            if (dateText.startsWith(currentMonthName)) {
                const day = parseInt(dateText.split(' ')[1]);
                if (!isNaN(day)) holidayDates.push(day);
            }
        }

        // --- Step 2: Fetch selected leave dates from calendar UI ---
        const calendarSpans = page.locator(`xpath=//div[@class='max-h-[234px] overflow-y-auto overflow-x-hidden pr-4 scrollbar-custom space-y-3']//div//span`);
        const leaveDates: number[] = [];

        const calendarCount = await calendarSpans.count();
        for (let i = 0; i < calendarCount; i++) {
            const text = (await calendarSpans.nth(i).textContent())?.trim();
            if (text?.startsWith(currentMonthName)) {
                const day = parseInt(text.split(' ')[1]);
                if (!isNaN(day)) leaveDates.push(day);
            }
        }

        // --- Step 3: Loop through month and calculate all 3 counts ---
        let totalWorkingDays = 0;
        let adjustedWorkingDays = 0;
        let workedUntilYesterday = 0;

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const isWeekday = selectedDayIndexes.includes(date.getDay());
            if (!isWeekday) continue;

            totalWorkingDays++;

            const isHoliday = holidayDates.includes(day);
            const isLeave = leaveDates.includes(day);

            if (!isHoliday && !isLeave) {
                adjustedWorkingDays++;
            }

            if (day < today) {
                const isPastHoliday = isHoliday;
                const isPastLeave = isLeave;
                if (!isPastHoliday && !isPastLeave) {
                    workedUntilYesterday++;
                }
            }


        }

        // --- Final Output ---
        console.log(`📅 Total working days: ${totalWorkingDays}`);
        console.log(`🧮 Adjusted working days (minus holidays & leaves): ${adjustedWorkingDays}`);
        console.log(`📆 Worked until yesterday: ${workedUntilYesterday}`);

        return {
            //totalWorkingDays,
            adjustedWorkingDays,
            workedUntilYesterday,
        };
    }

    async selectDateIfNotAlreadySet(page: Page): Promise<string[] | void> {
        // XPath to check if existing span data is present
        const existingSpans = page.locator(`xpath=//div[@class='max-h-[234px] overflow-y-auto overflow-x-hidden pr-4 scrollbar-custom space-y-3']//div//span`);

        const spanCount = await existingSpans.count();

        // ✅ If data exists: return all span texts
        if (spanCount > 0) {
            const selectedTexts: string[] = [];

            for (let i = 0; i < spanCount; i++) {
                const text = (await existingSpans.nth(i).textContent())?.trim();
                if (text) selectedTexts.push(text);
            }

            console.log('✅ Existing selected dates:', selectedTexts);
            return selectedTexts;
        }

        // ❌ If no data found, open date picker and select a valid past date
        console.log('ℹ️ No dates selected. Attempting to pick a date...');

        // Step 1: Click the date picker trigger button
        await page.locator('.text-md.font-medium.text-blue-600').click();

        // Step 2: Select a date < today in current month
        const today = new Date().getDate();

        const availableDateButtons = page.locator(`xpath=//button[normalize-space() and number(.) < ${today}]`);
        const availableCount = await availableDateButtons.count();

        if (availableCount === 0) {
            console.warn('⚠️ No past dates available to select.');
            return;
        }

        await availableDateButtons.first().click();
        await wait(10000);
        console.log('✅ Past date selected successfully.');
    }

}

module.exports = { SettingsSchedulingPage }