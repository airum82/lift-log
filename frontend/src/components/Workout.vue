<template>
  <section class="lifts">
    <ul>
      <li v-for="lift in lifts">{{ lift }}</li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'workout',
    props: ['lifts'],
    data: () => ({
      
    }),
    methods: {

    }

  }
</script>