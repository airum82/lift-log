<template>
  <section class="lifts">
    <ul>
      <li v-for="exercise in exercises">{{exercise}}</li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'workout',
    props: ['exercises'],
    data: () => ({
      
    }),
    methods: {

    }

  }
</script>