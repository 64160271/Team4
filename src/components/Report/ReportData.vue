<template>
    <LayoutMenuName backButton page-name="รายงานเบี้ยเลี้ยง" />
    <div class="row mb-2">
        
            <div class="col-auto ms-auto"> 
            <BaseButton label="+ เพิ่มข้อมูล" @click="checkModal(openModal)"  />
            </div>
            <div class="col-auto ">
            <BaseButton label="เพิ่มจากไฟล์ Excel" @click="router.push({name:'addReport-File' , params: { id: id }} )" >
                <template>
                    <ExcelIcon />
                </template>
            </BaseButton>
            </div>
        
    </div>

    <BaseModal size="lg" v-if="openModal" @save="formSubmit" @close="openModal = false"  title="เพิ่มข้อมูล">
        <div class="col mb-3">
            <BaseInput v-model="formData.rep_intn_code" label="รหัสนักศึกษาฝึกงาน" input_type="text" required="required"
                placeholder="xx/xxxx" />
        </div>
        <div class="col mb-3">
            <BaseInput :value="formData.sal_intn_name" label="ชื่อ-นามสกุล" input_type="text" readonly="readonly" />
        </div>
        <div class="col mb-3">
            <BaseInput v-model="formData.sal_from_date" label="วันที่เริ่มต้น" input_type="date"  />
        </div>
        <div class="col mb-3">
            <BaseInput v-model="formData.sal_to_date" label="วันที่สิ้นสุด" input_type="date"  />
        </div>
        <hr>
        <div class="row">
            <div class="col mb-3">
                <BaseInput v-model="formData.sal_day" label="จำนวนวันทำงาน" @input="calculateSalary(formData.sal_day,formData.sal_salary,formData.sal_extra)" input_type="number" required="required" />
            </div>
            <div class="col mb-3">
                <BaseInput v-model="formData.sal_salary" label="เบี้ยเลี้ยง :วัน" @input="calculateSalary(formData.sal_day,formData.sal_salary,formData.sal_extra)" input_type="number" required="required" />
            </div>
            <div class="col mb-3">
                <BaseInput v-model="formData.sal_extra" label="เบี้ยเลี้ยงพิเศษ" @input="calculateSalary(formData.sal_day,formData.sal_salary,formData.sal_extra)" input_type="number" required="required" />
            </div>
            <div class="col mb-3">
                <BaseInput :value="formData.sal_total_salary" @input="calculateSalary(formData.sal_day,formData.sal_salary,formData.sal_extra)" label="รวมเบี้ยเลี้ยง" input_type="text" readonly="readonly" />
            </div>
        </div>
    </BaseModal>

    <DataTable :heads="dataHead" :items="salarys" clickable @clicked="handleClick">
        <template #sal_total = "{ data }">
            {{ calculateSalary(data.sal_day,data.sal_salary, data.sal_extra) }}
        </template>
        <template #sal_from_date_front = "{ data }">
            {{ formatDate(data.sal_from_date) }}
        </template>
        <template #sal_salary_and_extra = "{ data }">
            {{ data.sal_salary }} / {{ data.sal_extra }}
        </template>
        <template #sal_to_date_front = "{ data }">
            {{ formatDate(data.sal_to_date) }}
        </template>
        <template #sal_edit>
            <EditIcon />
        </template>
        <template #sal_remove>
            <DeleteButton />
        </template>
    </DataTable>
    <div class="row">
        <div class="col-auto ms-auto">
            <BaseButton label="บันทึกร่าง" @click="changeSave(0)"  />
        </div>
        <div class="col-auto " >
            <BaseButton label="บันทึก" @click="changeSave(1)"  />
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from '../Component/BaseButton.vue'
import DataTable from '../Component/DataTable.vue'
import BaseModal from '../Component/BaseModal.vue'
import BaseInput from '../Component/BaseInput.vue'
import { onMounted } from 'vue';
import axios from 'axios'
import EditIcon from '../icons/EditIcon.vue'
import DeleteButton from '../icons/DeleteButton.vue'
import { useRoute } from "vue-router"
import ExcelIcon from '../icons/ExcelIcon.vue'
import SideLabelInput from '../Component/SideLabelInput.vue'
import router from "@/router";

const route = useRoute()
let openModal = ref(false)
const salarys = ref([])
const date = new Date();
const id = route.params.id
const changeStatus = ref({
    report_id: Number(0) ,
    status_report: Number(0)
})


const formData = ref({
    rep_intn_code: "",
    sal_updated_by: 1,
    sal_report_id: id,
    sal_intn_name: "",
    sal_from_date: "",
    sal_to_date: "",
    sal_day: Number(0),
    sal_salary: Number(0),
    sal_extra: Number(0),
    sal_total_salary: Number(0),
})

const dataHead = ref([
    { key: "sal_intern.intn_code", title: "รหัสนักศึกษาฝึกงาน", align: "center" },
    { key: "sal_intern.intn_name_th", title: "ชื่อ-นามสกุล"},
    { key: "sal_from_date_front", title: "วันที่ได้รับ", align: "center" },
    { key: "sal_to_date_front", title: "วันที่สิ้นสุด", align: "center" },
    { key: "sal_day", title: "จำนวนวันทำงาน" , align: "right"},
    { key: "sal_salary_and_extra", title: "เบี้ยเลี้ยงทั้งหมด", align: "center" },
    { key: "sal_total", title: "ยอดรวม", align: "center" },
    { key: "sal_edit", title: "แก้ไข", align: "center" },
    { key: "sal_remove", title: "ลบ", align: "center" },
    { key: "sal_intn_history", title: "ประวัติ", align: "center" },
])

async function changeSave (value){
    console.log("status = " ,value)
    console.log("report = ",id)
    if (value == 0){
        changeStatus.value.status_report = value ;
        changeStatus.value.report_id = id ;
        console.log(changeStatus.report_id)
        console.log("aaaaa",changeStatus.value)
        await axios.post(`${import.meta.env.VITE_API_HOST}/reports/update-status`, changeStatus.value,)
        router.push({ name: 'manageSalary' })
    }else if (value == 1){
        changeStatus.value.status_report = value ;
        changeStatus.value.report_id = id ;
        console.log(changeStatus.report_id)
        console.log("aaaaa",changeStatus.value)
        await axios.post(`${import.meta.env.VITE_API_HOST}/reports/update-status`, changeStatus.value,)
        router.push({ name: 'manageSalary' })
    }
}


const getSalaryByReportId = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/salaries/reports/${id}`).
        then((response) => {
            salarys.value = response.data
            
        })
        console.log(salarys.value)
}

function checkModal (checkModd){
    if (checkModd == false){
        openModal.value = true
    }
    formData.sal_total_salary = 0
    
}

function calculateSalary(day,salary, extra) {
    // แปลงค่าเป็นตัวเลขก่อนการบวก
    salary = parseFloat(salary);
    extra = parseFloat(extra);
    day = parseFloat(day)

    let result = day * salary + extra;

    return formData.value.sal_total_salary = result;
}



async function formSubmit() {
    await axios.post(`${import.meta.env.VITE_API_HOST}/salaries/create-salary`, formData.value,)
    console.log(formData.value)
    console.log(124)
    router.go()
}

function handleClick(rep_id) {
  router.push({ name: "reportData", params: { id: rep_id } });
}

function formatDate(date){
    let split = date.split("-")
    let year = parseInt(split[0]) + 543
    let month = split[1]
    let day = split[2]
    
    return `${day}-${month}-${year}`
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