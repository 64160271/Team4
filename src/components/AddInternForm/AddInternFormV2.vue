<!--
 AddInternForm
 Parent of module add intern by form
 Author : Rawich Piboonsin
 Created date : 04-09-2566
-->

<template>
    <div class="d-flex flex-column mb-3">
        <span class="h5 my-auto front">เพิ่มแบบฟอร์ม</span>

        <div class="d-flex overflow-y-auto justify-content-center inpt-box mt-3">
            <!-- <Transition name="nested" duration="550"> -->
            <div
v-if="pageShow == 1"
class="row w-75 my-auto">
                <FormCompanyInfo :set-parent-data="setFormData" />
            </div>
            <!-- </Transition> -->

            <div
v-if="pageShow == 2"
class="w-75">
                <FormPersonalInfo :set-parent-data="setFormData" />
            </div>

            <div
v-if="pageShow == 3"
class="w-75">
                <FormAddress :set-parent-data="setFormData" />
            </div>

            <div
v-if="pageShow == 4"
class="w-75">
                <FormContract :set-parent-data="setFormData" />
            </div>

            <!-- <div class="w-75" v-if="pageShow == 5">
                <FormMilitaryStatus :setParentData="setFormData" />
            </div> -->

            <!--  <div class="w-75" v-if="pageShow == 5">
                <FormWorkInfo :setParentData="setFormData" />
            </div> -->

            <div
v-show="showSaveButton = true"
v-if="pageShow == 5"
class="row w-100 mt-3">
                <FormConfirmation
:form-data="formData"
:set-confirmation-data="setConfirmationData" />
            </div>
        </div>

        <hr>
        <div class="row">
            <button
class="col-2 mx-auto btn outline-gray rounded-pill"
@click="--pageShow, checkPage()">ย้อนกลับ</button>
            <button
v-if="showSaveButton == false"
class="col-2 mx-auto btn outline-red ms-auto rounded-pill"
                @click="++pageShow">ถัดไป
            </button>
            <button
v-if="showSaveButton == true"
class="col-2 mx-auto btn outline-red ms-auto rounded-pill"
                @click="confirmation">บันทึก
            </button>
        </div>
    </div>
</template>

<script setup>
import FormCompanyInfo from './FormCompanyInfo.vue'
import FormPersonalInfo from './FormPersonalInfo.vue'
import FormAddress from './FormAddress.vue'
import FormContract from './FormContract.vue'
import FormConfirmation from './FormConfirmation.vue'

import { ref, toRaw } from 'vue'
import Swal from 'sweetalert2'
import router from '@/router'
import axios from 'axios'
import 'fs'

const confirmationData = ref([{}])
const showSaveButton = ref(false)
const pageShow = ref(1)
const formData = ref([])
const nonRequired = [
    'reason', 'nickname', 'house_number',
    'village_number', 'alley', 'street',
    'subdistrict', 'district', 'province',
    'post_code', 'last_work_date', 'img',
    'height', 'weight'
]

function setConfirmationData(data) {
    confirmationData.value = data
}

function setFormData(index, data) {
    formData.value[index] = data
}

function checkPage() {
    if (pageShow.value < 1) {
        router.push({ name: 'index' })
    } else if (pageShow.value < 5) {
        showSaveButton.value = false
    }
}

function checkEmpty(object) {
    if (object == '') {
        return true
    }

    for (let key in object) {
        if (object[key] == '' || object[key] == undefined)
            return true;
    }

    return false;
}

async function confirmation() {

    for (const key in confirmationData.value) {
        let pass = false

        if (checkEmpty(confirmationData.value[key])) {
            for (const data in nonRequired) {
                if (key == nonRequired[data]) {

                    pass = true
                    break

                }
            }

            if (pass == false) {
                Swal.fire({
                    icon: 'error',
                    text: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน',
                })

                return
            }

        }
    }

    Swal.fire({
        text: 'คุณต้องการบันทึกข้อมูลหรือไม่',
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
        confirmButtonColor: 'var(--main-color)',
        reverseButtons: true,
        focusConfirm: false,
    }).then((result) => {

        if (result.isConfirmed) {
            createInterns()
        }
    })
}

async function createInterns() {

    /* const postData = axios.create({
        baseURL: `${import.meta.env.VITE_API_HOST}/interns/key/`,
        withCredentials: false,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })

    let form = new FormData();

    form.append('file', confirmationData.value.img, 'intntest') */

    await axios.post(`${import.meta.env.VITE_API_HOST}/interns/key`, confirmationData.value)
        .then((response) => console.log(response)).then(() => {
            Swal.fire({
                icon: 'success',
                text: 'บันทึกข้อมูลเสร็จสิ้น',
                showConfirmButton: false,
                timer: 3000
            }).then(() => {
                router.push({ name: 'index' })
            })
        })
}

</script>

<style scoped>
.inpt-box {
    height: 75vh;
}
</style>