<template>
    <LayoutMenuName backButton page-name="เอกสารรับรอง > เลือกรายชื่อนักศึกษาฝึกงาน" />
    <div class="row mb-3 me-1">
        <div class="col-md-5 my-auto">
            <Search />
        </div>
    </div>
    <div>

        <DataTable clickable click-return="intn_id" @clicked="checkRow" :heads="tableHead" :items="interns" hovers
            :total="total">
            <template class="col-md-2" #intn_key="{ data }">
                <input type="checkbox" :id="data?.intn_id" :name="data?.intn_id"
                    @click="select_intern(data?.intn_id) && checkRow(data?.intn_id)">
                <span class="ms-lg-4 ms-md-2">{{ data.intn_code }}</span>
            </template>
        </DataTable>


        <div class="row mb-3 mt-4 me-1">
            <BaseButton class="col-auto ms-auto " label="ยืนยัน" @click="sendToCreateCertificate() && router.push('/certificates/previewCertificate')" />
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BaseButton from '../Component/BaseButton.vue';
import DataTable from "../Component/DataTable.vue";
import { useRoute } from 'vue-router';
import router from "@/router";
import apiService from '../../services/api';
import Search from '../Component/SearchBox.vue';

const route = useRoute();

const companyId = ref(route.params.companyId);
const signId = ref(route.params.signId);

const total = ref();
const page = ref(1);
const pageMax = ref(1);
const pageSize = 10;
const interns = ref([]);

// const index = 0;
const selected = [];



const tableHead = ref([
    { key: "intn_key", title: "รหัสนักศึกษาฝึกงาน", align: "center" },
    { key: "intn_name_th", title: "ชื่อ-นามสกุล" },
    { key: "intn_nickname_th", title: "ชื่อเล่น" },
    { key: "work_infos[0].work_role.role_name", title: "ตำแหน่ง" },
    { key: "work_infos[0].work_team.team_name", title: "ทีม" },
    { key: "intn_start_date", title: "วันที่เริ่มฝึกงาน" },
    { key: "intn_end_date", title: "วันที่สิ้นสุดฝึกงาน" },
]);

// const props = defineProps({
//     sign: '',
// })

function checkRow(index) {
    let checkbox = document.getElementById(index);

    checkbox.click();
}


function select_intern(id) {
    if (selected.indexOf(id) != -1) {
        selected.splice([selected.indexOf(id)], 1)
    } else {
        selected.push(id)
    }

    console.log(selected)

}

async function sendToCreateCertificate() {
    const data_id = {
        intn_id: selected,
        sign_id: signId.value,
        com_id: companyId.value
    }
    const response = await axios.post(
        `${import.meta.env.VITE_API_HOST}/certificates`, 
        data_id

    );
    console.log(data_id);
    console.log(response.data);

    // router.push({
    //     path: '/certificates/previewCertificate'
    // })
}

async function setCurrentPage(pageNumber) {
    if (pageNumber > 0 && pageNumber <= pageMax.value) {
        page.value = pageNumber;
        await getAllIntern();
    }
}
const getAllIntern = async () => {
    const params = {
        page: page.value,
        limit: pageSize,
    };
    const date = new Date();

    await axios
        .get(`${import.meta.env.VITE_API_HOST}/interns?almost=${date}&noCertificate=true`, { params })
        .then((response) => {
            interns.value = response.data.rows;
            total.value = response.data.count;
            pageMax.value = Math.ceil(total.value / pageSize);
        });
};

onMounted(async () => {
    setCurrentPage(page.value);
    console.log(signId.value)
    console.log(companyId.value)
    console.log(interns.value)
});

</script>

<style scoped>
.back {
    display: flex;
    margin-right: 10px;
    margin-bottom: 20px;

}
</style>