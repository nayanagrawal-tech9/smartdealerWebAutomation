import { AfterStep, Before, Status } from "@cucumber/cucumber";
import playwright from '@playwright/test'
import { chromium } from 'playwright';
import { POManager } from "../PageObjects/POManager";
import { CustomWorld } from './World';
import fs from 'fs';

Before(async function (this: CustomWorld) {

    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
})

AfterStep(async function ({ result }) {

    if (result?.status === Status.FAILED) {
        if (!fs.existsSync('screenshots')) {
            fs.mkdirSync('screenshots');
        }
        await this.page.screenshot({ path: `screenshots/failure-${Date.now()}.png` });
    }

})