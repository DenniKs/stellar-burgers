import { expect, test } from '@playwright/test';

const bunId = 'mock-bun';
const mainId = 'mock-main';
const sauceId = 'mock-sauce';

const addIngredient = async (page: import('@playwright/test').Page, id: string) => {
  await page.getByTestId(`add-ingredient-${id}`).locator('button').click();
};

test.describe('burger constructor page', () => {
  test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('tests/hars/constructor.har', {
      url: '**/api/**',
      update: false
    });
  });

  test.afterEach(async ({ context, page }) => {
    await page.evaluate(() => localStorage.clear()).catch(() => {});
    await context.clearCookies();
  });

  test('adds bun and filling ingredients to the constructor', async ({
    page
  }) => {
    await page.goto('/');
    await expect(page.getByTestId(`ingredient-${bunId}`)).toBeVisible();

    await addIngredient(page, bunId);
    await expect(page.getByTestId('constructor-bun-top')).toContainText(
      'Mock Bun'
    );
    await expect(page.getByTestId('constructor-bun-bottom')).toContainText(
      'Mock Bun'
    );

    await addIngredient(page, mainId);
    await expect(
      page.getByTestId(`constructor-ingredient-${mainId}`)
    ).toContainText('Mock Main');
  });

  test('opens ingredient details modal with selected ingredient data and closes it', async ({
    page
  }) => {
    await page.goto('/');
    await page.getByTestId(`ingredient-link-${sauceId}`).click();

    await expect(page.getByTestId('modal')).toBeVisible();
    await expect(page.getByTestId('modal')).toContainText('Mock Sauce');
    await expect(page.getByTestId('modal')).toContainText('42');

    await page.getByTestId('modal-close').click();
    await expect(page.getByTestId('modal')).toHaveCount(0);

    await page.getByTestId(`ingredient-link-${sauceId}`).click();
    await expect(page.getByTestId('modal')).toContainText('Mock Sauce');
    await page.getByTestId('modal-overlay').click({ position: { x: 5, y: 5 } });
    await expect(page.getByTestId('modal')).toHaveCount(0);
  });

  test('creates an order, shows the order number, closes modal, and clears constructor', async ({
    context,
    page
  }) => {
    await page.addInitScript(() => {
      localStorage.setItem('refreshToken', 'fake-refresh-token');
    });
    await context.addCookies([
      {
        name: 'accessToken',
        value: 'Bearer fake-access-token',
        url: 'http://localhost:4000'
      }
    ]);

    await page.goto('/');
    await expect(page.getByTestId(`ingredient-${bunId}`)).toBeVisible();

    await addIngredient(page, bunId);
    await addIngredient(page, mainId);
    await page.getByTestId('order-button').locator('button').click();

    await expect(page.getByTestId('modal')).toBeVisible();
    await expect(page.getByTestId('order-number')).toHaveText('12345');

    await page.getByTestId('modal-close').click();
    await expect(page.getByTestId('modal')).toHaveCount(0);
    await expect(page.getByTestId('constructor-bun-top')).toHaveCount(0);
    await expect(
      page.getByTestId(`constructor-ingredient-${mainId}`)
    ).toHaveCount(0);
  });
});
