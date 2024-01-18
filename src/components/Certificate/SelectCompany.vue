<template>
    <div>
        <div class="input-group">
            <div class="col-0">
                <button class="btn back" @click="$router.push('/certificates')">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                        <path
                            d="M11.4008 1.70312L3.10078 10.0031L11.4008 18.3031L10.0008 19.7031L0.300781 10.0031L10.0008 0.303123L11.4008 1.70312Z"
                            fill="black" />
                        <path d="M1.69922 11L1.69922 9L18.6992 9V11L1.69922 11Z" fill="black" />
                    </svg>

                </button>
            </div>

            <div class="col">
                <LayoutMenuName page-name="เอกสารรับรอง > บริษัท" />
            </div>

        </div>

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
    </div>

    <!-- Card -->
    <div class="row mt-3 ">
        <BaseCard v-for="company in companies" :title="company?.com_name" :sub="company.com_address?.addr_province"
            :content="getAddress(company?.com_address)">
            <div style="text-align: center;">
                <button class="col-auto btn btn_choose"
                    @click="sentCompanyId(company.com_id)">เลือก</button>
                    
            </div>

        </BaseCard>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BaseCard from '../Component/BaseCard.vue';
import BaseButton from '../Component/BaseButton.vue';
import router from "@/router";

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

function sentCompanyId(id){
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