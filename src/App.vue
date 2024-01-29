<template>
  <div class="container-fluid vh-100 p-0">
    <Login v-if="['login'].includes($route.name)" />

    <LayoutSidebar v-if="!['login'].includes($route.name)" />

    <main
      v-if="!['login'].includes($route.name)"
      class="px-5 main-style vh-100"
    >
      <router-view />
    </main>
  </div>
</template>

<script setup>
import LayoutSidebar from "./components/layouts/LayoutSidebar.vue";
import Login from "./components/Login.vue";
</script>

<style scoped>
.main-style {
  margin-left: 280px;
  background-color: #f5f6f8;
}
</style>
