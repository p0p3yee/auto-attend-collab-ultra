require("dotenv").config();
const scheduled = require("./src/scheduled");
const courses = require("./courses.json");
const classHandler = require("./src/classHandler");

const netid = process.env.netid;
const netpass = process.env.netpass;
const courseid = "82659_1";

const verifyCourses = courseArr => {
  if (!courseArr) throw new Error("Course is undefined.");

  if (courseArr.length === 0) {
    throw new Error("No courses found.");
  }

  for (var i = 0; i < courseArr.length; i++) {
    if (
      courseArr[i] &&
      courseArr[i].course_id &&
      courseArr[i].course_code &&
      courseArr[i].start_time &&
      courseArr[i].end_time &&
      courseArr[i].day
    ) {
      continue;
    } else {
      throw new Error(`Incorrect Course: ${JSON.stringify(courseArr[i])} `);
    }
  }
};

(async () => {
  console.log("Starting...");
  try {
    console.log(`Verifying Courses...`);
    verifyCourses(courses);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
