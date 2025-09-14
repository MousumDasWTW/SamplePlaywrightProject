import { expect, Page, BrowserContext } from "@playwright/test";
import { basePage } from "../pages/basePage";
import { util } from "../Utils/util";

export class checkoutOverviewPage extends basePage {
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    private itemName = '.inventory_item_name';
    private paymentInfoLabel = '//div[@data-test="payment-info-label"]';
    private paymentInfoValue = '//div[@data-test="payment-info-value"]';
    private shippingInfoLabel = '//div[@data-test="shipping-info-label"]';
    private shippingInfoValue = '//div[@data-test="shipping-info-value"]';
    private totalInfoLabel = '//div[@data-test="total-info-label"]';
    private itemTotalInfoValue = '//div[@data-test="subtotal-label"]';
    private taxLabel = '//div[@data-test="tax-label"]';
    private totalLabel = '//div[@data-test="total-label"]';
    private cancelBtn = '#cancel';

    async verifyItemName(itemName: string) {
        let itemname = await this.page.locator(this.itemName).textContent();
        expect(itemname).toBe(itemName);
    }

    async verifyProductInfo() {
        await util.elementToBeVisible(this.page, this.paymentInfoLabel);

        await util.elementToBeVisible(this.page, this.paymentInfoValue);

        await util.elementToBeVisible(this.page, this.shippingInfoLabel);

        await util.elementToBeVisible(this.page, this.shippingInfoValue);

        await util.elementToBeVisible(this.page, this.totalInfoLabel);

        await util.elementToBeVisible(this.page, this.itemTotalInfoValue);

        await util.elementToBeVisible(this.page, this.taxLabel);

        await util.elementToBeVisible(this.page, this.totalLabel);

        const finishBtnVisibility = this.page.getByRole('button', { name: /Finish/i });
        await expect(finishBtnVisibility).toBeVisible();

        await util.elementToBeVisible(this.page, this.cancelBtn);
    }

    async fetchItemTotal(): Promise<void> {
        let totalAmount = await this.page.locator(this.itemTotalInfoValue).textContent();
        console.log(totalAmount);
        let amount = totalAmount?.split(':')[1].split('$')[1];
        console.log('The amount is :' + amount);

        const amountProductPage = util.getData();
        console.log('The get method amt is : ' + amountProductPage);

        expect('$'+amount).toBe(amountProductPage);
    }

    async clickFinishBtn() {
        await this.page.getByRole('button', { name: /Finish/i }).click();
    }
}