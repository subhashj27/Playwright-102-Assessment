const { test } = require('@playwright/test');
const { SeleniumPlaygroundPage } = require('../pages/selenium-playground.page');
const { SliderPage } = require('../pages/slider.page');

test.describe('Test Scenario 2 - Drag & Drop Sliders', () => {
  test('should drag the slider from 15 to 95', async ({ page }) => {
    const playground = new SeleniumPlaygroundPage(page);
    const sliderPage = new SliderPage(page);

    await playground.open();
    await playground.openDragDropSliders();

    const slider = await sliderPage.findSliderByCurrentValue(15);
    await sliderPage.dragSliderTo(slider, 95);
  });
});
