<!--
 Index
 Main screen, display all interns list
 Author : Rawich Piboonsin
 Created date : 24-08-2566
-->

<template>
  <LayoutMenuName page-name="รายชื่อนักศึกษา" />

  <SectionSpace>
    <div class="row mb-3">
      <button
        class="col-auto btn ms-auto btn-sm outline-red"
        @click="$router.push('/interns/key-data')"
      >
        <FormIconVue />
        เพิ่มจากแบบฟอร์ม
      </button>

      <button
        class="ms-4 col-auto btn btn-sm outline-red"
        @click="$router.push('/interns/add-file')"
      >
        <ExcelIcon />
        เพิ่มจากไฟล์ Excel
      </button>
    </div>

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

      <div class="col-md-2 my-auto">
        <BaseSelect
          placeholder="ตำแหน่ง"
          all-select
          @change="setCurrentPage(1)"
          v-model="roleId"
          :options="roles"
          value="role_id"
          text="role_name"
        />
      </div>

      <div class="col my-auto">
        <DatePicker
          pid="searchDate"
          placeholder="วันที่เริ่มต้นฝึกงาน"
          @change="setCurrentPage(1)"
          v-model="startDate"
          readonly
        />
      </div>
      <div class="col-md-2 my-auto pe-0">
        <BaseSelect
          placeholder="สถานะ"
          all-select
          @change="setCurrentPage(1)"
          v-model="statusVal"
          :options="status.list"
          value="value"
          text="text"
        />
      </div>
    </div>

    <div class="row">
      <DataTable
        v-if="loaded"
        hover-background
        striped
        :heads="tableHead"
        :items="interns"
        hovers
        clickable
        clickReturn="intn_id"
        @clicked="handleClick"
        paginate
        :total="total"
        :active-page="page"
        :items-per-page="pageSize"
        @page-change="setCurrentPage"
      >
        <template class="col-md-2" #intn_key="{ data }">
          <img
            v-if="data.intn_image"
            class="img-custom shadow"
            :src="data.intn_image_path"
            width="40"
            height="40"
            alt=""
          />
          <img v-else src="../assets/images/person-nm.png" alt="" width="35" />
          <span class="ms-lg-4 ms-md-2">{{ data.intn_code }}</span>
        </template>

        <template #intn_status_custom="{ data }">
          <span v-html="getStatus(data.intn_work_status)"></span>
        </template>
      </DataTable>

      <Loading v-if="!loaded" />
    </div>
  </SectionSpace>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, toRaw } from "vue";
import FormIconVue from "./icons/FormIcon.vue";
import ExcelIcon from "./icons/ExcelIcon.vue";
import DataTable from "./Component/DataTable.vue";
import router from "@/router";
import SearchBox from "./Component/SearchBox.vue";
import apiService from "../services/api";
import BaseSelect from "./Component/BaseSelect.vue";
import BaseInput from "./Component/BaseInput.vue";
import DatePicker from "./Component/DatePicker.vue";
import { useStatusData } from "../stores/constData";

const total = ref();
const page = ref(1);
const pageMax = ref(1);
const pageSize = 10;
const interns = ref([]);
const teams = ref([]);
const team_id = ref();
const startDate = ref("");
const searchData = ref("");
const roles = ref([]);
const roleId = ref();
const status = ref(useStatusData());
const statusVal = ref();
const loaded = ref(false)
let timer;
const tableHead = ref([
  { key: "intn_key", title: "รหัสนักศึกษาฝึกงาน", align: "center", size: 2 },
  { key: "intn_name_th", title: "ชื่อ-นามสกุล", size: 2 },
  { key: "intn_nickname_th", title: "ชื่อเล่น", size: 1 },
  { key: "work_infos[0].work_role.role_name", title: "ตำแหน่ง", size: 2 },
  { key: "work_infos[0].work_team.team_name", title: "ทีม", size: 2 },
  { key: "intn_start_date", title: "วันที่เริ่มฝึกงาน", align: "center", size: 2 },
  { key: "intn_end_date", title: "วันที่สิ้นสุดฝึกงาน", align: "center", size: 2 },
  { key: "intn_status_custom", title: "สถานะ", align: "center" },
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
  }

  await getAllIntern();
}

/*
 * getAllIntern
 * ฟังก์ชันสำหรับเรียก api ข้อมูลนักศึกษาฝึกงาน
 * param: -
 * return: -
*/
const getAllIntern = async () => {
  loaded.value = false

  const params = {
    page: page.value,
    limit: pageSize,
    team_id: team_id.value || undefined,
    filter: searchData.value || undefined,
    intn_start_date: startDate.value || undefined,
    role_id: roleId.value || undefined,
    intn_work_status: statusVal.value || undefined,
  };

  await axios
    .get(`${import.meta.env.VITE_API_HOST}/interns`, { params })
    .then((response) => {
      interns.value = response.data.rows;
      total.value = response.data.count;
      pageMax.value = Math.ceil(total.value / pageSize);
      loaded.value = true
    });
};

onMounted(async () => {
  setCurrentPage(page.value);
  let service = new apiService();
  teams.value = await service.getAllTeam();
  roles.value = await service.getAllRole();
});

/*
 * search
 * ฟังก์ชันสำหรับจัดการการค้นหา
 * param: -
 * return: -
*/
function search() {
  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(() => {
    setCurrentPage(1);
  }, 500);
}

/*
 * handleClick
 * ฟังก์ชันเมื่อมีการคลิกที่รายชื่อของนักศึกษาฝึกงาน
 * param: รหัสนักศึกษาฝึกงาน
 * return: -
*/
function handleClick(intn_id) {
  router.push({ name: "internData", params: { id: intn_id } });
}

/*
 * getStatus
 * ฟังก์ชันแสดงสถานะของนักศึกษาฝึกงานในรูปของ badge
 * param: สถานะของนักศึกษา
 * return: html แสดงสถานะ
*/
function getStatus(status) {
  if (status == "กำลังทำงาน") {
    return '<span class="badge text-bg-success fw-bold">กำลังทำงาน</span>';
  } else if (status == "พ้นสภาพ") {
    return '<span style="color: #339900;" class="badge text-bg-danger fw-bold">พ้นสภาพ</span>';
  }
}
</script>

<style scoped>
.img-custom {
  border-radius: 50%;
  width: 37px;
  height: 37px;
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
