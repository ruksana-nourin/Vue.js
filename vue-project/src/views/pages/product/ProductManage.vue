<script setup lang="ts">
import { RouterLink } from 'vue-router';
import PageHead from '@/components/PageHead.vue';
import { api, baseUrl } from '@/api.ts';
import { ref } from 'vue';
import type { Product } from '@/interfaces/Product';

let products = ref<Product[]>([]);
let paginationLinks = ref<any[]>([]);
// console.log(products);
function getAllProducts(url:string) {
    api.get(url)
        .then((res: any) => {
            console.log(res.data.products);
            products.value = res.data.products.data;
            paginationLinks.value = res.data.products.links;
            console.log(paginationLinks)
        })
        .catch((err: any) => {
            console.log(err.response.data);
        });
}
getAllProducts('products');

</script>

<template>
    <PageHead title="Product" subtitle="Manage your product from here">
        <RouterLink class="btn-solid theme-accent" to="/products-create"><i class="bi bi-plus-lg"></i> Add Product
        </RouterLink>

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
                                <th>Item</th>
                                <th>Price</th>
                                <th>quantity</th>

                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in products" :key="item.id">
                                <td>{{ item.id }}</td>
                                <td>

                                    <div class="display-flex aligm-item-center gap-3">
                                        <img v-if="item.image" :src="`${baseUrl}${item.image}`" width="40" height="40"
                                            alt="">
                                        <img v-else :src="`https://placehold.co/600x400`" width="40" height="40">
                                        <strong>{{ item.name }}</strong>
                                    </div>

                                </td>
                                <td>{{ item.price }}</td>
                                <td>{{ item.quantity }}</td>
                                <td>
                                    <span class="badge badge-subtle"
                                        :class="item.active ? ' theme-success' : ' theme-danger'">
                                        {{ item.active ? 'Active' : 'inactive' }}</span>
                                </td>

                                <td>
                                    <div class="btn-group" role="group" aria-label="Basic example">
                                        <button type="button" class="btn-solid theme-primary"><i
                                                class="bi bi-eye-fill"></i></button>
                                        <RouterLink type="button" to="/products-update" class="btn-solid theme-success">
                                            <i class="bi bi-pencil-fill"></i>
                                        </RouterLink>
                                        <button type="button" class="btn-solid theme-danger"><i
                                                class="bi bi-trash3-fill"></i></button>
                                    </div>
                                </td>
                            </tr>

                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3" class="fg-4">10 items out of 100</td>
                                <td colspan="3">
                                    <nav aria-label="Page navigation example">
                                        <ul class="pagination pagination-sm theme-accent justify-content-end mb-0">
                                            <li v-for="link in paginationLinks" class="page-item"
                                                :class="link.active ? 'active' : ''">
                                                <button class="page-link" type="button" :class="link.page == null ? 'disabled' :'' " @click="getAllProducts(link.url)">
                                                    <span aria-hidden="true" v-html="link.label"></span>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>