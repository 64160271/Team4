<template>
    <div class="d-flex flex-column mb-3">
        <span class="h5 my-auto front">เพิ่มแบบฟอร์ม</span>

        <div class="row mt-3">

            <div class="col-2 img-size rounded-circle mb-3">
                <img src="" alt="" id="blah" class="img rounded-circle">
            </div>

            <div class="col ms-5">
                <span class="row h5 mb-3">ข้อมูลส่วนตัวเกี่ยวกับบริษัท</span>

                <div class="row mb-2 grid">
                    <label for="" class="col-2 col-form-label text-gray">รหัสพนักงาน</label>
                    <div class="col me-5">
                        <input type="text" class="form-control mb-2" v-model="mergedData.id">
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">สถานะพนักงาน</label>
                    <div class="col">
                        <select class="form-select mb-2" v-model="mergedData.status">

                        </select>
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-2 col-form-label text-gray">อีเมลพนักงาน</label>
                    <div class="col me-5">
                        <input type="text" class="form-control mb-2" v-model="mergedData.emp_email">
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">ตำแหน่งงาน</label>
                    <div class="col">
                        <select class="form-select mb-2" v-model="mergedData.role">

                        </select>
                    </div>
                </div>
            </div>

            <hr>

            <span class="h5 mb-3">ข้อมูลส่วนตัว</span>

            <div class="row mb-2">

                <div class="col-2 ms-5">
                    <label for="" class="form-label text-gray">คำนำหน้าชื่อ (ไทย) <font color="#e1032b">*</font></label>
                    <select class="form-select mb-2" v-model="mergedData.university" required>

                    </select>
                </div>

                <div class="col">
                    <label for="" class="form-label text-gray">ชื่อจริง (ไทย) <font color="#e1032b">*</font></label>
                    <input type="text" class="form-control mb-2" v-model="mergedData.university" required>
                </div>

                <div class="col">
                    <label for="" class="form-label text-gray">นามสกุล (ไทย) <font color="#e1032b">*</font></label>
                    <input type="text" class="form-control mb-2" v-model="mergedData.faculty" required>
                </div>

                <div class="col-2">
                    <label for="" class="form-label text-gray">ชื่อเล่น (ไทย) <font color="#e1032b">*</font></label>
                    <input type="text" class="form-control mb-2" v-model="mergedData.major" required>
                </div>
            </div>

            <div class="row mb-4">
                <div class="col-2 ms-5">
                    <label for="" class="form-label text-gray">คำนำหน้าชื่อ (อังกฤษ) <font color="#e1032b">*</font>
                    </label>
                    <input type="text" class="form-select" v-model="mergedData.university" required>
                </div>

                <div class="col">
                    <label for="" class="form-label text-gray">ชื่อจริง (อังกฤษ) <font color="#e1032b">*</font></label>
                    <input type="text" class="form-control" v-model="mergedData.university" required>
                </div>

                <div class="col">
                    <label for="" class="form-label text-gray">นามสกุล (อังกฤษ) <font color="#e1032b">*</font></label>
                    <input type="text" class="form-control" v-model="mergedData.faculty" required>
                </div>

                <div class="col-2">
                    <label for="" class="form-label text-gray">ชื่อเล่น (อังกฤษ) <font color="#e1032b">*</font></label>
                    <input type="text" class="form-control" v-model="mergedData.major" required>
                </div>
            </div>

            <div class="row mb-2">
                <label for="" class="col-2 col-form-label ms-5 text-gray">เลขบัตรประชาชน / พาสปอร์ต</label>
                <div class="col me-5">
                    <input type="text" class="form-control mb-2" v-model="mergedData.citizen_id">
                </div>

                <div class="col">
                    <div class="row">
                        <label for="" class="col-2 col-form-label text-gray">วันเกิด</label>
                        <input type="date" class="col form-control mb-2" v-model="mergedData.birth_date">
                    </div>
                </div>


                <div class="col-2">
                    <div class="row">
                        <label for="" class="col-4 col-form-label text-gray">อายุ (ปี)</label>
                        <input type="text" class="col form-control mb-2" v-model="mergedData.age" readonly>
                    </div>
                </div>
            </div>

            <div class="row mb-2">
                <label for="" class="col-2 col-form-label ms-5 text-gray">เพศ</label>
                <div class="col me-5">
                    <select class="form-select mb-2" v-model="mergedData.gender">

                    </select>
                </div>

                <label for="" class="col-2 col-form-label text-gray">หมู่เลือด</label>
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
                <label for="" class="col-2 col-form-label ms-5 text-gray">สัญชาติ</label>
                <div class="col me-5">
                    <input type="text" class="form-control mb-2" v-model="mergedData.nationality">
                </div>

                <label for="" class="col-2 col-form-label text-gray">เชื้อชาติ</label>
                <div class="col">
                    <input type="text" class="form-control mb-2" v-model="mergedData.nation">
                </div>
            </div>

            <div class="row mb-4">
                <label for="" class="col-2 col-form-label ms-5 text-gray">ศาสนา</label>
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
                <label for="" class="col-2 col-form-label ms-5 text-gray">เบอร์โทรศัพท์</label>
                <div class="col me-5">
                    <input type="text" class="form-control mb-2" v-model="mergedData.tel">
                </div>

                <label for="" class="col-2 col-form-label text-gray">อีเมลส่วนตัว</label>
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
        
        <div class="row">
            <button class="col-2 mx-auto btn outline-gray rounded-pill" @click="pageShow">ย้อนกลับ
            </button>
            <button class="col-2 mx-auto btn outline-red ms-auto rounded-pill" @click="confirmation">บันทึก
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { onUnmounted, onMounted } from 'vue'
import Swal from 'sweetalert2'

const fullName = ref(
    {
        thai: "",
        eng: "",
        nickname_th: "",
        nickname_en: "",
    }
)

const mergedData = ref({})
const formData = ref({})

onMounted(() => {
    prop.formData.forEach((data) => {
        mergedData.value = Object.assign(mergedData.value, data)

        if (data.fname) {
            fullName.value = {
                thai: data.prefix[0] + data.fname[0] + " " + data.lname[0],
                eng: data.prefix[1] + data.fname[1] + " " + data.lname[1],
                nickname_th: data.nickname[0],
                nickname_en: data.nickname[1]
            }
        }
    })

    const file = mergedData.value.img

    if (file) {
        blah.src = URL.createObjectURL(file)
    }

})

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
.img {
    height: 100%;
    width: 100%;
    object-fit: fill;
}

.img-size {
    width: 150px;
    height: 150px;
    background-color: #90969E;
}
</style>