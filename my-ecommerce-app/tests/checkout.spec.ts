import { test, expect } from '@playwright/test';

test.describe('Checkout Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the checkout page
    await page.goto('http://localhost:3000/checkout'); // Adjust the URL as needed
  });

  test('should display user information if logged in', async ({ page }) => {
    // Mock user state
    await page.evaluate(() => {
      window.localStorage.setItem('reduxState', JSON.stringify({
        auth: {
          user: {
            name: 'John Doe',
            email: 'john.doe@example.com'
          }
        },
        product: {
          cart: []
        }
      }));
    });

    // Reload the page to apply the mock state
    await page.reload();

    // Check if user information is displayed
    const userName = await page.locator('text=Name: John Doe');
    await expect(userName).toBeVisible();

    const userEmail = await page.locator('text=Email: john.doe@example.com');
    await expect(userEmail).toBeVisible();
  });

  test('should display cart items', async ({ page }) => {
    // Mock cart state
    await page.evaluate(() => {
      window.localStorage.setItem('reduxState', JSON.stringify({
        auth: {
          user: {
            name: 'John Doe',
            email: 'john.doe@example.com'
          }
        },
        product: {
          cart: [
            { id: 1, name: 'Product 1', price: 100, quantity: 2 },
            { id: 2, name: 'Product 2', price: 50, quantity: 1 }
          ]
        }
      }));
    });

    // Reload the page to apply the mock state
    await page.reload();

    // Check if cart items are displayed
    const cartItem1 = await page.locator('text=Product 1 - $100 x 2');
    await expect(cartItem1).toBeVisible();

    const cartItem2 = await page.locator('text=Product 2 - $50 x 1');
    await expect(cartItem2).toBeVisible();
  });

  test('should proceed to payment when checkout button is clicked', async ({ page }) => {
    // Mock cart state
    await page.evaluate(() => {
      window.localStorage.setItem('reduxState', JSON.stringify({
        auth: {
          user: {
            name: 'John Doe',
            email: 'john.doe@example.com'
          }
        },
        product: {
          cart: [
            { id: 1, name: 'Product 1', price: 100, quantity: 2 }
          ]
        }
      }));
    });

    // Reload the page to apply the mock state
    await page.reload();

    // Click the "Proceed to Payment" button
    const checkoutButton = await page.locator('text=Proceed to Payment');
    await checkoutButton.click();

    // Check if the alert is displayed
    page.on('dialog', async dialog => {
      expect(dialog.message()).toBe('Checkout process initiated!');
      await dialog.accept();
    });
  });
});