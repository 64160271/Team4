<template>
    <LayoutMenuName page-name="เอกสารรับรองการฝึกงาน" />
    <div class="row mb-3">
        <div class="col-md-5 my-auto nopadding">
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
        <DataTable striped clickable clickReturn="cer_id" @clicked="checkRow" :heads="tableHead" :items="certificates"
            hover-background :total="certificates.length" paginate :active-page="page" :items-per-page="pageSize"
            @page-change="setCurrentPage">

            <template #cer_key="{ data }">
                <input :name="data?.cer_id" :id="data?.cer_id" type="checkbox"
                    @click="select_certificate(data?.cer_created_at, data?.cer_filename) && checkRow(data?.cer_created_at, data?.cer_filename)"
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
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BaseButton from '../component/BaseButton.vue';
import DataTable from '../Component/DataTable.vue';
import Download from '../icons/DownloadButton.vue';
import Search from "../Component/SearchBox.vue";
import BaseSelect from "../Component/BaseSelect.vue";
import BaseInput from "../Component/BaseInput.vue";
import Picture from "../icons/PictureLogo.vue";
import Delete from '../icons/DeleteButton.vue';
import { useRoute } from 'vue-router';
import apiService from "../../services/api";
import router from "@/router";
import { confirmation, successAlert, errorAlert, changeTimestampToDate } from "../../assets/js/func";


const route = useRoute();

const tableHead = ref([
    { key: "cer_key", title: "ชื่อไฟล์", align: "center" },
    { key: "cer_intern.intn_code", title: "รหัสนักศึกษาฝึกงาน", align: "center" },
    { key: "cer_intern.intn_name_th", title: "ชื่อ - นามสกุล", },
    { key: "cer_intern.work_infos[0].work_team.team_name", title: "ทีม", },
    { key: "cer_intern.intn_major.maj_faculty.fac_university.uni_name", title: "มหาวิทยาลัย", },
    { key: "created_at", title: "วันที่ออกเอกสาร", align: "center" },
    { key: "open_file", title: "เปิดไฟล์", align: "center" },
    { key: "download", title: "ดาวน์โหลด", align: "center" },
    // { key: "delete", title: "ลบ" },
]);

const total = ref();
const page = ref(1);
const pageMax = ref(1);
const pageSize = 10000;
const certificates = ref([])
const selected = [];
const selected_years = [];
const selected_filenames = [];
let validate = ref(false);
const team_id = ref();
const cerCreate = ref("");
const searchData = ref("");
const teams = ref([]);
const years = ref([]);
let timer;

function checkRow(index) {
    let checkbox = document.getElementById(index);

    checkbox.click();
}

function search() {
    if (timer) {
        clearTimeout(timer);
    }

    timer = setTimeout(() => {
        setCurrentPage(1);
    }, 500);
}

function select_certificate(year, filename) {
    if (selected_years.indexOf(year) != -1) {
        selected_years.splice([selected_years.indexOf(year)], 1)
    } else {
        selected_years.push(year)
    }

    if (selected_filenames.indexOf(filename) != -1) {
        selected_filenames.splice([selected_filenames.indexOf(filename)], 1)
    } else {
        selected_filenames.push(filename)
    }

    console.log(selected_years)
    console.log(selected_filenames)
}


const getAllCertificate = async () => {
    const params = {
        page: page.value,
        limit: pageSize,
        team_id: team_id.value || undefined,
        filter: searchData.value || undefined,
        cer_created_at: cerCreate.value || undefined,
    };
    // const date = new Date();

    await axios
        .get(`${import.meta.env.VITE_API_HOST}/certificates`, { params })
        .then((response) => {
            certificates.value = response.data.rows;
            total.value = response.data.count;
            pageMax.value = Math.ceil(total.value / pageSize);
        });
};

async function CerCreateSelect() {

    const response = await axios.get(`${import.meta.env.VITE_API_HOST}/certificates`);
    console.log(response)
    const year = response.data.rows.map(entry => new Date(entry.cer_created_at).getFullYear() + 543);
    years.value = [...new Set(year)];
    console.log(years.value)


}

async function setCurrentPage(pageNumber) {

    if (pageNumber > 0 && pageNumber <= pageMax.value) {
        page.value = pageNumber;
    }

    await getAllCertificate();
}

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

async function downloadSelectPDF() {

    if (selected_years.length === 0 || selected_filenames.length === 0) {
        validate.value = false
        errorAlert("กรุณาเลือกอย่างน้อย 1 ข้อมูล")
        return
    }
    const result = await confirmation("คุณต้องการดาวน์โหลดเอกสารที่เลือกหรือไม่");

    if (result) {
        for (let i = 0; i < selected_years.length; i++) {
            const year_select = selected_years[i];
            const filename_select = selected_filenames[i];
            downloadPDF(year_select, filename_select);
        }
    }

}

async function openPDF(year, cerFilename) {
    window.open(`${import.meta.env.VITE_API_HOST}/certificates/${changeTimestampToYear(year)}/${cerFilename}`)
}

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
    setCurrentPage(page.value, cerCreate.value);
    let service = new apiService();
    teams.value = await service.getAllTeam();
    CerCreateSelect();
})



</script>

<style scoped>
.search {
    background-color: #8d969b30 !important;
}
</style>