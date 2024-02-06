<template>
    <LayoutMenuName page-name="เอกสารรับรอง > เอกสารรับรองนักศึกษาฝึกงาน" />
        <div class="row mb-3 me-1">
        <div class="col-md-3 my-auto">
            <Search />
        </div>
        <BaseButton class="col-auto ms-auto" label="ดาวน์โหลดทั้งหมด"> <template #before-text> <download class="custom-icon me-2" /> </template> </BaseButton>
    </div>

    <DataTable :heads="tableHead" :items="interns" hovers :total="total">
        <template class="col-md-2" #open_file>
            <Download />
        </template>
        <template class="col-md-2" #download>
            <download />
        </template>
        <template>
            <Delete />
        </template>
    </DataTable>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import DataTable from "../Component/DataTable.vue";
import { useRoute } from 'vue-router';
import router from "@/router";
import apiService from '../../services/api';
import BaseButton from '../Component/BaseButton.vue';
import download from '../icons/DownloadButton.vue';
import Search from '../Component/SearchBox.vue';
import Delete from '../icons/DeleteButton.vue';

const tableHead = ref([
    { key: "cer_filename", title: "ชื่อไฟล์", align: "center" },
    { key: "intn_name_th", title: "ชื่อ-นามสกุล" },
    { key: "intn_id.work_infos[0].work_role.role_name", title: "ตำแหน่ง" },
    { key: "sign_name", title: "ผู้รับรอง" },
    { key: "open_file", title: "เปิดไฟล์" },
    { key: "download", title: "ดาวน์โหลด" },
    { key: "delete", title: "ลบ" }
]);
const interns = ref([]);
const total = ref();
const page = ref(1);
const pageMax = ref(1);
const pageSize = 10;

const getAllIntern = async () => {
    await axios
        .get(`${import.meta.env.VITE_API_HOST}/interns?almost=${date}&noCertificate=true`, { params })
        .then((response) => {
            interns.value = response.data.rows;
            total.value = response.data.count;
        });
};

onMounted(async () => {
    getAllIntern();
});


</script>

<style scoped></style>