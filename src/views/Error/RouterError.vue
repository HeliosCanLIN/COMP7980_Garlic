<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const errorMessage = route.query.errorMessage || '抱歉，发生了未知错误。';

</script>

<template>
  <div class="container mt-5">
    <!-- Logo and Title -->
    <div class="text-center mb-4">
      <h1 class="display-4">Garlic Enjoyer</h1>
      <h2>{{errorMessage}}</h2>
    </div>
    <footer class="text-center mt-4">
      <small>© COMP7980</small>
    </footer>
  </div>
</template>

<style scoped>

</style>
