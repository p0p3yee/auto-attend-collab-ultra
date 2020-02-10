const { Builder, until } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
require("dotenv").config();
const selector = require("./selector");

const url = courseID =>
  `https://learn.polyu.edu.hk/webapps/collab-ultra/tool/collabultra?course_id=_${courseID}`;
const netid = process.env.netid;
const netpass = process.env.netpass;
const courseid = "82659_1";

(async () => {
  const driver = await new Builder()
    .forBrowser("firefox")
    .setFirefoxOptions(
      new firefox.Options()
        .addArguments("use-fake-device-for-media-stream")
        .addArguments("use-fake-ui-for-media-stream")
    )
    .build();

  await driver.get(url(courseid));

  await driver.wait(until.elementLocated(selector.agreeTermsBtn));
  await (await driver.findElement(selector.agreeTermsBtn)).click();

  await driver.wait(until.elementLocated(selector.netIDLoginBtn));
  await (await driver.findElement(selector.netIDLoginBtn)).click();

  await doLoginBlackboard(driver);
  await doWait(3);
  await driver.switchTo().frame(0);

  await clickElementWithWait(driver, selector.goInCourseRoom);

  await clickElementWithWait(driver, selector.joinCourseRoom);

  await clickElementWithWait(driver, selector.coursePage.confirmVoiceBtn);

  await clickElementWithWait(driver, selector.coursePage.skipVideoTest);

  await clickElementWithWait(driver, selector.coursePage.skipVideoTest);

  await clickElementWithWait(driver, selector.coursePage.skipVideoTest);

  await clickElementWithWait(driver, selector.coursePage.tutorialLaterBtn);

  await clickElementWithWait(driver, selector.coursePage.closeTutorialTipsBtn);
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
