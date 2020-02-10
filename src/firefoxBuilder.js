const firefox = require("selenium-webdriver/firefox");
const { Builder, until } = require("selenium-webdriver");

const getFirefoxDefaultOpts = () =>
  new firefox.Options()
    .addArguments("use-fake-device-for-media-stream")
    .addArguments("use-fake-ui-for-media-stream");

module.exports = async opts => {
  const driver = await new Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(
      typeof opts === "undefined" ? getFirefoxDefaultOpts() : opts
    )
    .build();

  driver.clickElementWithWait = async (locator, timeout) => {
    if (typeof timeout === "undefined") timeout = 10000;
    await driver.wait(until.elementLocated(locator), timeout);
    await (await driver.findElement(locator)).click();
  };

  return driver;
};
