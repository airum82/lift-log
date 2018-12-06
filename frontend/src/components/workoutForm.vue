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
    </form>
    <section class="lift-list">
      <li v-for="exercise in this.exercises">{{ exercise.exercise }}</li>
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
        err: ''
      }
    },
    methods: {
      addLift(event) {
        
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