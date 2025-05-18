import { Page, Locator } from "@playwright/test";

export class ContactUsPage {
	readonly nameErrorText: Locator;
	readonly emailErrorText: Locator;
	readonly enquiryErrorText: Locator;

  	readonly submitButton: Locator;

	constructor(private page: Page) {
		this.page = page;

		this.nameErrorText = this.page.locator('#input-name + div[class="text-danger"]');
		this.emailErrorText = this.page.locator('#input-email + div[class="text-danger"]');
		this.enquiryErrorText = this.page.locator('#input-enquiry + div[class="text-danger"]');

		this.submitButton = this.page.getByRole("button", { name: "Submit" })
	}

	async goto() {
		await this.page.goto("https://demo.opencart.com/en-gb?route=information/contact");
	}

	async submitContactForm({name, email, enquiry,}: {name: string; email: string; enquiry: string; }) {
		await this.page.getByRole("textbox", { name: "name" }).fill(name);
		await this.page.locator("#input-email").fill(email);
		await this.page.locator("#input-enquiry").fill(enquiry);
		await this.submitButton.click();
	}
}
