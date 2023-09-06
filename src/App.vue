<template>
  <div class="container-fluid vh-100 p-0 row">

    <Login v-if="['login'].includes($route.name)" />

    <LayoutNavbar v-if="!['login'].includes($route.name)" />

    <LayoutSidebar v-if="!['login'].includes($route.name)" />

    <main v-if="!['login'].includes($route.name)" class="px-5 pt-4 col" style="margin-left: 280px; margin-top: 63px;">
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

/* const universities = ref({})

const getUniversities = async() => {
  await axios.get(`${import.meta.env.VITE_API_HOST}/university`)
    .then((response) => {
        universities.value = response.data
    })
}

onMounted(() => getUniversities()) */
</script>

<style scoped>

</style>
