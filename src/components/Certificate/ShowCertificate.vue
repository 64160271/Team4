<template>
    <LayoutMenuName page-name="เอกสารรับรองการฝึกงาน" />
    <SectionSpace>
        <div class="row mb-3">
        <div class="col-md-3 my-auto nopadding">
            <SearchBox v-model="searchData" @search="search" />
        </div>

      <div class="col-md-2 my-auto">
        <BaseSelect
          placeholder="ทีม"
          all-select
          @change="setCurrentPage(1)"
          v-model="team_id"
          :options="teams"
          value="team_id"
          text="team_name"
        />
      </div>

      <div class="col-md-2 my-auto nopadding">
        <BaseInput
          placeholder="วันที่เริ่มต้นฝึกงาน"
          @change="setCurrentPage(1)"
          v-model="startDate"
          onfocus="(this.type='date')"
          onblur="(this.type='text')"
        />
      </div>
      <BaseButton
        class="col-auto ms-auto"
        @click="$router.push('/certificates/selectCompany')"
        label="ออกเอกสารรับรอง"
      />
    </div>

    <Loading v-if="!loaded" />

    <div class="row" v-if="loaded">
        <DataTable striped :heads="tableHead" :items="certificates" hover-background clickReturn="cer_id" @clicked=""
            :total="certificates.length" :active-page="page" :items-per-page="pageSize" @page-change="setCurrentPage">
            <template #created_at="{ data }">
                {{ changeTimestampToDate(data?.cer_created_at) }}
            </template>

            <template #open_file="{ data }">
                <Picture @click="openPDF(data?.cer_created_at, data?.cer_filename)"></Picture>
            </template>


        <!-- <template class="col-md-2" #download="{ data }">
                <Download @click="downloadPDF(data?.cer_created_at, data?.cer_filename)" />
            </template> -->

        <!-- <template class="col-md-2" #delete>
                <Delete />
            </template> -->
        </DataTable>
    </div>
    </SectionSpace>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import BaseButton from "../Component/BaseButton.vue";
import DataTable from "../Component/DataTable.vue";
import SearchBox from "../Component/SearchBox.vue";
import BaseSelect from "../Component/BaseSelect.vue";
import BaseInput from "../Component/BaseInput.vue";
import Picture from "../icons/PictureLogo.vue";
import { changeTimestampToDate } from "../../assets/js/func";

const tableHead = ref([
  { key: "cer_intern.intn_code", title: "รหัสนักศึกษาฝึกงาน", align: "center" },
  { key: "cer_code", title: "ชื่อไฟล์", align: "center" },
  { key: "cer_intern.work_infos[0].work_team.team_name", title: "ทีม" },
  {
    key: "cer_intern.intn_major.maj_faculty.fac_university.uni_name",
    title: "มหาวิทยาลัย",
  },
  { key: "created_at", title: "วันที่ออกเอกสาร", align: "center" },
  { key: "open_file", title: "เปิดไฟล์", align: "center" },
  // { key: "download", title: "ดาวน์โหลด", align: "center" },
  // { key: "delete", title: "ลบ" },
]);
const certificates = ref([]);
const loaded = ref(false);

const getAllCertificate = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_HOST}/certificates`);
    certificates.value = response.data;
    loaded.value = true;
  } catch (error) {
    console.error("Error fetching certificates:", error);
  }
};

async function downloadPDF(year, cerFilename) {
  window.open(
    `${import.meta.env.VITE_API_HOST}/certificates/${changeTimestampToYear(
      year
    )}/${cerFilename}`
  );
}

async function openPDF(year, cerFilename) {
  window.open(
    `${import.meta.env.VITE_API_HOST}/certificates/${changeTimestampToYear(
      year
    )}/${cerFilename}`
  );
}

function changeTimestampToYear(value) {
  if (value) {
    const date = new Date(value);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) {
      day = 0 + `${day}`;
    }
    if (month < 10) {
      month = `${month}`;
    }
    return `${year}-${month}`;
  }
  return "";
}

onMounted(async () => {
  getAllCertificate();
});
</script>

<style scoped>
.search {
  background-color: #8d969b30 !important;
}
</style>
