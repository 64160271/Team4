<template>
    <LayoutMenuName page-name="เอกสารรับรองการฝึกงาน" />
    <div class="row mb-3">
        <div class="col-md-5 my-auto nopadding">
            <Search />
        </div>

        <div class="col-md-2 my-auto">
            <BaseSelect placeholder="ทีม" all-select @change="setCurrentPage(1)" v-model="team_id" :options="teams"
                value="team_id" text="team_name" />
        </div>

        <div class="col-md-2 my-auto nopadding">
            <BaseInput placeholder="วันที่เริ่มต้นฝึกงาน" @change="setCurrentPage(1)" v-model="startDate"
                onfocus="(this.type='date')" onblur="(this.type='text')" />
        </div>
        <BaseButton class="col-auto ms-auto" @click="$router.push('/certificates/selectCompany')" label="ออกเอกสารรับรอง" />
    </div>


    <div class="row">
        <DataTable striped clickable clickReturn="cer_id" @clicked="checkRow" :heads="tableHead" :items="certificates"
            hover-background>

            <template #cer_key="{ data }">
                <input :name="data?.cer_id" :id="data?.cer_id" type="checkbox"
                    @click="select_certificate(data?.cer_id) && checkRow(data?.cer_id)" class="form-check-input mt-2 p-2" />
                <span class="ms-lg-4">{{ data.cer_code }}</span>
            </template>

            <template #created_at="{ data }">
                {{ changeTimestampToDate(data?.cer_created_at) }}
            </template>

            <template #open_file="{ data }">
                <Picture @click="openPDF(data?.cer_created_at, data?.cer_filename)"></Picture>
            </template>

            <template #bottom-right>
                <div class="col-md-5 ms-auto text-end nopadding">
                    <BaseButton class="" label="ดาวน์โหลดเอกสาร" @click="sendToDownload()" />
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
    // { key: "download", title: "ดาวน์โหลด", align: "center" },
    // { key: "delete", title: "ลบ" },
]);

const total = ref();
const page = ref(1);
const pageMax = ref(1);
const pageSize = 10000;
const certificates = ref([])
const selected = [];


function checkRow(index) {
    let checkbox = document.getElementById(index);

    checkbox.click();
}


function select_certificate(id) {
    if (selected.indexOf(id) != -1) {
        selected.splice([selected.indexOf(id)], 1)
    } else {
        selected.push(id)
    }

    console.log(selected)


}

async function sendToDownload() {
    const result = await confirmation();
    if (result) {
        const data_id = {
            cer_id: selected,

        }
        const response = await axios.post(
            `${import.meta.env.VITE_API_HOST}/certificates`,
            data_id

        ).then((response) => {
            successAlert().then(() => {
                // router.push({ path: "/certificates" });
            });
        })
            .catch((err) => {
                errorAlert(err);
            });
        console.log(data_id);
        console.log(response.data);

    }

}

// function download(){
//     downloadPDF(selected);
// }

// const getAllCertificate = async () => {

//     try {
//         const response = await axios.get(`${import.meta.env.VITE_API_HOST}/certificates`);
//         certificates.value = response.data;
//     } catch (error) {
//         console.error('Error fetching certificates:', error);
//     }
// };

const getAllCertificate = async () => {
    const params = {
        page: page.value,
        limit: pageSize,
    };
    // const date = new Date();

    await axios
        .get(`${import.meta.env.VITE_API_HOST}/certificates`, { params })
        .then((response) => {
            certificates.value = response.data;
            total.value = response.data.count;
            pageMax.value = Math.ceil(total.value / pageSize);
        });
};

async function setCurrentPage(pageNumber) {
    if (pageNumber > 0 && pageNumber <= pageMax.value) {
        page.value = pageNumber;
        await getAllCertificate();
    }
}

async function downloadPDF(year, cerFilename) {
    window.open(`${import.meta.env.VITE_API_HOST}/certificates/${changeTimestampToYear(year)}/${cerFilename}`)
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
    getAllCertificate();
    // setCurrentPage(page.value);
})



</script>

<style scoped>
.search {
    background-color: #8d969b30 !important;
}
</style>