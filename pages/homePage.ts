import { expect, Page, BrowserContext } from "@playwright/test";
import { basePage } from "../pages/basePage";
import { util } from "../Utils/util";

export class homePage extends basePage {
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    private burgerIcon = '#react-burger-menu-btn';
    // private logoutLink = '#logout_sidebar_link'
    // private inventoryLink = '#inventory_sidebar_link'
    // private aboutLink = '#about_sidebar_link'
    // private resetLink = '#reset_sidebar_link'

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
}