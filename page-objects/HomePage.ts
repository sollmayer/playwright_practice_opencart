import { expect, Page } from "@playwright/test";
import { HeaderComponent } from "./components/HeaderComponent";

export class HomePage {
	readonly header: HeaderComponent;

	constructor(readonly page: Page) {
		this.page = page;
		this.header = new HeaderComponent(this.page);
	}

	async goto() {
		await this.page.goto("/");
		await expect(this.page).toHaveTitle("Your Store");
	}
}
