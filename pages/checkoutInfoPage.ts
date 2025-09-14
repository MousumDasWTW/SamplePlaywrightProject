import { expect, Page, BrowserContext } from "@playwright/test";
import { basePage } from "../pages/basePage";
import { util } from "../Utils/util";

export class checkoutInfoPage extends basePage {
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    private checkoutOverview = 'span.title';

    async verifyCheckoutInfomation() {
        await util.elementToBeVisiblePlaceholder(this.page, 'First Name');

        await util.elementToBeVisiblePlaceholder(this.page, 'Last Name');

        await util.elementToBeVisiblePlaceholder(this.page, 'Zip/Postal Code');

        const cancelBtn = this.page.getByRole('button', { name: 'Cancel' });
        await expect(cancelBtn).toBeVisible();

        const continueBtn = this.page.getByRole('button', { name: 'Continue' });
        await expect(continueBtn).toBeVisible();
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