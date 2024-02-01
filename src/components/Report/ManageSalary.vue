<template>
    <LayoutMenuName page-name="รายงานเบี้ยเลี้ยง" />
    <div class="row mb-3">
        <div class="col-auto my-auto">
            <!-- ส่วนของ radio buttons -->
            <div class="form-check form-check-inline">
                <input v-model="searchData" type="text" id="search-bar" class="bg-grays-200 form-control"
                    placeholder="Search" aria-label="" aria-describedby="basic-addon1" />
            </div>

            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="radiotest" id="month" value="month">
                <label class="form-check-label" for="month">เดือน</label>
            </div>

            <div class="form-check form-check-inline">
                <BaseSelect />
            </div>
        </div>
        <div class="col-auto ms-auto my-auto">
            <div>
                <BaseButton label="เพิ่มข้อมูล" @click="openModal = true" />
            </div>
        </div>
    </div>
    <BaseModal v-if="openModal" @close="openModal = false" title="เพิ่มรายการข้อมูล">
        <div class="col mb-3">
            <BaseInput v-model="formData.rep_code" label="รหัสรายการ" input_type="text" required="required" placeholder="xx/xxxx" />
        </div>
        <div class="col mb-3">
            <BaseInput :value="new Date()" label="วันที่สร้างรายการ" input_type="text" readonly="readonly" />
        </div>
        <div class="col mb-3">
            <BaseInput :value="nameUser" label="ผู้ทำการแก้ไขข้อมูล" input_type="text" readonly="readonly" />
        </div>
    </BaseModal>
    <DataTable :heads="dataHead" :items="reports">
        <template #rep_edit>
        <EditIcon />
        </template>
        <template #rep_remove>
        <DeleteButton />
        </template>
    </DataTable>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from '../Component/BaseButton.vue'
import DataTable from '../Component/DataTable.vue'
import BaseSelect from '../Component/BaseSelect.vue'
import BaseModal from '../Component/BaseModal.vue'
import BaseInput from '../Component/BaseInput.vue'
import { onMounted } from 'vue';
import axios from 'axios'
import EditIcon from '../icons/EditIcon.vue'
import DeleteButton from '../icons/DeleteButton.vue'

const reports = ref([])

const openModal = ref(false)

const dataHead = ref([
    { key: "rep_id", title: "รหัสรายการ", align: "center" },
    { key: "rep_count_name", title: "จำนวนรายชื่อ", align: "right" },
    { key: "rep_created_at", title: "วันที่สร้างรายการ", align: "center" },
    { key: "rep_updated_at", title: "วันที่แก้ไขรายการ", align: "center" },
    { key: "rep_created_user", title: "ผู้สร้างรายการ" },
    { key: "rep_update_user", title: "ผู้แก้ไขข้อมูลล่าสุด" },
    { key: "rep_status", title: "สถานะ", align: "center" },
    { key: "rep_edit", title: "แก้ไข", align: "center" },
    { key: "rep_remove", title: "ลบ", align: "center" },
])

const formData = ref([
    rep_code = '',
    rep_date = '',
    rep_updated_by = ''
])

const getReport = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/reports`).
        then((response) => {
            reports.value = response.data
        })
}

async function formSubmit() {
    await axios.post(`${import.meta.env.VITE_API_HOST}/reports`, formData.value,)
    router.go()
}

let nameUser = "ปริญญา ก้อนจันทึก"

onMounted(() => {
    getReport()
})
</script>

<style scoped></style> 