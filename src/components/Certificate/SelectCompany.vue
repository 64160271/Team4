<!--
 SelectCompany
 แสดงหน้าจอสำหรับเลือกบริษัทในการออกเอกสารรับรอง
 Author : Teerajuk Sakunchaisitthichok
 Created date : 14-11-2566
-->
<template>
    <LayoutMenuName backButton page-name="เอกสารรับรอง > บริษัท" />

    <SectionSpace>
        <div class="row mb-3 me-1">
            <div class="col-md-5 my-auto">
                <Search placeholder="ชื่อบริษัท สาขา" v-model="searchData" />
            </div>
        </div>


        <!-- Card -->
        <div class="row mt-3">
            <NotFound v-if="filterData().length < 1 && loaded" />
            <Loading v-if="!loaded" />
            <BaseCard class="mb-4" v-for="company in filterData()" :title="company?.com_name"
                :sub="company.com_address?.addr_province" :content="getAddress(company?.com_address)">
                <template #after-title>
                    <div class="text-center">
                        <BaseButton class="col-md-6 mx-auto" label="เลือก" @click="sentCompanyId(company.com_id)" />
                    </div>
                </template>


            </BaseCard>
        </div>
    </SectionSpace>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BaseCard from '../Component/BaseCard.vue';
import BaseButton from '../Component/BaseButton.vue';
import router from "@/router";
import Search from '../Component/SearchBox.vue';
import NotFound from "../Component/NotFound.vue"

const companies = ref([])
const searchData = ref("");
const loaded = ref(false)

/*
* getCompany
* ฟังก์ชันสำหรับรับข้อมูลบริษัทจาก api
* param: -
* return: -
*/
const getCompany = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_HOST}/companies/address`);
    companies.value = response.data;
    loaded.value = true
}

/*
* filterData
* ฟังก์ชันสำหรับกรองข้อมูลตามการพิมพ์ของผู้ใช้
* param: -
* return: ข้อมูลที่ได้จากการค้นหา
*/
const filterData = () => {
    return companies.value.filter((company) => {
        return (
            company.com_name.indexOf(searchData.value.trim()) > -1 ||
            company.com_address?.addr_province.indexOf(searchData.value.trim()) > -1
        );
    });
}

onMounted(() => {
    getCompany()
})

/*
* sentCompanyId
* ฟังก์ชันสำหรับรับส่ง id ของบริษัทไปหน้า SelectSignature
* param: id ค่าของบริษัทที่เลือก
* return: -
*/

function sentCompanyId(id) {
    router.push({
        name: 'selectSignature',
        params: {
            companyId: id
        }
    })
}

/*
* getAddress
* ฟังก์ชันสำหรับจัด format สำหรับที่อยู่ข้อบริษัท
* param: address ข้อมูลของ api ที่รับมา
* return: ผลลัพธ์ในการจัดข้อมูลที่อยู่
*/

function getAddress(address) {
    let result = `${address?.addr_house_number || ''} 
    ${address?.addr_village_number || ''}
    ${address?.addr_alley || ''}
    ${address?.addr_street || ''} ${address?.addr_subdistrict}
    ${address?.addr_district} ${address?.addr_province} ${address?.addr_post_code}`
    return result
}
</script>

<style scoped></style>