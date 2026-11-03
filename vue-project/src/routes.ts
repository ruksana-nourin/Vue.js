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
import UserCreate from "./views/pages/user/UserCreate.vue";
import UserDetails from "./views/pages/user/UserDetails.vue";
import UserUpdate from "./views/pages/user/UserUpdate.vue";

const routes=[
    { path: '/', component: Dashboard},
    { path: '/login', component: Login, meta: { noLayout: true,guest: true } },
    { path: '/users', component: UserManage},
    { path: '/user-create', component: UserCreate},
    { path: '/user/:id', component: UserDetails},
    { path: '/users-update/:id', component: UserUpdate},
    { path: '/products', component: ProductManage},
    { path: '/products-create', component: ProductCreate},
    { path: '/products/:id', component: ProductDetails},
    { path: '/products-update/:id', component: ProductUpdate},
    { path: '/count', component: Count},
    { path: '/updateid', component: UpdateID},
    { path: '/:pathMatch(.*)*', component: Error404, meta: { noLayout: true , all: true} },
];
export const router = createRouter({
    history: createWebHistory(),
    routes,
});
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('vuetoken');
    if(token && to.meta.guest){
        next('/');
    }else if(!token && !to.meta.guest && !to.meta.all){
        next('/login');
    }
    else {
        next();
    }

});
