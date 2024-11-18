import { expect, Locator, Page} from '@playwright/test'

export default class RegisterPage {
    readonly page: Page;
    private emailField: Locator;
    private passwordField: Locator;
    private nameField: Locator;
    private lastNameField: Locator;
    private phoneField: Locator;
    private privacyPolicy: Locator;
    private signUpButton: Locator;
    private alertDialog: Locator;
   
    constructor(page: Page) {
        this.page = page;
        this.emailField = this.page.locator('input[data-qa-input-qualifier="email"]');
        this.passwordField = this.page.locator('input[data-qa-input-qualifier="password"]');
        this.nameField = this.page.locator('input[data-qa-input-qualifier="firstName"]');
        this.lastNameField = this.page.locator('input[data-qa-input-qualifier="lastName"]');
        this.phoneField = this.page.locator('input[data-qa-input-qualifier="phone.number"]');
        this.privacyPolicy = this.page.locator('input[data-qa-input-qualifier="privacyCheck"]');
        this.signUpButton = this.page.locator('button[data-qa-action="sign-up-submit"]');
        this.alertDialog = this.page.locator('div.zds-alert-dialog--default');
    }
    async fillOutAndSubmitRegistration(userData: {
        email: string,
        password: string,
        name: string,
        lastName: string,
        phone: string
    }): Promise<void> {
         await this.emailField.fill(userData.email);
         await this.passwordField.fill(userData.password);
         await this.nameField.fill(userData.name);
         await this.lastNameField.fill(userData.lastName);
         await this.phoneField.fill(userData.phone);
         //await this.privacyPolicy.click();
         await this.signUpButton.scrollIntoViewIfNeeded();
         await this.signUpButton.focus();
         await this.signUpButton.click();
         await expect(this.alertDialog).toBeVisible();
    }
}