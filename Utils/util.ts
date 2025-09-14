import { Page, expect } from "@playwright/test";

export class util {
  private static data: string = '';

  static setData(value: any): void {
    this.data = value;
    console.log('Data set to :' + this.data);
  }

  static getData(): string {
    console.log('Data retrieved :' + this.data);
    return this.data;
  }

  static async clickElement(page: Page, selector: string): Promise<void> {
    try {
      await page.waitForSelector(selector); // Wait for the element to appear
      await page.click(selector); // Perform the click action
      console.log(`Clicked on element: ${selector}`);
    } catch (error) {
      console.error(`Failed to click on element: ${selector}`, error);
    }
  }

  static async elementToBeVisible(page: Page, selector: string): Promise<void> {
    try {
      await page.waitForSelector(selector); // Wait for the element to appear
      const selectorVisibility = page.locator(selector);
      await expect(selectorVisibility).toBeVisible(); // Perform element visibility action
      console.log(`Visibility of element: ${selector}`);
    } catch (error) {
      console.error(`Failed to check visibility of element: ${selector}`, error);
    }
  }

  static async elementToBeVisiblePlaceholder(page: Page, text: string): Promise<void> {
    try {
      const selectorVisibility = page.getByPlaceholder(text);
      await expect(selectorVisibility).toBeVisible(); // Perform element visibility action
      console.log(`Visibility of element: ${text}`);
    } catch (error) {
      console.error(`Failed to check visibility of element: ${text}`, error);
    }
  }

  static async navigateBackToPreviousPage(page: Page)
  {
    const currentUrl = page.url();
    console.log('The current url is : '+currentUrl);
    await page.goBack();

    const previousUrl = page.url();
    console.log('The previous url is : '+previousUrl);

    expect(currentUrl).not.toBe(previousUrl);
  }
}