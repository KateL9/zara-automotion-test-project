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
        await page.goto('/ca/en/cropped-interlock-sweatshirt-p03641843.html');
        let cookiePage = new CookiesPage(page);
        await cookiePage.closeCookiesPopup();
        await expect(cookiePage.cookiesPopup).toBeHidden();
        
        let homePage = new HomePage(page);
        await homePage.clickSearchBar();

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

