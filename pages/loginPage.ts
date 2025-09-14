import { expect, Page, BrowserContext } from "@playwright/test";
import { basePage } from "../pages/basePage";
import { util } from "../Utils/util";

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
        await util.elementToBeVisible(this.page, this.userNameField);
        await util.clickElement(this.page, this.userNameField);
        await this.page.locator(this.userNameField).fill(username);

        await util.elementToBeVisible(this.page, this.passwordField);
        await util.clickElement(this.page, this.passwordField);
        await this.page.locator(this.passwordField).fill(password);

        await util.elementToBeVisible(this.page, this.loginBtn);
        await util.clickElement(this.page, this.loginBtn);

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