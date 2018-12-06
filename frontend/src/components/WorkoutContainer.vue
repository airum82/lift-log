<template>
  <section>
    <button @click="goBack">back</button>
    <p>Let's start a new workout</p>
    <workoutForm v-bind:grabCategory="grabCategory"></workoutForm>
    <workout></workout>
  </section>
</template>

<script>
  import workoutForm from './workoutForm.vue';
  import Workout from './Workout.vue';
  export default {
    name: 'workout-container',
    components: {
      workoutForm,
      Workout
    },
    data: function() {
      return {
        category: '',
        exercises: []
      }
    },
    methods: {
      goBack() {
        this.$router.back();
      },
      grabCategory(event) {
        this.category = event.target.value
      }
    }
  }
</script>