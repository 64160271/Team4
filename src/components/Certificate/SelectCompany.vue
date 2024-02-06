<template>
    <LayoutMenuName backButton page-name="เอกสารรับรอง > บริษัท" />

    <div class="row mb-3 me-1">
        <div class="col-md-5 my-auto">
            <Search />
        </div>
    </div>


    <!-- Card -->
    <div class="row mt-3 ">
        <BaseCard v-for="company in companies" :title="company?.com_name" :sub="company.com_address?.addr_province"
            :content="getAddress(company?.com_address)">
            <template #after-title>
                <div style="text-align: center;">
                    <!-- <button class="col-auto btn btn_choose" @click="sentCompanyId(company.com_id)">เลือก</button> -->
                    <BaseButton label="เลือก" @click="sentCompanyId(company.com_id)"/>
                </div>
            </template>


        </BaseCard>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BaseCard from '../Component/BaseCard.vue';
import BaseButton from '../Component/BaseButton.vue';
import router from "@/router";
import Search from '../Component/SearchBox.vue';

const companies = ref([])

const getCompany = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/companies/address`)
        .then((response) => {
            companies.value = response.data
        })
}

onMounted(() => {
    getCompany()
})

function sentCompanyId(id) {
    router.push({
        name: 'selectSignature',
        params: {
            companyId: id
        }
    })
}


function getAddress(address) {
    let result = `${address?.addr_house_number} 
    ${address?.addr_village_number}
    ${address?.addr_alley}
    ${address?.addr_street} ${address?.addr_subdistrict}
    ${address?.addr_district} ${address?.addr_province} ${address?.addr_post_code}`
    return result
}
</script>

<style scoped>
.back {
    display: flex;
    margin-right: 10px;
    margin-bottom: 20px;
}

.search {
    background-color: #8d969b30 !important;
}

.btn_choose {
    border: 1px solid black;
    color: black;

}

.btn_choose:hover {
    border: 1px solid var(--main-color);
    /* color: var(--main-color); */
}
</style>