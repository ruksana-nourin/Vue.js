<script setup lang="ts">
import { RouterLink } from 'vue-router';
import PageHead from '@/components/PageHead.vue';
import { api, baseUrl } from '@/api.ts';
import { ref } from 'vue';
import type { Product } from '@/interfaces/Product';
// import type { Brand } from '@/interfaces/Brand';
// import type { Category } from '@/interfaces/Category';

let products = ref<Product[]>([]);
let paginationLinks = ref<any[]>([]);
// let brands = ref<Brand[]>([]);
// let categories = ref<Category[]>([]);
// // console.log(products);

const showDeleteModal = ref(false);
const selectedProductId = ref<number | null>(null);


function getAllProducts(url: string) {
    api.get(url)
        .then((res: any) => {
            // console.log(res.data.products);
            products.value = res.data.products.data;
            paginationLinks.value = res.data.products.links;
            // console.log(paginationLinks)
        })
        .catch((err: any) => {
            console.log(err.response.data);
        });
}

getAllProducts('products');

// function handleDelete(id: number) {
//     api.delete(`products/${id}`)
//         .then((res: any) => {
//             getAllProducts('products');
//         })
//         .catch((err: any) => {
//             console.log(err.response.data);
//         });
// }

// Open confirmation modal
function openDeleteModal(id: number) {
    selectedProductId.value = id;
    showDeleteModal.value = true;
}

// Close confirmation modal
function closeDeleteModal() {
    showDeleteModal.value = false;
    selectedProductId.value = null;
}

// Delete after confirmation
function confirmDelete() {
    if (selectedProductId.value === null) return;

    api.delete(`products/${selectedProductId.value}`)
        .then(() => {
            closeDeleteModal();
            getAllProducts('products');
        })
        .catch((err: any) => {
            console.log(err.response?.data ?? err);
        });
}



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

                                    <div class="display-flex aligm-item-center gap-3 ">
                                        <img class="rounded me-4" v-if="item.image" :src="`${baseUrl}${item.image}`"
                                            width="60" height="60" alt="">
                                        <img class="rounded me-4" v-else
                                            :src="`https://robohash.org/mail@ashallendesign.co.uk`" width="60"
                                            height="60">
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
                                        <RouterLink type="button" :to="`/products/${item.id}`"
                                            class="btn-solid theme-primary"><i class="bi bi-eye-fill"></i>
                                        </RouterLink>
                                        <RouterLink type="button" :to="`/products-update/${item.id}`" class="btn-solid theme-success">
                                            <i class="bi bi-pencil-fill"></i>
                                        </RouterLink>
                                        <!-- <button type="button" @click="handleDelete(item.id)"
                                            data-bs-target="#exampleDialog" class="btn-solid theme-danger"><i
                                                class="bi bi-trash3-fill"></i>
                                        </button> -->

                                        <button type="button" @click="openDeleteModal(item.id)"
                                            class="btn-solid theme-danger">
                                            <i class="bi bi-trash3-fill"></i>
                                        </button>
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
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </section>




    <dialog class="dialog" :open="showDeleteModal" @click.self="closeDeleteModal">
        <div class="dialog-header">
            <h5 class="dialog-title">Confirm Delete</h5>

            <button type="button" class="btn-close" aria-label="Close" @click="closeDeleteModal"></button>
        </div>

        <div class="dialog-body">
            <p>
                Are you sure you want to delete this product?
                This action cannot be undone.
            </p>
        </div>

        <div class="dialog-footer">
            <button type="button" class="btn-solid theme-secondary" @click="closeDeleteModal">
                Cancel
            </button>

            <button type="button" class="btn-solid theme-danger" @click="confirmDelete">
                <i class="bi bi-trash3-fill"></i>
                Confirm Delete
            </button>
        </div>
    </dialog>

</template>
<style>
.dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    margin: 0;
    width: 90%;
    max-width: 450px;

    border: none;
    border-radius: 12px;
    padding: 0;

    background: white;
    color: #333;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.25);
}

/* Dark background behind the modal */
.dialog::backdrop {
    background: rgba(0, 0, 0, 0.5);
}

/* Modal content spacing */
.dialog-header,
.dialog-body,
.dialog-footer {
    padding: 16px 20px;
}

.dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    border-top: 1px solid #eee;
}
</style>