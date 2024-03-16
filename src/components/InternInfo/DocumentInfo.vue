<template>
  <LayoutMenu />

  <CardInternInfo class="my-3" :internId="internId">
    <div class="row mb-2">
      <label for="" class="col-md-3 col-form-label text-gray"> ฝ่าย</label>
      <label for="" class="col-md-3 col-form-label text-gray">
        {{ work.getSection }}
      </label>

      <label for="" class="col-md-3 col-form-label text-gray"> แผนก </label>

      <label for="" class="col-md-3 col-form-label text-gray"> {{ work.getDepartment || "-" }} </label>
    </div>
  </CardInternInfo>

  <SectionSpace noSpace>
    <div class="row mb-3">
      <div class="my-auto col-md-3 nopadding">
        <SearchBox v-model="searchData" placeholder="ชื่อเอกสาร" />
      </div>

      <BaseButton
        class="col-md-2 ms-auto"
        label="+ เพิ่มข้อมูล"
        @click="openModal = true"
      >
      </BaseButton>
    </div>

    <div class="row">
      <Loading v-if="!loaded" />
      <DataTable
        v-if="loaded"
        striped
        :total="filterData.length"
        :heads="tableHead"
        :items="filterData"
        hover-background
      >
        <template #doc_created_at_c="{ data }">
          {{ changeTimestampToDate(data.doc_created_at) }}
        </template>
        <template #open_file="{ data }">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            class="bi bi-file-earmark cursor-p outline-hov-red"
            viewBox="0 0 16 16"
            @click="showDocumentFile(data.doc_file_path)"
          >
            <path
              d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"
            />
          </svg>
        </template>
        <template #delete_file="{ data }">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            fill="currentColor"
            class="bi bi-trash-fill cursor-p outline-hov-red"
            viewBox="0 0 16 16"
            @click="deleteDocument(data)"
          >
            <path
              d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"
            />
          </svg>
        </template>
      </DataTable>
    </div>
  </SectionSpace>

  <BaseModal
    v-if="openModal"
    @close="openModal = false"
    title="เพิ่มข้อมูลเอกสาร"
    @save="formSubmit"
  >
    <BaseInput class="mb-3" :value="today" disabled label="วันที่เพิ่มข้อมูล" />

    <div class="mb-3">
      <BaseInput
        v-model="formData.doc_title"
        label="ประเภทเอกสาร"
        placeholder="บัตรประชาชน"
        :class="{ 'is-invalid': v$.doc_title.$error }"
        required
      />
      <InvalidFeedback :errors="v$.doc_title.$errors" />
    </div>

    <div class="row mb-3">
      <div class="col-auto my-auto">
        <label>เอกสารแนบ</label>
      </div>

      <BaseButton
        v-if="!formData.doc_file"
        label="อัปโหลดไฟล์"
        class="upload-box col-md-4 sm"
      >
        <template #before-text>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="me-2 bi bi-upload"
            viewBox="0 0 16 16"
          >
            <path
              d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
            />
            <path
              d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"
            />
          </svg>
        </template>
        <template #after-text>
          <input
            @change="showFileName"
            id="file-upload"
            class="file-upload"
            type="file"
            name=""
            accept="image/*,application/pdf"
          />
        </template>
      </BaseButton>

      <div class="col-md-5" v-if="formData.doc_file">
        <div class="position-relative border border-dark rounded-3 py-2 mx-auto">
          <div class="text-overflow-ellipsis mx-2">{{ formData.doc_file.name }}</div>
          <div
            class="col position-absolute top-0 end-0 me-1 cursor-p"
            @click="formData.doc_file = ''"
          >
            x
          </div>
        </div>
      </div>

      <div class="col-md-5 my-auto">
        <span
          v-if="v$.doc_file.$error"
          :class="{ 'is-invalid': v$.doc_file.$error }"
        ></span>
        <InvalidFeedback :errors="v$.doc_file.$errors" />
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import LayoutMenu from "./LayoutMenu.vue";
import ApiService from "../../services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, computed } from "vue";
import DataTable from "../Component/DataTable.vue";
import CardInternInfo from "./CardInternInfo.vue";
import BaseButton from "../Component/BaseButton.vue";
import BaseInput from "../Component/BaseInput.vue";
import BaseModal from "../Component/BaseModal.vue";
import {
  confirmation,
  successAlert,
  getCurrentThaiDate,
  changeTimestampToDate,
} from "../../assets/js/func";
import SearchBox from "../Component/SearchBox.vue";
import InvalidFeedback from "../Component/InvalidFeedback.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useInternName } from "../../stores/constData";

const loaded = ref(false)
const router = useRouter();
const internId = useRoute().params.id;
const documents = ref([]);
const searchData = ref("");
const apiCall = new ApiService();
const openModal = ref(false);
const today = ref(getCurrentThaiDate());
const work = ref(useInternName())
const tableHead = ref([
  { key: "doc_title", title: "ชื่อเอกสาร" },
  { key: "doc_mimetype", title: "ประเภทไฟล์" },
  { key: "doc_created_at_c", title: "วันที่อัปโหลดไฟล์", align: "center" },
  /* { key: "lvs_day", title: "ผู้ทำการแก้ไข" }, */
  { key: "open_file", title: "เปิดไฟล์", align: "center" },
  { key: "delete_file", title: "ลบไฟล์", align: "center" },
]);

const formData = ref({
  doc_title: "",
  doc_file: "",
  doc_intern_id: "",
});

const rules = {
  doc_title: { required },
  doc_file: { required },
};
const v$ = useVuelidate(rules, formData.value);

onMounted(async () => {
  loaded.value = false
  documents.value = await apiCall.getDocumentByInternId(internId);
  loaded.value = true
  /* modal.value = new bootstrap.Modal("#modal", {}); */
});

const filterData = computed(() => {
  return documents.value.filter((document) => {
    return document.doc_title.indexOf(searchData.value.trim()) > -1;
  });
});

function showDocumentFile(path) {
  window.open(path);
}

async function formSubmit() {
  const validate = await v$.value.$validate();

  if (validate) {
    formData.value.doc_intern_id = internId;
    const res = await apiCall.createDocument(formData.value);
    router.go();
  }
}

function showFileName() {
  const imgUpload = document.getElementById("file-upload");

  if (imgUpload.files[0] != undefined) {
    formData.value.doc_file = imgUpload.files[0];
  }
}

async function deleteDocument(data) {
  const result = await confirmation(
    `ยืนยันการลบข้อมูลเอกสาร "${data.doc_title}" หรือไม่`
  );

  if (result) {
    await apiCall
      .deleteDocument(data.doc_id)
      .then(async (res) => {
        console.log(res);
        await successAlert("ลบข้อมูลเอกสารเรียบร้อยแล้ว");
        router.go();
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
</script>

<style scoped></style>
