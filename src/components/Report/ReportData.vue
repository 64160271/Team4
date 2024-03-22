<template>
    <LayoutMenuName backButton :page-name="'เบี้ยเลี้ยง > จัดการเบี้ยเลี้ยง > ' + repCode" />

    <SectionSpace>
        <div class="row mb-3">

            <BaseButton class="col-md-2 ms-auto me-3" label="+ เพิ่มข้อมูล" @click="checkModal(openModal)" />
            <BaseButton label="เพิ่มจากไฟล์ Excel" class="col-md-2"
                @click="router.push({ name: 'addReport-File', params: { id: id } })">
                <template>
                    <ExcelIcon />
                </template>
            </BaseButton>

        </div>

        <BaseModal size="lg" v-if="openModal == true" @save="formSubmit" @close="openModal = false"
            :title="changeNameModal(modalMode)">
            <div class="col mb-3">
                <AutoComplete @focus.once="fetchIntern()" label="รหัสนักศึกษาฝึกงาน" v-model="formData.rep_intn_code"
                    :value="formData.rep_intn_code" placeholder="INT-0000" required :items="internSearch"
                    @search="fetchIntern" @return="handleReturn" item-text="intn_name"
                    :class="{ 'is-invalid': v$.rep_intn_code.$error }" :disabled="modalMode == 'edit'" />
                <InvalidFeedback :errors="v$.rep_intn_code.$errors" />
                <!-- <BaseInput v-model="formData.rep_intn_code" :value="formData.rep_intn_code" label="รหัสนักศึกษาฝึกงาน"
        input_type="text" required="required" placeholder="xxx-xxxx" :disabled="modalMode == 'edit'"
        :class="{ 'is-invalid': v$.rep_intn_code.$error }" />
    <InvalidFeedback :errors="v$.rep_intn_code.$errors" /> -->
            </div>
            <div class="col mb-3">
                <BaseInput placeholder="ค้นหาจากด้านบน" :value="formData.sal_intn_name" label="ชื่อ-นามสกุล"
                    input_type="text" readonly="readonly" required :class="{ 'is-invalid': v$.sal_intn_name.$error }" />
                <InvalidFeedback :errors="v$.sal_intn_name.$errors" />
            </div>
            <div class="col mb-3">
                <DatePicker placeholder="DD/MM/YYYY" pid="start" label="วันที่ได้รับ" v-model="formData.sal_from_date"
                    required :class="{ 'is-invalid': v$.sal_from_date.$error }">
                    <InvalidFeedback :errors="v$.sal_from_date.$errors" />
                </DatePicker>

            </div>
            <div class="col mb-3">
                <DatePicker placeholder="DD/MM/YYYY" pid="end" label="วันที่สิ้นสุด" v-model="formData.sal_to_date"
                    required :class="{ 'is-invalid': v$.sal_to_date.$error }">
                    <InvalidFeedback :errors="v$.sal_to_date.$errors" />
                </DatePicker>
                <div></div>
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
                    <BaseInput :value="calculateSalary(formData.sal_day, formData.sal_salary, formData.sal_extra)"
                        label="รวมเบี้ยเลี้ยง" input_type="text" readonly="readonly" />
                </div>
            </div>
        </BaseModal>

        <div class="row">
            <Loading v-if="!loaded" />

            <DataTable v-if="loaded" striped hover-background :heads="dataHead" :items="salarys">
                <template #sal_total="{ data }">
                    {{ formatCurrency.format(calculateSalary(data.sal_day, data.sal_salary, data.sal_extra)) }}
                </template>

                <template #sal_salary_and_extra="{ data }">
                    {{ formatCurrency.format(data.sal_salary) }} / {{ formatCurrency.format(data.sal_extra) }}
                </template>

                <template #sal_edit="{ data }">
                    <EditIcon @click="editSalary(data)" class="cursor-p hov-outline-red" />
                </template>
                <template #sal_remove="{ data }">
                    <DeleteButton @click="deleteSalaryIntern(data.sal_id)" />
                </template>
                <template #sal_intn_history="{ data }">
                    <HistoryIcon class="cursor-p hov-fill-red"
                        @click="router.push({ name: 'historySalaryIntern', params: { idIntern: data.sal_intern.intn_id } })" />
                </template>
            </DataTable>
        </div>

        <div class="row">
                <BaseButton label="ย้อนกลับ" back class="col-auto  sm " @click="$router.push('/reports/manageSalary')" />
            <BaseButton class=" col-md-2 ms-auto sm" label="บันทึก" @click="changeSave(1)" />

        </div>
    </SectionSpace>
</template>

<script setup>
import { reactive, ref } from 'vue';
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
import { confirmation, successAlert, errorAlert, slashDtoDashY } from "../../assets/js/func"
import InvalidFeedback from "../Component/InvalidFeedback.vue";
import useVuelidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import AutoComplete from '../Component/AutoComplete.vue';
import DatePicker from '../Component/DatePicker.vue';
import { useAuthenticate } from '../../stores/authenticate';
import HistoryIcon from '../icons/HistoryIcon.vue';

const formatCurrency = ref(new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB'
}))
const route = useRoute()
const user = useAuthenticate()
let openModal = ref(false)
const salarys = ref([])
const reports = ref([])
const date = new Date();
const id = route.params.id
const repCode = ref("");
const changeStatus = ref({
    report_id: Number(0),
    status_report: Number(0)
})
let salaryEditId = 0
let modalMode = ref()
const internSearch = ref([]);
const requiredNotSpNumCh = helpers.regex(/^[1-9][0-9]*(\.[0-9]+)?$/)
const NumOfSalary = 'ข้อมูลต้องเป็นตัวเลขเท่านั้น'
const afterStartFeedback = 'ไม่สามารถเลือกวันที่มากกว่าวันที่ได้รับได้'
const loaded = ref(false)
const dateAfterStart = (v) => {
    if (v) {
        let date = formData.sal_from_date
        return (v > date)
    }
    return true
}


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
        required,
        dateAfterStart: helpers.withMessage(afterStartFeedback, dateAfterStart)
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

