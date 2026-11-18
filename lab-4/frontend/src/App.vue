<template>
  <div class="d-flex flex-column min-vh-100">
    <AppHeader />

    <main class="container flex-grow-1 py-4">
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
</script>
