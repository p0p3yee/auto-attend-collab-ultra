const days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const SECOND = 1000;
const MINUTE = SECOND * 60;
const checkInterval = MINUTE / 2;
const workList = [];

const createWork = (startTime, endTime, day, startFunc) => {
  return startTime && endTime && day && startFunc
    ? days.includes(day)
      ? {
          start_time: startTime,
          end_time: endTime,
          day: day,
          start_func: startFunc,
          running: false,
          driver: null
        }
      : new Error("Day can only be: " + days.join(" or "))
    : new Error("Parameters can't be null.");
};

const startInterval = () => {
  return setInterval(async () => {
    const currentTime = new Date();
    const currentDay = days[currentTime.getDay()];
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    var attendClass = false;
    for (var i = 0; i < workList.length; i++) {
      if (currentDay !== workList[i].day) continue;
      const workStartHour = workList[i].start_time.slice(0, 2);
      const workStartMinute = workList[i].start_time.slice(2, 4);
      const workEndHour = workList[i].end_time.slice(0, 2);
      const workEndMinute = workList[i].end_time.slice(2, 4);
      if (
        currentHour == workStartHour &&
        currentMinute == workStartMinute &&
        !workList[i].running
      ) {
        attendClass = true;
        console.log(`[${new Date().toLocaleTimeString()}]: Attending Class...`);
        workList[i].running = true;
        workList[i].driver = await workList[i].start_func();
      } else if (
        currentHour == workEndHour &&
        currentMinute == workEndMinute &&
        workList[i].running
      ) {
        console.log(`[${new Date().toLocaleTimeString()}]: Class finished.`);
        workList[i].running = false;
        await workList[i].driver.close();
      }
    }
    if (!attendClass) {
      console.log(
        `[${new Date().toLocaleTimeString()}]: No classes to attend.`
      );
    }
  }, checkInterval);
};

const stopInterval = interval => clearInterval(interval);

module.exports = {
  createWork,
  addWork: work => workList.push(work) - 1,
  addWorks: works => works.forEach(v => workList.push(v)),
  delWork: workID => workList.splice(workID, 1),
  getTotalWorkNum: () => workList.length,
  startInterval,
  stopInterval
};
