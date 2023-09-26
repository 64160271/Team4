<template>
    <div class="row mb-3">

        <LayoutMenu />

        <div class="row mb-3">
            <button class="btn outline-red col-auto ms-auto">แก้ไขข้อมูลเบี้ยเลี้ยง</button>
        </div>

        <table class="table">
            <thead class="bg-red">
                <tr class="text-center">
                    <th scope="col">วันที่แก้ไข</th>
                    <th scope="col">วันที่ได้รับเบี้ยเลี้ยงเริ่มต้น</th>
                    <th scope="col">เบี้ยเลี้ยงก่อนหน้า</th>
                    <th scope="col">เบี้ยงเลี้ยงที่ปรับแก้</th>
                    <th scope="col">ผู้ทำการแก้ไข</th>
                </tr>
            </thead>
        </table>
    </div>
</template>

<script setup>
import LayoutMenu from './LayoutMenu.vue'
import apiService from '../../services/api'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'

const internId = useRoute().params.id
const salaries = ref({})
const apiCall = new apiService()

onMounted(async () => {
    salaries.value = await apiCall.getSalaryByInternId(internId)
})

</script>

<style scoped>
button {
    height: 50px;
}
</style>