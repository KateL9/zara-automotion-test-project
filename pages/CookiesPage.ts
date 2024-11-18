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
    async goTo(url: string) {
        await this.page.goto(url);
    }
    async waitForCookiesPopup(): Promise<void> {
        // First, wait for the banner to be attached to the DOM
        await this.page.waitForSelector('div#onetrust-consent-sdk', { state: 'attached', timeout: 15000 });
        
        // Then, wait for it to become visible, allowing extra time for animations or delays
        await this.cookiesPopup.waitFor({ state: 'visible', timeout: 10000 });
    }
    async closeCookesPopup(): Promise<void> {
        await this.closeButton.click();
        // await this.page.evaluate(() => {
        //     const button = document.querySelector('button.banner-close-button');
        //     if (button) {
        //         (button as HTMLElement).click();
        //     }
        // });
    }
}