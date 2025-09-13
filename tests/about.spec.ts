import { test } from "@playwright/test";
import { loginPage } from "../pages/loginPage";
import { homePage } from "../pages/homePage";
import { aboutPage } from "../pages/aboutPage";

const testdata = JSON.parse(JSON.stringify(require('../testdata.json')));

test("User should be able to successfully click all items", {tag: ['@regression']}, async ({ page, context }) => {
    const loginStep = new loginPage(page, context);
    const homeStep = new homePage(page, context);
    const aboutStep = new aboutPage(page, context);
    test.setTimeout(50000);

    await homeStep.clearCookies();
    await homeStep.navigateToUrl(testdata.baseUrl);
    await homeStep.waitForPageLoad();
    
    await loginStep.loginSauceDemo(testdata.username, testdata.password);

    await homeStep.verifyAndClickBurgerIcon();
    await homeStep.verifyLinks();

    await aboutStep.clickAboutLink();
    await aboutStep.verifyAboutHeaders();
    await aboutStep.performHover(testdata.hoverOnDeveloper);
    await aboutStep.verifyQuickstartGuides();
    await aboutStep.clickSelenium(testdata.seleniumUrl);
    await aboutStep.switchToParentTab(testdata.parentUrl);
    await aboutStep.moveBackToProductList(testdata.productTitle);

    await homeStep.verifyAndClickBurgerIcon();
    await homeStep.clickLogout();
});