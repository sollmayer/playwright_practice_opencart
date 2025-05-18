import { test, expect } from "@playwright/test";
import { ContactUsPage } from "../../page-objects/ContactUsPage";
import { TestDataGenerator } from "../../utils/testData-generator";

enum ERROR_MESSAGES {
	INVALID_NAME = "Name must be between 3 and 32 characters!",
	INVALID_EMAIL = "E-Mail Address does not appear to be valid!",
	ENQUIRY_LENGTH = "Enquiry must be between 10 and 3000 characters!",
}

test.describe("Contact Us page tests", () => {
	let contactUsPage: ContactUsPage;

	test.beforeEach(async ({ page }) => {
		contactUsPage = new ContactUsPage(page);
		await contactUsPage.goto();
	});

	test("contact form successfully submits information", async ({ page }) => {
		const randomFullName = TestDataGenerator.generateFullName();
		const randomEmail = TestDataGenerator.generateEmail(randomFullName);
		const randomEnquiry = TestDataGenerator.generateEnquiry();

		await contactUsPage.submitContactForm({
			name: randomFullName,
			email: randomEmail,
			enquiry: randomEnquiry,
		});

		await expect(page).toHaveURL(/contact.success/);
		await expect(page.getByRole("link", { name: "Continue" })).toBeVisible();
	});

	test("should display error messages for empty required fields", async () => {
		await contactUsPage.submitButton.click();

		await expect(contactUsPage.nameErrorText).toBeVisible();
		await expect(contactUsPage.nameErrorText).toContainText(ERROR_MESSAGES.INVALID_NAME);

		await expect(contactUsPage.emailErrorText).toBeVisible();
		await expect(contactUsPage.emailErrorText).toContainText(ERROR_MESSAGES.INVALID_EMAIL);

		await expect(contactUsPage.enquiryErrorText).toBeVisible();
		await expect(contactUsPage.enquiryErrorText).toContainText(ERROR_MESSAGES.ENQUIRY_LENGTH);
	});

	test("should display error message for name shorter than minimum length", async () => {
		const randomFullName = TestDataGenerator.generateString(2);
		const invalidEmail = TestDataGenerator.generateEmail(randomFullName);
		const randomEnquiry = TestDataGenerator.generateEnquiry(20, 100);

		await contactUsPage.submitContactForm({
			name: randomFullName,
			email: invalidEmail,
			enquiry: randomEnquiry,
		});

		await expect(contactUsPage.nameErrorText).not.toBeVisible();
		await expect(contactUsPage.enquiryErrorText).not.toBeVisible();
		await expect(contactUsPage.emailErrorText).toBeVisible();
		await expect(contactUsPage.emailErrorText).toContainText(ERROR_MESSAGES.INVALID_EMAIL);
	});

	test("should display error message for invalid email format", async () => {
		const randomFullName = TestDataGenerator.generateFullName();
		const invalidEmail = TestDataGenerator.generateString();
		const randomEnquiry = TestDataGenerator.generateEnquiry(20, 100);

		await contactUsPage.submitContactForm({
			name: randomFullName,
			email: invalidEmail,
			enquiry: randomEnquiry,
		});

		await expect(contactUsPage.nameErrorText).not.toBeVisible();
		await expect(contactUsPage.enquiryErrorText).not.toBeVisible();
		await expect(contactUsPage.emailErrorText).toBeVisible();
		await expect(contactUsPage.emailErrorText).toContainText(ERROR_MESSAGES.INVALID_EMAIL);
	});

	test("should display error for enquiry shorter than minimum length", async () => {
		const randomFullName = TestDataGenerator.generateFullName();
		const randomEmail = TestDataGenerator.generateEmail(randomFullName);
		const shortEnquiry = TestDataGenerator.generateEnquiry(1, 3);

		await contactUsPage.submitContactForm({
			name: randomFullName,
			email: randomEmail,
			enquiry: shortEnquiry,
		});

		await expect(contactUsPage.enquiryErrorText).toBeVisible();
		await expect(contactUsPage.enquiryErrorText).toContainText(ERROR_MESSAGES.ENQUIRY_LENGTH);
	});
});
