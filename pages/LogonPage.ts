import { expect, Locator, Page} from '@playwright/test'

export default class LogonPage {
    readonly page: Page;
    private registerButton: Locator;
   
    constructor(page: Page) {
        this.page = page;
        this.registerButton = this.page.locator('button[data-qa-id="logon-view-alternate-button"]');
    }
    async navigateToRegisterPage(): Promise<void> {
        await this.registerButton.click()
    }
}