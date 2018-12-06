<template>
  <div class="landing">
    <router-link to="/log">view your log</router-link>
    <h1>Welcome to lift log: A workout tracker made by a lifter for me, but I guess you can use it too, enjoy!</h1>
    <Options />
  </div>
</template>

<script>
import Options from './Options.vue';
export default {
  components: {
    Options
  },
  data () {
    return {
      
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
