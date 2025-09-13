import { test } from "@playwright/test";
import { loginPage } from "../pages/loginPage";
import { productPage } from "../pages/productPage";
import { cartPage } from "../pages/cartPage";
import { checkoutInfoPage } from "../pages/checkoutInfoPage";
import { checkoutOverviewPage } from "../pages/checkoutOverviewPage";
import { checkoutCompletePage } from "../pages/checkoutCompletePage";
import { homePage } from "../pages/homePage";

const testdata = JSON.parse(JSON.stringify(require('../testdata.json')));

test("User should successfully be able to verify success message and go back to home", { tag: ['@e2e', '@regression'] }, async ({ page, context }) => {
    const loginStep = new loginPage(page, context);
    const productStep = new productPage(page, context);
    const cartStep = new cartPage(page, context);
    const checkoutInfoStep = new checkoutInfoPage(page, context);
    const checkoutOverviewStep = new checkoutOverviewPage(page, context);
    const checkoutCompleteStep = new checkoutCompletePage(page, context);
    const homeStep = new homePage(page, context);

    await checkoutCompleteStep.clearCookies();
    await checkoutCompleteStep.navigateToUrl(testdata.baseUrl);
    await checkoutCompleteStep.waitForPageLoad();

    await loginStep.loginSauceDemo(testdata.username, testdata.password);

    await productStep.clickAddToCartBtn(testdata.productName);
    await productStep.clickCartIcon();

    await cartStep.verifyAndClickCheckout(testdata.checkoutInfoTitle);

    await checkoutInfoStep.fillDesiredInformation(testdata.firstname, testdata.lastname, testdata.zipcode);
    await checkoutInfoStep.clickContinue(testdata.checkoutOverviewTitle);

    await checkoutOverviewStep.clickFinishBtn();

    await checkoutCompleteStep.verifyCheckoutCompleteMsg(testdata.checkoutCompleteTitle);
    await checkoutCompleteStep.verifyMsg(testdata.thankYouMessage, testdata.orderMessage);
    await checkoutCompleteStep.verifyBackBtn();
    await checkoutCompleteStep.clickBackBtn(testdata.productTitle);

    await homeStep.verifyAndClickBurgerIcon();
    await homeStep.clickLogout();
});

test("User should successfully be able to verify success message and go back to home for Sauce Labs Fleece Jacket", { tag: ['@e2e', '@regression'] }, async ({ page, context }) => {
    const loginStep = new loginPage(page, context);
    const productStep = new productPage(page, context);
    const cartStep = new cartPage(page, context);
    const checkoutInfoStep = new checkoutInfoPage(page, context);
    const checkoutOverviewStep = new checkoutOverviewPage(page, context);
    const checkoutCompleteStep = new checkoutCompletePage(page, context);
    const homeStep = new homePage(page, context);

    await checkoutCompleteStep.clearCookies();
    await checkoutCompleteStep.navigateToUrl(testdata.baseUrl);
    await checkoutCompleteStep.waitForPageLoad();

    await loginStep.loginSauceDemo(testdata.username, testdata.password);

    await productStep.clickAddToCartBtn(testdata.productName1);
    await productStep.clickAddToCartBtn(testdata.productName2);
    await productStep.fetchPrices(testdata.productName2);
    await productStep.clickCartIcon();

    await cartStep.clickRemoveBtn(testdata.productName1);
    await cartStep.verifyAndClickCheckout(testdata.checkoutInfoTitle);

    await checkoutInfoStep.fillDesiredInformation(testdata.firstname, testdata.lastname, testdata.zipcode);
    await checkoutInfoStep.clickContinue(testdata.checkoutOverviewTitle);

    await checkoutOverviewStep.verifyItemName(testdata.productName2);
    await checkoutOverviewStep.fetchItemTotal();
    await checkoutOverviewStep.clickFinishBtn();

    await checkoutCompleteStep.verifyCheckoutCompleteMsg(testdata.checkoutCompleteTitle);
    await checkoutCompleteStep.verifyMsg(testdata.thankYouMessage, testdata.orderMessage);

    await homeStep.verifyAndClickBurgerIcon();
    await homeStep.clickLogout();
});
