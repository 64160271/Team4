<template>
    <LayoutMenuName backButton page-name="รายงานเบี้ยเลี้ยง" />
    <div class="row mb-2">

        <div class="col-auto ms-auto">
            <BaseButton label="+ เพิ่มข้อมูล" @click="checkModal(openModal)" />
        </div>
        <div class="col-auto ">
            <BaseButton label="เพิ่มจากไฟล์ Excel" @click="router.push({ name: 'addReport-File', params: { id: id } })">
                <template>
                    <ExcelIcon />
                </template>
            </BaseButton>
        </div>

    </div>

    <BaseModal size="lg" v-if="openModal == true" @save="formSubmit" @close="openModal = false" title="เพิ่มข้อมูล">
        <div class="col mb-3">
            <BaseInput v-model="formData.rep_intn_code" :value="formData.rep_intn_code" label="รหัสนักศึกษาฝึกงาน"
                input_type="text" required="required" placeholder="xxx-xxxx" :disabled="modalMode == 'edit'"
                :class="{ 'is-invalid': v$.rep_intn_code.$error }" />
            <InvalidFeedback :errors="v$.rep_intn_code.$errors" />
        </div>
        <div class="col mb-3">
            <BaseInput :value="formData.sal_intn_name" label="ชื่อ-นามสกุล" input_type="text" readonly="readonly"
                required :class="{ 'is-invalid': v$.sal_intn_name.$error }" />
            <InvalidFeedback :errors="v$.sal_intn_name.$errors" />
        </div>
        <div class="col mb-3">
            <BaseInput v-model="formData.sal_from_date" :value="formData.sal_from_date" label="วันที่เริ่มต้น"
                input_type="date" required :class="{ 'is-invalid': v$.sal_from_date.$error }" />
            <InvalidFeedback :errors="v$.sal_from_date.$errors" />
        </div>
        <div class="col mb-3">
            <BaseInput v-model="formData.sal_to_date" :value="formData.sal_to_date" label="วันที่สิ้นสุด"
                input_type="date" required :class="{ 'is-invalid': v$.sal_to_date.$error }" />
            <InvalidFeedback :errors="v$.sal_to_date.$errors" />
        </div>
        <hr>
        <div class="row">
            <div class="col mb-3">
                <BaseInput v-model="formData.sal_day" :value="formData.sal_day" label="จำนวนวันทำงาน"
                    @input="calculateSalary(formData.sal_day, formData.sal_salary, formData.sal_extra)"
                    input_type="number" required="required" :class="{ 'is-invalid': v$.sal_day.$error }" />
                <InvalidFeedback :errors="v$.sal_day.$errors" />
            </div>
            <div class="col mb-3">
                <BaseInput v-model="formData.sal_salary" :value="formData.sal_salary" label="เบี้ยเลี้ยง :วัน"
                    @input="calculateSalary(formData.sal_day, formData.sal_salary, formData.sal_extra)"
                    input_type="number" required="required" :class="{ 'is-invalid': v$.sal_salary.$error }" />
                <InvalidFeedback :errors="v$.sal_salary.$errors" />
            </div>
            <div class="col mb-3">
                <BaseInput v-model="formData.sal_extra" :value="formData.sal_extra" label="เบี้ยเลี้ยงพิเศษ"
                    @input="calculateSalary(formData.sal_day, formData.sal_salary, formData.sal_extra)"
                    input_type="number" required="required" :class="{ 'is-invalid': v$.sal_extra.$error }" />
                <InvalidFeedback :errors="v$.sal_extra.$errors" />
            </div>
            <div class="col mb-3">
                <BaseInput :value="formData.sal_total_salary"
                    @input="calculateSalary(formData.sal_day, formData.sal_salary, formData.sal_extra)"
                    label="รวมเบี้ยเลี้ยง" input_type="text" readonly="readonly" />
            </div>
        </div>
    </BaseModal>

    <DataTable :heads="dataHead" :items="salarys" clickable @clicked="handleClick">
        <template #sal_total="{ data }">
            {{ calculateSalary(data.sal_day, data.sal_salary, data.sal_extra) }}
        </template>
        <template #sal_from_date_front="{ data }">
            {{ formatDate(data.sal_from_date) }}
        </template>
        <template #sal_salary_and_extra="{ data }">
            {{ data.sal_salary }} / {{ data.sal_extra }}
        </template>
        <template #sal_to_date_front="{ data }">
            {{ formatDate(data.sal_to_date) }}
        </template>
        <template #sal_edit="{ data }">
            <EditIcon @click="editSalary(data)" />
        </template>
        <template #sal_remove="{ data }">
            <DeleteButton @click="deleteSalaryIntern(data.sal_id)" />
        </template>
    </DataTable>

    <div class="row">
        <div class="col-auto ms-auto">
            <BaseButton label="บันทึกร่าง" @click="changeSave(0)" />
        </div>
        <div class="col-auto ">
            <BaseButton label="บันทึก" @click="changeSave(1)" />
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
import { confirmation, successAlert, errorAlert } from "../../assets/js/func"
import InvalidFeedback from "../Component/InvalidFeedback.vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

const route = useRoute()
let openModal = ref(false)
let openModal2 = ref(false)
const salarys = ref([])
const reports = ref([])
const date = new Date();
const id = route.params.id
const changeStatus = ref({
    report_id: Number(0),
    status_report: Number(0)
})
let salaryEditId = 0
let modalMode = ref()
const requiredNotSpNumCh = helpers.regex(/^[1-9][0-9]*$/)
const NumOfSalary = 'ข้อมูลต้องเป็นตัวเลขเท่านั้น'

