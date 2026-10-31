<script setup lang="ts">
import PageHead from '@/components/PageHead.vue';
import { RouterLink } from 'vue-router';
import { useCounterstate } from '@/store/count';
const counter = useCounterstate();


</script>

<template>
    <PageHead title="Count" subtitle="Count from here">
        <RouterLink class="btn-solid theme-accent" to="/"><i class="bi bi-arrow-left"></i> Back to dashboard
        </RouterLink>

    </PageHead>
    <section class="section-gap">
        <div class="card">
            <div class="card-body">
                <div class="d-flex  justify-content-center align-items-center gap-4 mb-4">

                    <button class="btn-outline theme-accent" @click="counter.decrement">Decrement-</button>
                    <h5>Count: {{ counter.count }}</h5>
                    <button class="btn-outline theme-accent" @click="counter.increment">Increment+</button>
                </div>
                <ul>
                    <li>Double: {{ counter.double }}</li>
                    <li>Triple: {{ counter.triple }}</li>
                    <li>Square: {{ counter.square }}</li>
                </ul>
                <button class="btn-solid theme-dark mt-4" @click="counter.reset"><i class="bi bi-arrow-counterclockwise"></i>Reset</button>
            </div>
        </div>
    </section>






</template>