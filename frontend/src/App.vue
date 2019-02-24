<template>
  <div id="app">
    <router-view v-bind:grabAccount="grabAccount"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data: {
    account: {}
  },
  methods: {
    grabAccount(account) {
      this.account = account;
    }
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
