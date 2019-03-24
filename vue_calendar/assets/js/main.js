import Vue from 'vue';
import App from './App.vue';

// Import Vuex state store.
import Vuex from 'vuex';
Vue.use(Vuex);

import moment from 'moment-timezone';
moment.tz.setDefault('UTC');

// Create moment object to use in any component.
Object.defineProperty(Vue.prototype, '$moment', {
  get() { return this.$root.moment }
});

// Vuex store file.
import store from './store/store.js';

var app = new Vue({
  el: '#app',
  data: {
    moment
  },
  components: {
    App
  },
  render: h => h(App),
  store
});
