<script setup lang="ts">
import { api, baseUrl } from '@/api.ts';
import PageHead from '../../../components/PageHead.vue';
import type { User } from '@/interfaces/User.ts';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const users = ref<User[]>([]);
function getAllUsers() {
    api.post(`${baseUrl}graphql`, {
        query: `
            query {
                users{
                    id
                    name
                    email
                }
            }
        `,
    })
        .then((res) => {
            // console.log(res.data.data.users);
            users.value = res.data.data.users;
        })
        .catch((error) => {
            console.error(error.response.data);
        });
}
getAllUsers();
function handleDelete(id: number) {
    console.log('Delete user with ID:', id);
    api.post(`${baseUrl}graphql`, {
        query: `
            mutation {
                deleteUser(id: ${id}){
                    id
                    name
                    email
                }
            }
        `,
    })
        .then((res) => {
            console.log(res.data.data.deleteUser);
            getAllUsers();
        })
        .catch((error) => {
            console.error(error.response.data);
        });
}

</script>

<template>
    <PageHead title="user" subtitle="Manage your user from here">
        <RouterLink to="/user-create" class="btn-solid theme-accent">Add New User</RouterLink>
    </PageHead>

    <section class="section-gap">
        <div class="card">
            <div class="card-body">
                <div class="table-head">
                    <h5 class="card-title">Recent orders</h5>
                    <span class="muted small">5 orders</span>
                </div>
                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in users" :key="item.id">
                                <td>{{ item.id }}</td>
                                
                                <td>{{ item.name }}</td>
                                <td>{{ item.email }}</td>
                                

                                <td>
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <RouterLink type="button" :to="`/user/${item.id}`"
                                            class="btn-solid theme-primary"><i class="bi bi-eye-fill"></i>
                                        </RouterLink>
                                        <RouterLink type="button" :to="`/users-update/${item.id}`" class="btn-solid theme-success">
                                            <i class="bi bi-pencil-fill"></i>
                                        </RouterLink>
                                        <button type="button" @click="handleDelete(item.id)"
                                            data-bs-target="#exampleDialog" class="btn-solid theme-danger"><i
                                                class="bi bi-trash3-fill"></i>
                                        </button>

                                        
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                        <!-- <tfoot>
                            <tr>
                                <td colspan="3" class="fg-4">10 items out of 100</td>
                                <td colspan="3">
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination pagination-sm theme-accent justify-content-end mb-0">
                                            <li v-for="link in paginationLinks" class="page-item"
                                                :class="link.active ? 'active' : ''">
                                                <button class="page-link" type="button"
                                                    :class="link.page == null ? 'disabled' : ''"
                                                    @click="getAllProducts(link.url)">
                                                    <span aria-hidden="true" v-html="link.label"></span>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </td>
                            </tr>
                        </tfoot> -->
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>