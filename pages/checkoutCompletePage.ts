import { expect, Page, BrowserContext } from "@playwright/test";
import { basePage } from "../pages/basePage";

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
        const completeTitleVisibility = this.page.locator(this.checkoutComplete);
        await expect(completeTitleVisibility).toBeVisible();

        let title = await this.page.locator(this.checkoutComplete).textContent();
        expect(title).toBe(completeMsg);
    }

    async verifyMsg(thanksMsg: string, orderMsg: string) {
        const successMsgVisibility = this.page.locator(this.successMsg);
        await expect(successMsgVisibility).toBeVisible();

        const thankYouMsgVisibility = this.page.locator(this.thankYouMsg);
        await expect(thankYouMsgVisibility).toBeVisible();

        let thankYouMsg = await this.page.locator(this.thankYouMsg).textContent();
        expect(thankYouMsg?.includes(thanksMsg));

        let orderMessage = await this.page.locator(this.successMsg).textContent();
        expect(orderMessage?.includes(orderMsg));
    }

    async verifyBackBtn() {
        const backToHomeVisibility = this.page.locator(this.backToHome);
        await expect(backToHomeVisibility).toBeVisible();
    }

    async clickBackBtn(prodTitle: string) {
        await this.page.locator(this.backToHome).click();

        let title = await this.page.locator(this.prodTitle).textContent();
        expect(title).toBe(prodTitle);
    }
}