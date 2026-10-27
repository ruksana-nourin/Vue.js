<script setup lang="ts">
import { RouterLink } from 'vue-router';
import PageHead from '../../../components/PageHead.vue';
import { ref } from 'vue';
import { defaultProduct } from '@/interfaces/Product.ts';
import type { Brand } from '@/interfaces/Brand.ts';
import type { Category } from '@/interfaces/Category.ts';
import { api } from '@/api.ts';
let product = ref(defaultProduct);

let brands = ref<Brand[]>([]);
let categories = ref<Category[]>([]);
function handleSubmit() {
  // console.log(product.value);
  let data =new FormData();

  if(product.value.image)data.append('image', product.value.image);
   api.post('products', data)
        .then((res: any) => {
            console.log(res.data);
        })
        .catch((err: any) => {
            console.log(err.response.data);
        });
}
function handleImage(event:any){
  product.value.image= event.target.files[0] || null;
}

</script>

<template>
  <PageHead title="Add Product" subtitle="Create a new product from here">
    <RouterLink class="btn-solid theme-accent" to="/products"><i class="bi bi-arrow-left"></i> Back to Product
    </RouterLink>

  </PageHead>

  <section class="section-gap">
    <div class="card">
      <div class="card-body">

        <form v-on:submit.prevent="handleSubmit" enctype="multipart/formdata">
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
                  <option selected disabled>Select category...</option>
                </select>
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="form-field">
                <label class="form-label">Brand</label>
                <select class="form-control" v-model="product.brand_id">
                  <option selected disabled>Select brand...</option>
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
                <label class="form-label">Image(optional)</label>
                <input type="file" class="form-control"accept="image/*" @change="handleImage">

              </div>
            </div>
            <div class="col-12">
              <div class="form-field">
                <input type="checkbox" id="active" class="check" v-model="product.active" />
                <label for="active">Is active</label>
              </div>
            </div>
            <div class="col-12 form-actions">
              <button type="submit" class="btn-solid theme-accent"><i class="bi bi-plus-lg"></i> Add New</button>
              <button type="reset" class="btn-outline theme-secondary">Reset</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>




</template>