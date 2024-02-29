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
          <EditIcon @click="edit(data)" class="cursor-p"/>
        </template>
        
        <template #proj_detail="{ data }">
          <EyeIcon @click="linkToMember(data.proj_id)" width="26" class="cursor-p" />
        </template>
      </DataTable>
    </div>
  </SectionSpace>

  <BaseModal
    @save="fornmSubmit"
    @close="openModal = false"
    v-if="openModal == true"
    size="lg"
    title="เพิ่มข้อมูลโปรเจกต์"
  >
    <div class="row mb-3">
      <div class="col-md-12">
        <BaseInput
          label="ชื่อโปรเจกต์"
          v-model="formData.proj_name"
          :value="formData.proj_name"
          placeholder="ชื่อโปรเจกต์"
          required
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-6">
        <BaseInput
          type="date"
          label="วันที่เริ่มโปรเจกต์"
          :value="formData.proj_start_date"
          v-model="formData.proj_start_date"
        />
      </div>
      <div class="col-md-6">
        <BaseInput
          type="date"
          label="วันที่สิ้นสุดโปรเจกต์"
          :value="formData.proj_end_date"
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
          value="value"
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
import { errorAlert, slashDtoDashY } from "../../assets/js/func";
import router from '@/router'
import EyeIcon from "../icons/EyeIcon.vue";
import ProjectMember from "./ProjectMember.vue";

const projects = ref([]);
const search = ref("");
const openModal = ref(false);
const service = new apiService();
const mentors = ref([]);
const modalType = ref("")
const initialState = {
  proj_name: "",
  proj_start_date: null,
  proj_end_date: null,
  proj_mentor_id: "",
  proj_status: "",
};
const formData = reactive({ ...initialState });
const statusValue = ref([
  { value: 1, text: "กำลังดำเนินการ" },
  { value: 0, text: "เสร็จสิ้น" },
]);

const tableHead = ref([
  { key: "proj_name", title: "ชื่อโปรเจกต์" },
  { key: "proj_start_date", title: "วันที่เริ่มต้นโปรเจกต์", align: "center" },
  { key: "proj_end_date", title: "วันที่สิ้นสุดโปรเจกต์", align: "center" },
  { key: "proj_mentor.ment_name", title: "ชื่อพี่เลี้ยง" },
  { key: "proj_status_custom", title: "สถานะ", align: "center" },
  { key: "proj_edit", title: "แก้ไข", align: "center" },
  { key: "proj_detail", title: "รายละเอียด", align: "center" },
]);

let editId = 0

onMounted(async () => {
  projects.value = await service.getAllProject();
});

function getStatus(status) {
  if (status == 1) {
    return '<span class="text-danger fw-bold">ดำเนินการ</span>';
  } else if (status == 0) {
    return '<span style="color: #339900;" class="text-finish fw-bold">เสร็จสิ้น</span>';
  }
}

async function fornmSubmit() {
  if (modalType.value == "A") {
    await service.createProject(formData)
      .then(() => {
          router.go();
      })
      .catch((e) => {
          errorAlert(e.response.data);
      });
  } else if (modalType.value == "E") {
    await service.editProject(formData, editId)
      .then(() => {
          router.go();
      })
      .catch((e) => {
          errorAlert(e.response.data);
      });
  }
}

async function add() {
  if (!mentors.value[0]) {
    mentors.value = await service.getAllMentor();
  }

  Object.assign(formData, initialState)

  openModal.value = true;
  modalType.value = "E";
}

async function edit(project) {
  if (!mentors.value[0]) {
    mentors.value = await service.getAllMentor();
  }

  editId = project.proj_id

  Object.assign(formData, {
    proj_name: project.proj_name,
    proj_start_date: slashDtoDashY(project.proj_start_date),
    proj_end_date: slashDtoDashY(project.proj_end_date),
    proj_mentor_id: project.proj_mentor_id,
    proj_status: project.proj_status,
  })

  openModal.value = true;
  modalType.value = "E";
}

function linkToMember(projId) {
  router.push({ name: "projectMember", params: { id: projId } })
}
</script>

<style scoped></style>
