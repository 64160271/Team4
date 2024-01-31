<template>
    <div class="col">
        <LayoutMenuName page-name="เอกสารรับรอง > เอกสารรับรองนักศึกษาฝึกงาน" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import DataTable from "../Component/DataTable.vue";
import { useRoute } from 'vue-router';
import router from "@/router";
import apiService from '../../services/api';

const tableHead = ref([
    { key: "cer_filename", title: "ชื่อไฟล์", align: "center" },
    { key: "intn_name_th", title: "ชื่อ-นามสกุล" },
    { key: "intn_id.work_infos[0].work_role.role_name", title: "ตำแหน่ง" },
    { key: "sign_name", title: "ผู้รับรอง" },
    { key: "com_name", title: "บริษัท" },
    { key: "intn_start_date", title: "วันที่เริ่มฝึกงาน" },
    { key: "intn_end_date", title: "วันที่สิ้นสุดฝึกงาน" },
]);
</script>

<style scoped></style>