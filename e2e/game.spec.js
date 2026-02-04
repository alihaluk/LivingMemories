const { test, expect } = require('@playwright/test');

test.describe('Living Memories Game', () => {
    test.beforeEach(async ({ page }) => {
        // Go to the game page
        await page.goto('http://localhost:8000');
    });

    test('should display title', async ({ page }) => {
        await expect(page).toHaveTitle(/Living Memories/);
        await expect(page.locator('h1')).toContainText('Living Memories');
    });

    test('should have a game board with 16 cards', async ({ page }) => {
        const cards = page.locator('.card');
        await expect(cards).toHaveCount(16);
    });

    test('should flip card on click', async ({ page }) => {
        const firstCard = page.locator('.card').first();
        await expect(firstCard).not.toHaveClass(/flipped/);

        await firstCard.click();

        await expect(firstCard).toHaveClass(/flipped/);
    });

    test('should increment moves counter', async ({ page }) => {
        const moveCounter = page.locator('#move-count');
        await expect(moveCounter).toHaveText('0');

        // Click two cards to register a move
        const cards = page.locator('.card');
        await cards.nth(0).click();
        await cards.nth(1).click();

        await expect(moveCounter).toHaveText('1');
    });

    test('restart button should reset game', async ({ page }) => {
        const moveCounter = page.locator('#move-count');
        const cards = page.locator('.card');

        // Make a move
        await cards.nth(0).click();
        await cards.nth(1).click();
        await expect(moveCounter).toHaveText('1');

        // Restart
        await page.click('#restart-btn');

        // Check reset
        await expect(moveCounter).toHaveText('0');
        await expect(cards.first()).not.toHaveClass(/flipped/);
    });
});
