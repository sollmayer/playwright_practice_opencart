import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";

test.describe("OpenCart Home Page", () => {
	let homePage: HomePage;

	test.beforeEach(async ({ page }) => {
		homePage = new HomePage(page);
		await homePage.goto();
	});

	test("should display the homepage title and logo", async () => {
		await expect(homePage.page).toHaveTitle("Your Store");
		await expect(homePage.header.logoImg).toBeVisible();
	});

	test("should change currency to US Dollars", async () => {
		await homePage.header.selectCurrency("USD");
		await expect(homePage.header.currencyDropdownToggle).toContainText("$");
	});

	test("header navigation should navigate to the Register page", async ({ page }) => {
		await homePage.header.navigateTo("Register");
		await expect(page).toHaveURL(/route=account\/register/);
		await expect(page.locator("#content h1")).toContainText("Register Account");
	});

	test("header navigation should navigate to the Login page", async ({ page }) => {
		await homePage.header.navigateTo("Login");
		await expect(page).toHaveURL(/route=account\/login/);
		// await expect(page.locator("#content h1")).toContainText("Register Account");
	});

	test("should search for a product", async ({ page }) => {
		await homePage.header.searchForProduct("MacBook");
		await expect(page).toHaveURL(/search=MacBook/);
		await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
		await expect(page.locator("#content h1")).toContainText("Search - MacBook");
	});

	// test("Featured products should be visible", async ({ page }) => {});
});
