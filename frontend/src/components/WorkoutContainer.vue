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
  import * as API from '../API/API-exercises';
  import * as Utils from '../Utils';
  import workoutForm from './workoutForm.vue';
  import Workout from './Workout.vue';
  export default {
    name: 'workout-container',
    props: ["account", "previousWorkout", "logs"],
    components: {
      workoutForm,
      Workout
    },
    data: function() {
      return {
        category: ''
      }
    },
    computed: {
      currentDay() {
        const today = new Date();
        const day = today.getDate().toString();
        const month = (today.getMonth() + 1).toString();
        const year = today.getFullYear().toString();
        return day + month + year;
      },
      lifts() {
        const log = this.fetchCurrentLog(this.logs, this.currentDay);
        if(log) return log.exercises;
      }
    },
    methods: {
      goBack() {
        this.$router.back();
      },
      grabLift(lift) {
        this.lifts = [...this.lifts, lift]
      },
      fetchCurrentLog(logs, date) {
       return Utils.findCurrentLog(logs, date);
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
        fetch(`http://localhost:3000/api/log/${this.account.uid}/${this.currentDay}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.lifts)
        })
          .then(res => res.json())
          .then(result => console.log(result))
          .catch(err => console.log(err))
      }
    }
  }
</script>