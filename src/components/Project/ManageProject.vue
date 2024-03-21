<!--
 MaangeProject
 หน้าจอสำหรับแสดง และจัดการข้อมูลโปรเจกต์
 Author : Rawich Piboonsin
 Created date : 05-03-2567
-->

<template>
  <LayoutMenuName page-name="โปรเจกต์" />

  <SectionSpace>
    <div class="row mb-3">
      <div class="col-md-3 my-auto nopadding">
        <SearchBox placeholder="ค้นหาชื่อโปรเจกต์" v-model="searchData" @search="search" />
      </div>

      <BaseButton @click="add" class="btn-sm col-md-2 ms-auto" label="+ เพิ่มข้อมูล" />
    </div>

    <div class="row">
      <Loading v-if="!loaded" />
      <DataTable
        v-if="loaded"
        striped
        :total="total"
        :heads="tableHead"
        :items="projects"
        hover-background
        paginate
        :active-page="page"
        :items-per-page="pageSize"
        @page-change="setCurrentPage"
      >
        <template #proj_status_custom="{ data }">
          <span v-html="getStatus(data.proj_status)"></span>
        </template>

        <template #proj_edit="{ data }">
          <EditIcon @click="edit(data)" class="cursor-p hov-outline-red" />
        </template>

        <template #proj_detail="{ data }">
          <EyeIcon @click="linkToMember(data.proj_id)" width="26" class="cursor-p hov-fill-red" />
        </template>
      </DataTable>
    </div>
  </SectionSpace>

  <BaseModal
    @save="formSubmit"
    @close="openModal = false"
    v-if="openModal == true"
    size="lg"
    :title="getModalName()"
  >
    <div class="row mb-3">
      <div class="col-md-12">
        <BaseInput
          label="ชื่อโปรเจกต์"
          v-model="formData.proj_name"
          :value="formData.proj_name"
          placeholder="ชื่อโปรเจกต์"
          required
          :class="{ 'is-invalid': v$.proj_name.$error }"
        />
        <InvalidFeedback :errors="v$.proj_name.$errors" />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-6">
        <DatePicker
          placeholder="DD/MM/YYYY"
          pid="start"
          label="วันที่เริ่มโปรเจกต์"
          v-model="formData.proj_start_date"
        ></DatePicker>
      </div>
      <div class="col-md-6">
        <DatePicker
        placeholder="DD/MM/YYYY"
          pid="end"
          label="วันที่สิ้นสุดโปรเจกต์"
          v-model="formData.proj_end_date"
        ></DatePicker>
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
          required
          :class="{ 'is-invalid': v$.proj_mentor_id.$error }"
        />
        <InvalidFeedback :errors="v$.proj_mentor_id.$errors" />
      </div>
      <div class="col-md-6">
        <BaseSelect
          label="สถานะโปรเจกต์"
          v-model="formData.proj_status"
          :options="statusValue"
          text="text"
          value="value"
          required
          :class="{ 'is-invalid': v$.proj_status.$error }"
        />
        <InvalidFeedback :errors="v$.proj_status.$errors" />
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import ApiService from "../../services/ApiService";
import DataTable from "../Component/DataTable.vue";
import BaseModal from "../Component/BaseModal.vue";
import BaseInput from "../Component/BaseInput.vue";
import BaseButton from "../Component/BaseButton.vue";
import SearchBox from "../Component/SearchBox.vue";
import InvalidFeedback from "../Component/InvalidFeedback.vue";
import { ref, onMounted, reactive } from "vue";
import EditIcon from "../icons/EditIcon.vue";
import BaseSelect from "../Component/BaseSelect.vue";
import { errorAlert, slashDtoDashY } from "../../assets/js/func";
import router from "@/router";
import EyeIcon from "../icons/EyeIcon.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import DatePicker from "../Component/DatePicker.vue"

const loaded = ref(false)
const projects = ref([]);
const searchData = ref("");
const openModal = ref(false);
const service = new ApiService();
const mentors = ref([]);
const modalType = ref("");
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

