import { test } from "@playwright/test";
import { loginPage } from "../pages/loginPage";
import { productPage } from "../pages/productPage";
import { cartPage } from "../pages/cartPage";
import { homePage } from "../pages/homePage";

const testdata = JSON.parse(JSON.stringify(require('../testdata.json')));

test("User should successfully be able to perform checkout", {tag: ['@smoke', '@regression']}, async ({ page, context }) => {
    const loginStep = new loginPage(page, context);
    const productStep = new productPage(page, context);
    const cartStep = new cartPage(page, context);
    const homeStep = new homePage(page, context);
    
    await cartStep.clearCookies();
    await cartStep.navigateToUrl(testdata.baseUrl);
    await cartStep.waitForPageLoad();
    
    await loginStep.loginSauceDemo(testdata.username, testdata.password);

    await productStep.clickAddToCartBtn(testdata.productName);
    await productStep.clickCartIcon();

    await cartStep.verifyProductDesc(testdata.productName);
    await cartStep.verifyAndClickCheckout(testdata.checkoutInfoTitle);

    await homeStep.verifyAndClickBurgerIcon();
    await homeStep.clickLogout();
});

test("User should successfully be able to fetch price", {tag: ['@e2e', '@regression']}, async ({ page, context }) => {
    const loginStep = new loginPage(page, context);
    const productStep = new productPage(page, context);
    const cartStep = new cartPage(page, context);
    const homeStep = new homePage(page, context);
    
    await cartStep.clearCookies();
    await cartStep.navigateToUrl(testdata.baseUrl);
    await cartStep.waitForPageLoad();
    
    await loginStep.loginSauceDemo(testdata.username, testdata.password);

    await productStep.fetchPrices(testdata.productName1);
    await productStep.clickAddToCartBtn(testdata.productName1);
    await productStep.clickCartIcon();
    await cartStep.verifyFetchPrices(testdata.productName1);

    await cartStep.navigateBack();
    
    await productStep.fetchPrices(testdata.productName2);
    await productStep.clickAddToCartBtn(testdata.productName2);
    await productStep.verifyCartIcon();
    await productStep.clickCartIcon();
    await cartStep.verifyFetchPrices(testdata.productName2);
    
    await cartStep.clickRemoveBtn(testdata.productName1);

    await homeStep.verifyAndClickBurgerIcon();
    await homeStep.clickLogout();
});

test("User should successfully be able to verify quantity and cart item count and checkout", {tag: ['@e2e', '@regression']}, async ({ page, context }) => {
    const loginStep = new loginPage(page, context);
    const productStep = new productPage(page, context);
    const cartStep = new cartPage(page, context);
    const homeStep = new homePage(page, context);
    
    await cartStep.clearCookies();
    await cartStep.navigateToUrl(testdata.baseUrl);
    await cartStep.waitForPageLoad();
    
    await loginStep.loginSauceDemo(testdata.username, testdata.password);

    await productStep.clickAddToCartBtn(testdata.productName1);
    await productStep.clickAddToCartBtn(testdata.productName2);
    await productStep.clickCartIcon();

    await cartStep.clickRemoveBtn(testdata.productName1);
    await cartStep.verifyProductCount();
    await cartStep.verifyAndClickCheckout(testdata.checkoutInfoTitle);

    await homeStep.verifyAndClickBurgerIcon();
    await homeStep.clickLogout();
});