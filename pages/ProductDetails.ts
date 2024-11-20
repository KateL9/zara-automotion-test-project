import { expect, Locator, Page} from '@playwright/test'

export default class ProductDetails {
    readonly page: Page;
    public productDetailsContainer: Locator;
    private availableSizes: Locator;
    private addToCartButton: Locator;
    private addToCartNotificationPopup: Locator;
    private closeAddToCartNotification: Locator;
    private sizeRecomenderPopup: Locator;
    private closeSizeRecomenderButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.productDetailsContainer = this.page.locator('div.product-detail-view__main');
        this.availableSizes = this.page.locator('.size-selector-sizes > li:not(.size-selector-sizes__size--disabled)');
        this.addToCartButton = this.page.locator('button[data-qa-action="add-to-cart"]');
        this.addToCartNotificationPopup = this.page.locator('div.add-to-cart-notification__wrapper');
        this.closeAddToCartNotification = this.page.locator('button.zds-dialog-close-button');
        this.sizeRecomenderPopup = this.page.locator('div.zds-dialog__focus-trap');
        this.closeSizeRecomenderButton = this.page.locator('button.zds-dialog-close-button');
    }
    async addAllAvailableSizesToCart(): Promise<void> {
        let sizes = await this.availableSizes.elementHandles();
        for (let size of sizes) {
            await size.click();
            await this.addToCartButton.click();
            if (await this.sizeRecomenderPopup.isVisible()) {
                await this.closeSizeRecomenderPopup();
                await this.addToCartButton.click();
            }

            await this.addToCartNotificationPopup.waitFor({ state: 'visible', timeout: 10000 });
            await expect(this.addToCartNotificationPopup).toBeVisible();
            await this.closeAddToCartPopup();
            await expect(this.addToCartNotificationPopup).not.toBeVisible();
        }
    }
    async closeAddToCartPopup(): Promise<void> {
        await this.closeAddToCartNotification.click();
    }
    async closeSizeRecomenderPopup(): Promise<void> {
        await this.closeSizeRecomenderButton.click();
    }
}