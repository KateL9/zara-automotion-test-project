import { expect, Locator, Page} from '@playwright/test'

export default class RegisterPage {
    readonly page: Page;
    private emailField: Locator;
    private passwordField: Locator;
    private nameField: Locator;
    private lastNameField: Locator;
    private phoneField: Locator;
    private newsletterCheckbox: Locator;
    private privacyPolicy: Locator;
   
    constructor(page: Page) {
        this.page = page;
        this.emailField = this.page.locator('input[data-qa-input-qualifier="email"]');
        this.passwordField = this.page.locator('input[data-qa-input-qualifier="email"]');
        this.nameField = this.page.locator('input[data-qa-input-qualifier="email"]');
        this.lastNameField = this.page.locator('input[data-qa-input-qualifier="email"]');
        this.phoneField = this.page.locator('input[data-qa-input-qualifier="email"]');
        this.newsletterCheckbox = this.page.locator('input[data-qa-input-qualifier="email"]');
        this.privacyPolicy = this.page.locator('input[data-qa-input-qualifier="email"]');
    }
    async fillinRegisterForm(): Promise<void> {
        return 
    }
}