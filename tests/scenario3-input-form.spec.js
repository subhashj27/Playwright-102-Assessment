const { test } = require('@playwright/test');
const { SeleniumPlaygroundPage } = require('../pages/selenium-playground.page');
const { InputFormPage } = require('../pages/input-form.page');

test.describe('Test Scenario 3 - Input Form Submit', () => {
  test('should validate required field and submit the completed form', async ({ page }) => {
    const playground = new SeleniumPlaygroundPage(page);
    const inputForm = new InputFormPage(page);

    await playground.open();
    await playground.openInputFormSubmit();

    // Step 2-3 from the assignment: submit blank form and validate
    // the browser's required-field message.
    await inputForm.submitEmptyAndAssertNativeValidation();

    // Step 4-7: populate all fields, select United States by visible text,
    // submit and validate the success message.
    await inputForm.fillForm();
    await inputForm.submitForm();
    await inputForm.assertSuccessMessage();
  });
});
