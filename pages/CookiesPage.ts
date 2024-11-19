import { Locator, Page} from '@playwright/test'

export default class CookiesPage {
    readonly page: Page;
    public cookiesPopup: Locator;
    private closeButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.cookiesPopup = this.page.locator("//div[@aria-label='Cookie banner']");
        this.closeButton = this.page.locator('button.banner-close-button');
    }
    async goTo(url: string): Promise<void> {
        await this.page.goto(url);
    }
    async closeCookiesPopup(): Promise<void> {
        await this.page.evaluate(() => {
            const button = document.querySelector('button.banner-close-button');
            if (button) {
                button.click();
            }
        });
        //await this.closeButton.click();
    }
}