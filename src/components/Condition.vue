<script setup lang="ts">
import { ref } from 'vue';

// const num: number = 15;
const count = ref(0);
</script>

<template>
    <h2>Condition</h2>
    <!-- <p v-if="num < 10"> Number: {{ num }}</p> -->
    <!-- <p v-if="num < 10"> Number is Less Then 10</p> -->
    <!-- <p v-else> Number is Less Then {{ num }}</p> -->

    <!-- <p v-if="num > 0">Number is Positive</p>
    <p v-else-if="num == 0">Number is 0</p>
    <p v-else-if="num < 0">Number is Negitive</p> -->
    <div>

        <button @click="count--">-</button> &nbsp;
        <span>{{ count}}</span>&nbsp;
        <button @click="count++">+</button>

        <p v-if="count> 0">Number is Positive</p>
        <p v-else-if="count== 0">Number is 0</p>
        <p v-else>Number is Negitive</p>
        
    </div>
    <div v-if="count != 0">
        <p v-if="count%2 == 0">Number is Even</p>
        <p v-else>Number is odd</p>
    </div>
    <p v-else>Number is nither even nor add</p>






</template>
