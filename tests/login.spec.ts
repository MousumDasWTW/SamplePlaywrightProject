import { test } from "@playwright/test";
import { loginPage } from "../pages/loginPage";

const testdata = JSON.parse(JSON.stringify(require('../loginUserData.json')));

test.describe('Data Driven Login Test', function () {
    for (const data of testdata) {
        test.describe(`Login with users ${data.id}`, function () {

            test("User should be able to successfully login", {tag: ['@smoke', '@regression']}, async ({ page, context }) => {
                const loginStep = new loginPage(page, context);
                await loginStep.clearCookies();
                await loginStep.navigateToUrl(data.baseUrl);
                await loginStep.waitForPageLoad();
                await loginStep.loginSauceDemo(data.username, data.password);
                await loginStep.verifyTitle(data.title);
            });
        })
    }
})