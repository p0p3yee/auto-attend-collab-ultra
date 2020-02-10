const { By } = require("selenium-webdriver");

module.exports = {
  agreeTermsBtn: By.id("agree_button"),
  netIDLoginBtn: By.id("netid_btn"),
  loginPage: {
    netIDInput: By.id("userNameInput"),
    netPassInput: By.id("passwordInput"),
    signInBtn: By.id("submitButton")
  },
  goInCourseRoom: By.xpath(`//button[starts-with(@id,"session")]`),
  joinCourseRoom: By.xpath(
    "//button[@class='button preserve focus-item loading-button']"
  ),
  coursePage: {
    confirmVoiceBtn: By.xpath(
      "//button[@class='button confirm button--inverse ng-scope']"
    ),
    skipVideoTest: By.id("fullcheck-skip-video"),
    tutorialLaterBtn: By.xpath(
      "//button[@class='button text later-tutorial-button ng-scope ng-binding']"
    ),
    closeTutorialTipsBtn: By.id(
      "tutorial-dialog-tutorials-menu-learn-about-tutorials-menu-close"
    )
  }
};
