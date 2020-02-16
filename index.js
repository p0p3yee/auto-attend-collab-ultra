require("dotenv").config();
const scheduled = require("./src/scheduled");
const courses = require("./courses.json");
const classHandler = require("./src/classHandler");

const netid = process.env.netid;
const netpass = process.env.netpass;

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

const createWork = courseArr => {
  const works = [];
  courseArr.forEach(v => {
    works.push(scheduled.createWork(v.start_time, v.end_time, v.day));
  });
  return works;
};

(async () => {
  console.log("Starting...");
  try {
    console.log(`Verifying Courses...`);
    verifyCourses(courses);
    console.log("Courses Verified.");
    scheduled.addWorks(createWork(courses));
    scheduled.startInterval();
    console.log("Interval Started.");
    console.log("Total Interval: " + scheduled.getTotalWorkNum());
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
