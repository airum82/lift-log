<template>
  <article>
    <h3>{{ lift.name }}</h3>
    <button v-on:click="toggleForm">{{ showSetForm ? 'cancel' : 'add set' }}</button>
    <form v-if="showSetForm">
      <label for="weight">weight:</label>
      <input type="text" id="weight" v-model="weight"/>
      <label for="reps">reps:</label>
      <input type="text" id="reps" v-model="reps"/>
      <button v-on:click="(event) => {
          addSet(event, weight, reps);
          toggleForm();
        }">create</button>
    </form>
    <div v-for="set in lift.sets"> 
      <p>weight: {{ set.weight }}</p>
      <p>reps: {{ set.reps }}</p>
      <hr>
    </div>
  </article>
</template>

<script>
export default {
  name: "workout",
  props: ["lift", "addSet", "currentDay"],
  data: () => ({
    showSetForm: false,
    weight: "",
    reps: "",
  }),
  methods: {
    toggleForm() {
      this.showSetForm = !this.showSetForm;
    },
  },
};
</script>