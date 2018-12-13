<template>
  <section>
    <button @click="goBack">back</button>
    <p>Let's start a new workout</p>
    <workoutForm v-bind:grabLift="grabLift"></workoutForm>
    <workout v-bind:lifts="lifts" v-bind:addSet="addSet"></workout>
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
      },
      addSet(event, weight, reps) {
        event.preventDefault();
        const name = (event.target.parentElement.parentElement.children[0]).innerHTML;
        this.lifts = this.lifts.map(lift => {
          if(lift.name === name) {
            return {
              name,
              sets: [
                ...lift.sets, {
                  weight,
                  reps
                }
              ]
            }
          }
          return lift
        })
      }
    }
  }
</script>