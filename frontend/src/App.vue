<template>
  <div id="app">
    <router-view 
      v-bind:grabAccount="grabAccount"
      v-bind:account="account"
      v-bind:logs="logs"
      v-bind:copyPreviousWorkout="copyPreviousWorkout"
      v-bind:previousWorkout="previousWorkout"
    />
  </div>
</template>

<script>
import firebase from "firebase";
import * as API from './API/API-exercises'
export default {
  name: "App",
  data: () => ({
    account: {},
    logs: [],
    previousWorkout: {}
  }),
  methods: {
    grabAccount(account) {
      this.account = account;
    },
    copyPreviousWorkout(workout) {
      this.previousWorkout = workout
    }
  },
  created() {
    console.log('app created')
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        API.fetchAllLogs(user.uid)
          .then(result => this.logs = result)
        this.account = user;
      }
    });
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
