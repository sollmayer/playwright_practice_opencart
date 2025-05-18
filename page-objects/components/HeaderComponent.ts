import { expect, Locator, Page } from "@playwright/test";

export class HeaderComponent {
	readonly myAccountDropdownToggle: Locator;
	readonly currencyDropdownToggle: Locator;
	readonly logoImg: Locator;

	constructor(readonly page: Page) {
		this.page = page;
		this.myAccountDropdownToggle = this.page.locator("#top").getByRole("link", { name: "My Account" });
		this.currencyDropdownToggle = this.page.getByRole("link", { name: /Currency/ });
		this.logoImg = this.page.locator("#logo img");
	}

	async selectCurrency(currency: "EUR" | "GBP" | "USD") {
		await this.currencyDropdownToggle.click();
		await this.page.locator(`a[href="${currency}"]`).click();
	}

	async navigateTo(link: "Register" | "Login" | "Wish List" | "Shopping Cart" | "Checkout") {
		if (link === "Register" || link === "Login") {
			await this.myAccountDropdownToggle.click();
		}
		await this.page.locator("#top").getByRole("link", { name: link }).click();
	}

	async searchForProduct(productName: string) {
		await this.page.getByRole("textbox", { name: "Search" }).fill(productName);
		await this.page.locator("#search").getByRole("button").click();
	}

	async openCartDropdown() {
		await this.page.locator("#header-cart").getByRole("button").click();
		await expect(this.page.locator("#header-cart .dropdown-menu")).toBeVisible();
	}
}
