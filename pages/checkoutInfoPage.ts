import { expect, Page, BrowserContext } from "@playwright/test";
import { basePage } from "../pages/basePage";

export class checkoutInfoPage extends basePage {
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    private checkoutOverview = 'span.title';

    async verifyCheckoutInfomation() {
        const firstnameTxtboxBtnVisibility = this.page.getByPlaceholder('First Name');
        await expect(firstnameTxtboxBtnVisibility).toBeVisible();

        const lastnameTxtboxVisibility = this.page.getByPlaceholder('Last Name');
        await expect(lastnameTxtboxVisibility).toBeVisible();

        const zipTxtboxVisibility = this.page.getByPlaceholder('Zip/Postal Code');
        await expect(zipTxtboxVisibility).toBeVisible();

        const cancelBtnVisibility = this.page.getByRole('button', { name: /cancel/i });
        await expect(cancelBtnVisibility).toBeVisible();

        const continueBtnVisibility = this.page.getByRole('button', { name: /continue/i });
        await expect(continueBtnVisibility).toBeVisible();
    }

    async fillDesiredInformation(firstname: string, lastname: string, zipcode: string) {
        await this.page.getByPlaceholder('First Name').fill(firstname);
        await this.page.getByPlaceholder('Last Name').fill(lastname);
        await this.page.getByPlaceholder('Zip/Postal Code').fill(zipcode);
    }

    async clickContinue(overviewTitle: string) {
        await this.page.getByRole('button', { name: 'continue' }).click();

        let title = await this.page.locator(this.checkoutOverview).textContent();
        expect(title).toBe(overviewTitle);
    }
}