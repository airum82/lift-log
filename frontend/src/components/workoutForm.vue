<template>
  <div>
    <form>
      <button v-on:click="this.startNewWorkout">click here</button>
      <p>Select muscle group</p>
      <select class="group-list" v-model="muscleGroup" v-on:change="this.grabLifts">
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
        <button v-on:click="this.createLift">create</button>
      </div>
    </form>
    <section class="lift-list">
      <ul v-on:click="this.addLift">
        <li v-for="exercise in this.exercises">{{ exercise.name }}</li>
      </ul>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'workoutForm',
    props: [ "grabCategory"],
    data: () => {
      return {
        muscleGroup: 'Select Muscle Group',
        exercises: [],
        err: '',
        exercise: ''
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
      fetchWorkoutLog() {
        return fetch('http://localhost:3000/api/log')
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(err => console.log(err)) 
      },
      startNewWorkout(event) {
        event.preventDefault();
        return fetch(`http://localhost:3000/api/log/${this.currentDay}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(err => console.log(err))

      },
      createLift(event) {
        return fetch(`http://localhost:3000/api/bodyGroups/${this.muscleGroup}/new`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          body: JSON.stringify({ name: this.exercise })
        })
        .then(res => res.json())
        .then(result => console.log(result))
        .catch(err => console.log(err))
      },
      grabLifts() {
        return fetch(`http://localhost:3000/api/bodyGroups/${this.muscleGroup}`)
          .then(response => response.json())
          .then(result => this.exercises = result)
          .catch(err => this.err = err)
      },
      addLift(event) {
        console.log((event.target).innerText);
      }
    },
    mounted() {
      this.fetchWorkoutLog();
    }
  }
</script>