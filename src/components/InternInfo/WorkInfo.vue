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
    </div>

    <div class="row">
      <DataTable hover-background striped :heads="tableHead" :items="projects">
      </DataTable>
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
const service = new apiService();
const projects = ref([]);
const tableHead = ref([
  { key: "pint_created_at", title: "วันที่เพิ่มข้อมูล", align: "center" },
  { key: "pint_project.proj_name", title: "ชื่อโปรเจกต์", align: "left" },
  { key: "pint_project.proj_start_date", title: "วันที่เริ่ม", align: "center" },
  { key: "pint_project.proj_end_date", title: "วันที่สิ้นสุด", align: "center" },
  {
    key: "pint_project.proj_mentor.ment_name",
    title: "พี่เลี้ยงโปรเจกต์",
  },
  { key: "pint_status_custom", title: "สถานะ", align: "center" },
]);

/* const sectionName = computed(() => {
  return workInfo.value[0]?.work_sec?.sec_name || "-";
});

const departmentName = computed(() => {
  return workInfo.value[0]?.work_dept?.dept_name || "-";
});

const roleName = computed(() => {
  return workInfo.value[0]?.work_role?.role_name || "-";
}); */

onMounted(async () => {
  projects.value = await service.getProejctInfoByInternId(internId);
});
</script>

<style scoped></style>
