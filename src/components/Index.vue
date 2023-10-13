<!--
 Index
 Main screen, display all interns list
 Author : Rawich Piboonsin
 Created date : 24-08-2566
-->

<template>
    <LayoutMenuName page-name="รายชื่อนักศึกษา" />

    <div class="row mb-3 me-1">
        <div class="col-md-4 my-auto">
            <div class="input-group">
                <span class="bg-grays-200 input-group-text" id="basic-addon1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
                        viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </span>
                <input v-model="searchData" type="text" id="search-bar" class="bg-grays-200 form-control"
                    placeholder="Search" aria-label="" aria-describedby="basic-addon1">
            </div>
        </div>

        <button class="col-auto btn ms-auto outline-red" @click="$router.push('/interns/key-data')">
            <FormIconVue />
            เพิ่มแบบฟอร์ม
        </button>

        <button class="ms-4 col-auto btn outline-red" @click="$router.push('/interns/add-file')">
            <ExcelIcon />
            เพิ่มไฟล์ Excel
        </button>
    </div>

    <BaseTable
        :heads="['รหัสนักศึกษาฝึกงาน', 'ชื่อ - นามสกุล', 'ชื่อเล่น', 'ตำแหน่ง', 'สถานศึกษา', 'วันที่เริ่มฝึกงาน', 'วันที่สิ้นสุดฝึกงาน']"
    >

        <tr v-for="intern in filterData" class="tb-hov tr-custom" @click="$router.push('/interns/' + intern.intn_id)">
            <td class="col">
                <img v-if="intern.intn_image" class="img-custom ms-2" :src="getImage(intern.intn_image)" width="35"
                    height="35" alt="" />
                <img v-else class="ms-2" src="../assets/images/person-nm.png" alt="" width="35">
                <span class="ms-lg-5 ms-sm-2">{{ intern.intn_code }}</span>
            </td>
            <td>{{ intern.intn_name_th }}</td>
            <td class="text-center">{{ intern.intn_nickname_th || '-' }}</td>
            <td v-if="intern.work_infos[0] != undefined" scope="" class="text-center">
                {{ intern.work_infos[0].work_role.role_name }}
            </td>
            <td v-else class="text-center">
                {{ '-' }}
            </td>
            <td class="text-center">{{ intern.college_info.col_uni.uni_name || '-' }}</td>
            <td class="text-center">{{ intern.intn_start_date }}</td>
            <td class="text-center">{{ intern.intn_end_date || '-' }}</td>
        </tr>
    </BaseTable>

    <hr>

    <div class="row my-2">
        <span class="col-5">รายการทั้งหมด {{ total || 0 }} รายการ</span>

        <div class="col">
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item">
                        <a v-if="page > 1" class="page-link border-0 rounded-circle" href="#"
                            @click="setCurrentPage(--page)" aria-label="Previous">
                            <span aria-hidden="true">&lt</span>
                        </a>
                    </li>

                    <li v-for="pageNum in pageMax" class="page-item">
                        <router-link to="#" class="page-link rounded-circle mx-1" @click="setCurrentPage(pageNum)"
                            active-class="active">
                            {{ pageNum }}
                        </router-link>
                    </li>

                    <li class="page-item">
                        <a v-if="page < pageMax" class="page-link border-0 rounded-circle" href="#"
                            @click="setCurrentPage(++page)" aria-label="Next">
                            <span aria-hidden="true">></span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>


<script setup>
import LayoutSidebar from './layouts/LayoutSidebar.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { computed } from 'vue'
import FormIconVue from './icons/FormIcon.vue';
import ExcelIcon from './icons/ExcelIcon.vue';
import BaseTable from './Component/BaseTable.vue';

const total = ref()
const page = ref(1)
const pageMax = ref()
const pageSize = 10
const date = new Date()
const interns = ref([])
const searchData = ref('')

async function setCurrentPage(pageNumber) {
    if (pageNumber > 0 && pageNumber <= pageMax.value) {
        page.value = pageNumber
        await getAllIntern()
    }
}

const getAllIntern = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/interns?page=${page.value}&limit=${pageSize}`)
        .then((response) => {
            interns.value = response.data.rows
            total.value = response.data.count
            pageMax.value = Math.ceil(total.value / pageSize)
        })
}

onMounted(() => getAllIntern())

function getImage(img) {
    return `src/assets/images/interns/${img}`
}

const filterData = computed(() => {

    let keyword = searchData.value.trim()
    return interns.value.filter(intern => {
        return (intern.intn_fname?.indexOf(keyword) > -1 ||
            intern.intn_lname?.indexOf(keyword) > -1 ||
            intern.intn_start_date?.indexOf(keyword) > -1 ||
            intern.intn_end_date?.indexOf(keyword) > -1 ||
            intern.intn_prefix?.indexOf(keyword) > -1 ||
            intern.intn_code?.indexOf(keyword) > -1 ||
            intern.college_info?.col_uni.uni_name.indexOf(keyword) > -1 ||
            intern.intn_nickname?.indexOf(keyword) > -1 ||
            /* intern.work_infos?.work_role?.role_name.indexOf(keyword) > -1 || */
            intern.college_info?.col_faculty.fac_name.indexOf(keyword) > -1 ||
            intern.college_info?.col_major.maj_name.indexOf(keyword) > -1
        )
    })
})
</script>

<style scoped>
#search-bar:focus {
    box-shadow: none !important;
}

.img-custom {
    border-radius: 50%;
    border: 1px solid black;
    width: 35px;
    height: 35px;
}

.bg-grays-200 {
    background-color: #8d969b30 !important;
}

.navbar {
    z-index: 99;
}

.border-left {
    border-radius: 8px 0 0 8px;
}

.border-right {
    border-radius: 0 8px 8px 0;
}
</style>