<template>
    <LayoutMenuName backButton page-name="โปรเจกต์" />

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
                    <EditIcon class="cursor-p"/>
                </template>
            </DataTable>
        </div>
    </SectionSpace>

    <BaseModal
        @save="fornmSubmit"
        @close="openModal = false"
        v-if="openModal == true"
        title="เพิ่มข้อมูลนักศึกษาในโปรเจกต์"
    >
        <div class="row mb-3">
            <div class="col-md-12">
                <AutoComplete 
                    label="รหัสนักศึกษาฝึกงาน"
                    v-model="formData.intn_code"
                    :value="formData.intn_code"
                    placeholder="INT-0000"
                    required
                    :items="internSearch"
                    @search="fetchIntern"
                    item-text="intn_name_th"
                />

            </div>
        </div>
        <div class="row mb-3">
            <div class="col-md-12">
                <BaseInput
                    label="ชื่อ - นามสกุล"
                    v-model="formData.intn_name_th"
                    :value="formData.intn_name_th"
                    placeholder="ชื่อโปรเจกต์"
                    required
                />
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
                />
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
import EditIcon from "../icons/EditIcon.vue";
import BaseSelect from "../Component/BaseSelect.vue";
import router from "@/router"
import apiService from "../../services/api";
import AutoComplete from "../Component/AutoComplete.vue";
import axios from "axios";

const interns = ref([])
const service = new apiService()
const projId = router.currentRoute.value.params.id
const openModal = ref(false)
const roles = ref([])
const internSearch = ref([])
let modalType = "";

const initialState = {
    intn_id: null,
    intn_name_th: null,
    intn_code: null,
    role_id: null,
}
const formData = reactive({... initialState})

const tableHeads = ref([
    { key: "pint_intern.intn_code", title: "รหัสนักศึกษาฝึกงาน", size: 2 },
    { key: "pint_intern.intn_name_th", title: "ขื่อ - นามสกุล", size: 3 },
    { key: "pint_role.role_name", title: "ตำแหน่ง" },
    { key: "pint_edit", title: "แก้ไข", size: 1, align: 'center' },
])

onMounted(async () => {
    const res = await service.getInternByProjectId(projId)
    interns.value = res
})

async function fornmSubmit() {
  if (modalType == "A") {
    await service.createInternProject(formData)
      .then(() => {
          router.go();
      })
      .catch((e) => {
          errorAlert(e.response.data);
      });
  } else if (modalType == "E") {
    await service.editProject(formData, editId)
      .then(() => {
          router.go();
      })
      .catch((e) => {
          errorAlert(e.response.data);
      });
  }
}

let timer;
async function fetchIntern() {
    if (timer) {
        clearTimeout(timer)
    }

    timer = setTimeout(async () => {
        const params = {
            filter: formData.intn_code || undefined,
        };

        await axios
            .get(`${import.meta.env.VITE_API_HOST}/interns`, { params })
            .then((response) => {
                internSearch.value = response.data.rows;
        });
    }, 500)
}

async function add() {
    if (!internSearch.value[0]) {
        fetchIntern()
    }

    if (!roles.value[0]) {
        roles.value = await service.getAllRole();
    }

    Object.assign(formData, initialState)

    openModal.value = true;
    modalType = "A"

}
</script>

<style scoped>

</style>