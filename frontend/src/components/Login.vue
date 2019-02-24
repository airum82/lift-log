<template>
  <form>
    <h1>Login</h1>
    <input type="text" name="email" v-model="email"/>
    <input type="password" name="password" v-model="password"/>
    <button>Login</button>
  </form>
</template>
<script>
export default {
  name: 'login',
  props: ["grabAccount"],
  data: () => ({
    email: '',
    password: ''
  })
}
</script>