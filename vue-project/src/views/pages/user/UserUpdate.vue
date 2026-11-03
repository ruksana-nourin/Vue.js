<script setup lang="ts">
import { RouterLink, useRoute, useRouter } from 'vue-router';
import PageHead from '../../../components/PageHead.vue';
import { ref } from 'vue';
import { defaultUser } from '@/interfaces/User.ts';

import { api, baseUrl } from '@/api.ts';
let route = useRouter();
let user = ref(defaultUser);
const id = useRoute().params.id;
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

function handleSubmit() {
    console.log(user.value);
    api.post(`${baseUrl}graphql`, {
        query: `
      mutation UpdateUser(
          $id: ID!,
          $name: String, 
          $email: String, 
        ) 
      {
        updateUser(id: $id, name: $name, email: $email) {
          id
          name
          email
        }
      }
    `,
        variables: {
            id: id,
            name: user.value.name,
            email: user.value.email,
        },
    })
        .then((res) => {
            console.log(res.data);
            route.push('/users');
        })
        .catch((err) => {
            console.error(err.response.data);
        });

}


</script>

<template>
    <PageHead title="Update user" subtitle="Update user information from here">
        <RouterLink class="btn-solid theme-accent" to="/users"><i class="bi bi-arrow-left"></i> Back to Users
        </RouterLink>

    </PageHead>

    <section class="section-gap">
        <div class="card">
            <div class="card-body">

                <form v-on:submit.prevent="handleSubmit" enctype="multipart/formdata">
                    <div class="row g-3">
                        <div class="col-12 md:col-6">
                            <div class="form-field">
                                <label class="form-label">Id</label>
                                <input type="text" class="form-control" v-model="user.id" disabled>
                            </div>
                        </div>
                        <div class="col-12 md:col-6">
                            <div class="form-field">
                                <label class="form-label">Name</label>
                                <input type="text" class="form-control" v-model="user.name">
                            </div>
                        </div>
                        <div class="col-12 md:col-6">
                            <div class="form-field">
                                <label class="form-label">E-mail</label>
                                <input type="text" class="form-control" v-model="user.email">
                            </div>
                        </div>



                        <div class="col-12 form-actions justify-content-end">
                            <button type="submit" class="btn-solid theme-accent"><i class="bi bi-pencil-fill"></i>Update
                                User</button>
                            <button type="reset" class="btn-outline theme-secondary">Reset</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>




</template>