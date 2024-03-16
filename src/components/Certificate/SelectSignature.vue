<!--
 SelectSignature
 แสดงหน้าจอสำหรับเลือกผู้รับรองในการออกเอกสารรับรอง
 Author : Teerajuk Sakunchaisitthichok
 Created date : 14-11-2566
-->
<template>
    <LayoutMenuName backButton page-name="เอกสารรับรอง > ลายเซ็นผู้มีสิทธ์ออกเอกสารรับรอง" />
    <SectionSpace>
        <div class="row mb-3 me-1">
            <div class="col-md-5 my-auto">
                <Search placeholder="ค้นหาชื่อ หรือตำแหน่งลายเซ็น" v-model="searchData" />
            </div>
        </div>

        <!-- Modal -->
        <div class="row mt-3">
            <NotFound v-if="filterData().length < 1 && loaded" />
            <Loading v-if="!loaded" />
            <BaseCard class="mb-4" v-for="signature in filterData()" :title="getName(signature)"
                :sub="signature?.sign_role" content="">
                <template #before-title>
                    <div class="text-center mb-4">
                        <img width="100" height="100" :src="signature?.sign_image_path" />
                    </div>
                </template>
                <template #after-title>
                    <div class="text-center">
                        <BaseButton class="col-md-6 mx-auto" label="เลือก" @click="sentCompanyId(signature.sign_id)" />
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
import Search from '../Component/SearchBox.vue';
import BaseButton from '../Component/BaseButton.vue';
import { useRoute } from 'vue-router';
import router from "@/router";
import NotFound from "../Component/NotFound.vue"
import { filter } from 'lodash';
const route = useRoute();


const signatures = ref([]);
const searchData = ref("");
const id = ref(route.params.companyId);
const loaded = ref(false)

/*
* getSignature
* ฟังก์ชันสำหรับรับข้อมูลบริษัทจาก api
* param: -
* return: -
*/

const getSignature = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_HOST}/signatures/company/${id.value}`);
    signatures.value = response.data;
    loaded.value = true

}

/*
* filterData
* ฟังก์ชันสำหรับกรองข้อมูลจากการพิมพ์ของผู้ใช้
* param: -
* return: -
*/

const filterData = () => {
    return signatures.value.filter((signature) => {
        return (
            signature?.sign_prefix?.indexOf(searchData.value.trim()) > -1 ||
            signature?.sign_name?.indexOf(searchData.value.trim()) > -1 ||
            signature?.sign_fname?.indexOf(searchData.value.trim()) > -1 ||
            signature?.sign_lname?.indexOf(searchData.value.trim()) > -1 ||
            signature?.sign_role?.indexOf(searchData.value.trim()) > -1
        );
    });
}

/*
* sentCompanyId
* ฟังก์ชันสำหรับส่งค่า id ของลายเซ็น และบริษัทไปที่หน้า SelectIntern
* param: sign ไอดีของลายเซ็นที่รับมา
* return: -
*/

function sentCompanyId(sign) {
    console.log(sign)
    router.push({
        name: 'selectIntern',
        params: {
            companyId: id.value,
            signId: sign
        },
    })

}


onMounted(() => {
    getSignature()
})


/*
* getName
* ฟังก์ชันสำหรับจัดข้อมูลชื่อของเจ้าของลายเซ็น
* param: signature ข้อมูลของเจ้าของลายเซ็น
* return: -
*/

function getName(signature) {
    let name = `${signature.sign_prefix}
    ${signature.sign_fname}
    ${signature.sign_lname}`
    return name

}

</script>


<style scoped></style>