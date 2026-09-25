const { expect } = require('@playwright/test');

class SimpleFormPage {
  constructor(page) {
    this.page = page;
    this.messageInput = page.locator('input#user-message');
    this.getCheckedValueButton = page.locator('#showInput');
    this.messageOutput = page.locator('#message');
  }

  async enterMessage(message) {
    // The live page is React-rendered; waiting for network idle avoids typing
    // before the input handler is attached.
    await this.page.waitForLoadState('networkidle');
    await this.messageInput.fill(message);
    await this.getCheckedValueButton.click();
  }

  async assertMessage(message) {
    await expect(this.messageOutput).toHaveText(message);
  }
}

module.exports = { SimpleFormPage };