const initialState = {
    rep_intn_code: "",
    sal_updated_by: user.getId,
    sal_report_id: id,
    sal_intn_name: "",
    sal_from_date: "",
    sal_to_date: "",
    sal_day: Number(0),
    sal_salary: Number(0),
    sal_extra: Number(0),
    sal_total_salary: Number(0),
};


const formData = reactive({ ...initialState });
const v$ = useVuelidate(rules, formData);

const dataHead = ref([
    { key: "sal_intern.intn_code", title: "รหัสนักศึกษาฝึกงาน", align: "center" },
    { key: "sal_intern.intn_name_th", title: "ชื่อ-นามสกุล" },
    { key: "sal_from_date", title: "วันที่ได้รับ", align: "center" },
    { key: "sal_to_date", title: "วันที่สิ้นสุด", align: "center" },
    { key: "sal_day", title: "จำนวนวันทำงาน", align: "end" },
    { key: "sal_salary_and_extra", title: "เบี้ยเลี้ยงที่ได้รับ", align: "center" },
    { key: "sal_total", title: "ยอดรวม", align: "center" },
    { key: "sal_edit", title: "แก้ไข", align: "center" },
    { key: "sal_remove", title: "ลบ", align: "center" },
    { key: "sal_intn_history", title: "ประวัติ", align: "center" },
])

function changeNameModal(modalMode) {
    if (modalMode == "add") {
        return "เพิ่มข้อมูลเบี้ยเลี้ยงของนักศึกษา"
    } else if (modalMode == "edit") {
        return "แก้ไขข้อมูลเบี้ยเลี้ยงของนักศึกษา"
    }
}


let timer;

async function fetchIntern() {

    if (timer) {
        clearTimeout(timer);
    }

    timer = setTimeout(async () => {
        const params = {
            filter: formData.rep_intn_code || undefined,
        };

        await axios
            .get(`${import.meta.env.VITE_API_HOST}/interns`, { params })
            .then((response) => {
                internSearch.value = response.data.rows.map((intern) => ({
                    'sal_intn_name': intern.intn_name_th,
                    'rep_intn_code': intern.intn_code,
                    'intn_name': `${intern.intn_code} ${intern.intn_name_th}`
                }))

            });
    }, 500);
}

function handleReturn(val) {
    Object.assign(formData, {
        rep_intn_code: val.rep_intn_code,
        sal_intn_name: val.sal_intn_name
    });

}

async function changeSave(value) {
    if (reports.value.rep_status == 1) {
        errorAlert("สถานะของรายการนี้ได้กดบันทึกแล้ว");
        return;
    }

    if (value == 0) {
        changeStatus.value.status_report = value;
        changeStatus.value.report_id = id;
        await axios.post(`${import.meta.env.VITE_API_HOST}/reports/update-status`, changeStatus.value,)
        router.push({ name: 'manageSalary' })
    } else if (value == 1) {
        changeStatus.value.status_report = value;
        changeStatus.value.report_id = id;
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
                errorAlert(err);
            });

    }
}

const getReportById = async () => {

    await axios.get(`${import.meta.env.VITE_API_HOST}/reports/${id}`).
        then((response) => {
            reports.value = response.data
            repCode.value = reports.value.rep_code
        })


}

const getSalaryByReportId = async () => {
    loaded.value = false

    await axios.get(`${import.meta.env.VITE_API_HOST}/salaries/reports/${id}`).
        then((response) => {
            salarys.value = response.data

        })

    loaded.value = true

}

async function checkModal(checkModd) {
    if (checkModd == false) {
        openModal.value = true
    }

    Object.assign(formData, initialState);
    modalMode.value = "add"
}


async function editSalary(salary) {
    Object.assign(formData, {
        rep_intn_code: salary?.sal_intern.intn_code,
        sal_updated_by: salary?.sal_updated_by,
        sal_report_id: salary?.sal_report_id,
        sal_intn_name: salary?.sal_intern.intn_name_th,
        sal_from_date: slashDtoDashY(salary?.sal_from_date),
        sal_to_date: slashDtoDashY(salary?.sal_to_date),
        sal_day: salary?.sal_day,
        sal_salary: salary?.sal_salary,
        sal_extra: salary?.sal_extra,
        sal_total_salary: salary?.sal_total_salary,

    });
    openModal.value = true
    salaryEditId = salary.sal_id
    modalMode.value = "edit"
}

function calculateSalary(day, salary, extra) {
    // แปลงค่าเป็นตัวเลขก่อนการบวก
    salary = parseFloat(salary);
    extra = parseFloat(extra);
    day = parseFloat(day)

    let result = day * salary + extra;

    return formData.sal_total_salary = result;
}




async function formSubmit() {
    const validate = await v$.value.$validate(); /* validate แบบฟอร์ม */

    if (validate) {

        if (modalMode.value == "add") {
            await axios.post(`${import.meta.env.VITE_API_HOST}/salaries/create-salary`, formData)
        } else if (modalMode.value == "edit") {
            await axios.put(`${import.meta.env.VITE_API_HOST}/salaries/edit-salary-intern/${salaryEditId}`, formData)
        }
        router.go()
    }

}

// function formatDate(date) {
//     let split = date.split("-")
//     let year = parseInt(split[0]) + 543
//     let month = split[1]
//     let day = split[2]

//     return `${day}-${month}-${year}`
// }

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