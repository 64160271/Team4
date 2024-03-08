<template>
    <LayoutMenuName backButton page-name="เอกสารรับรอง > เลือกรายชื่อนักศึกษาฝึกงาน" />
    <div class="row mb-3">
        <div class="col-md-5 my-auto nopadding">
            <Search v-model="searchData" @search="search" />
        </div>

        <!-- <div class="col-md-2 ms-2 my-auto nopadding">
            <BaseSelect placeholder="ปี" @change="setCurrentPage(1)" v-model="cerCreate" :options="years"
                value="cerCreate" text="cerCreate" />
        </div> -->

        <div class="col-md-2 my-auto">
            <BaseSelect placeholder="ทีม" all-select @change="setCurrentPage(1)" v-model="team_id" :options="teams"
                value="team_id" text="team_name" />
        </div>
    </div>

    <div class="row">

        <DataTable striped clickable click-return="intn_id" @clicked="checkRow" :heads="tableHead" :items="interns"
            hover-background :total="total" @page-change="setCurrentPage" >
            <template #intn_key="{ data }">
                <input :name="data?.intn_id" :id="data?.intn_id" type="checkbox"
                    @click="select_intern(data?.intn_id) && checkRow(data?.intn_id)"
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
import apiService from '../../services/api';
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

// const index = 0;
const selected = [];
let validate = ref(false);
const team_id = ref();
const endDate = ref("");
const searchData = ref("");
const teams = ref([]);
const years = ref([]);
const cerCreate = ref("");
let timer;

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



function search() {
    if (timer) {
        clearTimeout(timer);
    }

    timer = setTimeout(() => {
        setCurrentPage(1);
    }, 500);
}

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

async function setCurrentPage(pageNumber) {
    if (pageNumber > 0 && pageNumber <= pageMax.value) {
        page.value = pageNumber;

    }
    await getAllIntern();
}

// async function cerCreateSelect() {

// const response = await axios.get(`${import.meta.env.VITE_API_HOST}/interns`);
// console.log(response)
// const year = response.data.rows.map(entry => new Date(entry.intn_start_date).getFullYear());
// years.value = [...new Set(year)];
// years.value.unshift("ทั้งหมด");
// console.log(years.value)


// }

const getAllIntern = async () => {
    const params = {
        page: page.value,
        limit: pageSize,
        team_id: team_id.value || undefined,
        filter: searchData.value || undefined,
        intn_contract_end_date: endDate.value || undefined,
        cer_created_at: cerCreate.value || undefined,
        almost: true,
        noCertificate: true,
    };
    const date = new Date();

    await axios
        .get(`${import.meta.env.VITE_API_HOST}/interns`, { params })
        .then((response) => {
            interns.value = response.data.rows;
            total.value = response.data.count;
            pageMax.value = Math.ceil(total.value / pageSize);
        });
};

onMounted(async () => {
    setCurrentPage(page.value);
    let service = new apiService();
    teams.value = await service.getAllTeam();
    // cerCreateSelect();
});

</script>

<style scoped>
.back {
    display: flex;
    margin-right: 10px;
    margin-bottom: 20px;

}

input[type="checkbox"]:checked {
    border: 1px solid green;
    background-color: green;
}
</style>