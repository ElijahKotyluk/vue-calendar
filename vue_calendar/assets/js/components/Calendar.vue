<template>
  <div>
    <div id="header">
      <div class="header-title">
        <h1>Vue Moment Calendar</h1>
      </div>
      <div>
        <current-month></current-month>
      </div>
    </div>
    <div id="days-bar">
      <div v-for="day in headerDays" :key="day.id">{{ day.title }}</div>
    </div>
    <div id="calendar">
      <div v-for="week in weeks" class="calendar-week">
          <calendar-days v-for="day in week" :day="day"></calendar-days>
      </div>
    </div>
    <event-form></event-form>
  </div>
</template>


<script>
import CalendarDays from './CalendarDays.vue';
import CurrentMonth from './CurrentMonth.vue';
import EventForm from './EventForm.vue';

export default {
  name: 'Calendar',
  data () {
    return {
      headerDays: [
        { title: 'Mon' },
        { title: 'Tue' },
        { title: 'Wed' },
        { title: 'Thu' },
        { title: 'Fri' },
        { title: 'Sat' },
        { title: 'Sun' }
      ],
      events: []
    }
  },
  computed: {
    // Current Month
    month() {
      return this.$store.state.currentMonth;
    },
    // Current Year
    year() {
      return this.$store.state.currentYear;
    },
    // Generate days in current month.
    days() {
      // Empty array to push days to.
      let days = [];
      let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D');
      // Push currentDay to days array until all days in the current month are pushed.
      do {
        days.push(currentDay);
        // Instance of moment that increments currentDay until all days in the current month are pushed.
        currentDay = this.$moment(currentDay).add(1, 'days');
      } while ((currentDay.month() + 1) === this.month);
      // Add padding days from the end of the previous month.
      // Reset currentDay value to first day of the month.
      currentDay = this.$moment(days[0]);

      const SUNDAY = 0;
      const MONDAY = 1;

      if (currentDay.day() !== MONDAY) {
        // Unshift currentDay to days array while currentDay is not Monday.
        do {
          currentDay = this.$moment(currentDay).subtract(1, 'days');
          days.unshift(currentDay);
          // 1 is Monday in the moment library.
        } while (currentDay.day() !== MONDAY);
      }
      // Add padding days from the beginning of the following month.
      // Reset currentDay value to last day of the current month.
      currentDay = this.$moment(days[days.length - 1]);

      // If statement to correctly render padding days for the month of May.
      if (currentDay.day() !== SUNDAY) {
        // Push currentDay to days array while currentDay is not Sunday.
        do {
          currentDay = this.$moment(currentDay).add(1, 'days');
          days.push(currentDay);
        // 0 is Sunday in the moment library.
      } while (currentDay.day() !== SUNDAY);
    }
      return days;
    },
    // Group days into blocks of weeks.
    weeks() {
      // Multi-dimensional array that holds week arrays.
      let weeks = [];
      // Array that holds 7 days per week.
      let week = [];

      // Push days to week array.
      for (let day of this.days) {
        week.push(day);
        // When week array holds 7 days, empty the array.
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
      }

      return weeks;
    }
  },
  components: {
    CalendarDays,
    CurrentMonth,
    EventForm
  }
}
</script>


<style lang="scss">
/* Variable styles */
$border-color: rgba(65, 113, 125, 1);
$day-border: 1px solid $border-color;
$padding-days: rgba(172, 252, 172, 1);
$today: rgba(218, 193, 231, 1);
$active: rgba(222, 6, 6, 1);

/* Mixins */
@mixin calendar-row() {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

@mixin calendar-cell() {
  width: 100%;
  padding: 0.5rem;
}

/* Header */
#header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  color: #aeb8ae;
  letter-spacing: .1em;
  text-shadow: -1px -1px 1px #111,
  2px 2px 1px #363636;
  background-color: rgba(48, 48, 48, 1);
  -webkit-box-shadow: 0px 0px 9px 3px rgba(41,41,41,.25);
  -moz-box-shadow: 0px 0px 9px 3px rgba(41,41,41,.25);
  box-shadow: 0px 0px 9px 3px rgba(41,41,41,.25);

  div:first-child {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 1rem 0;
  }

  div:last-child {
    button {
      height: 20px;
      width: 20px;
      padding: 0px;
      font-size: 1rem;
      color: rgb(151, 152, 151);
      background-color: #4c4a4a;
      border-color: rgba(65, 113, 125, 1);
      user-select: none;
      box-shadow: -1px -1px 1px #111,
      2px 2px 1px #363636;
      border-radius: 2px;
      text-align: center;
      line-height: 5px;
      &:focus {
        outline: none;
      }
      &:hover {
        box-shadow: 0 1px 2px rgba(65, 113, 125, 1);
      }
    }
  }

  div.header-title {
    margin-left: 1rem;
  }

  div.header-month {
    margin: 0px 10px;
  }

  div.month-selector {
    margin-right: 1.35rem;
  }
}

/* List of days above calendar. */
#days-bar {
  background-color: rgba(33, 33, 33, 1);
  color: rgb(151, 152, 151);
  @include calendar-row;

  div {
    @include calendar-cell;
  }
}

/* Calendar */
#calendar {
  background-color: rgba(48, 48, 48, .9);
  color: rgb(151, 152, 151);

/* Week in Calendar */
  .calendar-week {
    @include calendar-row();

/* Day in Calendar */
    .day {
      @include calendar-cell();
      overflow: hidden;
      height: 144px;
      user-select: none;
      cursor: default;
      border-left: $day-border;
      border-top: $day-border;

        ul.event-list {
          width: 80%;
          height: 80%;
          padding-left: 0;
          margin: 0;
          margin-top: 5px;
          color: rgba(222, 222, 222, 0.9);
        }

/* Last day in each week */
      &:last-child {
        border-right: $day-border;
      }

/* Past days */
      &.past {
        opacity: 0.85;
      }

/* Padding days for previous and next month */
      &.not-current-month {
        background-color: $padding-days;
      }

/* Current day */
      &.today {
        background-color: rgba(65, 113, 125, .3);
      }
/* Active selected day. */
      &.active {
        background-color: rgba(250, 250, 250, .4);
      }
    }
/* Border for last week row. */
    &:last-child {
      .day {
        border-bottom: $day-border;
      }
    }
  }
}
</style>
