<template>
    <div class="row mb-3">

        <LayoutMenu />

        <div class="row mb-3">
            <button class="btn btn-std outline-red col-auto ms-auto" @click="openModal">แก้ไขข้อมูลเบี้ยเลี้ยง</button>
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
                        <td class="text-center">{{ salaries[index + 1]?.sal_salary || '-' }}</td>
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

    <!-- Modal -->
    <div class="modal" id="modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">แก้ไขจำนวนเบี้ยเลี้ยง</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form action="">
                        <div class="row mb-4 mx-2">
                            <div class="col">
                                <label for="" class="form-label text-gray">วันที่แก้ไข
                                    <span class="text-danger">*</span>
                                </label>
                                <input type="date" class="form-control" name="" id="">
                            </div>
                        </div>
                        
                        <div class="row mb-4 mx-2">
                            <div class="col">
                                <label for="" class="form-label text-gray">วันที่เริ่มต้นได้รับเบี้ยเลี้ยง
                                    <span class="text-danger">*</span>
                                </label>
                                <input type="date" class="form-control" name="" id="">
                            </div>
                        </div>

                        <div class="row mb-4 mx-2">
                            <div class="col">
                                <label for="" class="form-label text-gray">เบี้ยเลี้ยงปัจจุบัน (บาท)
                                    <span class="text-danger">*</span>
                                </label>
                                <input type="number" class="form-control" name="" id="">
                            </div>
                        </div>

                        <div class="row mb-4 mx-2">
                            <div class="col">
                                <label for="" class="form-label text-gray">เบี้ยเลี้ยงที่ทำการแก้ไข (บาท)
                                    <span class="text-danger">*</span>
                                </label>
                                <input type="number" class="form-control" name="" id="">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer justify-content-center gap-4">
                    <button type="button" class="col-md-3 btn outline-gray" data-bs-dismiss="modal"
                        @click="closeModal">ยกเลิก</button>
                    <button type="button" class="col-md-3 btn outline-red">บันทึก</button>
                </div>
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
const modal = ref()

onMounted(async () => {
    salaries.value = await apiCall.getSalaryByInternId(internId)
    modal.value = new bootstrap.Modal('#modal', {})
})

function openModal() {
    modal.value.show()
}

function closeModal() {
    modal.value.hide()
}

</script>

<style scoped></style>