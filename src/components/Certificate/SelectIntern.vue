<!--
 SelectIntern
 แสดงหน้าจอสำหรับเลือกนักศึกษาที่ต้องการออกเอกสารรับรอง
 Author : Teerajuk Sakunchaisitthichok
 Created date : 14-11-2566
-->
<template>
    <LayoutMenuName backButton page-name="เอกสารรับรอง > เลือกรายชื่อนักศึกษาฝึกงาน" />
    <SectionSpace>
        <div class="row mb-3">
            <div class="col-md-3 my-auto nopadding">
                <Search v-model="searchData" @search="search" />
            </div>

            <div class="col-md-2 my-auto">
                <BaseSelect placeholder="ทีม" all-select @change="setCurrentPage(1)" v-model="teamId" :options="teams"
                    value="teamId" text="team_name" />
            </div>
        </div>

        <div class="row">
            <Loading v-if="!loaded" />
            <DataTable v-if="loaded" striped clickable click-return="intn_id" @clicked="checkRow" :heads="tableHead" :items="interns"
                hover-background :total="total" @page-change="setCurrentPage">
                <template #intn_key="{ data }">
                    <input :name="data?.intn_id" :id="data?.intn_id" type="checkbox"
                        @click="selectIntern(data?.intn_id) && checkRow(data?.intn_id)"
                        class="form-check-input mt-2 p-2" />
                    <span class="ms-lg-4 ms-md-2">{{ data.intn_code }}</span>
                </template>

                <template #bottom-right>
                    <div class="col-md-5 ms-auto text-end nopadding">
                        <BaseButton class="" label="ยืนยันการออกเอกสารรับรอง" @click="sendToCreateCertificate()" />
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
import DataTable from "../Component/DataTable.vue";
import BaseSelect from "../Component/BaseSelect.vue";
import BaseInput from "../Component/BaseInput.vue";
import { useRoute } from 'vue-router';
import router from "@/router";
import ApiService from '../../services/ApiService';
import Search from '../Component/SearchBox.vue';
import { getAge, confirmation, successAlert, errorAlert } from "../../assets/js/func";

const route = useRoute();

const companyId = ref(route.params.companyId);
const signId = ref(route.params.signId);

const total = ref();
const page = ref(1);
const pageMax = ref(1);
const pageSize = 10000;
const interns = ref([]);

const date = new Date();
const selected = [];
let validate = ref(false);
const teamId = ref();
const endDate = ref("");
const searchData = ref("");
const teams = ref([]);
const loaded = ref(false)
let timer;

const tableHead = ref([
    { key: "intn_key", title: "รหัสนักศึกษาฝึกงาน", align: "center", size: 2 },
    { key: "intn_name_th", title: "ชื่อ-นามสกุล", size: 2 },
    { key: "intn_nickname_th", title: "ชื่อเล่น" , size: 1},
    { key: "work_infos[0].work_role.role_name", title: "ตำแหน่ง", size: 2 },
    { key: "work_infos[0].work_team.team_name", title: "ทีม", size: 2 },
    { key: "intn_start_date", title: "วันที่เริ่มฝึกงาน", align: 'center', size: 2},
    { key: "intn_end_date", title: "วันที่สิ้นสุดฝึกงาน", align: 'center', size: 2 },
]);

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
* selectIntern
* ฟังก์ชันสำหรับรับ id จากข้อมูลที่ผู้ใช้เลือก
* param: id ของนักศึกษาฝึกงาน
* return: -
*/

function selectIntern(id) {
    if (selected.indexOf(id) != -1) {
        selected.splice([selected.indexOf(id)], 1)
    } else {
        selected.push(id)
    }

    console.log(selected)

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
* sentToCreateCertificate
* ฟังก์ชันสำหรับรับส่งข้อมูลที่ผู้ใช้เลือกไปสร้างไฟล์ certificate ที่หลังบ้าน
* param: -
* return: -
*/

async function sendToCreateCertificate() {
    console.log(selected)
    if (selected.length == 0) {
        validate.value = false
        errorAlert("กรุณาเลือกอย่างน้อย 1 ข้อมูล")
        return
    }
    const result = await confirmation();
    if (result) {
        const data_id = {
            intn_id: selected,
            sign_id: signId.value,
            com_id: companyId.value
        }
        const response = await axios.post(
            `${import.meta.env.VITE_API_HOST}/certificates`,
            data_id

        ).then((response) => {
            successAlert().then(() => {
                router.push({ path: "/certificates" });
            });
        })
            .catch((err) => {
                errorAlert(err);
            });
        console.log(data_id);
        console.log(response.data);

    }
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
    await getAllIntern();
}

/*
* getAllIntern
* ฟังก์ชันสำหรับรับข้อมูลบริษัทจาก api และส่งค่าไปที่หลังบ้าน
* param: -
* return: -
*/
const getAllIntern = async () => {
    loaded.value = false
    const params = {
        page: page.value,
        limit: pageSize,
        teamId: teamId.value || undefined,
        filter: searchData.value || undefined,
        intn_contract_end_date: endDate.value || undefined,
        almost: date,
        noCertificate: true,
    };

    await axios
        .get(`${import.meta.env.VITE_API_HOST}/interns`, { params })
        .then((response) => {
            interns.value = response.data.rows;
            total.value = response.data.count;
            pageMax.value = Math.ceil(total.value / pageSize);
            loaded.value = true
        });
};

onMounted(async () => {
    setCurrentPage(page.value);
    let service = new ApiService();
    teams.value = await service.getAllTeam();
});

</script>

<style scoped>
input[type="checkbox"] {
  border: 1px solid black;
}
</style>