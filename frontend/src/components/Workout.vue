<template>
  <section class="lifts">
      <article v-for="lift in this.workout">
        <h3>{{ lift.name }}</h3>
        <button v-on:click="addSet">Add Set</button>
        <ul v-for="set in lift.sets"> 
          <li>weight: {{ set.weight }}</li>
          <li>reps: {{ set.reps }}</li>
        </ul>
      </article>
  </section>
</template>

<script>
  export default {
    name: 'workout',
    props: ['lifts'],
    data: () => ({
      workout: []
    }),
    methods: {
      addSet(event) {
        const name = (event.target.parentElement.children[0]).innerHTML;
        this.workout = this.workout.map(lift => {
          if(lift.name === name) {
            return {
              name,
              sets: [...lift.sets, {
                weight: 0,
                reps: 0
              }]
            }
          }
          return lift;
        })
      }
    },
    updated() {
      console.log('changed')
      this.workout = [...this.lifts]
    }

  }
</script>