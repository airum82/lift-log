<template>
  <div class="landing">
    <h2 v-if="account.uid">Welcome {{ account.email }}</h2>
    <h2 v-else>Signup or Login to get started</h2>
    <button v-if="account.uid" v-on:click="signOut">SignOut</button>
    <router-link to="/login">Login/SignUp</router-link>
    <router-link to="/log">view your log</router-link>
    <h1>Welcome to lift log: A workout tracker made by a lifter for me, but I guess you can use it too, enjoy!</h1>
    <Options />
  </div>
</template>

<script>
import Options from './Options.vue';
import firebase from 'firebase';
export default {
  props: ["account", "grabAccount"],
  components: {
    Options
  },
  data: () => {
    return {
      
    }
  },
  methods: {
    signOut() {
      firebase.auth().signOut()
        .then(() => this.grabAccount({}))
        .then(() => console.log('Signed Out'))
        .catch(err => console.log(err));
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
