import { expect, Page, BrowserContext } from "@playwright/test";
import { basePage } from "../pages/basePage";
import { util } from "../Utils/util";

export class homePage extends basePage {
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    private burgerIcon = '#react-burger-menu-btn';

    async verifyAndClickBurgerIcon() {
        await util.elementToBeVisible(this.page, this.burgerIcon);
        await util.clickElement(this.page, this.burgerIcon);
    }

    async verifyLinks() {
        await util.elementToBeVisible(this.page, "text=Logout");

        await util.elementToBeVisible(this.page, "text=Reset App State");

        await util.elementToBeVisible(this.page, "text=All Items");

        await util.elementToBeVisible(this.page, "text=About");
    }

    async clickLogout() {
        await util.clickElement(this.page, "text=Logout");
    }

    async verifyLoginPageUrl(url: string) {
        const currentUrl = this.page.url();
        expect(currentUrl).toBe(url);
    }

    async resetAppItems()
    {
        const resetApp = this.page.getByText('Reset App State');
        await resetApp.click();

        await this.page.reload({timeout: util.timeout});

        const removeBtn = this.page.getByText('Remove');
        await expect(removeBtn).not.toBeVisible();
    }
}