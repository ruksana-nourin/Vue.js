<script lang="ts">
import HelloWorld from './components/HelloWorld.vue';

export default {

  components: {
    HelloWorld
  },
  setup() {
    return {
      name: "Mina",
      age: 23,
      
      test2: () => {
        alert("hi 2");
      },
    }
  }
}

</script>

<template>
  <h1 class="heading">Hello Round 70</h1>
  <p>Hello Mickey</p>
  <HelloWorld />
  <p>Name: {{ name }}</p>
  <p>Age: {{ age }}</p>
  <button @click="test2">Test2</button>
</template>
<style scoped>
.heading {
  color: rgb(166, 86, 242);
}
</style>
