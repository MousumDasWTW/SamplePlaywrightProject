import { expect, Page, BrowserContext } from "@playwright/test";
import { basePage } from "../pages/basePage";

export class loginPage extends basePage {
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    private userNameField = '#user-name';
    private passwordField = '#password';
    private loginBtn = '#login-button';
    private product = 'span.title';
    private errorMsg = '//h3[@data-test="error"]';

    async loginSauceDemo(username: string, password: string) {
        const usernameFieldVisibility = this.page.locator(this.userNameField);
        await expect(usernameFieldVisibility).toBeVisible();
        await this.page.locator(this.userNameField).click();
        await this.page.locator(this.userNameField).fill(username);

        const passwordFieldVisibility = this.page.locator(this.passwordField);
        await expect(passwordFieldVisibility).toBeVisible();
        await this.page.locator(this.passwordField).click();
        await this.page.locator(this.passwordField).fill(password);

        const loginBtnVisibility = this.page.locator(this.loginBtn);
        await expect(loginBtnVisibility).toBeVisible();
        await this.page.locator(this.loginBtn).click();

        await this.page.waitForTimeout(800);
    }

    async verifyTitle(title: string) {
        const errorMsgVisibility = await this.page.locator(this.errorMsg).isVisible();
        console.log('errorMsgVisibility is :' + errorMsgVisibility);

        if (errorMsgVisibility) {
            console.log('The login credentials are incorrect');
        }
        else {
            await this.page.waitForSelector(this.product, { state: 'visible', timeout: 5000 });
            await expect(this.page).toHaveTitle(title);
        }
    }
}