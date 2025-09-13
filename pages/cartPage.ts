import { expect, Page, BrowserContext } from "@playwright/test";
import { basePage } from "../pages/basePage";
import { util } from "../Utils/util";

export class cartPage extends basePage {
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    private checkoutBtn = 'button#checkout';
    private checkoutInfo = 'span.title';
    private productList = '.inventory_item_name';
    private qty = '.cart_quantity';
    private cartItem = '.shopping_cart_badge';

    async verifyProductDesc(prodName: string) {
        let productName = await this.page.locator(this.productList).textContent();
        expect(productName).toBe(prodName);
    }

    async verifyAndClickCheckout(checkoutTitle: string) {
        const checkoutBtnVisibility = this.page.locator(this.checkoutBtn);
        await expect(checkoutBtnVisibility).toBeVisible();

        await this.page.locator(this.checkoutBtn).click();

        let title = await this.page.locator(this.checkoutInfo).textContent();
        expect(title).toBe(checkoutTitle);
    }

    async fetchPrices(prodName: string): Promise<void> {
        let price = '//div[text()="' + prodName + '"]//parent::a//following-sibling::div//div';

        let itemPriceCart = await this.page.locator(price).textContent();
        console.log('The price for item ' + prodName + ' in cart page is : ' + itemPriceCart);

        const fetchPricesProduct = await this.getSharedData('itemPriceProduct');
        console.log(`Logged in as: ${fetchPricesProduct}`);
        console.log('The fetched price for product ' + prodName + ' from product page is :' + fetchPricesProduct);
    }

    async clickRemoveBtn(prodName: string) {
        let removeBtn = '//div[text()="' + prodName + '"]//parent::a//following-sibling::div//button';

        let count = await this.page.locator(this.productList).count();
        for (let i = 0; i < count; i++) {
            let prodText = await this.page.locator(this.productList).nth(i).textContent();
            if (prodText === prodName) {
                await this.page.locator(removeBtn).click();
                break;
            }
        }

        let newCount = await this.page.locator(this.productList).count();
        for (let i = 0; i < newCount; i++) {
            let prodText = await this.page.locator(this.productList).nth(i).textContent();
            expect(prodText).not.toBe(prodName);
        }
    }

    async verifyProductCount() {
        let qtyField = await this.page.locator(this.qty).count();
        let sum = 0;
        for (let i = 0; i < qtyField; i++) {
            let qtyText = await this.page.locator(this.qty).nth(i).textContent();
            const num: number = Number(qtyText);
            sum = sum + num;
        }
        console.log('Total number of quantity field is :' + sum);

        let cartItemCount = await this.page.locator(this.cartItem).textContent();
        console.log('The total item in cart is :' + cartItemCount);

        expect(sum.toLocaleString()).toBe(cartItemCount);
        const getData = util.getData();
        console.log('This is the get data :' + getData);
    }
}