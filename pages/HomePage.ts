import { expect, Locator, Page} from '@playwright/test'

export default class HomePage {
    readonly page: Page;
    private searchField: Locator;
    private cartButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.searchField = this.page.locator('a[data-qa-id="header-search-bar-link"]');
        this.cartButton = this.page.locator('a[data-qa-id="layout-header-go-to-cart"]');
    }
    async clickSearchBar(): Promise<void> { 
        await this.searchField.waitFor({ state: 'visible', timeout: 30000 });
        await this.searchField.click();
        await expect(this.page).toHaveURL('https://www.zara.com/ca/en/search/home');
    }
    async goToCart(): Promise<void> {
        await this.cartButton.click();
    }
}