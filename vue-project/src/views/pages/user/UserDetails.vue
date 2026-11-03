<script setup lang="ts">
import { api, baseUrl } from '@/api';
import PageHead from '@/components/PageHead.vue';
import { defaultUser } from '@/interfaces/User';
import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const id = useRoute().params.id;
let user = ref(defaultUser);


function getItem() {
    api.post(`${baseUrl}graphql`, {
        query: `
            query {
                user(id: ${id}) {
                    id
                    name
                    email
                }
            }
        `,
    })
        .then((res) => {
            // console.log(res.data.data.user);
            user.value = res.data.data.user;
        })
        .catch((error) => {
            console.error(error.response.data);
        });

};
getItem();

</script>

<template>
    <PageHead title="User Details" subtitle="Show Details your user from here">
        <RouterLink class="btn-solid theme-accent" to="/users"><i class="bi bi-arrow-left"></i> Back to Users
        </RouterLink>
    </PageHead>





    <section class="section-gap">
        <div class="card">
            <div class="card-body">


                <hr class="mb-4">

                <div class="row g-4">

                   

                    <!-- Product Information -->
                    <div class="col-12">

                        <div class="card mb-3">
                            <div class="card-body">

                                <div class="col-12 md:col-6">
                                        <h6 class="mb-1">User ID</h6>
                                        <h5>{{ user.id }}</h5>
                                    </div>
                                <h5 class="mb-3">
                                    <i class="bi bi-info-circle"></i>
                                    General Information
                                </h5>
                                <hr>


                                <div class="row g-3">

                                    <div class="col-12 md:col-6">
                                        <h6 class="mb-1">User Name</h6>
                                        <h5>{{ user.name }}</h5>
                                    </div>

                                    <div class="col-12 md:col-6">
                                        <h6 class="text-muted mb-1">Email</h6>
                                        <h5>{{ user.email }}</h5>
                                    </div>
                                    

                                    

                                </div>
                            </div>
                        </div>

                       

                    </div>
                </div>

            </div>
        </div>
    </section>






</template>