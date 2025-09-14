import { expect, Page, Browser, BrowserContext } from "@playwright/test";
import { basePage } from "./basePage";
import { util } from "../Utils/util";

export class aboutPage extends basePage {
    constructor(page: Page, context: BrowserContext) {
        super(page,context);
    }

    private product = '//header//span[text()="Products"]';
    private solutions = '//span[text()="Solutions"]';
    private pricing = '//span[text()="Pricing"]'
    private developers = '//span[text()="Developers"]';
    private resources = '//header//span[text()="Resources"]';
    private devAndTesterResource = '//span[text()="Resources for devs & testers"]';
    private integration = '(//span[text()="Integrations"])[1]';
    private quickstartGuides = '//span[text()="Quickstart guides"]';
    private selenium = '//span[text()="Quickstart guides"]//parent::div//following-sibling::div//span[text()="Selenium"]';
    private appium = '//span[text()="Quickstart guides"]//parent::div//following-sibling::div//span[text()="Appium"]';
    private playwright = '//span[text()="Quickstart guides"]//parent::div//following-sibling::div//span[text()="Playwright"]';
    private cypress = '//span[text()="Quickstart guides"]//parent::div//following-sibling::div//span[text()="Cypress"]';
    private prodList = '.title';


    async clickAboutLink() {
        let linkAbout = await this.page.locator("text=About")
        await linkAbout.click();

        await this.page.waitForLoadState('load');
    }

    async verifyAboutHeaders() {
        await util.elementToBeVisible(this.page, this.product);

        await util.elementToBeVisible(this.page, this.solutions);

        await util.elementToBeVisible(this.page, this.pricing);

        await util.elementToBeVisible(this.page, this.developers);

        await util.elementToBeVisible(this.page, this.resources);
    }

    async performHover(headerName: string) {
        if (headerName === 'developers') {
            await this.page.hover(this.developers);

            await util.elementToBeVisible(this.page, this.devAndTesterResource);

            await util.elementToBeVisible(this.page, this.integration);
        }
        else if (headerName === 'product') {
            await this.page.hover(this.product);
        }
        else if (headerName === 'solutions') {
            await this.page.hover(this.solutions);
        }
        else if (headerName === 'pricing') {
            await this.page.hover(this.pricing);
        }
    }

    async verifyQuickstartGuides() {
        await util.elementToBeVisible(this.page, this.quickstartGuides);

        await util.elementToBeVisible(this.page, this.selenium);

        await util.elementToBeVisible(this.page, this.appium);

        await util.elementToBeVisible(this.page, this.playwright);

        await util.elementToBeVisible(this.page, this.cypress);
    }

    async clickSelenium(seleniumUrl: string) {
        const newTab = await this.switchToNewTab(this.selenium);
        console.log(newTab.url());

        const newTabUrl = newTab.url();
        expect(newTabUrl).toBe(seleniumUrl);
        
        expect(newTab.url()).toContain('selenium');
    }

    async switchToParentTab(parentUrl: string)
    {
        await this.switchBackToParent();
        console.log(this.page.url());

        const currentPageUrl = this.page.url();
        expect(currentPageUrl).toBe(parentUrl);
    }

    async moveBackToProductList(titleName: string)
    {
        await this.page.goBack();
        
        let title = await this.page.locator(this.prodList).textContent();
        expect(title).toBe(titleName);
    }
}