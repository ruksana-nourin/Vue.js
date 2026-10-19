<script setup lang="ts">
import { reactive, ref } from 'vue';
 const user = ref(
  {
    name:'Ruksana Nourin',
    age: 23
  }
 ); 
 function changeName(){
  //  if (user.value.name === 'Ruksana Nourin') {
  //   user.value.name = 'Roxy'
  // } else {
  //   user.value.name = 'Ruksana Nourin'
  // }
  user.value.name= 'Roxy';
   console.log(user.value.name);
 }

  const student = reactive(
  {
    name:'Mina',
    age: 23
  }
 ); 
 function changeStuName(){
  student.name ='Rani';
  console.log(student.name);

 }
</script>

<template>
 <p>Name: {{ user.name }}</p>
 <p>Age: {{ user.age }}</p>
 <!-- <button @click="user.name ='Roxy'">Change name</button> -->
 <button @click="changeName">Change name</button>
 <hr>
 <p>Name: {{ student.name }}</p>
 <p>Age: {{ student.age }}</p>
 <!-- <button @click="user.name ='Roxy'">Change name</button> -->
 <button @click="changeStuName">Change name</button>
</template>
<style scoped>
* {
  color: rgb(166, 86, 242);
}
</style>
