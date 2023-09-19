<template>
    <div class="row mt-4 text-center">
        <router-link :to="{ name: 'internData', params: { id: internId }}" class="text-decoration-none col h5 my-0 text-custom">
            ข้อมูลส่วนตัว
        </router-link>

        <router-link :to="{ name: 'workInfo', params: { id: internId }}" class="text-decoration-none col h5 py-0 my-0">
            ข้อมูลการทำงาน
        </router-link>

        <router-link :to="{ name: 'salaryInfo', params: { id: internId }}" class="text-decoration-none col h5 py-0 my-0">
            ข้อมูลเบี้ยเลี้ยง
        </router-link>

        <router-link :to="{ name: 'leaveInfo', params: { id: internId }}" class="text-decoration-none col h5 py-0 my-0">
            ข้อมูลการลา
        </router-link>

        <router-link :to="{ name: 'documentInfo', params: { id: internId }}" class="text-decoration-none col h5 py-0 my-0">
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
</style>