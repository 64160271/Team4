<template>
    <LayoutMenuName backButton :page-name='"เบี้ยเลี้ยง > จัดการเบี้ยเลี้ยง >"+ repCode +" > "+ internCode' />
    <div class="row mb-2">



    </div>

    <DataTable :heads="dataHead" :items="salarys" :total="salarys.length" >
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
import DataTable from '../Component/DataTable.vue'
import { onMounted } from 'vue';
import axios from 'axios'
import { useRoute } from "vue-router"
import { useAuthenticate } from '../../stores/authenticate';

const route = useRoute()
const user = useAuthenticate()
let openModal = ref(false)
const salarys = ref([])
const reports = ref([])
const date = new Date();
const id = route.params.idIntern
const idReport = route.params.id
const repCode = ref("");
const internCode = ref([]);


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

// const getSalaryByInternId = async () => {
//     await axios.get(`${import.meta.env.VITE_API_HOST}/salaries/interns/${id}`).
//         then((response) => {
//             salarys.value = response.data
//             internCode.value = salarys.value?.sal_intern
//         })
//     console.log(salarys.value)
//     console.log("intern=",internCode.value)
// }

const getSalaryByInternId = async () => {
        const response = await axios.get(`${import.meta.env.VITE_API_HOST}/salaries/interns/${id}`);
        const salaryData = response.data;

        
        const mappedData = salaryData.map((sal) => { return sal.sal_intern } )

        
        salarys.value = salaryData;
        internCode.value = mappedData[0].intn_code;

        
        console.log(salarys.value);
        console.log("intern =", internCode.value);

        return mappedData;
};

const getReportById = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/reports/${idReport}`).
        then((response) => {
            reports.value = response.data
            repCode.value = reports.value.rep_code
        })
    console.log(repCode.value)
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
    getSalaryByInternId(),
    getReportById()
})
</script>

<style scoped></style>