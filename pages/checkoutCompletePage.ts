import { expect, Page, BrowserContext } from "@playwright/test";
import { basePage } from "../pages/basePage";
import { util } from "../Utils/util";

export class checkoutCompletePage extends basePage {
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    private thankYouMsg = 'h2.complete-header';
    private checkoutComplete = 'span.title';
    private successMsg = 'div.complete-text';
    private backToHome = '#back-to-products';
    private prodTitle = 'span.title'

    async verifyCheckoutCompleteMsg(completeMsg: string) {
        await util.elementToBeVisible(this.page, this.checkoutComplete);

        let title = await this.page.locator(this.checkoutComplete).textContent();
        expect(title).toBe(completeMsg);
    }

    async verifyMsg(thanksMsg: string, orderMsg: string) {
        await util.elementToBeVisible(this.page, this.successMsg);

        await util.elementToBeVisible(this.page, this.thankYouMsg);

        let thankYouMsg = await this.page.locator(this.thankYouMsg).textContent();
        expect(thankYouMsg?.includes(thanksMsg));

        let orderMessage = await this.page.locator(this.successMsg).textContent();
        expect(orderMessage?.includes(orderMsg));
    }

    async verifyBackBtn() {
        await util.elementToBeVisible(this.page, this.backToHome);
    }

    async clickBackBtn(prodTitle: string) {
        await util.clickElement(this.page, this.backToHome);

        let title = await this.page.locator(this.prodTitle).textContent();
        expect(title).toBe(prodTitle);
    }
}