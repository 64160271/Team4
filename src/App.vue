<!--
  App
  เป็น Layout หลักเมื่อทำการเปิดหน้า Website 
  Author : Rawich Piboonsin
  Created date : 19-08-2566
-->

<template>
  <div class="container-fluid vh-100 p-0">
    <Login v-if="['login'].includes($route.name)" />

    <LayoutSidebar v-if="!['login'].includes($route.name)" />

    <main
      v-if="!['login'].includes($route.name)"
      class="px-5 main-style"
    >
      <div class="mb-3">
        <router-view />
      </div>
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
  height: 100%;
  overflow-y: scroll;
}
</style>
