<!--
 WorkInfo.vue
 หน้าจอสำหรับแสดงข้อมูลการทำงานของนักศึกษาฝึกงาน
 Author : Rawich Piboonsin
 Created date : 04-12-2566
-->

<template>
  <LayoutMenu />

  <CardInternInfo class="my-3" :internId="internId">
    <div class="row mb-2">
      <label for="" class="col-md-3 col-form-label text-gray">
        ฝ่าย
      </label>
      <label for="" class="col-md-3 col-form-label text-gray">
        {{ work.getSection || '-' }}
      </label>

      <label for="" class="col-md-3 col-form-label text-gray">
        แผนก
      </label>

      <label for="" class="col-md-3 col-form-label text-gray">
        {{ work.getDepartment || '-' }}
      </label>
    </div>

    <div class="row">
      <label for="" class="col-md-3 col-form-label text-gray">
        ตำแหน่ง
      </label>
      <label for="" class="col-md-3 col-form-label text-gray">
        {{ work.getRole }}
      </label>

      <label for="" class="col-md-3 col-form-label text-gray">
        พี่เลี้ยง
      </label>

      <label for="" class="col-md-3 col-form-label text-gray">
        {{ work.getMentor }}
      </label>
    </div>
  </CardInternInfo>

  <SectionSpace noSpace>

    <div class="row">
      <Loading v-if="!loaded" />

      <DataTable v-if="loaded" hover-background striped :heads="tableHead" :items="projects">
        <template #pint_created_at_custom="{ data }">
          {{ changeTimestampToDate(data.pint_created_at) || "-" }}
        </template>
        <template #pint_status_custom="{ data }">
          <span v-html="getStatus(data.pint_project.proj_status)"></span>
        </template>
      </DataTable>
    </div>
  </SectionSpace>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import LayoutMenu from "./LayoutMenu.vue";
import { useRoute } from "vue-router";
import ApiService from "../../services/ApiService";
import BaseButton from "../Component/BaseButton.vue";
import CardInternInfo from "./CardInternInfo.vue";
import DataTable from "../Component/DataTable.vue";
import { changeTimestampToDate } from "../../assets/js/func";
import { useInternName } from "../../stores/constData";

const loaded = ref(false)
const internId = useRoute().params.id;
const service = new ApiService();
const projects = ref([]);
const work = ref(useInternName())
const tableHead = ref([
  { key: "pint_created_at_custom", title: "วันที่เพิ่มข้อมูล", align: "center" },
  { key: "pint_project.proj_name", title: "ชื่อโปรเจกต์", align: "left" },
  { key: "pint_project.proj_start_date", title: "วันที่เริ่ม", align: "center" },
  { key: "pint_project.proj_end_date", title: "วันที่สิ้นสุด", align: "center" },
  {
    key: "pint_project.proj_mentor.ment_name",
    title: "พี่เลี้ยงโปรเจกต์",
  },
  { key: "pint_status_custom", title: "สถานะ", align: "center" },
]);

onMounted(async () => {
  loaded.value = false
  projects.value = await service.getProejctInfoByInternId(internId);
  loaded.value = true
});

/*
 * getStatus
 * ฟังก์ชันสำหรับแสดงสถานะของโปรเจกต์ตามตัวเลขสถานะ
 * param: ตัวเลขสถานะของโปรเจกต์
 * return: html สำหรับแสดงสถานะ
*/
function getStatus(status) {
  if (status == 1) {
    return '<span class="text-danger fw-bold">ดำเนินการ</span>';
  } else if (status == 0) {
    return '<span style="color: #339900;" class="text-finish fw-bold">เสร็จสิ้น</span>';
  }
}
</script>

<style scoped></style>
