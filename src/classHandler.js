const { until } = require("selenium-webdriver");
const selector = require("./selector");
const firefoxBuilder = require("./firefoxBuilder");
const utils = require("./utils");

const url = courseID =>
  `https://learn.polyu.edu.hk/webapps/collab-ultra/tool/collabultra?course_id=_${courseID}`;

const doLoginBlackboard = async (driver, netid, netpass) => {
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

const attendClass = async (netid, netpass, courseid) => {
  const driver = await firefoxBuilder();

  await driver.get(url(courseid));

  await driver.clickElementWithWait(selector.agreeTermsBtn);

  await driver.clickElementWithWait(selector.netIDLoginBtn);

  await doLoginBlackboard(driver, netid, netpass);
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

  return driver;
};

const closeClass = async driver => {
  await driver.close();
};

module.exports = {
  attendClass,
  closeClass
};
