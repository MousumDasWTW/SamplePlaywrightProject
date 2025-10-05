import { expect, Page, BrowserContext } from "@playwright/test";
import { basePage } from "./basePage";
import { util } from "../Utils/util";

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
        await util.clickElement(this.page, addToCartBtn);

        let removeBtn = await this.page.getByRole('button', { name: 'Remove' }).count();
        console.log('The count of remove button is : ' + removeBtn);

        util.setData('removeBtn', removeBtn);
    }

    async verifyCartIcon() {
        await util.elementToBeVisible(this.page, this.cartIcon);
    }

    async verifyProductCountInCartLogo() {
        let selectedProduct = await this.page.locator(this.addedProduct).textContent();
        console.log(selectedProduct);
        let removeBtnCount = util.getData('removeBtn');
        console.log('The remove button are : ' + removeBtnCount)
        expect(selectedProduct).toBe(removeBtnCount.toString());
    }

    async clickCartIcon() {
        await this.page.locator(this.cartIcon).click();
        await this.page.waitForSelector(this.cartTitle, { state: 'visible', timeout: util.timeout });
        let cartTitle = await this.page.locator(this.cartTitle).textContent();
        expect(cartTitle).toBe('Your Cart');
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

        util.setData('itemPriceProduct', itemPriceProduct);
    }
}