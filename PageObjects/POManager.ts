import { LoginPage } from './LoginPage';
import { DashboardPage } from './DashboardPage';
import { GameDayTotalStorePage } from './GameDayTotalStorePage';
import { EmployeePage } from './EmployeePage';

import { Page } from '@playwright/test';


export class POManager {

    loginPage: LoginPage;
    gameDayTotalStorePage: GameDayTotalStorePage;
    dashboardPage: DashboardPage;
    employeePage: EmployeePage;
    page: Page;

    constructor(page: Page) {

        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.dashboardPage = new DashboardPage(this.page);
        this.gameDayTotalStorePage = new GameDayTotalStorePage(this.page);
        this.employeePage = new EmployeePage(this.page);

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
}
module.exports = { POManager };