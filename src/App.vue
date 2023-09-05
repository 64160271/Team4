<template>
  <div class="container-fluid vh-100 p-0 row">

    <Login v-if="['login'].includes($route.name)" />

    <LayoutNavbar v-if="!['login'].includes($route.name)" />

    <LayoutSidebar v-if="!['login'].includes($route.name)" />

    <main class="px-5 pt-4 col" style="margin-left: 280px; margin-top: 63px;">
      <router-view />
    </main>

  </div>
</template>

<script setup>
import LayoutSidebar from './components/layouts/LayoutSidebar.vue';
import LayoutNavbar from './components/layouts/LayoutNavbar.vue';
import Login from './components/Login.vue'
import { ref, onMounted } from 'vue';
import axios from 'axios'

</script>

<style scoped>

</style>
