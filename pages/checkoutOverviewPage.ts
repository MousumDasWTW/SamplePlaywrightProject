import { expect, Page, BrowserContext } from "@playwright/test";
import { basePage } from "../pages/basePage";

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
        const paymentInfoLabelVisibility = this.page.locator(this.paymentInfoLabel);
        await expect(paymentInfoLabelVisibility).toBeVisible();

        const paymentInfoValueVisibility = this.page.locator(this.paymentInfoValue);
        await expect(paymentInfoValueVisibility).toBeVisible();

        const shippingInfoLabelVisibility = this.page.locator(this.shippingInfoLabel);
        await expect(shippingInfoLabelVisibility).toBeVisible();

        const shippingInfoValueVisibility = this.page.locator(this.shippingInfoValue);
        await expect(shippingInfoValueVisibility).toBeVisible();

        const totalInfoLabelVisibility = this.page.locator(this.totalInfoLabel);
        await expect(totalInfoLabelVisibility).toBeVisible();

        const itemTotalInfoValueVisibility = this.page.locator(this.itemTotalInfoValue);
        await expect(itemTotalInfoValueVisibility).toBeVisible();

        const taxLabelVisibility = this.page.locator(this.taxLabel);
        await expect(taxLabelVisibility).toBeVisible();

        const totalLabelVisibility = this.page.locator(this.totalLabel);
        await expect(totalLabelVisibility).toBeVisible();

        const finishBtnVisibility = this.page.getByRole('button', { name: /Finish/i });
        await expect(finishBtnVisibility).toBeVisible();

        const cancelBtnVisibility = this.page.locator(this.cancelBtn);
        await expect(cancelBtnVisibility).toBeVisible();
    }

    async fetchItemTotal(): Promise<void> {
        let totalAmount = await this.page.locator(this.itemTotalInfoValue).textContent();
        console.log(totalAmount);
        let amount = totalAmount?.split(':')[1].split('$')[1];
        console.log('The amount is :' + amount);

        const amountProductPage = await this.getSharedData('itemPriceProduct');
        console.log('Thhe get method amt is :' + amountProductPage);
    }

    async clickFinishBtn() {
        await this.page.getByRole('button', { name: /Finish/i }).click();
    }
}