<script setup lang="ts">
import { ref } from 'vue';
import HelloWorld from './components/HelloWorld.vue';
 
      const name = "Mina";
      const age = 23;
      const count = ref(0);
      
      function test(){
        alert("Hi there");
      }
      
</script>

<template>
  <h1 class="heading">Hello Round 70</h1>
  <p>Hello Mickey</p>
  <HelloWorld />
  <p>Name: {{ name }}</p>
  <p>Age: {{ age }}</p>
  <button @click="test">Test 2</button>
  <div class="count">
    <button @click="count--">-</button> &nbsp;
    <span>{{ count }}</span> &nbsp;
    <button @click="count++">+</button>
  </div>
</template>
<style scoped>
.heading {
  color: rgb(166, 86, 242);
}
.count{
  color:rgb(18, 80, 212)
}
</style>
