<template>
  <div class="h-screen bg-base-200 pt-3">
    <Login v-if="['login'].includes($route.name)"/>
    <LayoutSidebar v-if="!['login'].includes($route.name)" />
    <div id="" class="px-4 sm:ml-64" v-if="!['login'].includes($route.name)">
      <div class="fixed overflow-auto w-[80%] h-[96.7%] rounded-box bg-white h-screen">
         <div class="m-5">
            <router-view />
         </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import LayoutSidebar from './components/layouts/LayoutSidebar.vue';
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
