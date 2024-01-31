<template>
    <div class="input-group">
        <div class="col-0">
            <button class="btn back" @click="sentBack()">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                    <path
                        d="M11.4008 1.70312L3.10078 10.0031L11.4008 18.3031L10.0008 19.7031L0.300781 10.0031L10.0008 0.303123L11.4008 1.70312Z"
                        fill="black" />
                    <path d="M1.69922 11L1.69922 9L18.6992 9V11L1.69922 11Z" fill="black" />
                </svg>

            </button>
        </div>

        <div class="col">
            <LayoutMenuName page-name="เอกสารรับรอง > เลือกรายชื่อนักศึกษาฝึกงาน" />
        </div>

    </div>
    <div>
        <form action="">
            <DataTable :heads="tableHead" :items="interns" hovers :total="total">
                <template class="col-md-2" #intn_key="{ data }">
                    <input type="checkbox" :name="data?.intn_id" @click="select_intern(data?.intn_id)">
                    <span class="ms-lg-4 ms-md-2">{{ data.intn_code }}</span>
                </template>
            </DataTable>
        </form>

        <div class="row mb-3 mt-4 me-1">
            <BaseButton class="col-auto ms-auto " label="ยืนยัน"
                @click="$router.push('/certificates/previewCertificate')" />
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

const route = useRoute();

const id = ref(route.params.companyId);
// const sign = ref(route.params.signId);
const signId = ref(route.query.signId);

const total = ref();
const page = ref(1);
const pageMax = ref(1);
const pageSize = 10;
const interns = ref([]);

const index = 0;
const selects = ref([]);


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

function select_intern(select){
    for(let i = 0; i < total.value; i++){
        selects[i] = select;
    }
}
function sentData(select){
    console.log(sign)
    router.push({
        name: 'previewCertificate',
        params: {
            companyId: id.value,
        },
        query: {signId: sign},

    })
}

function sentBack() {
    router.push({
        name: 'selectSignature',
        params: {
            companyId: id.value
        }
    })
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
    // console.log(signId.value)
    // console.log(interns.value)
});

</script>

<style scoped>


.back {
    display: flex;
    margin-right: 10px;
    margin-bottom: 20px;

}

</style>