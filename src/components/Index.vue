<!--
 Index
 Main screen, display all interns list
 Author : Rawich Piboonsin
 Created date : 24-08-2566
-->

<template>
  <LayoutMenuName page-name="รายชื่อนักศึกษา" />

  <div class="row mb-3 me-1">
    <div class="col-md-3 my-auto">
      <SearchBox @search="search" />
    </div>

    <div class="col-md-2 my-auto">
      <BaseSelect @change="getAllIntern" v-model="team_id" placeholder="ทีม" :options="teams" value="team_id" text="team_name" />
    </div>

    <button class="col-auto btn ms-auto outline-red" @click="$router.push('/interns/key-data')">
      <FormIconVue />
      เพิ่มจากแบบฟอร์ม
    </button>

    <button class="ms-4 col-auto btn outline-red" @click="$router.push('/interns/add-file')">
      <ExcelIcon />
      เพิ่มจากไฟล์ Excel
    </button>
  </div>

  <DataTable :heads="tableHead" :items="interns" hovers clickable clickReturn="intn_id" @clicked="handleClick" paginate
    :total="total" :active-page="page" :items-per-page="pageSize" @page-change="setCurrentPage">
    <template class="col-md-2" #intn_key="{ data }">
      <img v-if="data.intn_image" class="img-custom" :src="data.intn_image_path" width="40" height="40" alt="" />
      <img v-else src="../assets/images/person-nm.png" alt="" width="35" />
      <span class="ms-lg-4 ms-md-2">{{ data.intn_code }}</span>
    </template>
  </DataTable>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, toRaw } from "vue";
import { computed } from "vue";
import FormIconVue from "./icons/FormIcon.vue";
import ExcelIcon from "./icons/ExcelIcon.vue";
import { getImageFromBuffer } from "@/assets/js/func";
import DataTable from "./Component/DataTable.vue";
import router from "@/router";
import SearchBox from "./Component/SearchBox.vue";
import apiService from "../services/api";
import BaseSelect from "./Component/BaseSelect.vue";

const total = ref();
const page = ref(1);
const pageMax = ref(1);
const pageSize = 10;
const interns = ref([]);
const teams = ref([]);
const team_id = ref()
const searchData = ref("");
let timer;
const tableHead = ref([
  { key: "intn_key", title: "รหัสนักศึกษาฝึกงาน", align: "center" },
  { key: "intn_name_th", title: "ชื่อ-นามสกุล" },
  { key: "intn_nickname_th", title: "ชื่อเล่น" },
  { key: "work_infos[0].work_role.role_name", title: "ตำแหน่ง" },
  { key: "work_infos[0].work_team.team_name", title: "ทีม" },
  { key: "intn_start_date", title: "วันที่เริ่มฝึกงาน", align: "center" },
  { key: "intn_end_date", title: "วันที่สิ้นสุดฝึกงาน", align: "center" },
]);

/*
 * setCurrentPage
 * เรียกดูข้อมูลเมื่อผู้ใช้ทำการเปลี่ยนหน้าของ Paginate
 * param: เลขหน้า
 * return: -
 */
async function setCurrentPage(pageNumber) {
  if (pageNumber > 0 && pageNumber <= pageMax.value) {
    page.value = pageNumber;
    await getAllIntern();
  }
}

const getAllIntern = async () => {
  const params = {
    page: page.value,
    limit: pageSize,
    team_id: team_id.value || null
  };

  await axios
    .get(`${import.meta.env.VITE_API_HOST}/interns`, { params })
    .then((response) => {
      interns.value = response.data.rows;
      total.value = response.data.count;
      pageMax.value = Math.ceil(total.value / pageSize);
    });
};

onMounted(async () => {
  setCurrentPage(page.value);
  let service = new apiService()
  teams.value = await service.getAllTeam();
});

function search(value) {
  if (timer) {
    clearTimeout(timer)
  }

  timer = setTimeout(() => {
    console.log(value)
  }, 1500)
}

/* 
const findInternData = computed(() => {
  let keyword = searchData.value.trim();
  return interns.value.filter((intern) => {
    return (
      intern.intn_fname_th?.indexOf(keyword) > -1 ||
      intern.intn_lname_th?.indexOf(keyword) > -1 ||
      intern.intn_start_date?.indexOf(keyword) > -1 ||
      intern.intn_end_date?.indexOf(keyword) > -1 ||
      intern.intn_prefix_th?.indexOf(keyword) > -1 ||
      intern.intn_code?.indexOf(keyword) > -1 ||
      intern.college_infos[0]?.col_major.maj_faculty.fac_university.uni_name.indexOf(
        keyword
      ) > -1 ||
      intern.intn_nickname_th?.indexOf(keyword) > -1 ||
      intern.work_infos[0]?.work_role.role_name.indexOf(keyword) > -1 ||
      intern.work_infos[0]?.work_team.team_name.indexOf(keyword) > -1 ||
      intern.college_info?.col_major.maj_name.indexOf(keyword) > -1 ||
      intern.intn_name_th.indexOf(keyword) > -1
    );
  });
}); */

function handleClick(intn_id) {
  router.push({ name: "internData", params: { id: intn_id } });
}
</script>

<style scoped>
.img-custom {
  border-radius: 50%;
  border: 1px solid black;
  width: 35px;
  height: 35px;
}

.bg-grays-200 {
  background-color: #8d969b30 !important;
}

.navbar {
  z-index: 99;
}

.border-left {
  border-radius: 8px 0 0 8px;
}

.border-right {
  border-radius: 0 8px 8px 0;
}
</style>
