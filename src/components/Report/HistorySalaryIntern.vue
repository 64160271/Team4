<template>
    <LayoutMenuName backButton :page-name='เบี้ยเลี้ยง > จัดการเบี้ยเลี้ยง > rep_code' />
    <div class="row mb-2">



    </div>

    <DataTable :heads="dataHead" :items="salarys" >
        <template #sal_total="{ data }">
            {{ calculateSalary(data.sal_day, data.sal_salary, data.sal_extra) }}
        </template>

        <template #sal_salary_and_extra="{ data }">
            {{ data.sal_salary }} / {{ data.sal_extra }}
        </template>

    </DataTable>

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

const route = useRoute()
const user = useAuthenticate()
let openModal = ref(false)
const salarys = ref([])
const reports = ref([])
const date = new Date();
const id = route.params.idIntern

const changeStatus = ref({
    report_id: Number(0),
    status_report: Number(0)
})
let salaryEditId = 0
let modalMode = ref()
const internSearch = ref([]);

const dateAfterStart = (v) => {
    if (v) {
        let date = formData.sal_from_date
        return (v > date)
    }
    return true
}

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

const dataHead = ref([
    { key: "sal_intern.intn_name_th", title: "ชื่อ-นามสกุล" },
    { key: "sal_from_date", title: "วันที่ได้รับ", align: "center" },
    { key: "sal_to_date", title: "วันที่สิ้นสุด", align: "center" },
    { key: "sal_day", title: "จำนวนวันทำงาน", align: "right" },
    { key: "sal_salary_and_extra", title: "เบี้ยเลี้ยงทั้งหมด", align: "center" },
    { key: "sal_total", title: "ยอดรวม", align: "center" },
    { key: "sal_updated_by_user.user_name", title: "ผู้แก้ไขข้อมูลล่าสุด", align: "center" },
    
])

const getSalaryByInternId = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/salaries/interns/${id}`).
        then((response) => {
            salarys.value = response.data
        })
    console.log(salarys.value)
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
                }))
            });
    }, 500);
    console.log("bbbb=", formData)
    console.log("aaaaaaaaa=", internSearch.value)
}

// async function fetchIntern() {
//     if (timer) {
//         clearTimeout(timer);
//     }

//     timer = setTimeout(async () => {
//         const params = {
//             filter: formData.rep_intn_code || undefined,
//         };

//         await axios
//             .get(`${import.meta.env.VITE_API_HOST}/interns`, { params })
//             .then((response) => {
//                 internSearch.value = response.data.rows.map(intern => {
//                     return {
//                         'sal_intn_name': intern.intn_name_th,
//                         'rep_intn_code': intern.intn_code,
//                         // Add other properties as needed
//                     };
//                 });
//             });
//     }, 500);
//     console.log("bbbb=", formData.value);
//     console.log("aaaaaaaaa=", internSearch.value);
// }




function calculateSalary(day, salary, extra) {
    // แปลงค่าเป็นตัวเลขก่อนการบวก
    salary = parseFloat(salary);
    extra = parseFloat(extra);
    day = parseFloat(day)

    let result = day * salary + extra;

    return formData.sal_total_salary = result;
}

onMounted(() => {
    // getReport(),
    // getAllTeam(),
    console.log(id)
    // getReportById(),
    getSalaryByInternId()
})
</script>

<style scoped></style>