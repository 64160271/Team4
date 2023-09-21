<!--
 AddInternForm
 Parent of module add intern by form
 Author : Rawich Piboonsin
 Created date : 04-09-2566
-->

<template>
    <form @submit="createInterns">
        <div class="row mb-3">
            <span class="h5 my-auto front">เพิ่มแบบฟอร์ม</span>

            <div class="col-auto my-3">
                <div class="row">
                    <div class="col text-center">
                        <img src="" alt="" id="blah" class="img bg-grays-200">
                    </div>
                </div>

                <div class="row mt-3">
                    <div class="col">
                        <button class="col-auto btn btn-sm outline-red position-relative px-4" id="picture">
                            <input @change="showImg" type="file" id="img-upload" accept="image/*" />

                            <svg class="me-1" width="28" height="28" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M19.9474 36.5556H5.21053C4.09383 36.5556 3.02286 36.0873 2.23323 35.2538C1.44361 34.4203 1 33.2899 1 32.1111V12.1111C1 10.9324 1.44361 9.80191 2.23323 8.96841C3.02286 8.13492 4.09383 7.66667 5.21053 7.66667H7.31579C8.43249 7.66667 9.50345 7.19841 10.2931 6.36492C11.0827 5.53142 11.5263 4.40096 11.5263 3.22222C11.5263 2.63285 11.7481 2.06762 12.1429 1.65087C12.5377 1.23413 13.0732 1 13.6316 1H26.2632C26.8215 1 27.357 1.23413 27.7518 1.65087C28.1466 2.06762 28.3684 2.63285 28.3684 3.22222C28.3684 4.40096 28.812 5.53142 29.6017 6.36492C30.3913 7.19841 31.4622 7.66667 32.5789 7.66667H34.6842C35.8009 7.66667 36.8719 8.13492 37.6615 8.96841C38.4511 9.80191 38.8947 10.9324 38.8947 12.1111V19.8889"
                                    stroke="var(--main-color)" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                                <path class="stroke-white"
                                    d="M34.6854 41.0026V27.6693M34.6854 27.6693L41.0012 34.3359M34.6854 27.6693L28.3697 34.3359M19.9486 27.6693C21.6237 27.6693 23.2301 26.9669 24.4145 25.7166C25.599 24.4664 26.2644 22.7707 26.2644 21.0026C26.2644 19.2345 25.599 17.5388 24.4145 16.2886C23.2301 15.0383 21.6237 14.3359 19.9486 14.3359C18.2736 14.3359 16.6671 15.0383 15.4827 16.2886C14.2982 17.5388 13.6328 19.2345 13.6328 21.0026C13.6328 22.7707 14.2982 24.4664 15.4827 25.7166C16.6671 26.9669 18.2736 27.6693 19.9486 27.6693Z"
                                    stroke="var(--main-color)" stroke-width="2" stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            อัปโหลดรูปภาพ
                        </button>
                    </div>
                </div>
            </div>

            <div class="col ms-5 align-self-center">
                <span class="row h5 mb-3">ข้อมูลส่วนตัวเกี่ยวกับบริษัท</span>

                <div class="row mb-2 grid">
                    <label for="" class="col-2 col-form-label text-gray">รหัสพนักงาน <span class="text-danger">*</span></label>
                    <div class="col me-5">
                        <input type="text" class="form-control mb-2" v-model="mergedData.id">
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">สถานะพนักงาน <span class="text-danger">*</span></label>
                    <div class="col">
                        <select class="form-select mb-2">
                            <option v-for="status in statusList" :value="status">{{ status }}</option>
                        </select>
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-2 col-form-label text-gray">อีเมลพนักงาน <span class="text-danger">*</span></label>
                    <div class="col me-5">
                        <input type="text" class="form-control mb-2" v-model="mergedData.emp_email">
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">ตำแหน่งงาน <span class="text-danger">*</span></label>
                    <div class="col">
                        <select class="form-select mb-2">

                        </select>
                    </div>
                </div>
            </div>

            <hr>

            <span class="h5 mb-3">ข้อมูลส่วนตัว</span>

            <div class="row mb-2">

                <div class="col-2 ms-5">
                    <label for="" class="form-label text-gray">คำนำหน้าชื่อ (ไทย) <span class="text-danger">*</span></label>
                    <select class="form-select mb-2" v-model="mergedData.university" required>

                    </select>
                </div>

                <div class="col">
                    <label for="" class="form-label text-gray">ชื่อจริง (ไทย) <span class="text-danger">*</span></label>
                    <input type="text" class="form-control mb-2" v-model="mergedData.university" required>
                </div>

                <div class="col">
                    <label for="" class="form-label text-gray">นามสกุล (ไทย) <span class="text-danger">*</span></label>
                    <input type="text" class="form-control mb-2" v-model="mergedData.faculty" required>
                </div>

                <div class="col-2">
                    <label for="" class="form-label text-gray">ชื่อเล่น (ไทย)</label>
                    <input type="text" class="form-control mb-2" v-model="mergedData.major" required>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col-2 ms-5">
                    <label for="" class="form-label text-gray">คำนำหน้าชื่อ (อังกฤษ) <span class="text-danger">*</span>
                    </label>
                    <input type="text" class="form-select" v-model="mergedData.university" required>
                </div>

                <div class="col">
                    <label for="" class="form-label text-gray">ชื่อจริง (อังกฤษ) <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" v-model="mergedData.university" required>
                </div>

                <div class="col">
                    <label for="" class="form-label text-gray">นามสกุล (อังกฤษ) <span class="text-danger">*</span></label>
                    <input type="text" class="form-control" v-model="mergedData.faculty" required>
                </div>

                <div class="col-2">
                    <label for="" class="form-label text-gray">ชื่อเล่น (อังกฤษ)</label>
                    <input type="text" class="form-control" v-model="mergedData.major" required>
                </div>
            </div>

            <div class="row mb-2">
                <label for="" class="col-2 col-form-label ms-5 text-gray">เลขบัตรประชาชน / พาสปอร์ต <span class="text-danger">*</span></label>
                <div class="col me-5">
                    <input type="text" class="form-control mb-2" v-model="mergedData.citizen_id">
                </div>

                <div class="col">
                    <div class="row">
                        <label for="" class="col-auto col-form-label text-gray">วันเกิด <span class="text-danger">*</span></label>
                        <input type="date" class="col form-control mb-2" v-model="mergedData.birth_date">
                    </div>
                </div>


                <div class="col-2">
                    <div class="row">
                        <label for="" class="col-auto col-form-label text-gray">อายุ (ปี)</label>
                        <input type="text" class="col form-control mb-2" v-model="mergedData.age" readonly>
                    </div>
                </div>
            </div>

            <div class="row mb-2">
                <label for="" class="col-2 col-form-label ms-5 text-gray">เพศ <span class="text-danger">*</span></label>
                <div class="col me-5">
                    <select class="form-select mb-2" v-model="mergedData.gender">

                    </select>
                </div>

                <label for="" class="col-2 col-form-label text-gray">หมู่เลือด <span class="text-danger">*</span></label>
                <div class="col">
                    <select class="form-select mb-2" v-model="mergedData.blood_type">

                    </select>
                </div>
            </div>

            <div class="row mb-2">
                <label for="" class="col-2 col-form-label ms-5 text-gray">น้ำหนัก (กิโลกรัม)</label>
                <div class="col me-5">
                    <input type="text" class="form-control mb-2" v-model="mergedData.weight">
                </div>

                <label for="" class="col-2 col-form-label text-gray">ส่วนสูง (เซนติเมตร)</label>
                <div class="col">
                    <input type="text" class="form-control mb-2" v-model="mergedData.height">
                </div>
            </div>

            <div class="row mb-2">
                <label for="" class="col-2 col-form-label ms-5 text-gray">สัญชาติ <span class="text-danger">*</span></label>
                <div class="col me-5">
                    <input type="text" class="form-control mb-2" v-model="mergedData.nationality">
                </div>

                <label for="" class="col-2 col-form-label text-gray">เชื้อชาติ <span class="text-danger">*</span></label>
                <div class="col">
                    <input type="text" class="form-control mb-2" v-model="mergedData.nation">
                </div>
            </div>

            <div class="row mb-4">
                <label for="" class="col-2 col-form-label ms-5 text-gray">ศาสนา <span class="text-danger">*</span></label>
                <div class="col me-5">
                    <select class="form-select mb-2" v-model="mergedData.religion">

                    </select>
                </div>

                <label for="" class="col-2 col-form-label text-gray">สถานภาพสมรส</label>
                <div class="col">
                    <select class="form-select mb-2" v-model="mergedData.marital_status">

                    </select>
                </div>
            </div>

            <hr>

            <span class="h5 mb-3">สถานศึกษา</span>

            <div class="row mb-4">
                <div class="col me-5 ms-5">
                    <label for="" class="form-label text-gray">ชื่อสถานศึกษา <font color="#e1032b">*</font></label>
                    <select class="form-select mb-2" v-model="mergedData.university" required>

                    </select>
                </div>

                <div class="col me-5">
                    <label for="" class="form-label text-gray">คณะ <font color="#e1032b">*</font></label>
                    <select class="form-select mb-2" v-model="mergedData.faculty" required>

                    </select>
                </div>

                <div class="col">
                    <label for="" class="form-label text-gray">สาขาวิชา <font color="#e1032b">*</font></label>
                    <select class="form-select mb-2" v-model="mergedData.major" required>

                    </select>
                </div>
            </div>

            <hr>

            <span class="h5 mb-3">ข้อมูลที่อยู่ / ติดต่อ</span>

            <div class="row mb-2">
                <label for="" class="col-2 col-form-label ms-5 text-gray">บ้านเลขที่</label>
                <div class="col me-5">
                    <input type="text" class="form-control mb-2" v-model="mergedData.house_number">
                </div>

                <label for="" class="col-2 col-form-label text-gray">ซอย</label>
                <div class="col">
                    <input type="text" class="form-control mb-2" v-model="mergedData.alley">
                </div>
            </div>

            <div class="row mb-2 me-5">
                <label for="" class="col-2 col-form-label ms-5 text-gray">หมู่</label>
                <div class="col me-5">
                    <input type="text" class="form-control mb-2" v-model="mergedData.village_number">
                </div>

                <label for="" class="col-2 col-form-label text-gray">ถนน</label>
                <div class="col">
                    <input type="text" class="form-control mb-2" v-model="mergedData.street">
                </div>
            </div>

            <div class="row mb-2">
                <label for="" class="col-2 col-form-label ms-5 text-gray">จังหวัด</label>
                <div class="col me-5">
                    <input type="text" class="form-control mb-2" v-model="mergedData.province">
                </div>

                <label for="" class="col-2 col-form-label text-gray">อำเภอ / เขต</label>
                <div class="col">
                    <input type="text" class="form-control mb-2" v-model="mergedData.district">
                </div>
            </div>

            <div class="row mb-2">
                <label for="" class="col-2 col-form-label ms-5 text-gray">ตำบล / แขวง</label>
                <div class="col me-5">
                    <input type="text" class="form-control mb-2" v-model="mergedData.subdistrict">
                </div>

                <label for="" class="col-2 col-form-label text-gray">รหัสไปรษณีย์</label>
                <div class="col">
                    <input type="text" class="form-control mb-2" v-model="mergedData.post_code">
                </div>
            </div>

            <div class="row mb-4">
                <label for="" class="col-2 col-form-label ms-5 text-gray">เบอร์โทรศัพท์ <span class="text-danger">*</span></label>
                <div class="col me-5">
                    <input type="text" class="form-control mb-2" v-model="mergedData.tel">
                </div>

                <label for="" class="col-2 col-form-label text-gray">อีเมลส่วนตัว <span class="text-danger">*</span></label>
                <div class="col">
                    <input type="text" class="form-control mb-2" v-model="mergedData.email">
                </div>
            </div>

            <hr>

            <span class="h5 mb-3">สถานภาพทางทหาร</span>

            <div class="row mb-4">
                <label for="" class="col-2 col-form-label ms-5 text-gray">สถานภาพทางทหาร</label>
                <div class="col me-5">
                    <select class="form-select mb-2" v-model="mergedData.military_status">

                    </select>
                </div>

                <label for="" class="col-2 col-form-label text-gray">เหตุผล</label>
                <div class="col">
                    <input type="text" class="form-control mb-2" v-model="mergedData.reason">
                </div>
            </div>

            <hr>

            <span class="h5 mb-3">หมายเหตุอื่น ๆ เกี่ยวกับนักศึกษา</span>

            <div class="row">
                <label for="" class="col form-label ms-5 text-gray">หมายเหตุ</label>
            </div>

            <div class="row mb-4">
                <textarea name="" class="form-control mb-2 col ms-5" id="" rows="2"></textarea>
            </div>

        </div>

        <hr>

        <div class="row mb-4">
            <button type="button" class="col-2 mx-auto btn outline-gray rounded-pill" @click="$router.push({ name: 'index' })">ย้อนกลับ
            </button>
            <button type="button" class="col-2 mx-auto btn outline-red ms-auto rounded-pill" @click="confirmation">บันทึก
            </button>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { onUnmounted, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { useStatusData } from '../../stores/constData'
import { useMilitaryStatus } from '../../stores/constData'
import { useGenderData } from '../../stores/constData'
import { useMartialStatus } from '../../stores/constData'
import { useInternType } from '../../stores/constData'

const mergedData = ref({})
const formData = ref({})
const image = ref()
const statusList = ref(useStatusData())
const internTypeList = ref(useInternType())
const militaryStatusList = ref(useMilitaryStatus())
const genderList = ref(useGenderData())
const martialStatusList = ref(useMartialStatus())

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

function showImg() {
    const imgUpload = document.getElementById("img-upload")

    if (imgUpload.files[0] != undefined) {
        image.value = imgUpload.files[0]
    }

    if (image.value) {
        blah.src = URL.createObjectURL(image.value)
    }
}

onMounted(() => {
})

</script>

<style scoped>
.bg-grays-200 {
    background-color: #8d969b30 !important;
}

hr {
    border: none;
    height: 1px;
    background-color: var(--main-color);
}

.img {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    border: 1px solid var(--main-color)
}

#img-upload {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
}
</style>