<template>
    <div>
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
                <LayoutMenuName page-name="เอกสารรับรอง > ลายเซ็นผู้มีสิทธ์ออกเอกสารรับรอง" />
            </div>

        </div>

        <div class="col-md-4">
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

    <!-- Modal -->
    <div class="row mt-3">
        <BaseCard v-for="signature in signatures" :title="signature?.sign_image" :sub="getName(signature)" content="">
            <div style="text-align: center;">
                <button class="col-auto btn btn_choose" @click="sentCompanyId(signature.sign_id)">เลือก</button>
            </div>
        </BaseCard>


    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BaseCard from '../Component/BaseCard.vue';
import { useRoute } from 'vue-router';
import router from "@/router";
const route = useRoute();


const signatures = ref([]);
const id = ref(route.params.companyId);


const getSignature = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_HOST}/signatures/company/${id.value}`);
        signatures.value = response.data;
    } catch (error) {
        console.error('Error fetching signatures:', error);
    }
}

function sentCompanyId(sign){
    console.log(sign)
    router.push({
        name: 'selectIntern',
        params: {
            companyId: id.value,
        },
        query: {signId: sign}
    })
}

function sentBack(){
    router.push({
        name: 'selectCompany',
        params: {
            companyId: id
        }
    })
}

onMounted(()=>{
    getSignature()
})

function getName(signature){
    let name = `${signature.sign_prefix}
    ${signature.sign_fname}
    ${signature.sign_lname}`
    return name

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