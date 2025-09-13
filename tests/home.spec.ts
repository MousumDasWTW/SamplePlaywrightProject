import { test } from "@playwright/test";
import { loginPage } from "../pages/loginPage";
import { homePage } from "../pages/homePage";

const testdata = JSON.parse(JSON.stringify(require('../testdata.json')));

test("User should be able to successfully logout", {tag: ['@regression']}, async ({ page, context }) => {
    const loginStep = new loginPage(page, context);
    const homeStep = new homePage(page, context);

    await homeStep.clearCookies();
    await homeStep.navigateToUrl(testdata.baseUrl);
    await homeStep.waitForPageLoad();
    
    await loginStep.loginSauceDemo(testdata.username, testdata.password);

    await homeStep.verifyAndClickBurgerIcon();
    await homeStep.verifyLinks();
    await homeStep.clickLogout();
    await homeStep.verifyLoginPageUrl(testdata.baseUrl);
});