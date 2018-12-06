<template>
  <div>
    <h2>Would you like to:</h2>
    <h3>
      <router-link to="/WorkoutContainer">Start a new workout?</router-link>
    <br>
    or
    <br>
    Copy a previous workout?
    </h3>
  </div>
</template>

<script>
export default {
  name: 'message'
}
</script>
