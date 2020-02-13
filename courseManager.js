const courses = require("./courses.json.example");

const createCourse = (
  courseID,
  courseCode,
  courseStartTime,
  courseEndTime,
  courseDay
) => {
  return {
    course_id: courseID,
    course_code: courseCode,
    start_time: courseStartTime,
    end_time: courseEndTime,
    day: courseDay
  };
};

const choices = [
  "List All Courses",
  "Add Course",
  "Delete Course",
  "Update Course"
];

const menu = `Menu:\n${choices.map((v, i) => `${i}. ${v}`).join("\n")}`;

console.log(menu);
