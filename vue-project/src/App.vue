<script setup lang="ts">
import './assets/css/style.css'
import Footer from './views/layouts/Footer.vue';
import Navbar from './views/layouts/Navbar.vue';
import Sidebar from './views/layouts/Sidebar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<!-- <template>

  <RouterView v-if="route.meta.noLayout" />
  <template v-else>
    <Sidebar />

    <div class="main">
      <Navbar />

      <main class="content">
        <RouterView />
        <Footer />
      </main>
    </div>
  </template>

</template> -->

 <template>
  <Sidebar v-if="!route.meta.noLayout" />
  <router-view v-if="route.meta.noLayout"/>
  <div class="main" v-else>
    <Navbar />

    <main class="content">
      <RouterView />
      <Footer />
    </main>
  </div>
</template>
