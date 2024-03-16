<!--
 ShowCertificate
 แสดงหน้าจอสำหรับแสดงรายการเอกสารรับรองทั้งหมด
 Author : Teerajuk Sakunchaisitthichok
 Created date : 14-11-2566
-->
<template>
    <LayoutMenuName page-name="เอกสารรับรองการฝึกงาน" />
    <SectionSpace>
        <div class="row mb-3">
            <div class="col-md-3 my-auto nopadding">
                <Search v-model="searchData" @search="search" />
            </div>

            <div class="col-md-2 ms-2 my-auto nopadding">
                <BaseSelect placeholder="ปี" @change="setCurrentPage(1)" v-model="cerCreate" :options="years"
                    value="cerCreate" text="cerCreate" />
            </div>

            <div class="col-md-2 my-auto">
                <BaseSelect placeholder="ทีม" all-select @change="setCurrentPage(1)" v-model="team_id" :options="teams"
                    value="team_id" text="team_name" />
            </div>

            <BaseButton class="col-auto ms-auto" @click="$router.push('/certificates/selectCompany')"
                label="ออกเอกสารรับรอง" />
        </div>


        <div class="row">
            <Loading v-if="!loaded" />

            <DataTable v-if="loaded" striped clickable clickReturn="cer_id" @clicked="checkRow" :heads="tableHead"
                :items="certificates" hover-background :total="total" paginate :active-page="page"
                :items-per-page="pageSize" @page-change="setCurrentPage">

                <template #cer_key="{ data }">
                    <input :name="data?.cer_id" :id="data?.cer_id" type="checkbox"
                        @click="selectCertificate(data?.cer_created_at, data?.cer_filename) && checkRow(data?.cer_created_at, data?.cer_filename)"
                        class="form-check-input mt-2 p-2" />
                    <span class="ms-lg-4">{{ data.cer_code }}</span>
                </template>

                <template #created_at="{ data }">
                    {{ changeTimestampToDate(data?.cer_created_at) }}
                </template>

                <template #open_file="{ data }">
                    <Picture @click="openPDF(data?.cer_created_at, data?.cer_filename)"></Picture>
                </template>

                <template #download="{ data }">
                    <Download @click="downloadPDF(data?.cer_created_at, data?.cer_filename)"></Download>
                </template>

                <template #bottom-right>
                    <div class="col-md-5 ms-auto text-end nopadding">
                        <BaseButton class="" label="ดาวน์โหลดเอกสารที่เลือก" @click="downloadSelectPDF()" />
                    </div>
                </template>

            </DataTable>

        </div>
    </SectionSpace>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BaseButton from '../Component/BaseButton.vue';
import DataTable from '../Component/DataTable.vue';
import Download from '../icons/DownloadButton.vue';
import Search from "../Component/SearchBox.vue";
import BaseSelect from "../Component/BaseSelect.vue";
import BaseInput from "../Component/BaseInput.vue";
import Picture from "../icons/PictureLogo.vue";
import Delete from '../icons/DeleteButton.vue';
import { useRoute } from 'vue-router';
import ApiService from "../../services/ApiService";
import router from "@/router";
import { confirmation, successAlert, errorAlert, changeTimestampToDate } from "../../assets/js/func";


const route = useRoute();

const tableHead = ref([
    { key: "cer_key", title: "ชื่อไฟล์", align: "center", size: 2 },
    { key: "cer_intern.intn_code", title: "รหัสนักศึกษาฝึกงาน", align: "center", size: 1 },
    { key: "cer_intern.intn_name_th", title: "ชื่อ - นามสกุล", size: 2 },
    { key: "cer_intern.work_infos[0].work_team.team_name", title: "ทีม", size: 2 },
    { key: "cer_intern.intn_major.maj_faculty.fac_university.uni_name", title: "มหาวิทยาลัย", size: 2 },
    { key: "created_at", title: "วันที่ออกเอกสาร", align: "center", size: 2 },
    { key: "open_file", title: "เปิดไฟล์", align: "center" },
    { key: "download", title: "ดาวน์โหลด", align: "center" },
    // { key: "delete", title: "ลบ" },
]);

const total = ref();
const page = ref(1);
const pageMax = ref(1);
const pageSize = 10;
const certificates = ref([])
const selected = [];
const selectedYears = [];
const selectedFilenames = [];
let validate = ref(false);
const team_id = ref();
const cerCreate = ref("");
const searchData = ref("");
const teams = ref([]);
const years = ref([]);
const loaded = ref(false)
let timer;

/*
* checkRow
* ฟังก์ชันสำหรับเลือกข้อมูลแถวนั้นๆ
* param: index ค่าของแถวที่เลือก
* return: -
*/

function checkRow(index) {
    let checkbox = document.getElementById(index);

    checkbox.click();
}

/*
* search
* ฟังก์ชันสำหรับหน่วงเวลาในการค้นหา
* param: -
* return: -
*/

function search() {
    if (timer) {
        clearTimeout(timer);
    }

    timer = setTimeout(() => {
        setCurrentPage(1);
    }, 500);
}

