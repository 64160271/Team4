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


            </div>

            <div class="form-check form-check-inline">
                <BaseSelect  v-model="team_id" :options="team" value="team_id"
                    text="team_name" />
            </div>
        </div>
        <div class="col-auto ms-auto my-auto">
            <div>
                <BaseButton label="เพิ่มข้อมูล" @click="openModal = true" />
            </div>
        </div>
    </div>

    <DataTable :heads="dataHead" :items="reports" clickable @clicked="handleClick">
        <!-- <template #rep_count_name="{ data }">
            {{ data.rep_salaries.length }}
        </template>
        <template #rep_created_at_front="{ data }">
            {{ console.log(data.rep_created_at) }}
            {{ chageDate(data.rep_created_at) }}
        </template> -->
        <!-- <template #rep_updated_at_front="{ data }">
            {{ chageDate(data.rep_updated_at) }}

        </template> -->
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
import router from "@/router";


const reports = ref([])
const date = new Date();




const dataHead = ref([
    { key: "rep_intn_id", title: "รหัสนักศึกษาฝึกงาน", align: "center" },
    { key: "rep_intn_name", title: "ชื่อ-นามสกุล"},
    { key: "rep_from_date", title: "วันที่ได้รับ", align: "center" },
    { key: "rep_end_date", title: "วันที่สิ้นสุด", align: "center" },
    { key: "rep_count_date", title: "จำนวนวันทำงาน" },
    { key: "rep_salaries", title: "จำนวนวันทั้งหมด", align: "center" },
    { key: "rep_total", title: "ยอดรวม", align: "center" },
    { key: "rep_edit", title: "แก้ไข", align: "center" },
    { key: "rep_remove", title: "ลบ", align: "center" },
    { key: "rep_history", title: "ประวัติ", align: "center" },
])

const formData = ref({
    rep_code: "",
    rep_updated_by: 1
})

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

function handleClick(rep_id) {
  router.push({ name: "reportData", params: { id: rep_id } });
}

function chageDate(value) {
    if (value) {
        const date = new Date(value)
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (day < 10) {
            day = `0${day}`
        }
        if (month < 10) {
            month = `0${month}`
        }
        return `${day}/${month}/${year}`
    }
    return ''
}

let nameUser = "ปริญญา ก้อนจันทึก"

onMounted(() => {
    getReport(),
    getAllTeam()
})
</script>

<style scoped></style> 