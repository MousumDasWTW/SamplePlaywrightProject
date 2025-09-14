import { Page, BrowserContext } from "@playwright/test";

export class basePage {
    protected page: Page;
    protected context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    async navigateToUrl(url: string) {
        await this.page.goto(url);
    }

    async waitForPageLoad() {
        await this.page.waitForLoadState('load');
    }

    async switchToNewTab(locator: string): Promise<Page> {
        const [newPage] = await Promise.all([
            this.context.waitForEvent('page'), // Wait for a new tab to open
            this.page.click(locator) // Trigger the new tab
        ]);
        await newPage.waitForLoadState(); // Ensure the new tab is fully loaded
        return newPage;
    }

    async switchBackToParent(): Promise<void> {
        const allPages = this.context.pages(); // Get all open pages
        const parentPage = allPages[0]; // Assuming the first page is the parent
        await parentPage.bringToFront(); // Bring the parent page to the foreground
    }

    async clearCookies() {
        await this.context.clearCookies();
        await this.context.clearPermissions();
    }
}