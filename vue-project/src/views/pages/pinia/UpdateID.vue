<script setup lang="ts">
import PageHead from '@/components/PageHead.vue';
import { RouterLink } from 'vue-router';
import { useCounterstate } from '@/store/count';
import { ref } from 'vue';
const counter = useCounterstate();
const id = ref(counter.id);
function updateId() {
    counter.setId(id.value);
}


</script>

<template>
    <PageHead title="Update ID" subtitle="Update ID from here">
        <RouterLink class="btn-solid theme-accent" to="/"><i class="bi bi-arrow-left"></i> Back to dashboard
        </RouterLink>

    </PageHead>
    <section class="section-gap">
        <div class="card">
            <div class="card-body">
                <h5>Current ID: {{ counter.id }}</h5>
                <button class="btn-solid theme-primary mt-4" @click="counter.random">update ID</button>
                <form @submit.prevent="updateId">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Enter a new id" v-model="id">
                        <button class=" btn-outline theme-primary btn-input-group" type="submit">Apply</button>

                    </div>

                </form>


            </div>
        </div>
    </section>






</template>