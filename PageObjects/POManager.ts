import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { GameDayTotalStorePage } from './GameDayTotalStorePage';
import { Impersonate } from './ImpersonatePage';
import { EmployeePage } from './EmployeePage';

import { GroupReportPage } from './GroupReportPage';

import { SettingsSchedulingPage } from './SettingsSchedulingPage';

import { Page } from '@playwright/test';


export class POManager {

    loginPage: LoginPage;
    gameDayTotalStorePage: GameDayTotalStorePage;
    dashboardPage: DashboardPage;
    employeePage: EmployeePage;
    impersonatePage: Impersonate
    settingsSchedulingPage: SettingsSchedulingPage;
    groupReportPage: GroupReportPage
    page: Page;

    constructor(page: Page) {

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.gameDayTotalStorePage = new GameDayTotalStorePage(this.page);
        this.employeePage = new EmployeePage(this.page);
        this.impersonatePage = new Impersonate(this.page);
        this.settingsSchedulingPage = new SettingsSchedulingPage(this.page);
        this.groupReportPage = new GroupReportPage(this.page);

    }

    getLoginPage() {
        return this.loginPage;

    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getGameDayTotalStorePage() {
        return this.gameDayTotalStorePage;
    }

    getEmployeePage() {
        return this.employeePage;
    }

    getImpersonatePage() {
        return this.impersonatePage;
    }

    getSettingsSchedulingPage() {
        return this.settingsSchedulingPage;
    }

    getGroupReportPage(){
        return this.groupReportPage;
    }
}
module.exports = { POManager };