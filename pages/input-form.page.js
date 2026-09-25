const { expect } = require('@playwright/test');

class InputFormPage {
  constructor(page) {
    this.page = page;

    this.name = page.locator('#name');
    this.email = page.locator('#seleniumform input[name="email"]');
    this.password = page.locator('#inputPassword4');
    this.company = page.locator('#company');
    this.website = page.locator('input[name="website"]');
    this.country = page.locator('#seleniumform select').first();
    this.city = page.locator('input[placeholder="City"]');
    this.address1 = page.locator('#inputAddress1');
    this.address2 = page.locator('#inputAddress2');
    this.state = page.locator('#inputState');
    this.zip = page.locator('#inputZip');
    this.submit = page.locator('#seleniumform button[type="submit"]').first();
  }

  async submitEmptyAndAssertNativeValidation() {
    await this.submit.click();

    const validationMessage = await this.name.evaluate(
      (element) => element.validationMessage
    );

    expect(validationMessage).toMatch(/^Please fill (in|out) this field\.$/);
  }

  async fillForm() {
    await this.name.fill('TestMu AI User');
    await this.email.fill('testmu.playwright@example.com');
    await this.password.fill('Password@123');
    await this.company.fill('TestMu AI');
    await this.website.fill('https://www.testmuai.com');
    await this.country.selectOption({ label: 'United States' });
    await this.city.fill('New York');
    await this.address1.fill('123 Test Street');
    await this.address2.fill('Suite 100');
    await this.state.fill('New York');
    await this.zip.fill('10001');
  }

  async submitForm() {
    await this.submit.click();
  }

  async assertSuccessMessage() {
    await expect(
      this.page.getByText('Thanks for contacting us, we will get back to you shortly.', {
        exact: true
      })
    ).toBeVisible();
  }
}

module.exports = { InputFormPage };
