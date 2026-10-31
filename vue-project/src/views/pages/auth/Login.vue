<script setup lang="ts">
import { ref } from 'vue';

const notice = ref('');

function handleSubmit() {
  notice.value = 'Sign-in is not connected yet.';
}
</script>

<template>
  <main class="login-page min-vh-100 d-flex align-items-center justify-content-center px-3 py-5">
    <section class="login-card card border-0 shadow-sm w-100" aria-labelledby="login-title">
      <div class="card-body p-4 p-md-5">
        <div class="text-center mb-4">
          <div class="login-icon d-inline-flex align-items-center justify-content-center rounded-circle mb-3" aria-hidden="true">
            <i class="bi bi-box-arrow-in-right"></i>
          </div>
          <h1 id="login-title" class="h3 fw-bold mb-2">Welcome back</h1>
          <p class="text-body-secondary mb-0">Sign in to your account</p>
        </div>

        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label for="email" class="form-label">Email address</label>
            <input
              id="email"
              class="form-control"
              type="email"
              name="email"
              autocomplete="username"
              placeholder="name@example.com"
              required
            >
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              class="form-control"
              type="password"
              name="password"
              autocomplete="current-password"
              placeholder="Enter your password"
              required
            >
          </div>

          <div class="form-check mb-4">
            <input id="remember-me" class="form-check-input" type="checkbox" name="remember-me">
            <label class="form-check-label" for="remember-me">Remember me</label>
          </div>

          <button class="btn btn-primary w-100" type="submit">Sign in</button>
          <p v-if="notice" class="text-danger small mt-3 mb-0" role="alert">{{ notice }}</p>
        </form>
      </div>
    </section>
  </main>
</template>

<style scoped>
.login-page {
  background: #f5f7fb;
}

.login-card {
  max-width: 440px;
  border-radius: 1rem;
}

.login-icon {
  width: 3.25rem;
  height: 3.25rem;
  background: rgba(13, 110, 253, 0.1);
  color: #0d6efd;
  font-size: 1.5rem;
}
</style>
