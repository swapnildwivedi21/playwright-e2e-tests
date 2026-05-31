import {test, expect} from "@playwright/test";
import HomePage from "../page-objects/nopcommerce-home-page-objects.js";
test("Login to nopcommerce web", async ({ page }) => {

    const homePage = new HomePage(page);
    await homePage.loginTonopCommerceWeb(
        "https://admin-demo.nopcommerce.com/login?ReturnUrl=%2Fadmin%2F",
        "admin@yourstore.com",
        "admin"
    );