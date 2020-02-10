const { By } = require("selenium-webdriver");

module.exports = {
  agreeTermsBtn: By.id("agree_button"),
  netIDLoginBtn: By.id("netid_btn"),
  loginPage: {
    netIDInput: By.id("userNameInput"),
    netPassInput: By.id("passwordInput"),
    signInBtn: By.id("submitButton")
  }
};
