import { test } from "@playwright/test";
import { loginPage } from "../pages/loginPage";
import { productPage } from "../pages/productPage";
import { homePage } from "../pages/homePage";

const testdata = JSON.parse(JSON.stringify(require('../testdata.json')));

test("User should successfully be able to click add to cart", {tag: ['@regression']}, async ({ page, context }) => {
    const loginStep = new loginPage(page, context);
    const productStep = new productPage(page, context);
    const homeStep = new homePage(page, context);

    await productStep.clearCookies();
    await productStep.navigateToUrl(testdata.baseUrl);
    await productStep.waitForPageLoad();
    await loginStep.loginSauceDemo(testdata.username, testdata.password);

    await productStep.clickAddToCartBtn(testdata.productName);
    await productStep.verifyCartIcon();
    await productStep.verifyProductCountInCartLogo();

    await homeStep.verifyAndClickBurgerIcon();
    await homeStep.clickLogout();
});

test("User should successfully be able to click cart, add item and chekout", {tag: ['@regression']}, async ({ page, context }) => {
    const loginStep = new loginPage(page, context);
    const productStep = new productPage(page, context);
    const homeStep = new homePage(page, context);

    await productStep.clearCookies();
    await productStep.navigateToUrl(testdata.baseUrl);
    await productStep.waitForPageLoad();
    await loginStep.loginSauceDemo(testdata.username, testdata.password);

    await productStep.clickAddToCartBtn(testdata.productName);
    
    await homeStep.verifyAndClickBurgerIcon();
    await homeStep.clickLogout();
});

test("User should successfully be able to sort the prices from low to high", {tag: ['@regression']}, async ({ page, context }) => {
    const loginStep = new loginPage(page, context);
    const productStep = new productPage(page, context);
    const homeStep = new homePage(page, context);

    await productStep.clearCookies();
    await productStep.navigateToUrl(testdata.baseUrl);
    await productStep.waitForPageLoad();

    await loginStep.loginSauceDemo(testdata.username, testdata.password);

    await productStep.clickAddToCartBtn(testdata.productName);
    await productStep.selectPricesLowToHigh(testdata.defaultSorting);
    await productStep.verifySortedPriceAscResult();
    await productStep.clickAddToCartBtn(testdata.productName1);
    await productStep.clickAddToCartBtn(testdata.productName2);
    
    await homeStep.verifyAndClickBurgerIcon();
    await homeStep.clickLogout();
});

test("User should successfully be able to check remove items enabled or not", {tag: ['@regression']}, async ({ page, context }) => {
    const loginStep = new loginPage(page, context);
    const productStep = new productPage(page, context);
    const homeStep = new homePage(page, context);

    await productStep.clearCookies();
    await productStep.navigateToUrl(testdata.baseUrl);
    await productStep.waitForPageLoad();
    
    await loginStep.loginSauceDemo(testdata.username, testdata.password);

    await productStep.selectPricesLowToHigh(testdata.defaultSorting);
    await productStep.verifySortedPriceAscResult();
    await productStep.clickAddToCartBtn(testdata.productName1);
    await productStep.clickAddToCartBtn(testdata.productName2);
    await productStep.verifyCartCount();
    await productStep.fetchPrices(testdata.productName1);
    await productStep.fetchPrices(testdata.productName2);
    await productStep.removeItemEnabled(testdata.productName1);
    await productStep.removeItemEnabled(testdata.productName2);
    
    await homeStep.verifyAndClickBurgerIcon();
    await homeStep.clickLogout();
});