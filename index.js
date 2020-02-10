const { until } = require("selenium-webdriver");
require("dotenv").config();
const selector = require("./src/selector");
const firefoxBuilder = require("./src/firefoxBuilder");
const utils = require("./src/utils");

const url = courseID =>
  `https://learn.polyu.edu.hk/webapps/collab-ultra/tool/collabultra?course_id=_${courseID}`;
const netid = process.env.netid;
const netpass = process.env.netpass;
const courseid = "82659_1";

(async () => {
  const driver = await firefoxBuilder();

  await driver.get(url(courseid));

  await driver.clickElementWithWait(selector.agreeTermsBtn);

  await driver.clickElementWithWait(selector.netIDLoginBtn);

  await doLoginBlackboard(driver);
  await utils.doWait(3);
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
