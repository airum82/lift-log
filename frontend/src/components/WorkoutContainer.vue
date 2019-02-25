<template>
  <section>
    <button @click="goBack">back</button>
    <p>Let's start a new workout</p>
    <workoutForm 
      v-bind:grabLift="grabLift" 
      v-bind:currentDay="currentDay"
      v-bind:account="account"
      v-bind:lifts="lifts"
    ></workoutForm>
    <workout v-bind:lifts="lifts" v-bind:addSet="addSet" v-bind:currentDay="currentDay"></workout>
  </section>
</template>

<script>
  import workoutForm from './workoutForm.vue';
  import Workout from './Workout.vue';
  export default {
    name: 'workout-container',
    props: ["account"],
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
    computed: {
      currentDay() {
        const today = new Date();
        const day = today.getDate().toString();
        const month = (today.getMonth() + 1).toString();
        const year = today.getFullYear().toString();
        return day + month + year;
      }
    },
    methods: {
      goBack() {
        this.$router.back();
      },
      grabLift(lift) {
        this.lifts = [...this.lifts, lift]
      },
      fetchCurrentLog() {
        return fetch(`http://localhost:3000/api/log/${this.account.uid}`)
          .then(response => response.json())
          .then(result => {
            console.log(result)
            const workout = result.find(workout => {
              return this.currentDay === workout.date;
            })
            this.lifts = workout.exercises
          })
          .catch(err => console.log(err))
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
    },
    mounted() {
      this.fetchCurrentLog();
    }
  }
</script>