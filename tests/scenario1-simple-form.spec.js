const { test } = require('@playwright/test');
const { SeleniumPlaygroundPage } = require('../pages/selenium-playground.page');
const { SimpleFormPage } = require('../pages/simple-form.page');

test.describe('Test Scenario 1 - Simple Form Demo', () => {
  test('should display the same message entered by the user', async ({ page }) => {
    const playground = new SeleniumPlaygroundPage(page);
    const simpleForm = new SimpleFormPage(page);

    const message = 'Welcome to TestMu AI';

    await playground.open();
    await playground.openSimpleFormDemo();
    await simpleForm.enterMessage(message);
    await simpleForm.assertMessage(message);
  });
});
