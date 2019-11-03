describe('Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('List should be visible', async () => {
    await expect(element(by.text('List of available polls'))).toBeVisible();
  });
});
