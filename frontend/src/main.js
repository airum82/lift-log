// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase';

Vue.config.productionTip = false

const config = {
  apiKey: "AIzaSyBCutCw8DzykJJdTq-rEp91CoLFhmfDgJc",
  authDomain: "lift-log-88e43.firebaseapp.com",
  databaseURL: "https://lift-log-88e43.firebaseio.com",
  projectId: "lift-log-88e43",
  storageBucket: "",
  messagingSenderId: "828281668963"
};
firebase.initializeApp(config);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

