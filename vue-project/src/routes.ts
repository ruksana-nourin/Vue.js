import Dashboard from "./views/pages/Dashboard.vue";
import UserManage from "./views/pages/user/UserManage.vue";
import ProductManage from "./views/pages/product/ProductManage.vue";
import { createRouter, createWebHistory } from "vue-router";
import ProductCreate from "./views/pages/product/ProductCreate.vue";
import ProductUpdate from "./views/pages/product/ProductUpdate.vue";
import ProductDetails from "./views/pages/product/ProductDetails.vue";
import Count from "./views/pages/pinia/Count.vue";
import UpdateID from "./views/pages/pinia/UpdateID.vue";
import Error404 from "./views/pages/errors/404.vue";
import Login from "./views/pages/auth/Login.vue";

const routes=[
    { path: '/', component: Dashboard},
    { path: '/login', component: Login, meta: { noLayout: true } },
    { path: '/users', component: UserManage},
    { path: '/users-create', component: UserManage},
    { path: '/products', component: ProductManage},
    { path: '/products-create', component: ProductCreate},
    { path: '/products/:id', component: ProductDetails},
    { path: '/products-update/:id', component: ProductUpdate},
    { path: '/count', component: Count},
    { path: '/updateid', component: UpdateID},
    { path: '/:pathMatch(.*)*', component: Error404, meta: { noLayout: true } },
];
export const router = createRouter({
    history: createWebHistory(),
    routes,
});
