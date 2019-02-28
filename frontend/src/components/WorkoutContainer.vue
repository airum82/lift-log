<template>
  <section>
    <button @click="goBack">back</button>
    <p>Let's start a new workout</p>
    <workoutForm 
      v-bind:grabLift="grabLift" 
      v-bind:currentDay="currentDay"
      v-bind:account="account"
      v-bind:lifts="recordedLifts"
    ></workoutForm>
    <section>
      <workout v-for="lift in currentWorkout"
        v-bind:lift="lift" 
        v-bind:addSet="addSet" 
        v-bind:currentDay="currentDay">
      </workout>
    </section>
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
        category: '',
        currentWorkout: []
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
      recordedLifts() {
        const log = this.fetchCurrentLog(this.logs, this.currentDay);
        if(log) {
          this.currentWorkout = [...this.currentWorkout,...log.exercises]
          return log.exercises
        }
        else return [];
      }
    },
    methods: {
      goBack() {
        this.$router.back();
      },
      grabLift(lift) {
        this.currentWorkout = [...this.currentWorkout, lift]
      },
      fetchCurrentLog(logs, date) {
       return Utils.findCurrentLog(logs, date);
      },
      addSet(event, weight, reps) {
        event.preventDefault();
        const name = (event.target.parentElement.parentElement.children[0]).innerHTML;
        this.currentWorkout = Utils.modifyLifts(this.currentWorkout, name, weight, reps)
        API.modifyLifts(this.account.uid, this.currentDay, this.currentWorkout)
      }
    }
  }
</script>