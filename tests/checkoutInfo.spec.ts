import { test } from "@playwright/test";
import { loginPage } from "../pages/loginPage";
import { productPage } from "../pages/productPage";
import { cartPage } from "../pages/cartPage";
import { checkoutInfoPage } from "../pages/checkoutInfoPage";
import { homePage } from "../pages/homePage";

const testdata = JSON.parse(JSON.stringify(require('../testdata.json')));

test("User should successfully be able to provide desired checkout information", { tag: ['@e2e', '@regression'] }, async ({ page, context }) => {
    const loginStep = new loginPage(page, context);
    const productStep = new productPage(page, context);
    const cartStep = new cartPage(page, context);
    const checkoutInfoStep = new checkoutInfoPage(page, context);
    const homeStep = new homePage(page, context);

    await checkoutInfoStep.clearCookies();
    await checkoutInfoStep.navigateToUrl(testdata.baseUrl);
    await checkoutInfoStep.waitForPageLoad();

    await loginStep.loginSauceDemo(testdata.username, testdata.password);

    await productStep.clickAddToCartBtn(testdata.productName);
    await productStep.clickCartIcon();

    await cartStep.verifyAndClickCheckout(testdata.checkoutInfoTitle);

    await checkoutInfoStep.verifyCheckoutInfomation();
    await checkoutInfoStep.fillDesiredInformation(testdata.firstname, testdata.lastname, testdata.zipcode);
    await checkoutInfoStep.clickContinue(testdata.checkoutOverviewTitle);

    await homeStep.verifyAndClickBurgerIcon();
    await homeStep.clickLogout();
});

test("User should successfully be able to provide desired checkout information for Sauce Labs Fleece Jacket", { tag: ['@e2e', '@regression'] }, async ({ page, context }) => {
    const loginStep = new loginPage(page, context);
    const productStep = new productPage(page, context);
    const cartStep = new cartPage(page, context);
    const checkoutInfoStep = new checkoutInfoPage(page, context);
    const homeStep = new homePage(page, context);

    await checkoutInfoStep.clearCookies();
    await checkoutInfoStep.navigateToUrl(testdata.baseUrl);
    await checkoutInfoStep.waitForPageLoad();

    await loginStep.loginSauceDemo(testdata.username, testdata.password);

    await productStep.clickAddToCartBtn(testdata.productName1);
    await productStep.clickAddToCartBtn(testdata.productName2);
    await productStep.clickCartIcon();

    await cartStep.clickRemoveBtn(testdata.productName1);
    await cartStep.verifyAndClickCheckout(testdata.checkoutInfoTitle);

    await checkoutInfoStep.verifyCheckoutInfomation();
    await checkoutInfoStep.fillDesiredInformation(testdata.firstname, testdata.lastname, testdata.zipcode);
    await checkoutInfoStep.clickContinue(testdata.checkoutOverviewTitle);

    await homeStep.verifyAndClickBurgerIcon();
    await homeStep.clickLogout();
});