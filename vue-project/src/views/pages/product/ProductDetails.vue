<script setup lang="ts">
import { api, baseUrl } from '@/api';
import PageHead from '@/components/PageHead.vue';
import { defaultProduct } from '@/interfaces/Product';
import { ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const id = useRoute().params.id;
let item = ref(defaultProduct);

function getItem() {
    api.get(`products/${id}`)
        .then((res: any) => {
            console.log(res.data);
            item.value = res.data.product;
        })
        .catch((err: any) => {
            console.log(err.response.data);
        });

};
getItem();

</script>

<template>
    <PageHead title="Product Details" subtitle="Show Details your product from here">
        <RouterLink class="btn-solid theme-accent" to="/products"><i class="bi bi-arrow-left"></i> Back to Product
        </RouterLink>
    </PageHead>





    <section class="section-gap">
        <div class="card">
            <div class="card-body">


                <hr class="mb-4">

                <div class="row g-4">

                    <!-- Product Image -->
                    <div class="col-12 md:col-4">
                        <div class="card h-100">
                            <div class="card-body text-center">

                                <img v-if="item.image" :src="`${baseUrl}${item.image}`" :alt="item.name"
                                    class="img-fluid rounded mb-3"
                                    style="width: 100%; max-height: 280px; object-fit: contain;">
                                <img v-else src="https://robohash.org/mail@ashallendesign.co.uk" alt="Product image"
                                    class="img-fluid rounded mb-3"
                                    style="width: 100%; max-height: 280px; object-fit: contain;">

                                <h5 class="mb-2">{{ item.name }}</h5>

                                <span class="badge" :class="item.active?'bg-success':'bg-danger'">{{ item.active?'Active':'Inactive' }}</span>


                                <p class="text-muted mb-1">Product ID</p>
                                <h6>#{{ item.id }}</h6>

                            </div>
                        </div>
                    </div>

                    <!-- Product Information -->
                    <div class="col-12 md:col-8">

                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="mb-3">
                                    <i class="bi bi-info-circle"></i>
                                    General Information
                                </h5>
                                <hr>


                                <div class="row g-3">

                                    <div class="col-12 md:col-6">
                                        <h6 class="mb-1">Product Name</h6>
                                        <h5>{{ item.name }}</h5>
                                    </div>

                                    <div class="col-12 md:col-6">
                                        <h6 class="text-muted mb-1">Price</h6>
                                        <h5>{{ item.price }}</h5>
                                    </div>

                                    <div class="col-12 md:col-6">
                                        <p class="text-muted mb-1">Category</p>
                                        <h6>{{ item.category.name }}</h6>
                                        <small class="text-muted">Category ID: {{ item.category_id }}</small>
                                    </div>

                                    <div class="col-12 md:col-6">
                                        <p class="text-muted mb-1">Brand</p>
                                        <h6>{{ item.brand.name }}</h6>
                                        <small class="text-muted">Brand ID: {{ item.brand_id }}</small>
                                    </div>

                                    <div class="col-12">
                                        <p class="text-muted mb-1">Description</p>
                                        <p class="mb-0">
                                           {{ item.description }}
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>

                        <!-- Inventory Information -->
                        <div class="card">
                            <div class="card-body">
                                <h5 class="mb-3">
                                    <i class="bi bi-box-seam"></i>
                                    Inventory Information
                                </h5>

                                <div class="row g-3">

                                    <div class="col-12 md:col-6">
                                        <div class="border rounded p-3">
                                            <p class="text-muted mb-1">Available Quantity</p>
                                            <h4 class="mb-0">{{ item.quantity }} <small>units</small></h4>
                                        </div>
                                    </div>

                                    <div class="col-12 md:col-6">
                                        <div class="border rounded p-3">
                                            <p class="text-muted mb-1">Reorder Level</p>
                                            <h4 class="mb-0">{{ item.reorder_level }} <small>units</small></h4>
                                        </div>
                                    </div>

                                    <!-- <div class="col-12">
                                        <p class="text-muted mb-1">Stock Status</p>
                                        <span class="badge bg-success">
                                            <i class="bi bi-check-circle"></i> In Stock
                                        </span>
                                    </div> -->

                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </section>






</template>