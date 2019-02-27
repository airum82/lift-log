<template>
  <div id="app">
    <router-view 
      v-bind:grabAccount="grabAccount"
      v-bind:account="account"
      v-bind:logs="logs"
      v-bind:copyPreviousWorkout="copyPreviousWorkout"
      v-bind:lifts="lifts"
    />
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  name: "App",
  data: () => ({
    account: {},
    logs: [],
    lifts: []
  }),
  methods: {
    grabAccount(account) {
      this.account = account;
    },
    copyPreviousWorkout(workout) {
      this.lifts = workout
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        fetch(`http://localhost:3000/api/log/${user.uid}`)
          .then(res => res.json())
          .then(result => {
            console.log(result);
            this.logs = result;
          })
          .catch(err => console.log(err));
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
