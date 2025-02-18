import { test, expect } from '@playwright/test';

test.describe('ProductDetail Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the product detail page for a specific product
    await page.goto('http://localhost:3000/product/1'); // Adjust the URL as needed
  });

  test('should display product details', async ({ page }) => {
    // Check if the product title is displayed
    const productTitle = await page.locator('.product-title');
    await expect(productTitle).toBeVisible();
    await expect(productTitle).toHaveText('Apple MacBook Pro 16-inch'); // Adjust the expected text as needed

    // Check if the product description is displayed
    const productDescription = await page.locator('.product-description');
    await expect(productDescription).toBeVisible();
    await expect(productDescription).toHaveText('The ultimate laptop experience for professionals.'); // Adjust the expected text as needed

    // Check if the product category is displayed
    const productCategory = await page.locator('.product-category');
    await expect(productCategory).toBeVisible();
    await expect(productCategory).toHaveText('Category: laptops'); // Adjust the expected text as needed

    // Check if the product price is displayed
    const productPrice = await page.locator('.product-price');
    await expect(productPrice).toBeVisible();
    await expect(productPrice).toHaveText('Price: $2399.99'); // Adjust the expected text as needed

    // Check if the product rating is displayed
    const productRating = await page.locator('.product-rating');
    await expect(productRating).toBeVisible();
    await expect(productRating).toHaveText('Rating: 4.7 (120 reviews)'); // Adjust the expected text as needed
  });

});