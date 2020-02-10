const { Builder, until } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
require("dotenv").config();
const selector = require("./selector");

const url = courseID =>
  `https://learn.polyu.edu.hk/webapps/collab-ultra/tool/collabultra?course_id=_${courseID}`;
const netid = process.env.netid;
const netpass = process.env.netpass;
const courseid = "82659_1";

const getFirefoxDefaultOpts = () =>
  new firefox.Options()
    .addArguments("use-fake-device-for-media-stream")
    .addArguments("use-fake-ui-for-media-stream");

const buildFirefoxDriver = async opts => {
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

(async () => {
  const driver = await buildFirefoxDriver();

  await driver.get(url(courseid));

  await driver.clickElementWithWait(selector.agreeTermsBtn);

  await driver.clickElementWithWait(selector.netIDLoginBtn);

  await doLoginBlackboard(driver);
  await doWait(3);
  await driver.switchTo().frame(0);

  await driver.clickElementWithWait(selector.goInCourseRoom);

  await driver.clickElementWithWait(selector.joinCourseRoom);

  await driver.clickElementWithWait(selector.coursePage.confirmVoiceBtn);

  await driver.clickElementWithWait(selector.coursePage.skipVideoTest);

  await driver.clickElementWithWait(selector.coursePage.skipVideoTest);

  await driver.clickElementWithWait(selector.coursePage.skipVideoTest);

  await driver.clickElementWithWait(selector.coursePage.tutorialLaterBtn);

  await driver.clickElementWithWait(selector.coursePage.closeTutorialTipsBtn);

  console.log("done");
})();

const clickElementWithWait = async (driver, locator, timeout) => {
  if (typeof timeout === "undefined") timeout = 10000;
  await driver.wait(until.elementLocated(locator), timeout);
  await (await driver.findElement(locator)).click();
};

const doWait = s => new Promise(resolve => setTimeout(resolve, 1000 * s));

const doLoginBlackboard = async driver => {
  try {
    await driver.wait(until.elementLocated(selector.loginPage.netIDInput));
    await (await driver.findElement(selector.loginPage.netIDInput)).sendKeys(
      netid
    );
    await (await driver.findElement(selector.loginPage.netPassInput)).sendKeys(
      netpass
    );
    await (await driver.findElement(selector.loginPage.signInBtn)).click();
    return true;
  } catch (e) {
    return false;
  }
};