const rules = {
    rep_intn_code: {
        required
    },
    sal_intn_name: {
        required
    },
    sal_from_date: {
        required
    },
    sal_to_date: {
        required
    },
    sal_day: {
        required,
        requiredNotSpNumCh: helpers.withMessage(NumOfSalary, requiredNotSpNumCh)
    },
    sal_salary: {
        required,
        requiredNotSpNumCh: helpers.withMessage(NumOfSalary, requiredNotSpNumCh)
    },
    sal_extra: {
        required,
        requiredNotSpNumCh: helpers.withMessage(NumOfSalary, requiredNotSpNumCh)
    }
};

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
const v$ = useVuelidate(rules, formData);

const dataHead = ref([
    { key: "sal_intern.intn_code", title: "รหัสนักศึกษาฝึกงาน", align: "center" },
    { key: "sal_intern.intn_name_th", title: "ชื่อ-นามสกุล" },
    { key: "sal_from_date_front", title: "วันที่ได้รับ", align: "center" },
    { key: "sal_to_date_front", title: "วันที่สิ้นสุด", align: "center" },
    { key: "sal_day", title: "จำนวนวันทำงาน", align: "right" },
    { key: "sal_salary_and_extra", title: "เบี้ยเลี้ยงทั้งหมด", align: "center" },
    { key: "sal_total", title: "ยอดรวม", align: "center" },
    { key: "sal_edit", title: "แก้ไข", align: "center" },
    { key: "sal_remove", title: "ลบ", align: "center" },
    { key: "sal_intn_history", title: "ประวัติ", align: "center" },
])

async function changeSave(value) {
    if (reports.value.rep_status == 1) {
        errorAlert("สถานะของรายการนี้ได้กดบันทึกแล้ว");
        return;
    }
    console.log("statussss = ", reports.value.rep_status)
    console.log("status = ", value)
    console.log("report = ", id)
    if (value == 0) {
        changeStatus.value.status_report = value;
        changeStatus.value.report_id = id;
        console.log(changeStatus.report_id)
        console.log("aaaaa", changeStatus.value)
        await axios.post(`${import.meta.env.VITE_API_HOST}/reports/update-status`, changeStatus.value,)
        router.push({ name: 'manageSalary' })
    } else if (value == 1) {
        changeStatus.value.status_report = value;
        changeStatus.value.report_id = id;
        console.log(changeStatus.report_id)
        console.log("aaaaa", changeStatus.value)
        await axios.post(`${import.meta.env.VITE_API_HOST}/reports/update-status`, changeStatus.value,)
        router.push({ name: 'manageSalary' })
    }
}

async function deleteSalaryIntern(sal_id) {
    console.log(sal_id)
    const result = await confirmation("คุณต้องการลบรายการนี้ใช้หรือไม่");
    if (result) {
        await axios.delete(`${import.meta.env.VITE_API_HOST}/salaries/${sal_id}`)
            .then(async (_res) => {
                await successAlert("ลบรายการนี้สำเร็จแล้ว");
                router.go();
            }).catch((err) => {
                console.log(e)
                errorAlert(err);
            });

    }
}

const getReportById = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/reports/${id}`).
        then((response) => {
            reports.value = response.data
        })
    console.log(reports.value)
}

const getSalaryByReportId = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/salaries/reports/${id}`).
        then((response) => {
            salarys.value = response.data

        })
    console.log(salarys.value)
}

function checkModal(checkModd) {
    if (checkModd == false) {
        openModal.value = true
    }
    formData.value.sal_total_salary = 0
    modalMode.value = "add"
}


async function editSalary(salary) {
    Object.assign(formData.value, {
        rep_intn_code: salary?.sal_intern.intn_code,
        sal_updated_by: salary?.sal_updated_by,
        sal_report_id: salary?.sal_report_id,
        sal_intn_name: salary?.sal_intern.intn_name_th,
        sal_from_date: salary?.sal_from_date,
        sal_to_date: salary?.sal_to_date,
        sal_day: salary?.sal_day,
        sal_salary: salary?.sal_salary,
        sal_extra: salary?.sal_extra,
        sal_total_salary: salary?.sal_total_salary,

    });
    console.log("aaaa =", salary.sal_id)
    openModal.value = true
    salaryEditId = salary.sal_id
    console.log("bbbb =", salaryEditId)
    modalMode.value = "edit"
}

function calculateSalary(day, salary, extra) {
    // แปลงค่าเป็นตัวเลขก่อนการบวก
    salary = parseFloat(salary);
    extra = parseFloat(extra);
    day = parseFloat(day)

    let result = day * salary + extra;

    return formData.value.sal_total_salary = result;
}




async function formSubmit() {
    const validate = await v$.value.$validate(); /* validate แบบฟอร์ม */

    if (validate) {

        if (modalMode.value == "add") {
            await axios.post(`${import.meta.env.VITE_API_HOST}/salaries/create-salary`, formData.value)
        } else if (modalMode.value == "edit") {
            await axios.put(`${import.meta.env.VITE_API_HOST}/salaries/edit-salary-intern/${salaryEditId}`, formData.value)
        }
        router.go()
    }
    console.log("mode = ", modalMode.value)
    console.log(formData.value)
    console.log(124)
    
}

function formatDate(date) {
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
    getSalaryByReportId(),
        getReportById()
})
</script>

<style scoped></style>