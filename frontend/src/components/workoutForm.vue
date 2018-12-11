<template>
  <div>
    <form>
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
      <input type="text" v-model="exercise"/>
      <button v-on:click="this.createLift">create</button>
    </form>
    <section class="lift-list">
      <li v-for="exercise in this.exercises">{{ exercise.name }}</li>
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
    methods: {
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
      }
    }
  }
</script>