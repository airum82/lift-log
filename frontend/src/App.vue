<template>
  <div id="app">
    <router-view 
      v-bind:grabAccount="grabAccount"
      v-bind:user="account"
    />
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'App',
  data: () => ({
    account: {}
  }),
  methods: {
    grabAccount(account) {
      this.account = account;
    }
  },
  mounted() {
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          this.account = user;
        }
      })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
