<!--
 LayoutMenu
 Display menu bar for view intern's information detail
 Author : Rawich Piboonsin
 Created date : 17-09-2566
-->

<template>
    <div class="row mb-4 text-center bg-white pt-4">
        <router-link :to="{ name: 'internData', params: { id: internId } }"
            class="text-decoration-none col h5 my-0 pb-3 border-bottom border-2" active-class="active">
            ข้อมูลส่วนตัว
        </router-link>

        <router-link :to="{ name: 'workInfo', params: { id: internId } }"
            class="text-decoration-none col h5 py-0 my-0 border-bottom border-2" active-class="active">
            ข้อมูลการทำงาน
        </router-link>

        <router-link :to="{ name: 'salaryInfo', params: { id: internId } }"
            class="text-decoration-none col h5 py-0 my-0 border-bottom border-2" active-class="active">
            ข้อมูลเบี้ยเลี้ยง
        </router-link>

        <router-link :to="{ name: 'leaveInfo', params: { id: internId } }"
            class="text-decoration-none col h5 py-0 my-0 border-bottom border-2" active-class="active">
            ข้อมูลการลา
        </router-link>

        <router-link :to="{ name: 'documentInfo', params: { id: internId } }"
            class="text-decoration-none col h5 py-0 my-0 border-bottom border-2" active-class="active">
            เอกสารที่เกี่ยวข้อง
        </router-link>
    </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';

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

.active {
    border-color: var(--main-color) !important;
    color: var(--main-color) !important;
}

div {
    margin-left: -48px !important;
    margin-right: -48px !important;
 }
</style>