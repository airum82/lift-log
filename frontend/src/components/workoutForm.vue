<template>
  <div>
    <form>
      <button v-on:click="startNewWorkout">click here</button>
      <p>Select muscle group</p>
      <select class="group-list" v-model="muscleGroup" v-on:change="fetchLifts">
        <option value="chest">Chest</option>
        <option value="back">Back</option>
        <option value="shoulders">Shoulders</option>
        <option value="core">Core</option>
        <option value="legs">Legs</option>
        <option value="biceps">Biceps</option>
        <option value="triceps">Triceps</option>
        <option value="forearms">Forearms</option>
      </select>
      <div>
        <h3>Create new lift or select from choices below</h3>
        <label for="lift">new lift:</label>
        <input type="text" v-model="exercise" id="lift"/>
        <button v-on:click="createLift">create</button>
      </div>
    </form>
    <section class="lift-list">
      <ul v-on:click="addLift">
        <li v-for="exercise in exercises">{{ exercise.name }}</li>
      </ul>
    </section>
  </div>
</template>

<script>
import * as API_groups from '../API/API-groups';
import * as API_exercises from '../API/API-exercises';
  export default {
    name: 'workoutForm',
    props: [ "grabLift", "currentDay", "account", "lifts", "dailyRecord"],
    data: () => {
      return {
        muscleGroup: 'Select Muscle Group',
        exercises: [],
        err: '',
        exercise: ''
      }
    },
    methods: {
      startNewWorkout(event) {
        event.preventDefault();
        API_exercises.createNewLog(this.currentDay, this.account.uid)
      },
      createLift(event) {
        event.preventDefault();
        API_groups.createExercise(this.muscleGroup, this.exercise)
      },
      fetchLifts() {
        API_groups.fetchMuscleGroup(this.muscleGroup)
          .then(result => this.exercises = result)
          .catch(err => console.log(err))
      },
      addLift(event) {
        const name = (event.target).innerText;
        const lift = {
          name,
          sets: []
        }
        this.addLiftToDb(lift)
          .then(() => this.grabLift(lift))
          .catch(err => console.log(err))
      },
      addLiftToDb(lift) {
        return API_exercises.modifyLifts(this.account.uid, this.currentDay, [...this.lifts, lift])
      }
    }
  }
</script>