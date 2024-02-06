<template>
    <LayoutMenuName page-name="เอกสารรับรองการฝึกงาน" />
    <div class="row mb-3 me-1">
        <div class="col-md-3 my-auto">
            <Search />
        </div>
        <BaseButton class="col-auto ms-auto" @click="$router.push('/certificates/selectCompany')" label="ออกเอกสารรับรอง" />
    </div>


    <DataTable :heads="tableHead" :items="certificates" hovers clickable clickReturn="intn_id" @clicked="handleClick"
        paginate :total="total" :active-page="page" :items-per-page="pageSize" @page-change="setCurrentPage">
        <template class="col-md-2" #download>
            <Download />
        </template>
        <template class="col-md-2" #delete>
            <Delete />
        </template>
    </DataTable>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BaseButton from '../Component/BaseButton.vue';
import DataTable from '../Component/DataTable.vue';
import Download from '../icons/DownloadButton.vue';
import Delete from '../icons/DeleteButton.vue';
import Search from '../Component/SearchBox.vue';

const tableHead = ref([
    { key: "intn_key", title: "รหัสนักศึกษาฝึกงาน", align: "center" },
    { key: "intn_name_th", title: "ชื่อไฟล์" },
    { key: "work_infos[0].work_team.team_name", title: "ทีม" },
    { key: "work_infos[0].work_role.role_name", title: "มหาวิทยาลัย" },
    { key: "cer_created_at", title: "วันที่ออกเอกสาร" },
    { key: "download", title: "ดาวน์โหลด" },
    { key: "delete", title: "ลบ" },
]);
const certificates = ref([])
const total = ref();
const page = ref(1);
const pageMax = ref(1);
const pageSize = 10;
// const getCertificate = async () => {
//     await axios.get(`${import.meta.env.VITE_API_HOST}/certificates`)
//         .then((response) => {
//             certificates.value = response.data
//         })
// }
const getAllCertificate = async () => {
    const params = {
        page: page.value,
        limit: pageSize
    };

    await axios
        .get(`${import.meta.env.VITE_API_HOST}/certificates`, { params })
        .then((response) => {
            certificates.value = response.data.rows;
            total.value = response.data.count;
            pageMax.value = Math.ceil(total.value / pageSize);
        });
};

onMounted(async () => {
    setCurrentPage(page.value);
    await getAllCertificate()
})



</script>

<style scoped>
.search {
    background-color: #8d969b30 !important;
}
</style>