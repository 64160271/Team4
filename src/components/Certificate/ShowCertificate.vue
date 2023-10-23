<template>
    <LayoutMenuName page-name="เอกสารรับรองการฝึกงาน" />
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
                <input v-model="searchData" type="text" id="search-bar" class="search form-control" placeholder="Search"
                    aria-label="" aria-describedby="basic-addon1">
            </div>
        </div>
        <BaseButton class="col-auto ms-auto" @click="$router.push('/certificates/selectCompany')" label="ออกเอกสารรับรอง" />
    </div>

    <div>
        <BaseTable :heads="['รหัสนักศึกษา', 'ชื่อไฟล์', 'มหาวิทยาลัย', 'วันที่ออกเอกสาร', 'ดาวน์โหลด']">
            <tr>
                <td scope="row" class="text-center">00001</td>
                <td scope="row" class="text-center">CN-INT-2023-001</td>
                <td scope="row" class="text-center">เกษตรศาสตร์</td>
                <td scope="row" class="text-center">01-06-2566</td>
                <td scope="row" class="text-center">
                    <button class="btn ">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                            d="M19.2857 18.6172H0.714286C0.524845 18.6172 0.343164 18.6899 0.20921 18.8192C0.075255 18.9485 0 19.124 0 19.3069C0 19.4898 0.075255 19.6652 0.20921 19.7946C0.343164 19.9239 0.524845 19.9966 0.714286 19.9966H19.2857C19.4752 19.9966 19.6568 19.9239 19.7908 19.7946C19.9247 19.6652 20 19.4898 20 19.3069C20 19.124 19.9247 18.9485 19.7908 18.8192C19.6568 18.6899 19.4752 18.6172 19.2857 18.6172Z"
                            fill="black" />
                        <path
                            d="M9.99688 17.5736L17.5755 10.2558C17.6925 10.1239 17.7536 9.95418 17.7467 9.7806C17.7397 9.60702 17.6652 9.44236 17.538 9.31953C17.4108 9.1967 17.2403 9.12474 17.0605 9.11803C16.8807 9.11133 16.705 9.17037 16.5683 9.28336L10.7112 14.932V0.6897C10.7112 0.50678 10.6359 0.331352 10.502 0.202009C10.368 0.0726648 10.1863 0 9.99688 0C9.80744 0 9.62576 0.0726648 9.49181 0.202009C9.35785 0.331352 9.2826 0.50678 9.2826 0.6897V14.932L3.4326 9.28336C3.36857 9.21116 3.28977 9.15252 3.20115 9.11113C3.11253 9.06973 3.01601 9.04647 2.91764 9.0428C2.81927 9.03913 2.72117 9.05513 2.62951 9.08981C2.53785 9.12448 2.4546 9.17708 2.38499 9.24429C2.31538 9.31151 2.26091 9.39189 2.225 9.4804C2.18909 9.5689 2.17251 9.66362 2.17631 9.7586C2.18011 9.85359 2.20421 9.94679 2.24708 10.0324C2.28995 10.1179 2.35068 10.194 2.42546 10.2558L9.99688 17.5736Z"
                            fill="black" />
                    </svg>
                    </button>
                    
                </td>
            </tr>
        </BaseTable>
    </div>
</template>

<script setup>

import BaseButton from '../Component/BaseButton.vue';
import BaseTable from '../Component/BaseTable.vue';
</script>

<style scoped>
.search {
    background-color: #8d969b30 !important;
}</style>