<template>
  <section class="calendar">
    <button @click="goBack">back</button>
     <div class='calendar'>
    <div class='header'>
      <a class='arrow' @click='movePreviousYear'>&laquo;</a>
      <a class='arrow' @click='movePreviousMonth'>&lsaquo;</a>
      <span class='title' @click='moveThisMonth'>
        {{ header.label }}
      </span>
      <a class='arrow' @click='moveNextMonth'>&rsaquo;</a>
      <a class='arrow' @click='moveNextYear'>&raquo;</a>
    </div>
    <div class='weekdays'>
      <div class='weekday' v-for='weekday in weekdays'>
        {{ weekday.label }}
      </div>
    </div>
    <div class='week' v-for='week in weeks'>
      <div class='day' :class='{ today: day.isToday }' v-for='day in week'>
        {{ day.label }}
      </div>
    </div>
  </div>
  <button v-on:click="grabAllLogs">grab logs</button>
  </section>
</template>

<script>
  const _daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const _weekdayLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const _weekdayLength = 3;
  const _weekdayCasing = 'title';
  const _monthLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const _monthLength = 0;
  const _monthCasing = 'title';

  // Helper function for label transformation
  const _transformLabel = (label, length, casing) => {
    label = length <= 0 ? label : label.substring(0, length);
    if (casing.toLowerCase() === 'lower') return label.toLowerCase();
    if (casing.toLowerCase() === 'upper') return label.toUpperCase();
    return label;
  };

  // Today's data
  const _today = new Date();
  const _todayComps = {
    year: _today.getFullYear(),
    month: _today.getMonth() + 1,
    day: _today.getDate()
  };
  export default {
    name: 'Log',
    props: ["account"],
    data() {
      return {
        month: _todayComps.month,
        year: _todayComps.year
      }
    },
    computed: {
      monthIndex() {
        return this.month - 1;
      },
      months() {
        return _monthLabels.map((ml, i) => {
          return {
            label: _transformLabel(ml, _monthLength, _monthCasing),
            number: i + 1
          };
        });
      },
      weekdays() {
        return _weekdayLabels.map((wl, i) => ({
          label: _transformLabel(wl, _weekdayLength, _weekdayCasing),
          number: i + 1
        }));
      },
      header() {
        const month = this.months[this.monthIndex];
        return {
          month,
          year: this.year.toString(),
          shortYear: this.year.toString().substring(2, 4),
          label: month.label + ' ' + this.year
        };
      },
      firstWeekdayInMonth() {
        return new Date(this.year, this.monthIndex, 1).getDay() + 1;
      },
      daysInMonth() {
        const isFebruary = this.month === 2;
        const isLeapYear = (this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0;
        if (isFebruary && isLeapYear) return 29;
        return _daysInMonths[this.monthIndex];
      },
      weeks() {
        const weeks = [];
        let monthStarted = false, monthEnded = false;
        let monthDay = 0;
        for(let w = 1; w <= 6 && !monthEnded; w++) {
          const week = [];
          for(let d = 1; d <= 7; d++) {
            if(!monthStarted && d >= this.firstWeekdayInMonth) {
              monthDay = 1;
              monthStarted = true;
            } else if(monthStarted && !monthEnded) {
              monthDay += 1;
            }
            week.push({
              label: monthDay ? monthDay.toString() : '',
              number: monthDay,
              weekdayNumber: d,
              weekNumber: w,
              beforeMonth: !monthStarted,
              inMonth: monthStarted && !monthEnded,
              isToday: monthDay === _todayComps.day && this.month === _todayComps.month && this.year === _todayComps.year,
              isFirstDay: monthDay === 1,
              isLastDay: monthDay === this.daysInMonth
            });
            if(monthStarted && !monthEnded && monthDay >= this.daysInMonth) {
              monthDay = 0;
              monthEnded = true;
            }
          }
          weeks.push(week);
        }
        return weeks;
      }
    },
    methods: {
      goBack() {
        this.$router.back();
      },
      moveThisMonth() {
        this.month = _todayComps.month;
        this.year = _todayComps.year;
      },
      moveNextMonth() {
        if(this.month < 12) {
          this.month++;
        } else {
          this.month = 1;
          this.year++;
        }
      },
      movePreviousMonth() {
        if(this.month > 1) {
          this.month--;
        } else {
          this.month = 12;
          this.year--;
        }
      },
      moveNextYear() {
        this.year++;
      },
      movePreviousYear() {
        this.year--;
      },
      grabAllLogs() {
        fetch(`http://localhost:3000/api/log/${this.account.uid}`)
          .then(res => res.json())
          .then(result => console.log(result))
          .catch(err => console.log(err))
      }
    }
  }
</script>

<style lang="scss" scoped>
$themeColor: #ff7a58;

$headerPadding: 0.5rem 1rem;
$headerBorderWidth: 1px;
$headerBorderStyle: solid;
$headerBorderColor: #aaaaaa;
$headerBackground: $themeColor;
$headerColor: white;

$weekdayPadding: 0.4rem 0;
$weekdayColor: #7a7a7a;
$weekdayBorderWidth: 1px;
$weekdayBorderStyle: solid;
$weekdayBorderColor: #aaaaaa;
$weekdayBackground: #eaeaea;

$dayColor: #3a3a3a;
$dayBorder: solid 1px #aaaaaa;
$dayBackgroundColor: white;
$dayWidth: 14.2857%;
$dayHeight: 50px;

$todayColor: white;
$todayBackgroundColor: $themeColor;

$fontFamily: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;


* {
  box-sizing: border-box;
}

#app {
  font-family: $fontFamily;
  padding: 20px;
}

.calendar {
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: stretch;
  align-items: center;
  color: $headerColor;
  padding: $headerPadding;
  border-width: $headerBorderWidth;
  border-style: $headerBorderStyle;
  border-color: $headerBorderColor;
  background-color: $headerBackground;
}
  
  // =pointer() {
  //   cursor: pointer
  //   &:hover
  //     color: #dcdcdc

  // }
  
  .arrow {
    // +pointer;
    padding: 0 0.4em 0.2em 0.4em;
    font-size: 1.8rem;
    font-weight: 500;
    user-select: none;
    flex-grow: 0;
  }
    
  .title {
    // +pointer
    flex-grow: 1;
    font-size: 1.2rem;
    text-align: center;
  }

.weekdays {
  display: flex;
  flex: auto;
}
  
.weekday {
  width: $dayWidth;
  display: flex;
  justify-content: center;
  align-items: center;  
  padding: $weekdayPadding;
  color: $weekdayColor;
  border-width: $weekdayBorderWidth;
  border-style: $weekdayBorderStyle;
  border-color: $weekdayBorderColor;
  background-color: $weekdayBackground;
}
  
.week {
  display: flex;
}
  
.day {
  width: $dayWidth;
  height: $dayHeight;
  display: flex;
  justify-content: center;
  align-items: center;
  color: $dayColor;
  background-color: $dayBackgroundColor;
}
</style>
