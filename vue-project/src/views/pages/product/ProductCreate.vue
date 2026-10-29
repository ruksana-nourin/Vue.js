<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import PageHead from '../../../components/PageHead.vue';
import { onMounted, ref } from 'vue';
import { defaultProduct } from '@/interfaces/Product.ts';
import type { Brand } from '@/interfaces/Brand.ts';
import type { Category } from '@/interfaces/Category.ts';
import { api } from '@/api.ts';
let route = useRouter();
let product = ref(defaultProduct);
let brands = ref<Brand[]>([]);
let categories = ref<Category[]>([]);
function getAllBrands() {
  api.get('brands')
    .then((res: any) => {
      // console.log(res.data.brands)
      brands.value = res.data.brands;

    })
    .catch((err: any) => {
      console.log(err.response.data);
    });
}


function getAllCategories() {
  api.get('categories')
    .then((res: any) => {
      // console.log(res.data.categories)
      categories.value = res.data.categories;
    })
    .catch((err: any) => {
      console.log(err.response.data);
    });
}

onMounted(() => {
  getAllBrands();
  getAllCategories();
})
function handleSubmit() {
  // console.log(product.value);
  let formdata = new FormData();
  formdata.append('name', product.value.name);
  formdata.append('category_id', product.value.category_id.toString());
  formdata.append('brand_id', product.value.brand_id.toString());
  formdata.append('price', product.value.price.toString());
  formdata.append('quantity', product.value.quantity.toString());
  if (product.value.reorder_level) formdata.append('reorder_level', product.value.reorder_level.toString());
  formdata.append('description', product.value.description ? product.value.description : '');
  // formdata.append('active', product.value.active.toString());
  // formdata.append('active', String(product.value.active));
  //   formdata.append(
  //     'active',
  //     product.value.active ? 'true' : 'false'
  // );
  formdata.append('active', product.value.active ? '1' : '0');
  if (product.value.image) formdata.append('image', product.value.image);

  api.post('products', formdata, { headers: { 'Content-Type': 'multipart/formdata' } })
    .then((res: any) => {
      // console.log(res.data);
      route.push('/products');
    })
    .catch((err: any) => {
      console.log(err.response.data);
    });
}
function handleImage(event: any) {
  product.value.image = event.target.files[0] || null;
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
                  <option v-for="item in categories" :key="item.id" :value="item.id">{{ item.name }}</option>

                </select>
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="form-field">
                <label class="form-label">Brand</label>
                <select class="form-control" v-model="product.brand_id">
                  <option selected disabled>Select brand...</option>
                  <option v-for="item in brands" :key="item.id" :value="item.id">{{ item.name }}</option>
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
                <input type="file" class="form-control" accept="image/*" @change="handleImage">

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