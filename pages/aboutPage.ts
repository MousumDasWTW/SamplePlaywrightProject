import { expect, Page, Browser, BrowserContext } from "@playwright/test";
import { basePage } from "./basePage";
import { util } from "../Utils/util";

export class aboutPage extends basePage {
    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    private product = '//header//span[text()="Products"]';
    private solutions = '//span[text()="Solutions"]';
    private pricing = '//span[text()="Pricing"]'
    private developers = '//span[text()="Developers"]';
    private resources = '//header//span[text()="Resources"]';
    private devAndTesterResource = '//span[text()="Resources for devs & testers"]';
    private integration = '(//span[text()="Integrations"])[1]';
    private quickstartGuides = '//span[text()="Quickstart guides"]';
    private gettingStartedGuides = '//span[text()="Getting started guides"]';
    private setUpConfigure = '//span[text()="Set up & configure"]';
    private selenium = '//span[text()="Quickstart guides"]//parent::div//following-sibling::div//span[text()="Selenium"]';
    private appium = '//span[text()="Quickstart guides"]//parent::div//following-sibling::div//span[text()="Appium"]';
    private playwright = '//span[text()="Quickstart guides"]//parent::div//following-sibling::div//span[text()="Playwright"]';
    private cypress = '//span[text()="Quickstart guides"]//parent::div//following-sibling::div//span[text()="Cypress"]';
    private seleniumHeadless = '//span[text()="Selenium"]';
    private cypressHeadless = '//span[text()="Cypress"]';
    private appiumHeadless = '//span[text()="Appium"]';
    private playwrightHeadless = '//span[text()="Playwright"]'
    private prodList = '.title';


    async clickAboutLink() {
        let linkAbout = await this.page.locator("text=About")
        await linkAbout.click();

        await this.page.waitForLoadState('load');
    }

    async verifyAboutHeaders() {

        let hamburgerBtn = '//button[@aria-label="open drawer"]//div//img';
        const hamburgerIcon = this.page.locator(hamburgerBtn);
        console.log('hamburger icon present ? ' + await hamburgerIcon.isVisible());
        let hamburgerVisible = await hamburgerIcon.isVisible();
        if (await hamburgerIcon.isVisible()) {
            await hamburgerIcon.click();
        }

        await util.elementToBeVisible(this.page, this.product);

        await util.elementToBeVisible(this.page, this.solutions);

        await util.elementToBeVisible(this.page, this.pricing);

        await util.elementToBeVisible(this.page, this.developers);

        await util.elementToBeVisible(this.page, this.resources);

        util.setData('hamburgerVisibility', hamburgerVisible);
    }

    async performHover(headerName: string) {
        if (headerName === 'developers') {
            let hamburgerIconPresence = util.getData('hamburgerVisibility');
            if (hamburgerIconPresence === true) {
                await util.clickElement(this.page, this.developers);
            }
            else {
                await this.page.hover(this.developers);
            }

            await util.elementToBeVisible(this.page, this.devAndTesterResource);

            await util.elementToBeVisible(this.page, this.integration);

            await util.elementToBeVisible(this.page, this.quickstartGuides);

            await util.elementToBeVisible(this.page, this.gettingStartedGuides);

            await util.elementToBeVisible(this.page, this.setUpConfigure);
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
        let hamburgerIconPresence = util.getData('hamburgerVisibility');
        if (hamburgerIconPresence === true) {
            await util.elementToBeVisible(this.page, this.quickstartGuides);

            await util.clickElement(this.page, this.quickstartGuides);

            await util.elementToBeVisible(this.page, this.seleniumHeadless);

            await util.elementToBeVisible(this.page, this.appiumHeadless);

            await util.elementToBeVisible(this.page, this.playwrightHeadless);

            await util.elementToBeVisible(this.page, this.cypressHeadless);
        }
        else {
            await util.elementToBeVisible(this.page, this.quickstartGuides);

            await util.elementToBeVisible(this.page, this.selenium);

            await util.elementToBeVisible(this.page, this.appium);

            await util.elementToBeVisible(this.page, this.playwright);

            await util.elementToBeVisible(this.page, this.cypress);
        }
    }

    async clickSelenium(seleniumUrl: string) {
        let hamburgerIconPresence = util.getData('hamburgerVisibility');
        if (hamburgerIconPresence === true) {
            await util.clickElement(this.page, this.seleniumHeadless);

            const currentTabUrl = this.page.url();
            console.log('The selenium blog url is: ' + this.page.url());
            expect(currentTabUrl).toBe(seleniumUrl);

            expect(this.page.url()).toContain('selenium');
        }
        else {
            const newTab = await this.switchToNewTab(this.selenium);
            console.log(newTab.url());

            const newTabUrl = newTab.url();
            expect(newTabUrl).toBe(seleniumUrl);

            expect(newTab.url()).toContain('selenium');
        }
    }

    async switchToParentTab(parentUrl: string) {
        let hamburgerIconPresence = util.getData('hamburgerVisibility');
        if (hamburgerIconPresence === true) {
            console.log('There is no new tab opened in headless mode');
        }
        else {
            await this.switchBackToParent();
            console.log(this.page.url());

            const currentPageUrl = this.page.url();
            expect(currentPageUrl).toBe(parentUrl);
        }
    }

    async moveBackToProductList(titleName: string) {
        let hamburgerIconPresence = util.getData('hamburgerVisibility');
        if (hamburgerIconPresence === true) {
            console.log('There is no new tab opened in headless mode so, not navigated to parent page');
            await this.page.goBack();
            await this.page.waitForLoadState('load');
            await this.page.goBack();
        }
        else {
            await this.page.goBack();

            let title = await this.page.locator(this.prodList).textContent();
            expect(title).toBe(titleName);
        }
    }
}