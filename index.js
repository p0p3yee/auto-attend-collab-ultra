require("dotenv").config();
const scheduled = require("./src/scheduled");
const courses = require("./courses.json");
const classHandler = require("./src/classHandler");

const netid = process.env.netid;
const netpass = process.env.netpass;
const courseid = "82659_1";

(async () => {
  console.log("Starting...");
})();
