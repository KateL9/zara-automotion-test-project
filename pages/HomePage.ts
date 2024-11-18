import { Locator, Page} from '@playwright/test'

export default class HomePage {
    readonly page: Page;
    private searchField: Locator;
    private cartButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.searchField = this.page.locator('a[data-qa-id="header-search-bar-link"]');
        this.cartButton = this.page.locator('a[data-qa-id="layout-header-go-to-cart"]');
    }
    async clickSearchField(): Promise<void> {
        await this.searchField.click();
    }
    async goToCart(): Promise<void> {
        await this.cartButton.click();
    }
}