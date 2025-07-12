import {test, expect, Locator} from '@playwright/test';
import {Page} from '@playwright/test';


export class LoginPage{

    page : Page;
    signInButton: Locator;
    userName: Locator;
    password: Locator;
    verifyLoginSuccessText: Locator;
    selectUserDropdown: Locator;
    signoutButton: Locator;
    verifyLogoutSuccess: Locator;


    constructor(page: Page)
    {
        this.page = page;
        this.signInButton = page.locator('button[type="submit"]');
        this.userName = page.locator('input[name="username"]');
        this.password = page.locator('input[name="password"]');
        this.verifyLoginSuccessText = page.locator('h1.text-4xl.mt-2.mb-2.text-center');
        this.selectUserDropdown = page.locator('.flex.gap-3');
        this.signoutButton = page.locator("//div[normalize-space()='Sign out']");
        this.verifyLogoutSuccess = page.locator("h1[class='text-2xl mb-[28px]']");
        
    }

    async goTo(url: string){
        await this.page.goto(url);
    }

    async validLogin(userName: string, password: string){
        await this.userName.fill(userName);
        await this.password.fill(password)
        await this.signInButton.click();
        
     }

     async verifyLoginSuccess(){
        await this.verifyLoginSuccessText.textContent();

     }

     async logout(){
        await this.selectUserDropdown.click();
        await this.signoutButton.click();
        await this.verifyLogoutSuccess.textContent();
        
     }

}
module.exports  = { LoginPage }