const rules = {
  proj_name: { required },
  proj_status: { required },
  proj_mentor_id: { required },
};
const v$ = useVuelidate(rules, formData);

const tableHead = ref([
  { key: "proj_name", title: "ชื่อโปรเจกต์", size: 3 },
  { key: "proj_start_date", title: "วันที่เริ่มต้นโปรเจกต์", align: "center", size: 2 },
  { key: "proj_end_date", title: "วันที่สิ้นสุดโปรเจกต์", align: "center", size: 2 },
  { key: "proj_mentor.ment_name", title: "ชื่อพี่เลี้ยง", size: 3 },
  { key: "proj_status_custom", title: "สถานะ", align: "center", size:2 },
  { key: "proj_edit", title: "แก้ไข", align: "center" },
  { key: "proj_detail", title: "รายละเอียด", align: "center", size: 1 },
]);

let editId = 0;

const total = ref();
const page = ref(1);
const pageMax = ref(1);
const pageSize = 10;
let timer;

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

  await fetchProject();
}

/*
 * fetchProject
 * ฟังก์ชันสำหรับ fetch ข้อมูลโปรเจกต์
 * param: -
 * return: -
 */
const fetchProject = async () => {
  loaded.value = false

  const params = {
    page: page.value,
    limit: pageSize,
    proj_name: searchData.value || undefined,
  };

  const response = await service.getAllProject(params);
  projects.value = response.rows;
  total.value = response.count;
  pageMax.value = Math.ceil(total.value / pageSize);

  loaded.value = true
}

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

onMounted(async () => {
  setCurrentPage(page.value);
});

function getModalName() {
  if (modalType.value == 'A') {
    return 'เพิ่มข้อมูลโปรเจกต์'
  } else if (modalType.value == 'E') {
    return 'แก้ไขข้อมูลโปรเจกต์'
  }
}

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

/*
 * formSubmit
 * ฟังก์ชันจัดการการส่งแบบฟอร์มแก้ไขและเพิ่มข้อมูลโปรเจกต์
 * param: -
 * return: -
*/
async function formSubmit() {
  const validate = await v$.value.$validate();

  if (validate) {
    if (modalType.value == "A") {
      await service
        .createProject(formData)
        .then(() => {
          router.go();
        })
        .catch((e) => {
          errorAlert(e.response.data);
        });
    } else if (modalType.value == "E") {
      await service
        .editProject(formData, editId)
        .then(() => {
          router.go();
        })
        .catch((e) => {
          errorAlert(e.response.data);
        });
    }
  }
}

/*
 * add
 * ฟังก์ชันสำหรับจัดการเมื่อมีการกดปุ่มเพิ่มข้อมูลโปรเจกต์
 * param: -
 * return: -
*/
async function add() {
  modalType.value = "A";

  if (!mentors.value[0]) {
    mentors.value = await service.getAllMentor();
  }

  Object.assign(formData, initialState);

  openModal.value = true;
}

/*
 * edit
 * ฟังก์ชันสำหรับจัดการเมื่อมีการกดปุ่มแก้ไขข้อมูลโปรเจกต์
 * param: ข้อมูลโปรเจกต์ที่กดแก้ไข
 * return: -
*/
async function edit(project) {
  modalType.value = "E";

  if (!mentors.value[0]) {
    mentors.value = await service.getAllMentor();
  }

  editId = project.proj_id;

  Object.assign(formData, {
    proj_name: project.proj_name,
    proj_start_date: slashDtoDashY(project.proj_start_date),
    proj_end_date: slashDtoDashY(project.proj_end_date),
    proj_mentor_id: project.proj_mentor_id,
    proj_status: project.proj_status,
  });

  openModal.value = true;
}

/*
 * linkToMember
 * ฟังก์ชันสำหรับเปลี่ยนหน้าจอเมื่อกดดูรายละเอียดโปรเจกต์
 * param: id ของโปรเจกต์
 * return: -
*/
function linkToMember(projId) {
  router.push({ name: "projectMember", params: { id: projId } });
}
</script>

<style scoped></style>
