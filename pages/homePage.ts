import { expect, Page, BrowserContext } from "@playwright/test";
import { basePage } from "../pages/basePage";

export class homePage extends basePage {
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    private burgerIcon = '#react-burger-menu-btn';
    private logoutLink = '#logout_sidebar_link'
    private inventoryLink = '#inventory_sidebar_link'
    private aboutLink = '#about_sidebar_link'
    private resetLink = '#reset_sidebar_link'

    async verifyAndClickBurgerIcon() {
        const hanburgerIconVisibility = this.page.locator(this.burgerIcon);
        await expect(hanburgerIconVisibility).toBeVisible();

        await this.page.locator(this.burgerIcon).click();
    }

    async verifyLinks() {
        let linkLogout = await this.page.locator("text=Logout");
        await expect(linkLogout).toBeVisible();

        let linkResetApp = await this.page.locator("text=Reset App State");
        await expect(linkResetApp).toBeVisible();

        let linkAllItems = await this.page.locator("text=All Items");
        await expect(linkAllItems).toBeVisible();

        let linkAbout = await this.page.locator("text=About");
        await expect(linkAbout).toBeVisible();
    }

    async clickLogout() {
        let linkLogout = this.page.locator("text=Logout");
        await linkLogout.click();
    }

    async verifyLoginPageUrl(url: string) {
        const currentUrl = this.page.url();
        expect(currentUrl).toBe(url);
    }
}