<script setup lang="ts">
const list = ["Apple", "Banna","orange"];

 
</script>

<template>
 <h2>Loop</h2>
 <ul>
    <!-- <li v-for="item in list" v-bind:key="item">{{ item }}</li> -->
    <li v-for="item in list" :key="item">{{ item }}</li>
 </ul>
</template>
<style>
</style>
