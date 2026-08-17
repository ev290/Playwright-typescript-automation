import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly backpackAddButton: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageTitle = page.locator('.title');
    this.backpackAddButton=
         page.locator('#add-to-cart-sauce-labs-backpack');
               
    this.cartBadge =
      page.locator('.shopping_cart_badge');
    this.cartLink =
      page.locator('.shopping_cart_link');
  }

  async addBackpackToCart() {
    await this.backpackAddButton.click();
  }

  async openCart() {
    await this.cartLink.click();
  }
}
