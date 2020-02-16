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

    for (var i = 0; i < workList.length; i++) {
      if (currentDay !== workList[i].day) continue;
      const workStartHour = workList[i].start_time.slice(0, 2);
      const workStartMinute = workList[i].start_time.slice(2, 4);
      const workEndHour = workList[i].end_time.slice(0, 2);
      const workEndMinute = workList[i].end_time.slice(2, 4);
      if (
        currentHour == workStartHour &&
        currentMinute == workStartMinute &&
        !running
      ) {
        workList[i].running = true;
        workList[i].driver = await workList[i].start_func();
      } else if (
        currentHour == workEndHour &&
        currentMinute == workEndMinute &&
        workList[i].running
      ) {
        workList[i].running = false;
        await workList[i].driver.close();
      }
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
