<template>
    <div class="d-flex flex-column mb-3">
        <span class="h5 my-auto front">เพิ่มแบบฟอร์ม</span>

        <div class="d-flex overflow-y-auto justify-content-center inpt-box mt-3">
            <!-- <Transition name="nested" duration="550"> -->
            <div class="row w-75 my-auto" v-if="pageShow == 1">
                <FormCompanyInfo :setParentData="setFormData" />
            </div>
            <!-- </Transition> -->

            <div class="w-75" v-if="pageShow == 2">
                <FormPersonalInfo :setParentData="setFormData" />
            </div>

            <div class="w-75" v-if="pageShow == 3">
                <FormAddress :setParentData="setFormData" />
            </div>

            <div class="w-75" v-if="pageShow == 4">
                <FormContract :setParentData="setFormData" />
            </div>

            <!-- <div class="w-75" v-if="pageShow == 5">
                <FormMilitaryStatus :setParentData="setFormData" />
            </div> -->

           <!--  <div class="w-75" v-if="pageShow == 5">
                <FormWorkInfo :setParentData="setFormData" />
            </div> -->

            <div class="row w-100 mt-3" v-show="showSaveButton = true" v-if="pageShow == 5">
                <FormConfirmation :formData="formData" />
            </div>
        </div>

        <hr>
        <div class="row">
            <button class="col-2 mx-auto btn outline-gray rounded-pill" @click="--pageShow, checkPage()">ย้อนกลับ</button>
            <button v-if="showSaveButton == false" class="col-2 mx-auto btn outline-red ms-auto rounded-pill"
                @click="++pageShow">ถัดไป</button>
            <button v-if="showSaveButton == true" class="col-2 mx-auto btn outline-red ms-auto rounded-pill"
                @click="confirmation">บันทึก</button>
        </div>
    </div>
</template>

<script setup>
import FormCompanyInfo from './AddInternForm/FormCompanyInfo.vue'
import FormPersonalInfo from './AddInternForm/FormPersonalInfo.vue'
import FormAddress from './AddInternForm/FormAddress.vue'
import FormContract from './AddInternForm/FormContract.vue'
import FormMilitaryStatus from './AddInternForm/FormMilitaryStatus.vue'
import FormWorkInfo from './AddInternForm/FormWorkInfo.vue'
import FormConfirmation from './AddInternForm/FormConfirmation.vue'

import { ref } from 'vue'
import Swal from 'sweetalert2'
import router from '@/router'

const showSaveButton = ref(false)
const pageShow = ref(1)
const formData = ref([])

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

function confirmation() {

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

    /* await axios.post(`${import.meta.env.VITE_API_HOST}/interns`, formData.value)
        .then((response) => console.log(response)).then(() => {
            Swal.fire({
                icon: 'success',
                text: 'บันทึกข้อมูลเสร็จสิ้น',
                showConfirmButton: false,
                timer: 3000
            }).then(() => {
            })
        }) */
}


</script>

<style scoped>
.inpt-box {
    height: 75vh;
}

.nested-enter-active,
.nested-leave-active {
    transition: all 0.3s ease-in-out;
}

/* delay leave of parent element */
.nested-leave-active {
    transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
    transform: translateY(30px);
    opacity: 0;
}

/* we can also transition nested elements using nested selectors */
.nested-enter-active .inner,
.nested-leave-active .inner {
    transition: all 0.3s ease-in-out;
}

/* delay enter of nested element */
.nested-enter-active .inner {
    transition-delay: 0.25s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
    transform: translateX(30px);
    /*
  	Hack around a Chrome 96 bug in handling nested opacity transitions.
    This is not needed in other browsers or Chrome 99+ where the bug
    has been fixed.
  */
    opacity: 0.001;
}
</style>