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

    <DataTable :heads="dataHead" :items="salarys" clickable @clicked="handleClick">
        <template #sal_total = "{ data }">
            {{ calculateSalary(data.sal_salary, data.sal_extra) }}
        </template>
        
        <template #sal_edit>
            <EditIcon />
        </template>
        <template #sal_remove>
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
import { useRoute } from "vue-router"

const route = useRoute()
const salarys = ref([])
const date = new Date();
const id = route.params.id
let salary_total = 0.0

const dataHead = ref([
    { key: "sal_intern.intn_code", title: "รหัสนักศึกษาฝึกงาน", align: "center" },
    { key: "sal_intern.intn_name_th", title: "ชื่อ-นามสกุล"},
    { key: "sal_from_date", title: "วันที่ได้รับ", align: "center" },
    { key: "sal_to_date", title: "วันที่สิ้นสุด", align: "center" },
    { key: "sal_day", title: "จำนวนวันทำงาน" , align: "right"},
    { key: "sal_salary", title: "เบี้ยเลี้ยงทั้งหมด", align: "center" },
    { key: "sal_total", title: "ยอดรวม", align: "center" },
    { key: "sal_edit", title: "แก้ไข", align: "center" },
    { key: "sal_remove", title: "ลบ", align: "center" },
    { key: "sal_intn_history", title: "ประวัติ", align: "center" },
])



const getSalaryByReportId = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/salaries/reports/${id}`).
        then((response) => {
            salarys.value = response.data
            
        })
        console.log(salarys.value)
}
function calculateSalary(salary, extra) {
    // แปลงค่าเป็นตัวเลขก่อนการบวก
    salary = parseFloat(salary);
    extra = parseFloat(extra);

    let result = salary + extra;

    return result;
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
    // getReport(),
    // getAllTeam(),
    console.log(id)
    // getReportById(),
    getSalaryByReportId()
})
</script>

<style scoped></style> 