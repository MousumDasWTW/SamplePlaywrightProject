import { expect, Page, Browser, BrowserContext } from "@playwright/test";
import { basePage } from "./basePage";

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
        const productVisibility = this.page.locator(this.product);
        await expect(productVisibility).toBeVisible();

        const solutionsVisibility = this.page.locator(this.solutions);
        await expect(solutionsVisibility).toBeVisible();

        const pricingVisibility = this.page.locator(this.pricing);
        await expect(pricingVisibility).toBeVisible();

        const developersVisibility = this.page.locator(this.developers);
        await expect(developersVisibility).toBeVisible();

        const resourcesVisibility = this.page.locator(this.resources);
        await expect(resourcesVisibility).toBeVisible();
    }

    async performHover(headerName: string) {
        if (headerName === 'developers') {
            await this.page.hover(this.developers);

            const devAndTestResource = this.page.locator(this.devAndTesterResource);
            await expect(devAndTestResource).toBeVisible();

            const integration = this.page.locator(this.integration);
            await expect(integration).toBeVisible();
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
        const quickGuides = this.page.locator(this.quickstartGuides);
        expect(quickGuides).toBeVisible();

        const seleniumGuide = this.page.locator(this.selenium);
        expect(seleniumGuide).toBeVisible();

        const appiumGuide = this.page.locator(this.appium);
        expect(appiumGuide).toBeVisible();

        const playwrightGuide = this.page.locator(this.playwright);
        expect(playwrightGuide).toBeVisible();

        const cypressGuide = this.page.locator(this.cypress);
        expect(cypressGuide).toBeVisible();
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