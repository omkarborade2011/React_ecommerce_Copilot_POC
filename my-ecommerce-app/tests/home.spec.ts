// filepath: /c:/Users/abhishek.g.mehta/React_ecommerce_Copilot_POC/tests/home.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should display the welcome message and featured products', async ({ page }) => {
    await expect(page.locator('h1')).toHaveText('Welcome to Our E-Commerce Store');
    await expect(page.locator('h2')).toHaveText('Featured Products');
  });

  test('should filter products based on search term', async ({ page }) => {
    const searchInput = page.locator('input[placeholder="Search products..."]');
    await searchInput.fill('JBL');
    const productTitles = page.locator('.product-list .product-card .product-title');
    await expect(productTitles).toHaveCount(1); // Adjust the count based on your test data
  });

  test('should add a product to the cart', async ({ page }) => {
    const addToCartButton = page.locator('.product-list .product-card button:has-text("Add to Cart")');
    await addToCartButton.first().click();
    // Verify the product is added to the cart (implement your cart logic verification here)
    // For example, you might check for a console log message or a cart item count update
  });
});