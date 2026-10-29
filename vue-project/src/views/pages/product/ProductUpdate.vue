<script setup lang="ts">
import { RouterLink, useRouter, useRoute } from 'vue-router';
import PageHead from '@/components/PageHead.vue';
import { onMounted, ref } from 'vue';
import { defaultProduct } from '@/interfaces/Product.ts';
import type { Product } from '@/interfaces/Product.ts';
import type { Brand } from '@/interfaces/Brand.ts';
import type { Category } from '@/interfaces/Category.ts';
import { api, baseUrl } from '@/api.ts';

let route = useRouter();
let id = useRoute().params.id;

let product = ref<Product>({ ...defaultProduct });
let brands = ref<Brand[]>([]);
let categories = ref<Category[]>([]);

function getProduct() {
  api.get(`products/${id}`)
    .then((res: any) => {
      product.value = res.data.product;
    })
    .catch((err: any) => {
      console.log(err.response.data);
    });
}

function getAllBrands() {
  api.get('brands')
    .then((res: any) => {
      brands.value = res.data.brands;
    })
    .catch((err: any) => {
      console.log(err.response.data);
    });
}

function getAllCategories() {
  api.get('categories')
    .then((res: any) => {
      categories.value = res.data.categories;
    })
    .catch((err: any) => {
      console.log(err.response.data);
    });
}

onMounted(() => {
  getProduct();
  getAllBrands();
  getAllCategories();
});

function handleSubmit() {
  // if (product.value.image instanceof File) {
  //   alert("image found")
  // }
  // else{
  //   alert("image not found")
  // }
  let formdata = new FormData();

  formdata.append('name', product.value.name);
  formdata.append('category_id', product.value.category_id.toString());
  formdata.append('brand_id', product.value.brand_id.toString());
  formdata.append('price', product.value.price.toString());
  formdata.append('quantity', product.value.quantity.toString());
  formdata.append('reorder_level', String(product.value.reorder_level ?? 0));
  formdata.append('description', product.value.description ?? '');
  formdata.append('active', product.value.active ? '1' : '0');
  if (product.value.image instanceof File) formdata.append('image', product.value.image);
  

  
  api.put(`products/${id}`, formdata,  { headers: { 'Content-Type': 'multipart/formdata' } })
    .then((res: any) => {
      console.log(res.data);
      route.push('/products');
    })
    .catch((err: any) => {
      console.log(err.response?.data);
    });
}

function handleImage(event: any) {
  product.value.image = event.target.files[0] || null;
}
</script>

<template>
  <PageHead title="Edit Product" subtitle="Update your product from here">
    <RouterLink class="btn-solid theme-accent" to="/products">
      <i class="bi bi-arrow-left"></i> Back to Product
    </RouterLink>
  </PageHead>

  <section class="section-gap">
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="handleSubmit" enctype="multipart/form-data">
          <div class="row g-3">

            <div class="col-12 md:col-6">
              <div class="form-field">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" v-model="product.name">
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="form-field">
                <label class="form-label">Category</label>
                <select class="form-control" v-model="product.category_id">
                  <option disabled value="">Select category...</option>
                  <option v-for="item in categories" :key="item.id" :value="item.id">
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="col-12 md:col-6">
              <div class="form-field">
                <label class="form-label">Brand</label>
                <select class="form-control" v-model="product.brand_id">
                  <option disabled value="">Select brand...</option>
                  <option v-for="item in brands" :key="item.id" :value="item.id">
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>

            <div class="col-12 md:col-6 xl:col-3">
              <div class="form-field">
                <label class="form-label">Price (৳)</label>
                <input type="number" class="form-control" v-model="product.price">
              </div>
            </div>

            <div class="col-12 md:col-6 xl:col-3">
              <div class="form-field">
                <label class="form-label">QTY</label>
                <input type="number" class="form-control" v-model="product.quantity">
              </div>
            </div>

            <div class="col-12 md:col-6 xl:col-3">
              <div class="form-field">
                <label class="form-label">Reorder level</label>
                <input type="number" class="form-control" v-model="product.reorder_level">
              </div>
            </div>

            <div class="col-12">
              <div class="form-field">
                <label class="form-label">Description (optional)</label>
                <textarea class="form-control" v-model="product.description"></textarea>
              </div>
            </div>

            <div class="col-6">
              <div class="form-field">
                <label class="form-label">Image (optional)</label>
                <input type="file" class="form-control" accept="image/*" @change="handleImage"/>
              </div>
              <div v-if="product.image">
                <img :src="`${baseUrl}${product.image}`" :alt="product.name" width="100">

              </div>
            </div>

            <div class="col-12">
              <div class="form-field">
                <input type="checkbox" id="active" class="check" v-model="product.active" :checked="product.active">
                <label for="active">Is active</label>
              </div>
            </div>

            <div class="col-12 form-actions">
              <button type="submit" class="btn-solid theme-accent">
                <i class="bi bi-pencil"></i> Update
              </button>

              <RouterLink to="/products" class="btn-outline theme-secondary">
                Cancel
              </RouterLink>
            </div>

          </div>
        </form>
      </div>
    </div>
  </section>
</template>
