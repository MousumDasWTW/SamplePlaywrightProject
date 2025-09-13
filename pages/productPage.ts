import { expect, Page, BrowserContext } from "@playwright/test";
import { basePage } from "./basePage";
import { util } from "../Utils/util";

let countForAddedProd = 0;
let pricesListString: string[] = [];

export class productPage extends basePage {
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    private cartIcon = '#shopping_cart_container';
    private addedProduct = '.shopping_cart_badge';
    private cartTitle = '//span[@data-test="title"]';
    private sortingFilter = '.product_sort_container';
    private defaultSorted = '//span[@data-test="active-option"]';
    private priceList = '.inventory_item_price';
    private addedProdContainer = '//a[@class="shopping_cart_link"]//span';
    private productList = '.inventory_item_name';

    async clickAddToCartBtn(prodName: string) {
        let addToCartBtn = '//div[text()="' + prodName + '"]//ancestor::div[@class="inventory_item_label"]//following-sibling::div//button[contains(text(),"Add")]';
        await this.page.locator(addToCartBtn).click();
        countForAddedProd++;
        console.log('The count is :' + countForAddedProd);
    }

    async verifyCartIcon() {
        const cartIconVisibility = this.page.locator(this.cartIcon);
        await expect(cartIconVisibility).toBeVisible();
    }

    async verifyProductCountInCartLogo() {
        let selectedProduct = await this.page.locator(this.addedProduct).textContent();
        console.log(selectedProduct);
        expect(selectedProduct).toBe(countForAddedProd.toString());
    }

    async clickCartIcon() {
        await this.page.locator(this.cartIcon).click();
        await this.page.waitForSelector(this.cartTitle, { state: 'visible', timeout: 5000 });
    }

    async selectPricesLowToHigh(defaultSorting: string) {
        let sorting = await this.page.locator(this.defaultSorted).textContent();
        if (sorting === defaultSorting) {
            console.log('The prices are already filtered for Prices low-to-high');
        }
        else {
            await this.page.selectOption(this.sortingFilter, { label: 'Price (low to high)' });
        }
    }

    async verifySortedPriceAscResult() {
        const elements = this.page.locator(this.priceList);
        const allTexts = await elements.allTextContents();
        console.log(allTexts);

        for (let i = 0; i < allTexts.length; i++) {
            console.log(allTexts[i].split('$')[1]);
            pricesListString.push(allTexts[i].split('$')[1]);
        }

        console.log(pricesListString);

        expect(pricesListString.map(Number)).toEqual(pricesListString.map(Number).sort((a, b) => a - b));
    }

    async verifyCartCount() {
        let cartAddedItemOrg = await this.page.locator(this.addedProdContainer).textContent();
        console.log('The total item in cart originally is :' + cartAddedItemOrg);

        expect(Number(cartAddedItemOrg)).toEqual(2);
    }

    async removeItemEnabled(prodName: string) {
        let count = await this.page.locator(this.productList).count();
        for (let i = 0; i < count; i++) {
            let prodText = await this.page.locator(this.productList).nth(i).textContent();
            if (prodText === prodName) {
                let removeBtn = '//div[text()="' + prodName + '"]//ancestor::div[@class="inventory_item_label"]//following-sibling::div//button[contains(text(),"Remove")]';
                const isEnabled = await this.page.locator(removeBtn).isEnabled();
                expect(isEnabled).toBeTruthy();
            }
        }
    }

    async fetchPrices(prodName: string): Promise<void> {
        let price = '//div[text()="' + prodName + '"]//ancestor::div[@class="inventory_item_label"]//following-sibling::div//div';

        let itemPriceProduct = await this.page.locator(price).textContent();
        console.log('The price for item ' + prodName + ' is : ' + itemPriceProduct);

        //this.setSharedData('itemPriceProduct', itemPriceProduct);
        util.setData('itemPriceProduct');
    }
}