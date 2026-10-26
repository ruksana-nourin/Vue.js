import Dashboard from "./views/pages/Dashboard.vue";
import UserManage from "./views/pages/user/UserManage.vue";
import ProductManage from "./views/pages/product/ProductManage.vue";
import { createRouter, createWebHistory } from "vue-router";
import ProductCreate from "./views/pages/product/ProductCreate.vue";
import ProductUpdate from "./views/pages/product/ProductUpdate.vue";

const routes=[
    { path: '/', component: Dashboard},
    { path: '/users', component: UserManage},
    { path: '/users-create', component: UserManage},
    { path: '/products', component: ProductManage},
    { path: '/products-create', component: ProductCreate},
    { path: '/products-update', component: ProductUpdate},
];
export const router = createRouter({
    history: createWebHistory(),
    routes,
});
