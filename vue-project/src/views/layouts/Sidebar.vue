<script setup lang="ts">
import { useRoute } from 'vue-router';

const route =useRoute();
</script>
<template>
     <!-- ===== Desktop Sidebar (lg ও তার উপরে) ===== -->
  <aside class="sidebar bg-1 border-end">
    <RouterLink class="brand" to="/"><i class="bi bi-bar-chart-fill"></i> AdminPro</RouterLink>
    <nav class="side-nav">
      <RouterLink class="side-link" active-class="active" to="/"><i class="bi bi-speedometer2"></i> Dashboard</RouterLink>
      <RouterLink class="side-link" :class="{active: route.path.startsWith('/products')}" to="/products"><i class="bi bi-bag-fill"></i> Products</RouterLink>
      <RouterLink class="side-link" :class="{active: route.path.startsWith('/users')}" to="/users"><i class="bi bi-people-fill"></i> User</RouterLink>
      <RouterLink class="side-link" active-class="active" to="/count"><i class="bi bi-circle"></i> Count</RouterLink>
      <RouterLink class="side-link" active-class="active" to="/updateid"><i class="bi bi-calculator"></i> Update ID</RouterLink>

    </nav>
  </aside>

  <!-- ===== Mobile Sidebar (Bootstrap Drawer) ===== -->
  <dialog class="drawer drawer-start" id="mobileSidebar" tabindex="-1" aria-labelledby="mobileSidebarLabel">
    <div class="drawer-header">
      <h5 class="drawer-title" id="mobileSidebarLabel">AdminPro</h5>
      <button type="button" class="btn-close" data-bs-dismiss="drawer" aria-label="Close"></button>
    </div>
    <div class="drawer-body side-nav">
      <RouterLink class="side-link" active-class="active" to="/"><i class="bi bi-speedometer2"></i> Dashboard</RouterLink>
      <RouterLink class="side-link" :class="{active: route.path.startsWith('/products')}" to="/products"><i class="bi bi-bag-fill"></i> Products</RouterLink>
      <RouterLink class="side-link" :class="{active: route.path.startsWith('/users')}" to="/users"><i class="bi bi-people-fill"></i> User</RouterLink>
      <RouterLink class="side-link" active-class="active" to="/count"><i class="bi bi-speedometer2"></i> Count</RouterLink>

    </div>
  </dialog>
</template>