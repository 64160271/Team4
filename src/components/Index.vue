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
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-search" viewBox="0 0 16 16">
                        <path
                            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                </span>
                <input v-model="searchData" type="text" id="search-bar" class="bg-grays-200 form-control"
                    placeholder="Search" aria-label="" aria-describedby="basic-addon1">
            </div>
        </div>

        <button class="col-auto btn ms-auto outline-red" @click="$router.push('/interns/key-data')">
            <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M14.8615 8.35539H3.91108C3.70363 8.35539 3.50469 8.2726 3.358 8.12523C3.21131 7.97787 3.12891 7.778 3.12891 7.56959V4.42642C3.12891 4.21801 3.21131 4.01814 3.358 3.87078C3.50469 3.72341 3.70363 3.64062 3.91108 3.64062H14.8615C15.0689 3.64062 15.2679 3.72341 15.4146 3.87078C15.5613 4.01814 15.6437 4.21801 15.6437 4.42642V7.56959C15.6437 7.778 15.5613 7.97787 15.4146 8.12523C15.2679 8.2726 15.0689 8.35539 14.8615 8.35539ZM4.69325 6.7838H14.0793V5.16506H4.69325V6.7838Z"
                    fill="var(--main-color)" />
                <path
                    d="M14.8615 9.99219H3.91108C3.70363 9.99219 3.50469 10.075 3.358 10.2223C3.21131 10.3697 3.12891 10.5696 3.12891 10.778V13.8583C3.12891 14.0667 3.21131 14.2666 3.358 14.4139C3.50469 14.5613 3.70363 14.6441 3.91108 14.6441H12.7966L15.6437 11.7366V10.778C15.6437 10.5696 15.5613 10.3697 15.4146 10.2223C15.2679 10.075 15.0689 9.99219 14.8615 9.99219ZM14.0793 13.0725H4.69325V11.5009H14.0793V13.0725Z"
                    fill="var(--main-color)" />
                <path
                    d="M7.08649 23.6888V23.6416L7.33678 22.5494H1.56435V2.07159H17.2078V10.126L18.7721 8.64082V1.28579C18.7721 1.07739 18.6897 0.877518 18.5431 0.730154C18.3964 0.582789 18.1974 0.5 17.99 0.5H0.782173C0.574728 0.5 0.375779 0.582789 0.229093 0.730154C0.0824072 0.877518 0 1.07739 0 1.28579V23.288C0 23.4964 0.0824072 23.6963 0.229093 23.8437C0.375779 23.991 0.574728 24.0738 0.782173 24.0738H7.03955C7.046 23.9445 7.06168 23.8158 7.08649 23.6888Z"
                    fill="var(--main-color)" />
                <path
                    d="M15.6453 13.9922L15.0352 14.613C15.1865 14.5816 15.3252 14.5059 15.4338 14.3954C15.5424 14.285 15.616 14.1446 15.6453 13.9922Z"
                    fill="var(--main-color)" />
                <path
                    d="M3.12891 20.1006C3.12891 20.309 3.21131 20.5088 3.358 20.6562C3.50469 20.8036 3.70363 20.8864 3.91108 20.8864H7.69679L7.93145 19.8648L8.03313 19.4326V19.3934H4.69325V17.7903H9.65223L11.2166 16.2188H3.91108C3.70363 16.2188 3.50469 16.3015 3.358 16.4489C3.21131 16.5963 3.12891 16.7961 3.12891 17.0045V20.1006Z"
                    fill="var(--main-color)" />
                <path
                    d="M24.6302 12.0277L21.9943 9.37959C21.8773 9.26174 21.7383 9.16824 21.5853 9.10445C21.4323 9.04065 21.2683 9.00781 21.1026 9.00781C20.937 9.00781 20.7729 9.04065 20.6199 9.10445C20.4669 9.16824 20.3279 9.26174 20.211 9.37959L9.48736 20.2157L8.60351 23.9953C8.57042 24.1584 8.56967 24.3264 8.60132 24.4898C8.63296 24.6531 8.69638 24.8086 8.78793 24.9473C8.87948 25.086 8.99736 25.2052 9.13483 25.298C9.2723 25.3908 9.42665 25.4555 9.58905 25.4884C9.66967 25.4965 9.7509 25.4965 9.83152 25.4884C9.92735 25.504 10.0251 25.504 10.1209 25.4884L13.9145 24.6476L24.6302 13.8586C24.7473 13.7418 24.8402 13.6028 24.9036 13.4497C24.967 13.2967 24.9996 13.1325 24.9996 12.9667C24.9996 12.8009 24.967 12.6368 24.9036 12.4837C24.8402 12.3307 24.7473 12.1917 24.6302 12.0749V12.0277ZM13.1166 23.2174L10.2539 23.8539L10.95 21.0015L18.9908 12.8371L21.1965 15.053L13.1166 23.2174ZM22.0803 14.1651L19.8746 11.9491L21.1183 10.7154L23.3396 12.9471L22.0803 14.1651Z"
                    fill="var(--main-color)" />
            </svg>
            เพิ่มแบบฟอร์ม
        </button>

        <button class="ms-4 col-auto btn outline-red" @click="$router.push('/interns/add-file')">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M29.4116 7.63392H20.367V5.5L5.5 7.79751V27.9361L20.367 30.5V27.3371H29.4116C29.6855 27.351 29.9538 27.2557 30.1578 27.0721C30.3617 26.8885 30.4848 26.6315 30.5 26.3573V8.61282C30.4845 8.33878 30.3614 8.08201 30.1575 7.89859C29.9535 7.71517 29.6854 7.62002 29.4116 7.63392ZM29.5545 26.52H20.3366L20.3214 24.8313H22.542V22.8646H20.3045L20.2937 21.7024H22.542V19.7357H20.2768L20.2661 18.5735H22.542V16.6067H20.2589V15.4446H22.542V13.4778H20.2589V12.3157H22.542V10.3489H20.2589V8.56097H29.5545V26.52Z"
                    fill="var(--main-color)" />
                <path
                    d="M23.7891 10.3516H27.6489V12.3183H23.7891V10.3516ZM23.7891 13.4814H27.6489V15.4481H23.7891V13.4814ZM23.7891 16.6112H27.6489V18.5779H23.7891V16.6112ZM23.7891 19.741H27.6489V21.7077H23.7891V19.741ZM23.7891 22.8708H27.6489V24.8375H23.7891V22.8708Z"
                    fill="var(--main-color)" />
                <path class="x-red" fill-rule="evenodd" clip-rule="evenodd"
                    d="M9.37913 13.2395L11.2952 13.1295L12.4997 16.4453L13.9229 12.9928L15.839 12.8828L13.5122 17.5905L15.839 22.3098L13.8131 22.173L12.4452 18.5756L11.0765 22.0362L9.21484 21.8717L11.3773 17.7031L9.37913 13.2395Z"
                    fill="white" />
            </svg>

            เพิ่มไฟล์ Excel
        </button>
    </div>

    <table id="myTable" class="table table-borderless">
        <thead class="text-center bg-red">
            <tr class="tr-custom">
                <th scope="col" class="col-auto fw-bold border-left th-custom">รหัสนักศึกษาฝึกงาน</th>
                <th scope="col" class="th-custom fw-bold">ชื่อ - นามสกุล</th>
                <th scope="col" class="th-custom fw-bold">ชื่อเล่น</th>
                <th scope="col" class="th-custom fw-bold">ตำแหน่ง</th>
                <th scope="col" class="th-custom fw-bold">สถานศึกษา</th>
                <th scope="col" class="col-sm-auto th-custom fw-bold">วันที่เริ่มฝึกงาน</th>
                <th scope="col" class="col-sm-auto border-right th-custom fw-bold">วันที่สิ้นสุดฝึกงาน</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="intern in filterData" class="tb-hov tr-custom"
                @click="$router.push('/interns/' + intern.intn_id)">
                <td scope="" class="col">
                    <img v-if="intern.intn_image" class="img-custom ms-2" :src="getImage(intern.intn_image)" width="35"
                        height="35" alt="" />
                    <img v-else class="ms-2" src="../assets/images/person-nm.png" alt="" width="35">
                    <span class="ms-lg-5 ms-sm-2">{{ intern.intn_code }}</span>
                </td>
                <td scope="">{{ intern.intn_name_th }}</td>
                <td scope="" class="text-center">{{ intern.intn_nickname_th || '-' }}</td>
                <td v-if="intern.work_infos[0] != undefined" scope="" class="text-center">
                    {{ intern.work_infos[0].work_role.role_name }}
                </td>
                <td v-else scope="row" class="text-center">
                    {{ '-' }}
                </td>
                <td scope="row" class="text-center">{{ intern.college_info.col_uni.uni_name || '-' }}</td>
                <td scope="row" class="text-center">{{ intern.intn_start_date }}</td>
                <td scope="row" class="text-center">{{ intern.intn_end_date || '-' }}</td>
            </tr>
        </tbody>
    </table>

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
                pageMax.value = Math.ceil(interns.value.length / pageSize) + 1
            })
    }

    onMounted(() => getAllIntern())

    function getImage(img) {
        return `src/assets/images/interns/${img}`
    }

    function dateFormat(date) {

        if (!date) {
            return
        }

        const day = date.getDate()
        const month = date.getMonth()
        const year = date.getFullYear()

        return day + "/" + month + "/" + year
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