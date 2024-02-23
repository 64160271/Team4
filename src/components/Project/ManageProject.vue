<template>
  <LayoutMenuName page-name="โปรเจกต์" />

  <SectionSpace>
    <div class="row mb-3">
      <div class="col-md-3 my-auto nopadding">
        <SearchBox v-model="search" />
      </div>

      <BaseButton @click="add" class="btn-sm col-md-2 ms-auto" label="+ เพิ่มข้อมูล" />
    </div>

    <div class="row">
      <DataTable
        striped
        :total="projects.length"
        :heads="tableHead"
        :items="projects"
        hover-background
      >
        <template #proj_status_custom="{ data }">
          <span v-html="getStatus(data.proj_status)"></span>
        </template>
        <template #proj_edit="{ data }">
          <EditIcon class="cursor-p" width="10" height="10" />
        </template>
      </DataTable>
    </div>
  </SectionSpace>

  <BaseModal
    @close="openModal = false"
    v-if="openModal == true"
    size="lg"
    title="เพิ่มข้อมูลโปรเจกต์"
  >
    <div class="row mb-3">
      <div class="col-md-6">
        <BaseInput
          label="ชื่อโปรเจกต์"
          v-model="formData.proj_name"
          placeholder="ชื่อโปรเจกต์"
          required
        />
      </div>
      <div class="col-md-6">
        <BaseInput label="ชื่อทีม" placeholder="ชื่อโปรเจกต์" />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-6">
        <BaseInput
          type="date"
          label="วันที่เริ่มโปรเจกต์"
          v-model="formData.proj_start_date"
        />
      </div>
      <div class="col-md-6">
        <BaseInput
          type="date"
          label="วันที่สิ้นสุดโปรเจกต์"
          v-model="formData.proj_end_date"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-6">
        <BaseSelect
          label="พี่เลี้ยงโปรเจกต์"
          v-model="formData.proj_mentor_id"
          :options="mentors"
          text="ment_name"
          value="ment_id"
        />
      </div>
      <div class="col-md-6">
        <BaseSelect
          label="สถานะโปรเจกต์"
          v-model="formData.proj_status"
          :options="statusValue"
          text="text"
          value="val"
        />
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import apiService from "../../services/api";
import DataTable from "../Component/DataTable.vue";
import BaseModal from "../Component/BaseModal.vue";
import BaseInput from "../Component/BaseInput.vue";
import BaseButton from "../Component/BaseButton.vue";
import SearchBox from "../Component/SearchBox.vue";
import { ref, onMounted, reactive } from "vue";
import EditIcon from "../icons/EditIcon.vue";
import BaseSelect from "../Component/BaseSelect.vue";

const projects = ref([]);
const search = ref("");
const openModal = ref(false);
const service = new apiService();
const mentors = ref([]);
const initialState = {
  proj_name: "",
  proj_start_date: "",
  proj_end_date: "",
  proj_mentor_id: "",
  proj_status: "",
};
const formData = reactive({ ...initialState });
const statusValue = ref([
  { value: 0, text: "กำลังดำเนินการ" },
  { value: 1, text: "เสร็จสิ้น" },
]);

const tableHead = ref([
  { key: "proj_name", title: "ชื่อโปรเจกต์" },
  { key: "team_name", title: "ชื่อทีม" },
  { key: "proj_start_date", title: "วันที่เริ่มต้นโปรเจกต์", align: "center" },
  { key: "proj_end_date", title: "วันที่สิ้นสุดโปรเจกต์", align: "center" },
  { key: "proj_mentor.ment_name", title: "ชื่อพี่เลี้ยง" },
  { key: "proj_status_custom", title: "สถานะ", align: "center" },
  { key: "proj_edit", title: "แก้ไข", align: "center" },
]);

onMounted(async () => {
  projects.value = await service.getAllProject();
  console.log(projects.value);
});

function getStatus(status) {
  if (status == 0) {
    return '<span class="text-danger fw-bold">ดำเนินการ</span>';
  } else if (status == 1) {
    return '<span style="color: #339900;" class="text-finish fw-bold">เสร็จสิ้น</span>';
  }
}

async function add() {
  openModal.value = true;

  if (!mentors.value[0]) {
    mentors.value = await service.getAllMentor();
    return;
  }
}
</script>

<style scoped></style>
