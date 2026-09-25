const { expect } = require('@playwright/test');

class SeleniumPlaygroundPage {
  constructor(page) {
    this.page = page;
    this.simpleFormDemoLink = page.getByText('Simple Form Demo', { exact: true });
    this.dragDropSlidersLink = page.getByText('Drag & Drop Sliders', { exact: true });
    this.inputFormSubmitLink = page.getByText('Input Form Submit', { exact: true });
  }

  async open() {
    await this.page.goto('./');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openSimpleFormDemo() {
    await this.simpleFormDemoLink.click();
    await expect(this.page).toHaveURL(/simple-form-demo/);
  }

  async openDragDropSliders() {
    await this.dragDropSlidersLink.click();
    await expect(this.page).toHaveURL(/drag-drop-range-sliders-demo/);
  }

  async openInputFormSubmit() {
    await this.inputFormSubmitLink.click();
    await expect(this.page).toHaveURL(/input-form-demo/);
  }
}

module.exports = { SeleniumPlaygroundPage };
