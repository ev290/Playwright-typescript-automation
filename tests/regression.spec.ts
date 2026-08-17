import { test, expect } from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';


test.describe('SauceDemo Regression Suite', () => {

  test('1. Valid standard user can login successfully', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();

    await loginPage.login(
      'standard_user',
      'secret_sauce'
    );

    await expect(page).toHaveURL(/inventory.html/);

    await expect(
      inventoryPage.pageTitle
    ).toHaveText('Products');

  });


  test('2. Invalid user cannot login', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
      'wrong_user',
      'wrong_password'
    );

    await expect(
      loginPage.errorMessage
    ).toBeVisible();

    await expect(
      loginPage.errorMessage
    ).toContainText(
      'Username and password do not match'
    );

  });


  test('3. User can add product to cart', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();

    await loginPage.login(
      'standard_user',
      'secret_sauce'
    );

    await inventoryPage.addBackpackToCart();

    await expect(
      inventoryPage.cartBadge
    ).toHaveText('1');

  });


  test('4. Product appears in shopping cart', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);

    await loginPage.goto();

    await loginPage.login(
      'standard_user',
      'secret_sauce'
    );

    await inventoryPage.addBackpackToCart();

    await inventoryPage.openCart();

    await expect(
      cartPage.productName
    ).toHaveText('Sauce Labs Backpack');

    await expect(page).toHaveURL(/cart.html/);

  });


  test('5. User can complete checkout', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();

    await loginPage.login(
      'standard_user',
      'secret_sauce'
    );

    await inventoryPage.addBackpackToCart();

    await inventoryPage.openCart();

    await cartPage.checkout();

    await checkoutPage.enterCustomerInformation(
      'David',
      'Tester',
      '22079'
    );

    await expect(
      checkoutPage.summaryInfo
    ).toBeVisible();

    await checkoutPage.finishOrder();

    await expect(
      checkoutPage.confirmationMessage
    ).toHaveText('Thank you for your order!');

  });
  test('6. User can remove product from cart', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();

    await loginPage.login(
        'standard_user',
        'secret_sauce'
    );

    await inventoryPage.addBackpackToCart();

    await expect(
        inventoryPage.cartBadge
    ).toHaveText('1');

    await page
        .locator('#remove-sauce-labs-backpack')
        .click();

    await expect(
        inventoryPage.cartBadge
    ).not.toBeVisible();

    });

});