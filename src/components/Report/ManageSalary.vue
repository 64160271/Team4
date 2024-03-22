<template>
    <LayoutMenuName page-name="เบี้ยเลี้ยง > จัดการเบี้ยเลี้ยง" />

    <SectionSpace>
        <div class="row mb-3">

            <!-- ส่วนของ radio buttons -->
            <div class="col-md-3 my-auto nopadding">
                <Search v-model="searchData" @search="search" />
            </div>
            <div class="col-md-2 ms-2 my-auto nopadding">
                <BaseSelect placeholder="ปี" @change="setCurrentPage(1)" v-model="selectData" :options="years"
                    value="selectData" text="selectData" />
            </div>

            <BaseButton class="col-md-2 ms-auto" label="+ เพิ่มข้อมูล" @click="openModal = true" />
        </div>
        <BaseModal v-if="openModal" @save="formSubmit" @close="openModal = false" title="เพิ่มรายการข้อมูล">
            <div class="col mb-3">
                <BaseInput v-model="formData.rep_code" label="รหัสรายการ" input_type="text" required="required"
                    placeholder="xxx/xx" :class="{ 'is-invalid': v$.rep_code.$error }" />
                <InvalidFeedback :errors="v$.rep_code.$errors" />
            </div>
            <div class="col mb-3">
                <BaseInput :value="chageDate(date)" label="วันที่สร้างรายการ" input_type="text" readonly="readonly" />
            </div>
            <div class="col mb-3">
                <BaseInput :value="userName" label="ผู้ทำการแก้ไขข้อมูล" input_type="text" readonly="readonly" />
            </div>
        </BaseModal>

        <div class="row">
            <Loading v-if="!loaded" />

            <DataTable v-if="loaded" :heads="dataHead" :items="reports" paginate :total="reports.length" :active-page="page"
                :items-per-page="pageSize" @page-change="setCurrentPage" striped hover-background>
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
                <template #rep_status_name="{ data }">
                    <div class="fw-bold" v-if="statusName(data.rep_status) === 'บันทึกแล้ว'" style="color: #339900;">
                        {{ statusName(data.rep_status) }}
                    </div>
                    <div class="fw-bold" v-else-if="statusName(data.rep_status) === 'บันทึกร่าง'" style="color: gray;">
                        {{ statusName(data.rep_status) }}
                    </div>
                </template>

                <template #rep_edit="{ data }">
                    <EditIcon @click="handleClick(data.rep_id)" class="hov-outline-red cursor-p" />
                </template>
                <template #rep_remove="{ data }">
                    <DeleteButton @click="deleteReport(data)" class="cursor-p" />
                </template>
            </DataTable>
        </div>
    </SectionSpace>
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
import { required } from "@vuelidate/validators";
import { useAuthenticate } from '../../stores/authenticate';
const user = useAuthenticate()
const loaded = ref(false)
const reports = ref([])
const date = new Date();
const openModal = ref(false)
const page = ref(1);
const pageMax = ref(1);
const pageSize = 10;
const total = ref();
const searchData = ref("");
const selectData = ref("")
const years = ref([])
const userName = user.getName
let timer;
const rules = {
    rep_code: {
        required
    }
};

const formData = ref({
    rep_code: "",
    rep_updated_by: user.getId
})
const v$ = useVuelidate(rules, formData);

const team = ref([])
const team_id = ref([])

const dataHead = ref([
    { key: "rep_code", title: "รหัสรายการ", align: "center" },
    { key: "rep_count_name", title: "จำนวนรายชื่อ", align: "end" },
    { key: "rep_created_at_front", title: "วันที่สร้างรายการ", align: "center" },
    { key: "rep_updated_at_front", title: "วันที่แก้ไขรายการ", align: "center" },
    { key: "rep_updated_by_user.user_name", title: "ผู้แก้ไขข้อมูลล่าสุด" },
    { key: "rep_status_name", title: "สถานะ", align: "center" },
    { key: "rep_edit", title: "แก้ไข", align: "center" },
    { key: "rep_remove", title: "ลบ", align: "center" },
])



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
    loaded.value = false

    const params = {
        page: page.value,
        limit: pageSize,
        filter: searchData.value || undefined,
        rep_created_at: selectData.value || undefined,
    };

    await axios
        .get(`${import.meta.env.VITE_API_HOST}/reports`, { params })
        .then((response) => {
            reports.value = response.data.rows
            total.value = response.data.count;
            pageMax.value = Math.ceil(total.value / pageSize)
        });
    
        loaded.value = true
}

async function reportSelect() {

    const response = await axios.get(`${import.meta.env.VITE_API_HOST}/reports`);
    const year = response.data.rows.map(entry => new Date(entry.rep_created_at).getFullYear() + 543);
    years.value = [...new Set(year)];
    years.value.unshift("ทั้งหมด");

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

function statusName(status) {
    let name;
    if (status == 1) {
        name = "บันทึกแล้ว";
    } else if (status == 0) {
        name = "บันทึกร่าง";
    }
    return name;
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
    const result = await confirmation("คุณต้องการลบรายการนี้ใช่หรือไม่");
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

// let nameUser = "ปริญญา ก้อนจันทึก"

onMounted(async () => {
    setCurrentPage(page.value),
        getAllTeam(),
        reportSelect()
})
</script>


<style scoped>
.green-text {
    color: green;
}

.grey-text {
    color: grey;
}
</style>