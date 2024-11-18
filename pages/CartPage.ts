import { expect, Locator, Page} from '@playwright/test'

export default class CartPage {
    readonly page: Page;
    private cartItems: Locator;
    private removeItemSelector: string;
    private proceedToCheckout: Locator;
    constructor(page: Page) {
        this.page = page;
        this.removeItemSelector = 'button[data-qa-action="remove-order-item"]';        
        this.cartItems = this.page.locator('.shop-cart-item');
        this.proceedToCheckout = this.page.locator('button[data-qa-id="shop-continue"]');
    }
    async deleteEverySecondItem(): Promise<void> {
        let itemCount = await this.cartItems.count();
        const expectedRemainingCount = Math.ceil(itemCount / 2);
        for (let i = 1; i < itemCount; i += 2) {
            const removeButton = this.cartItems.nth(i).locator(this.removeItemSelector);
            await removeButton.click();
            await this.page.waitForTimeout(500);
            itemCount--;
            i--;
        }
        expect(await this.cartItems.count()).toBe(expectedRemainingCount);

    }
    async navigateToCheckout(): Promise<void> {
        await this.proceedToCheckout.click()
    }
}