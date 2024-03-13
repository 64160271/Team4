<template>
    <LayoutMenuName page-name="รายงานเบี้ยเลี้ยง" />
    <div class="row mb-3">

        <!-- ส่วนของ radio buttons -->
        <div class="col-md-5 my-auto nopadding">
            <Search v-model="searchData" @search="search" />
        </div>

        <div class="col-auto form-check form-check-inline">


        </div>

        <div class="col-auto form-check form-check-inline">
            <BaseSelect v-model="team_id" :options="team" value="team_id" text="team_name" />
        </div>

        <div class="col-auto ms-auto my-auto">
            <div>
                <BaseButton label="เพิ่มข้อมูล" @click="openModal = true" />
            </div>
        </div>
    </div>
    <BaseModal v-if="openModal" @save="formSubmit" @close="openModal = false" title="เพิ่มรายการข้อมูล">
        <div class="col mb-3">
            <BaseInput v-model="formData.rep_code" label="รหัสรายการ" input_type="text" required="required"
                placeholder="xx/xxxx" :class="{ 'is-invalid': v$.formData.rep_code.$error }" />
            <InvalidFeedback :errors="v$.formData.rep_code.$error" />
        </div>
        <div class="col mb-3">
            <BaseInput :value="chageDate(date)" label="วันที่สร้างรายการ" input_type="text" readonly="readonly" />
        </div>
        <div class="col mb-3">
            <BaseInput :value="nameUser" label="ผู้ทำการแก้ไขข้อมูล" input_type="text" readonly="readonly" />
        </div>
    </BaseModal>

    <DataTable :heads="dataHead" :items="reports" hovers paginate :total="reports.length" :active-page="page"
        :items-per-page="pageSize" @page-change="setCurrentPage">
        <template #rep_count_name="{ data }">
            {{ data.rep_salaries.length }}
        </template>
        <template #rep_created_at_front="{ data }">
            {{ console.log(data.rep_created_at) }}
            {{ chageDate(data.rep_created_at) }}
        </template>
        <template #rep_updated_at_front="{ data }">
            {{ chageDate(data.rep_updated_at) }}

        </template>
        <template #rep_edit="{ data }">
            <EditIcon @click="handleClick(data.rep_id)" class="hover-p" />
        </template>
        <template #rep_remove="{ data }">
            <DeleteButton @click="deleteReport(data)" />
        </template>
    </DataTable>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from '../Component/BaseButton.vue'
import DataTable from '../Component/DataTable.vue'
import BaseSelect from '../Component/BaseSelect.vue'
import BaseModal from '../Component/BaseModal.vue'
import BaseInput from '../Component/BaseInput.vue'
import { onMounted } from 'vue';
import axios from 'axios'
import EditIcon from '../icons/EditIcon.vue'
import DeleteButton from '../icons/DeleteButton.vue'
import router from "@/router";
import Search from "../component/SearchBox.vue"
import { confirmation, successAlert, errorAlert } from "../../assets/js/func"
import InvalidFeedback from "../Component/InvalidFeedback.vue";
import useVuelidate from "@vuelidate/core";
import {required}  from "@vuelidate/validators";



const reports = ref([])
const date = new Date();
const openModal = ref(false)
const page = ref(1);
const pageMax = ref(1);
const pageSize = 10;
const total = ref();
const searchData = ref("");
let timer;
const rules = {
    rep_code: {
        required
    }
};

const v$ = useVuelidate(rules, formData);

const team = ref([])
const team_id = ref([])

const dataHead = ref([
    { key: "rep_code", title: "รหัสรายการ", align: "center" },
    { key: "rep_count_name", title: "จำนวนรายชื่อ", align: "end" },
    { key: "rep_created_at_front", title: "วันที่สร้างรายการ", align: "center" },
    { key: "rep_updated_at_front", title: "วันที่แก้ไขรายการ", align: "center" },
    { key: "rep_created_user", title: "ผู้สร้างรายการ" },
    { key: "rep_updated_by_user.user_fname", title: "ผู้แก้ไขข้อมูลล่าสุด" },
    { key: "rep_status", title: "สถานะ", align: "center" },
    { key: "rep_edit", title: "แก้ไข", align: "center" },
    { key: "rep_remove", title: "ลบ", align: "center" },
])

const formData = ref({
    rep_code: "",
    rep_updated_by: 1
})

function search() {
    console.log(searchData)
    if (timer) {
        clearTimeout(timer)
    }

    timer = setTimeout(() => {
        setCurrentPage(1)
    }, 500)
}

async function setCurrentPage(pageNumber) {
    if (pageNumber > 0 && pageNumber <= pageMax.value) {
        page.value = pageNumber;
    }

    await getReport();
}

const getReport = async () => {
    const params = {
        page: page.value,
        limit: pageSize,
        filter: searchData.value || undefined,
    };

    await axios
        .get(`${import.meta.env.VITE_API_HOST}/reports`, { params })
        .then((response) => {
            reports.value = response.data.rows
            total.value = response.data.count;
            pageMax.value = Math.ceil(total.value / pageSize)
        });
}

const getAllTeam = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/teams`).
        then((response) => {
            team.value = response.data
        })
}

async function formSubmit() {
    const validate = await v$.value.$validate(); /* validate แบบฟอร์ม */

    if (validate) {
        await axios.post(`${import.meta.env.VITE_API_HOST}/reports`, formData.value,)
        router.go()
    }
}

function handleClick(rep_id) {
    console.log(rep_id)
    router.push({ name: "reportData", params: { id: rep_id } });
}

function chageDate(value) {
    if (value) {
        const date = new Date(value)
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (day < 10) {
            day = `0${day}`
        }
        if (month < 10) {
            month = `0${month}`
        }
        return `${day}/${month}/${year + 543}`
    }
    return ''
}

async function deleteReport(rep) {
    if (rep.rep_status == 1) {
        errorAlert("สถานะของรายการนี้ไม่สามารถลบได้");
        return;
    }
    console.log(rep.rep_id)
    const result = await confirmation("คุณต้องการลบรายการนี้ใช้หรือไม่");
    if (result) {
        await axios.delete(`${import.meta.env.VITE_API_HOST}/reports/${rep.rep_id}`)
            .then(async (_res) => {
                await successAlert("ลบรายการนี้สำเร็จแล้ว");
                router.go();
            }).catch((err) => {
                console.log(err)
                errorAlert(err);
            });

    }
}

let nameUser = "ปริญญา ก้อนจันทึก"

onMounted(async () => {
    setCurrentPage(page.value),
        getAllTeam()
})
</script>

<style scoped></style>