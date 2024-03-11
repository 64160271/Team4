<template>
  <LayoutMenuName backButton :page-name="'โปรเจกต์ > ' + projName" />

  <SectionSpace>
    <div class="row mb-3">
      <BaseButton @click="add" class="btn-sm col-md-2 ms-auto" label="+ เพิ่มข้อมูล" />
    </div>

    <div class="row">
      <DataTable
        striped
        :total="interns.length"
        :heads="tableHeads"
        :items="interns"
        hover-background
      >
        <template #pint_edit="{ data }">
          <EditIcon @click="edit(data)" class="cursor-p hov-outline-red" />
        </template>
      </DataTable>
    </div>
  </SectionSpace>

  <BaseModal
    @save="formSubmit"
    @close="openModal = false"
    v-if="openModal == true"
    title="เพิ่มข้อมูลนักศึกษาในโปรเจกต์"
  >
    <div class="row mb-3">
      <div class="col-md-12">
        <AutoComplete
          label="ค้นหานักศึกษาฝึกงาน"
          v-model="formData.intn_code"
          :value="formData.intn_code"
          placeholder="INT-0000"
          required
          :items="internSearch"
          @search="fetchIntern"
          @return="handleReturn"
          item-text="intn_code_name"
          :disabled="modalType == 'E'"
          :class="{ 'is-invalid': v$.intn_code.$error }"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-12">
        <BaseInput
          label="ชื่อ - นามสกุล"
          v-model="formData.intn_name_th"
          :value="formData.intn_name_th"
          placeholder="ค้นหาจากด้านบน"
          required
          disabled
          :class="{ 'is-invalid': v$.intn_name_th.$error }"
        />
        <InvalidFeedback :errors="v$.intn_name_th.$errors" />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col-md-12">
        <BaseSelect
          label="ตำแหน่ง"
          v-model="formData.role_id"
          :options="roles"
          text="role_name"
          value="role_id"
          required
          :class="{ 'is-invalid': v$.role_id.$error }"
        />
        <InvalidFeedback :errors="v$.role_id.$errors" />
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import DataTable from "../Component/DataTable.vue";
import BaseModal from "../Component/BaseModal.vue";
import BaseInput from "../Component/BaseInput.vue";
import BaseButton from "../Component/BaseButton.vue";
import SearchBox from "../Component/SearchBox.vue";
import { ref, onMounted, reactive } from "vue";
import { errorAlert } from "../../assets/js/func";
import EditIcon from "../icons/EditIcon.vue";
import BaseSelect from "../Component/BaseSelect.vue";
import router from "@/router";
import apiService from "../../services/api";
import AutoComplete from "../Component/AutoComplete.vue";
import axios from "axios";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const interns = ref([]);
const service = new apiService();
const projId = router.currentRoute.value.params.id;
const openModal = ref(false);
const roles = ref([]);
const internSearch = ref([]);
const projName = ref("")
const modalType = ref("");

const initialState = {
  intn_id: null,
  intn_name_th: null,
  intn_code: null,
  role_id: null,
};
const formData = reactive({ ...initialState });
const rules = {
  intn_id: { required },
  intn_name_th: { required },
  intn_code: { required },
  role_id: { required },
}
const v$ = useVuelidate(rules, formData);

const tableHeads = ref([
  { key: "pint_intern.intn_code", title: "รหัสนักศึกษาฝึกงาน", size: 2 },
  { key: "pint_intern.intn_name_th", title: "ขื่อ - นามสกุล", size: 3 },
  { key: "pint_role.role_name", title: "ตำแหน่ง" },
  { key: "pint_edit", title: "แก้ไข", size: 1, align: "center" },
]);

onMounted(async () => {
  const res = await service.getInternByProjectId(projId);
  projName.value = res.project.proj_name
  interns.value = res.interns;
});

async function formSubmit() {
  const validate = await v$.value.$validate();
  console.log(v$.value)
  
  if (validate) {
    if (modalType.value == "A") {
      await service
        .createInternProject(formData, projId)
        .then(() => {
          router.go();
        })
        .catch((e) => {
          errorAlert(e.response.data);
        });
    } else if (modalType.value == "E") {
      await service
        .editInternProject(formData, projId)
        .then(() => {
          router.go();
        })
        .catch((e) => {
          errorAlert(e.response.data);
        });
    }
  }
}

let timer;
async function fetchIntern() {
  if (timer) {
    clearTimeout(timer);
  }

  timer = setTimeout(async () => {
    const params = {
      filter: formData.intn_code || undefined,
    };

    await axios
      .get(`${import.meta.env.VITE_API_HOST}/interns`, { params })
      .then((response) => {
        internSearch.value = response.data.rows.map((intern) => ({
          'intn_id': intern.intn_id,
          'intn_name': intern.intn_name_th,
          'intn_code': intern.intn_code,
          'intn_code_name': `${intern.intn_code} ${intern.intn_name_th}`,
          'role_id': `${intern.work_infos[0].work_role.role_id}`
        }))
      });
  }, 500);
}


async function add() {
  if (!internSearch.value[0]) {
    fetchIntern();
  }

  if (!roles.value[0]) {
    roles.value = await service.getAllRole();
  }

  Object.assign(formData, initialState);

  openModal.value = true;
  modalType.value = "A";
}

async function edit(data) {
  if (!internSearch.value[0]) {
    fetchIntern();
  }

  if (!roles.value[0]) {
    roles.value = await service.getAllRole();
  }

  Object.assign(formData, {
    intn_id: data.pint_intern.intn_id,
    intn_code: data.pint_intern.intn_code,
    intn_name_th: data.pint_intern.intn_name_th,
    role_id: data.pint_role.role_id,
  });

  openModal.value = true;
  modalType.value = "E";
}

function handleReturn(val) {
  Object.assign(formData, {
    intn_id: val.intn_id,
    intn_code: val.intn_code,
    intn_name_th: val.intn_name,
    role_id: val.role_id,
  });
}
</script>

<style scoped></style>
