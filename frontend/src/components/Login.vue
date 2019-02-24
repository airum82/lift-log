<template>
  <section>
  <form v-on:submit="login">
    <h1>Login</h1>
    <input type="text" name="email" v-model="email"/>
    <input type="password" name="password" v-model="password"/>
    <button>Login</button>
  </form>
  <h2>Or</h2>
  <form v-on:submit="signUp">
    <h1>Sign Up</h1>
    <input type="text" name="email" v-model="email"/>
    <input type="password" name="password" v-model="password"/>
    <button>Sign Up</button>
  </form>
  </section>
</template>
<script>
import firebase from 'firebase';
export default {
  name: 'login',
  props: ["grabAccount"],
  data: () => ({
    email: '',
    password: ''
  }),
  methods: {
    login() {
      event.preventDefault();
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.grabAccount(user);
        })
        .catch(err => console.log(err))
    },
    signUp() {
      event.preventDefault();
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.grabAccount(user)
        })
        .catch(err => console.log(err))
    }
  }
}
</script>