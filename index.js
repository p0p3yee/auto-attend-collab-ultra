const { Builder, until } = require("selenium-webdriver");
require("dotenv").config();
const selector = require("./selector");

const url = courseID =>
  `https://learn.polyu.edu.hk/webapps/collab-ultra/tool/collabultra?course_id=_${courseID}`;

const netid = process.env.netid;
const netpass = process.env.netpass;
const courseid = "82659_1";

(async function example() {
  let driver = await new Builder().forBrowser("firefox").build();
  await driver.get(url(courseid));
  await driver.wait(until.elementLocated(selector.agreeTermsBtn));
  await (await driver.findElement(selector.agreeTermsBtn)).click();
  await driver.wait(until.elementLocated(selector.netIDLoginBtn));
  await (await driver.findElement(selector.netIDLoginBtn)).click();
  await doLoginBlackboard(driver);
  await doWait(3);
  await driver.get(url(courseid));
  console.log("done");
})();

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
