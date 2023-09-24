<!--
 LayoutMenu
 Display menu bar for view intern's information detail
 Author : Rawich Piboonsin
 Created date : 17-09-2566
-->

<template>
    <div class="row mt-4 text-center">
        <router-link :to="{ name: 'internData', params: { id: internId }}" 
        class="text-decoration-none col h5 my-0 text-custom pb-3 border-bottom border-active">
            ข้อมูลส่วนตัว
        </router-link>

        <router-link :to="{ name: 'workInfo', params: { id: internId }}" 
        class="text-decoration-none col h5 py-0 my-0 border-bottom">
            ข้อมูลการทำงาน
        </router-link>

        <router-link :to="{ name: 'salaryInfo', params: { id: internId }}" 
        class="text-decoration-none col h5 py-0 my-0 border-bottom">
            ข้อมูลเบี้ยเลี้ยง
        </router-link>

        <router-link :to="{ name: 'leaveInfo', params: { id: internId }}" 
        class="text-decoration-none col h5 py-0 my-0 border-bottom ">
            ข้อมูลการลา
        </router-link>

        <router-link :to="{ name: 'documentInfo', params: { id: internId }}" 
        class="text-decoration-none col h5 py-0 my-0 border-bottom ">
            เอกสารที่เกี่ยวข้อง
        </router-link>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute()
const internId = route.params.id
</script>

<style scoped>
button:active {
    border: none !important;
}

.border-active {
    border-color: var(--main-color) !important;
}
</style>