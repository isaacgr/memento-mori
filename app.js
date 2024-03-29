Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

/**
 * Get the total number of weeks between the date object and current date
 *
 * From:
 *  https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 *
 * @see https://en.wikipedia.org/wiki/ISO_week_date
 * @see https://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
 *
 * @returns {number} Weeknumber for date object
 */
Date.prototype.getWeekNumber = function () {
  // Copy date so don't modify original
  const d = new Date(
    this.getUTCFullYear(),
    this.getUTCMonth(),
    this.getUTCDate()
  );
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

/**
 * Returns the number of weeks between two dates
 *
 * @param {Date} d1
 * @param {Date} d2
 * @returns {number} Number of weeks between d1 and d2
 */
function weeksBetween(d1, d2) {
  return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}

function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

function isSameWeek(date1, date2) {
  const startDate = getStartDate();
  if (weeksBetween(startDate, new Date(date1)) + 1 == date2){
    return true;
  }
  return false;
}

function getStartDate() {
  return new Date("1992-01-29");
}

function getWeekNumber(year, week) {
  return year * 52 - (53 - week) + 1;
}


function getDatesArray() {
  return getDates(getStartDate(), new Date());
}

function graduatedCollege() {
  const startDate = getStartDate();
  return new Date(startDate.getFullYear() + 22, 3, 15);
}

function graduatedUni() {
  const startDate = getStartDate();
  return new Date(startDate.getFullYear() + 24, 3, 15);
}

function metWife() {
  const startDate = getStartDate();
  return new Date(startDate.getFullYear() + 24, 5, 7);
}

function covid() {
  const startDate = getStartDate();
  return new Date(startDate.getFullYear() + 28, 2, 17);
}

function dadsDeath() {
  const startDate = getStartDate();
  return new Date(startDate.getFullYear() + 62, 9, 29);
}

function dadsDeathDate() {
  const startDate = getStartDate();
  return new Date(startDate.getFullYear() + 28, 9, 29);
}

function graduatedHigh() {
  const startDate = getStartDate();
  return new Date(startDate.getFullYear() + 17, 3, 16);
}

function firstPostSecJob() {
  const startDate = getStartDate();
  return new Date(startDate.getFullYear() + 24, 5, 16);
}

function getTdClassName(currYear, currWeek, numWeeks) {
  const gridWeek = getWeekNumber(currYear, currWeek);
  if (isSameWeek(dadsDeath(), gridWeek)) return "fill-black";
  else if (isSameWeek(dadsDeathDate(), gridWeek)) return "fill-black";
  else if (isSameWeek(metWife(), gridWeek)) return "fill-pink";
  else if (isSameWeek(graduatedCollege(), gridWeek)) return "fill-red";
  else if (isSameWeek(graduatedUni(), gridWeek)) return "fill-blue";
  else if (isSameWeek(getStartDate(), gridWeek)) return "fill-white";
  else if (isSameWeek(covid(), gridWeek)) return "fill-green";
  else if (isSameWeek(graduatedHigh(), gridWeek)) return "fill-orange";
  else if (isSameWeek(firstPostSecJob(), gridWeek)) return "fill-yellow";
  else if (gridWeek <= numWeeks) return "fill";
  else return "";
}

function renderAgeStats() {
  const age = getDatesArray().length;
  document.getElementById("age").innerHTML = `Age: ${Math.floor(
    age / 7 / 52
  )} Years`;
  document.getElementById("time-lived").innerHTML = `Time Alive: ${Math.floor(
    age / 7
  )} Weeks / ${age} Days`;
  document.getElementById("time-left").innerHTML = `Time Left: ${Math.floor(
    80 * 52 - age / 7
  )} Weeks / ${80 * 52 * 7 - age} Days`;
}

function generateGrid() {
  const datesArray = getDatesArray();
  const numWeeks = Math.floor(datesArray.length / 7);
  let rows = [...Array(80).keys()].map((_, year) => {
    let tds = [...Array(52).keys()]
      .map((_, week) => {
        let currYear = year + 1;
        let currWeek = week + 1;
        const className = getTdClassName(currYear, currWeek, numWeeks);
        return `<td id=${getWeekNumber(
          currYear,
          currWeek
        )} class=${className}></td>`;
      })
      .join("");
    return `<tr>${tds}</tr>`;
  });
  document.getElementById("life-grid").innerHTML = rows.join("");
}

generateGrid();
renderAgeStats();
