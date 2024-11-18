import { Locator, Page} from '@playwright/test'

export default class SearchPage {
    readonly page: Page;
    private searchInput: Locator;
    private firstFoundProduct: Locator;
    constructor(page: Page) {
        this.page = page;
        this.searchInput = this.page.locator('input.search-home-input ');
        this.firstFoundProduct = this.page.locator('ul.product-grid__product-list > li:first-child .product-grid-product__link')
    }
    async searchAndSubmit(query: string): Promise<void> {
        await this.searchInput.fill(query);
        await this.searchInput.press('Enter'); 
    }
    async openFirstFoundProduct(): Promise<void> {
        await this.firstFoundProduct.click()
    }
}