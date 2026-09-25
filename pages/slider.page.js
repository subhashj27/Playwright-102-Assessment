const { expect } = require('@playwright/test');

class SliderPage {
  constructor(page) {
    this.page = page;
    this.sliders = page.locator('input[type="range"]');
  }

  async findSliderByCurrentValue(value) {
    const target = String(value);
    const count = await this.sliders.count();

    for (let i = 0; i < count; i++) {
      const current = await this.sliders.nth(i).inputValue();
      if (current === target) {
        return this.sliders.nth(i);
      }
    }

    throw new Error(`Could not find a range slider with current value ${target}.`);
  }

  async dragSliderTo(slider, targetValue) {
    const meta = await slider.evaluate((el) => ({
      min: Number(el.min || 0),
      max: Number(el.max || 100),
      step: Number(el.step || 1),
      value: Number(el.value)
    }));

    if (targetValue < meta.min || targetValue > meta.max) {
      throw new Error(
        `Target ${targetValue} is outside slider range ${meta.min}-${meta.max}.`
      );
    }

    const box = await slider.boundingBox();
    if (!box) throw new Error('Slider is not visible.');

    const startRatio = (meta.value - meta.min) / (meta.max - meta.min);
    const endRatio = (targetValue - meta.min) / (meta.max - meta.min);

    const thumbRadius = box.height / 2;
    const trackWidth = box.width - thumbRadius * 2;
    const startX = box.x + thumbRadius + trackWidth * startRatio;
    const targetX = box.x + thumbRadius + trackWidth * endRatio;
    const centerY = box.y + box.height / 2;

    await this.page.mouse.move(startX, centerY);
    await this.page.mouse.down();
    await this.page.mouse.move(targetX, centerY, { steps: 20 });
    await this.page.mouse.up();

    const currentValue = Number(await slider.inputValue());
    const adjustmentKey = currentValue < targetValue ? 'ArrowRight' : 'ArrowLeft';
    for (let value = currentValue; value !== targetValue; value += currentValue < targetValue ? 1 : -1) {
      await slider.press(adjustmentKey);
    }

    await expect(slider).toHaveValue(String(targetValue));
  }
}

module.exports = { SliderPage };
