<!--
    WorkInfo
    หน้าจอเกี่ยวกับข้อมูลการทำงานของนักศึกษา
    Author : Rawich Piboonsin
    Created date : 13-11-2566
-->

<template>
  <LayoutMenu />

  <CardInternInfo class="my-3" :internId="internId"> </CardInternInfo>

  <SectionSpace noSpace>
    <div class="row mb-3">
      <SideLabelInput
        v-model="searchData"
        no-padding
        input-size="3"
        label="วันที่ลา"
        type="date"
      />

      <BaseButton
        label="+ เพิ่มข้อมูลการลา"
        @click="openModal = true"
        class="col-md-2 ms-auto"
      >
      </BaseButton>
    </div>

    <div class="row">
      <DataTable striped :heads="tableHead" :items="workInfo"> </DataTable>
    </div>
  </SectionSpace>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import LayoutMenu from "./LayoutMenu.vue";
import { useRoute } from "vue-router";
import apiService from "../../services/api";
import BaseButton from "../Component/BaseButton.vue";
import CardInternInfo from "./CardInternInfo.vue";
import DataTable from "../Component/DataTable.vue";

const internId = useRoute().params.id;
const apiCall = new apiService();
const workInfo = ref([]);
const mentor = ref();
const tableHead = ref([
  { key: "lvs_id", title: "เลขที่ใบลา", align: "center" },
  { key: "lvs_from_date", title: "วันที่ลา", align: "center" },
  { key: "lvs_to_date", title: "ถึงวันที่", align: "center" },
  { key: "lvs_type_name", title: "ประเภทการลา" },
  { key: "lvs_duration_fake", title: "ระยะเวลา" },
  { key: "lvs_updated_by_user.user_name", title: "ผู้ทำการแก้ไข" },
  { key: "open_file", title: "หลักฐาน", align: "center" },
]);

const sectionName = computed(() => {
  return workInfo.value[0]?.work_sec?.sec_name || "-";
});

const departmentName = computed(() => {
  return workInfo.value[0]?.work_dept?.dept_name || "-";
});

const roleName = computed(() => {
  return workInfo.value[0]?.work_role?.role_name || "-";
});

onMounted(async () => {
  /* workInfo.value = await apiCall.getWorkInfoByInternId(internId);
  mentor.value = await apiCall.getMentorByInternId(internId);
  console.log(workInfo.value); */
});
</script>

<style scoped></style>
