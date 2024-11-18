import { test, expect } from '@playwright/test';
import CookiesPage from '../pages/CookiesPage';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import ProductDetails from '../pages/ProductDetails';
import CartPage from '../pages/CartPage';
import LogonPage from '../pages/LogonPage';
import { faker } from '@faker-js/faker';
import RegisterPage from '../pages/RegisterPage';

test.describe('Zara test', () => {
    test('End to end test', async ({ page }) => {
        await page.goto('https://www.zara.com/ca/en/cropped-interlock-sweatshirt-p03641843.html');
        //await page.waitForLoadState('networkidle');
        let cookiePage = new CookiesPage(page);
        await cookiePage.closeCookesPopup();
        await expect(cookiePage.cookiesPopup).toBeHidden();
        //await page.locator('[data-qa-action="stay-in-store"]').click();
        //const stayButton = await page.locator('button[class="onetrust-close-btn-handler banner-close-button ot-close-icon"]');
        //await stayButton.waitFor({ state: 'visible', timeout: 15000 }); // Wait up to 15 seconds for visibility
        //await stayButton.click();
        //await stayButton.waitFor({ state: 'visible', timeout: 15000 });
        //await stayButton.click();
 
        
        // await page.waitForSelector('button.banner-close-button', { state: 'visible', timeout: 30000 });
        // await page.click('button.banner-close-button');

        let homePage = new HomePage(page);
        await homePage.clickSearchField();
        let searchPage = new SearchPage(page);

        let searchQuery = 'FLARED MID WAIST SLIM CROP JEANS';
        await searchPage.searchAndSubmit(searchQuery);
        await searchPage.openFirstFoundProduct();
        let productDetailsPage = new ProductDetails(page);
        await expect(productDetailsPage.productDetailsContainer).toBeVisible();
        await productDetailsPage.addAllAvailableSizesToCart();
        await homePage.goToCart();
        expect(page.url()).toBe('https://www.zara.com/ca/en/shop/cart');
        let cartPage = new CartPage(page);
        await cartPage.deleteEverySecondItem();
        await cartPage.navigateToCheckout();

        let logonPage = new LogonPage(page);
        await logonPage.navigateToRegisterPage();
        expect(page.url()).toContain('signup');

        let registrationPage = new RegisterPage(page);
        let userData = {
            email: faker.internet.email(),
            password: 'Qwerty1!',
            name: faker.person.firstName(),
            lastName: faker.person.lastName(),
            phone: '5062345678'
        };
        await registrationPage.fillOutAndSubmitRegistration(userData);
    });
})

