<template>
  <div class="month-selector">
    <button @click="decrement"
            @keyup.left="decrement()">&#8606;</button>
    <div class="header-month">{{ formattedDate }}</div>
    <button @click="increment"
            @keyup.right="increment()">&#8608;</button>
</div>
</template>


<script>
export default {
  name: 'CurrentMonth',
  methods: {
    decrement () {
      // If month is January set month to December and decrement year,
      // otherwise decrement month as normal.
      if (this.month === 1) {
        this.$store.commit('setCurrentMonth', 12);
        this.$store.commit('setCurrentYear', this.year - 1);
      } else {
        this.$store.commit('setCurrentMonth', this.month - 1);
      }
      // Change eventFormActive state to false when decrement is pressed.
      this.$store.commit('eventFormActive', false);
    },
    increment () {
      // If month is December increment year and month,
      // otherwise increment month as normal.
      if (this.month === 12) {
        this.$store.commit('setCurrentMonth', 1);
        this.$store.commit('setCurrentYear', this.year + 1);
      } else {
        this.$store.commit('setCurrentMonth', this.month + 1);
      }
      // Change eventFormActive state to false when increment is pressed.
      this.$store.commit('eventFormActive', false);
    }
  },
  computed: {
    /* Format date for CurrentMonth component */
    formattedDate() {
      return this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D').format('MMMM YYYY');
    },
    /* Current month */
    month() {
      return this.$store.state.currentMonth;
    },
    /* Current year */
    year() {
      return this.$store.state.currentYear;
    }
  }
}
</script>

<style lang='scss'>
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

.header-month {
  font-size: 1.35rem;
}
</style>
