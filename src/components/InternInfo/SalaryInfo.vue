<template>
    <div class="row mb-3">

        <LayoutMenu />

        <div class="row mb-3">
            <button class="btn outline-red col-auto ms-auto">แก้ไขข้อมูลเบี้ยเลี้ยง</button>
        </div>

        <div class="row">
            <table class="table table-borderless table-striped">
                <thead class="bg-red">
                    <tr class="text-center tr-custom">
                        <th scope="col" class="th-custom border-left">วันที่แก้ไข</th>
                        <th scope="col" class="th-custom">วันที่ได้รับเบี้ยเลี้ยงเริ่มต้น</th>
                        <th scope="col" class="th-custom">เบี้ยเลี้ยงก่อนหน้า (บาท)</th>
                        <th scope="col" class="th-custom">เบี้ยงเลี้ยงที่ปรับแก้</th>
                        <th scope="col" class="th-custom border-right">ผู้ทำการแก้ไข</th>
                    </tr>
                </thead>

                <tbody>
                    <tr class="tr-custom" v-for="(salary, index) in salaries">
                        <td class="text-center border-left">{{ formatDate(salary.sal_edit_date || '-') }}</td>
                        <td class="text-center">{{ formatDate(salary.sal_from_date) }}</td>
                        <td class="text-center">{{ salaries[index+1]?.sal_salary || '-' }}</td>
                        <td class="text-center">{{ salary.sal_salary }}</td>
                        <td class="text-center border-right">{{ salary.sal_edit_by_user.user_name || '-' }}</td>
                    </tr>
                </tbody>
            </table>

            <div class="text-center mt-5" v-if="salaries == 0">
                <span class="h5">----- ไม่มีข้อมูลเบี้ยเลี้ยง -----</span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import LayoutMenu from './LayoutMenu.vue'
    import apiService from '../../services/api'
    import { useRoute } from 'vue-router'
    import { onMounted, ref, computed } from 'vue'
    import { formatDate, getAgeBuddisht } from "../../assets/js/func";

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