/*
* selectCertificate
* ฟังก์ชันสำหรับหน่วงเวลาในการค้นหา
* param: year และ filename ปี และชื่อไฟล์ของ certificate ที่เลือก
* return: -
*/

function selectCertificate(year, filename) {
    if (selectedYears.indexOf(year) != -1) {
        selectedYears.splice([selectedYears.indexOf(year)], 1)
    } else {
        selectedYears.push(year)
    }

    if (selectedFilenames.indexOf(filename) != -1) {
        selectedFilenames.splice([selectedFilenames.indexOf(filename)], 1)
    } else {
        selectedFilenames.push(filename)
    }

}

/*
* getAllCertificate
* ฟังก์ชันสำหรับรับค่าจาก api และส่งค่าไปที่หลังบ้าน
* param: -
* return: -
*/

const getAllCertificate = async () => {
    loaded.value = false
    const params = {
        page: page.value,
        limit: pageSize,
        team_id: team_id.value || undefined,
        filter: searchData.value || undefined,
        cer_created_at: cerCreate.value || undefined,
    };

    await axios
        .get(`${import.meta.env.VITE_API_HOST}/certificates`, { params })
        .then((response) => {
            certificates.value = response.data.rows;
            total.value = response.data.count;
            pageMax.value = Math.ceil(total.value / pageSize);
            loaded.value = true
        });
};

/*
* cerCreateSelect
* ฟังก์ชันสำหรับเลือก certificate ที่ต้องการดาวน์โหลดพร้อมกัน
* param: -
* return: -
*/

async function cerCreateSelect() {

    const response = await axios.get(`${import.meta.env.VITE_API_HOST}/certificates`);
    const year = response.data.rows.map(entry => new Date(entry.cer_created_at).getFullYear() + 543);
    years.value = [...new Set(year)];
    years.value.unshift("ทั้งหมด");


}

/*
* setCurrentPage
* ฟังก์ชันสำหรับจัดการเมื่อมีการเปลี่ยนหน้าของ DataTable
* param: pageNumber เลขหน้า
* return: -
*/
async function setCurrentPage(pageNumber) {
    if (pageNumber > 0 && pageNumber <= pageMax.value) {
        page.value = pageNumber;
    }

    await getAllCertificate();
}

/*
* downloadPDF
* ฟังก์ชันสำหรับดาวน์โลหดเอกสารรับรองเป็นไฟล์ PDF
* param: year และ fcerFilename ปี และชื่อไฟล์ของ certificate ที่ต้องการดาวน์โหลด
* return: -
*/
async function downloadPDF(year, cerFilename) {
    const pdfURL = `${import.meta.env.VITE_API_HOST}/certificates/${changeTimestampToYear(year)}/${cerFilename}`;

    try {
        const response = await fetch(pdfURL);
        const blob = await response.blob();
        const blobURL = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = blobURL;
        link.download = cerFilename;
        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(blobURL);
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดาวน์โหลด PDF:', error);
    }
}

/*
* downloadSelectPDF
* ฟังก์ชันสำหรับดาวน์โลหดเอกสารรับรองเป็นไฟล์ PDF แบบหลายไฟล์พร้อมกัน
* param: -
* return: -
*/
async function downloadSelectPDF() {

    if (selectedYears.length === 0 || selectedFilenames.length === 0) {
        validate.value = false
        errorAlert("กรุณาเลือกอย่างน้อย 1 ข้อมูล")
        return
    }
    const result = await confirmation("คุณต้องการดาวน์โหลดเอกสารที่เลือกหรือไม่");

    if (result) {
        for (let i = 0; i < selectedYears.length; i++) {
            const yearSelect = selectedYears[i];
            const filename_select = selectedFilenames[i];
            downloadPDF(yearSelect, filename_select);
        }
    }

}

/*
* openPDF
* ฟังก์ชันสำหรับเปิดดูไฟล์ PDF ที่ได้ทำการออก
* param: year และ fcerFilename ปี และชื่อไฟล์ของ certificate ที่ต้องการเปิด
* return: -
*/
async function openPDF(year, cerFilename) {
    window.open(`${import.meta.env.VITE_API_HOST}/certificates/${changeTimestampToYear(year)}/${cerFilename}`)
}

/*
* changeTimestampToYear
* ฟังก์ชันสำหรับเปลี่ยน timestamp เป็นวันเดือนปี
* param: value ค่า timestamp ที่รับมา
* return: -
*/
function changeTimestampToYear(value) {
    if (value) {
        const date = new Date(value)
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (day < 10) {
            day = 0 + `${day}`
        }
        if (month < 10) {
            month = `${month}`
        }
        return `${year}-${month}`
    }
    return ''
}

onMounted(async () => {
    setCurrentPage(page.value);
    let service = new ApiService();
    teams.value = await service.getAllTeam();
    cerCreateSelect();
})



</script>

<style scoped>
input[type="checkbox"] {
  border: 1px solid black;
}
</style>