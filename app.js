Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function getDates(startDate, stopDate) {
  var dateArray = new Array();
  var currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate));
    currentDate = currentDate.addDays(1);
  }
  return dateArray;
}

Date.prototype.getWeekNumber = function () {
  var d = new Date(
    Date.UTC(this.getFullYear(), this.getMonth(), this.getDate())
  );
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

function isSameWeek(date1, date2) {
  if (
    date1.getFullYear() == date2.getFullYear() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getWeekNumber() == date2.getWeekNumber()
  ) {
    return true;
  }
  return false;
}

function getStartDate() {
  return new Date("1992-01-29");
}

function getGridDate(year, week) {
  const startDate = getStartDate();
  const day = 1 + (week - 1) * 7;
  return new Date(
    startDate.getFullYear() + year,
    startDate.getMonth(),
    startDate.getDate() + day
  );
}

function dadsDeath() {
  const startDate = getStartDate();
  return new Date(startDate.getFullYear() + 62, 9, 29);
}

function weMet() {
  const startDate = getStartDate();
  return new Date(startDate.getFullYear() + 24, 5, 16);
}

function getDatesArray() {
  return getDates(getStartDate(), new Date());
}

function renderAgeStats() {
  const age = getDatesArray().length;
  document.getElementById("age").innerHTML = `Current Age: ${Math.floor(
    age / 7 / 52
  )} Years`;
  document.getElementById("time-lived").innerHTML = `Time Lived: ${Math.floor(
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
        if (year == 0) {
          return `<td id=${year + 1 * week + 1} ${
            year + 1 * week + 1 <= numWeeks ? "class=fill" : ""
          }></td>`;
        } else {
          return `<td id=${year + 1 * week + 1 + 52 * year} ${
            isSameWeek(dadsDeath(), getGridDate(year + 1, week + 1))
              ? "class=fill-red"
              : isSameWeek(weMet(), getGridDate(year + 1, week + 1))
              ? "class=fill-blue"
              : year + 1 * week + 1 + 52 * year < numWeeks
              ? "class=fill"
              : year + 1 * week + 1 + 52 * year == numWeeks
              ? "class=fill-green"
              : ""
          }></td>`;
        }
      })
      .join("");
    return `<tr>${tds}</tr>`;
  });
  document.getElementById("life-grid").innerHTML = rows.join("");
}

generateGrid();
renderAgeStats();
