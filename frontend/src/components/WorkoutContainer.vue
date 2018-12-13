<template>
  <section>
    <button @click="goBack">back</button>
    <p>Let's start a new workout</p>
    <workoutForm v-bind:grabLift="grabLift"></workoutForm>
    <workout v-bind:lifts="lifts"></workout>
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
        lifts: []
      }
    },
    methods: {
      goBack() {
        this.$router.back();
      },
      grabLift(lift) {
        this.lifts = [...this.lifts, lift]
      }
    }
  }
</script>