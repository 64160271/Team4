<template>
    <LayoutMenuName page-name="เอกสารรับรองการฝึกงาน" />
    <div class="row mb-3 me-1">
        <div class="col-md-3 my-auto nopadding">
        <SearchBox v-model="searchData" @search="search" />
      </div>

      <div class="col-md-2 my-auto">
        <BaseSelect placeholder="ทีม" all-select @change="setCurrentPage(1)" v-model="team_id" :options="teams"
          value="team_id" text="team_name" />
      </div>

      <div class="col-md-2 my-auto nopadding">
        <BaseInput placeholder="วันที่เริ่มต้นฝึกงาน" @change="setCurrentPage(1)" v-model="startDate"
          onfocus="(this.type='date')" onblur="(this.type='text')" />
      </div>
        <BaseButton class="col-auto ms-auto" @click="$router.push('/certificates/selectCompany')" label="ออกเอกสารรับรอง" />
    </div>


    <DataTable :heads="tableHead" :items="certificates" hovers clickable clickReturn="intn_id" @clicked="handleClick"
        paginate :total="total" :active-page="page" :items-per-page="pageSize" @page-change="setCurrentPage">
        <template class="col-md-2" #download>
            <Download />
        </template>
        <!-- <template class="col-md-2" #delete>
            <Delete />
        </template> -->
    </DataTable>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BaseButton from '../Component/BaseButton.vue';
import DataTable from '../Component/DataTable.vue';
import Download from '../icons/DownloadButton.vue';
import SearchBox from "../Component/SearchBox.vue";
import BaseSelect from "../Component/BaseSelect.vue";
import BaseInput from "../Component/BaseInput.vue";
import Delete from '../icons/DeleteButton.vue';

const tableHead = ref([
    { key: "cer_intern.intn_code", title: "รหัสนักศึกษาฝึกงาน", align: "center" },
    { key: "cer_code", title: "ชื่อไฟล์", align: "center" },
    { key: "cer_intern.work_infos[0].work_team.team_name", title: "ทีม", align: "center" },
    { key: "cer_intern.intn_major.maj_faculty.fac_university.uni_name", title: "มหาวิทยาลัย", align: "center" },
    { key: "cer_created_at", title: "วันที่ออกเอกสาร", align: "center" },
    { key: "download", title: "ดาวน์โหลด", align: "center" },
    // { key: "delete", title: "ลบ" },
]);
const certificates = ref([])

const getAllCertificate = async () => {

    try {
        const response = await axios.get(`${import.meta.env.VITE_API_HOST}/certificates`);
        certificates.value = response.data;
    } catch (error) {
        console.error('Error fetching signatures:', error);
    }
};

onMounted(async () => {
    getAllCertificate();
})



</script>

<style scoped>
.search {
    background-color: #8d969b30 !important;
}
</style>