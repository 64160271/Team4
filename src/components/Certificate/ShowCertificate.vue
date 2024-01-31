<template>
    <LayoutMenuName page-name="เอกสารรับรองการฝึกงาน" />
    <div class="row mb-3 me-1">
        <div class="col-md-4 my-auto">
            <div class="input-group">
                <span class="bg-grays-200 input-group-text" id="basic-addon1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
                        viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </span>
                <input v-model="searchData" type="text" id="search-bar" class="search form-control" placeholder="Search"
                    aria-label="" aria-describedby="basic-addon1">
            </div>
        </div>
        <BaseButton class="col-auto ms-auto" @click="$router.push('/certificates/selectCompany')" label="ออกเอกสารรับรอง" />
    </div>

    <div>
        <DataTable :heads="tableHead" :items="certificates" hovers clickable clickReturn="intn_id" @clicked="handleClick"
            paginate :total="total" :active-page="page" :items-per-page="pageSize" @page-change="setCurrentPage">
            <template class="col-md-2" #download>
                <Download />
            </template>
            <template class="col-md-2" #delete>
                <Delete />
            </template>
        </DataTable>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BaseButton from '../Component/BaseButton.vue';
import DataTable from '../Component/DataTable.vue';
import Download from '../icons/DownloadButton.vue';
import Delete from '../icons/DeleteButton.vue';

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