<!--
 FormConfirmation
 Display form confirmation before save data
 Author : Rawich Piboonsin
 Created date : 04-09-2566
-->

<template>
    <div class="col-auto mb-3">
        <img
id="blah"
src=""
alt=""
class="img bg-grays-200">
    </div>

    <div class="col ms-5">
        <span class="row h5">ข้อมูลส่วนตัวเกี่ยวกับบริษัท</span>

        <div class="row mb-2">
            <label
for=""
class="col-2 col-form-label text-gray">รหัสพนักงาน <font color="#e1032b">*</font></label>
            <div class="col">
                <input
v-model="mergedData.id"
type="text"
class="form-control-plaintext"
readonly
required>
            </div>

            <label
for=""
class="col-2 col-form-label text-gray">สถานะพนักงาน <font color="#e1032b">*</font></label>
            <div class="col">
                <input
v-model="dummyData.stat_name"
type="text"
class="form-control-plaintext"
readonly
required>
            </div>
        </div>

        <div class="row mb-2">
            <label
for=""
class="col-2 col-form-label text-gray">อีเมลพนักงาน <font color="#e1032b">*</font></label>
            <div class="col">
                <input
v-model="mergedData.emp_email"
type="text"
class="form-control-plaintext"
readonly
required>
            </div>

            <label
for=""
class="col-2 col-form-label text-gray">ตำแหน่งงาน <font color="#e1032b">*</font></label>
            <div class="col">
                <input
v-model="dummyData.role_name"
type="text"
class="form-control-plaintext"
readonly
required>
            </div>
        </div>
    </div>

    <hr>

    <span class="h5">ข้อมูลส่วนตัว</span>

    <div class="row mb-2">
        <label
for=""
class="col-2 col-form-label ms-5 text-gray">ชื่อ-นามสกุล (ไทย) <font color="#e1032b">*</font>
        </label>
        <div class="col">
            <input
v-model="fullName.thai"
type="text"
class="form-control-plaintext"
readonly
required>
        </div>

        <label
for=""
class="col-2 col-form-label text-gray">ชื่อเล่น (ไทย)</label>
        <div class="col">
            <input
v-model="fullName.nickname_th"
type="text"
class="form-control-plaintext"
readonly
required>
        </div>
    </div>

    <div class="row mb-2">
        <label
for=""
class="col-2 col-form-label ms-5 text-gray">ชื่อ-นามสกุล (อังกฤษ) <font color="#e1032b">*</font>
        </label>
        <div class="col">
            <input
v-model="fullName.eng"
type="text"
class="form-control-plaintext"
readonly
required>
        </div>

        <label
for=""
class="col-2 col-form-label text-gray">ชื่อเล่น (อังกฤษ)</label>
        <div class="col">
            <input
v-model="fullName.nickname_en"
type="text"
class="form-control-plaintext"
readonly
required>
        </div>
    </div>

    <div class="row mb-2">
        <label
for=""
class="col-auto col-form-label ms-5 text-gray">เลขบัตรประชาชน / พาสปอร์ต <font color="#e1032b">*
            </font></label>
        <div class="col">
            <input
v-model="mergedData.citizen_id"
type="text"
class="form-control-plaintext"
readonly
required>
        </div>

        <div class="col-2">
            <div class="row">
                <label
for=""
class="col-5 col-form-label text-gray">วันเกิด <font color="#e1032b">*</font></label>
                <input
v-model="mergedData.birth_date"
type="text"
class="col form-control-plaintext"
readonly
required>
            </div>
        </div>


        <div class="col">
            <div class="row">
                <label
for=""
class="col-2 col-form-label text-gray">อายุ</label>
                <input
v-model="mergedData.age"
type="text"
class="col form-control-plaintext"
readonly>
            </div>
        </div>
    </div>

    <div class="row mb-2">
        <label
for=""
class="col-2 col-form-label ms-5 text-gray">เพศ <font color="#e1032b">*</font></label>
        <div class="col">
            <input
v-model="dummyData.gen_name"
type="text"
class="form-control-plaintext"
readonly
required>
        </div>

        <label
for=""
class="col-2 col-form-label text-gray">หมู่เลือด <font color="#e1032b">*</font></label>
        <div class="col">
            <input
v-model="mergedData.blood_type"
type="text"
class="form-control-plaintext"
readonly
required>
        </div>
    </div>

    <div class="row mb-2">
        <label
for=""
class="col-2 col-form-label ms-5 text-gray">น้ำหนัก (กิโลกรัม)</label>
        <div class="col">
            <input
v-model="mergedData.weight"
type="text"
class="form-control-plaintext"
readonly>
        </div>

        <label
for=""
class="col-2 col-form-label text-gray">ส่วนสูง (เซนติเมตร)</label>
        <div class="col">
            <input
v-model="mergedData.height"
type="text"
class="form-control-plaintext"
readonly>
        </div>
    </div>

    <div class="row mb-2">
        <label
for=""
class="col-2 col-form-label ms-5 text-gray">สัญชาติ <font color="#e1032b">*</font></label>
        <div class="col">
            <input
v-model="mergedData.nationality"
type="text"
class="form-control-plaintext"
readonly
required>
        </div>

        <label
for=""
class="col-2 col-form-label text-gray">เชื้อชาติ <font color="#e1032b">*</font></label>
        <div class="col">
            <input
v-model="mergedData.nation"
type="text"
class="form-control-plaintext"
readonly
required>
        </div>
    </div>

    <div class="row mb-4">
        <label
for=""
class="col-2 col-form-label ms-5 text-gray">ศาสนา <font color="#e1032b">*</font></label>
        <div class="col">
            <input
v-model="mergedData.religion"
type="text"
class="form-control-plaintext"
readonly
required>
        </div>

        <label
for=""
class="col-2 col-form-label text-gray">สถานภาพสมรส <font color="#e1032b">*</font></label>
        <div class="col">
            <input
v-model="dummyData.martial_name"
type="text"
class="form-control-plaintext"
readonly
required>
        </div>
    </div>

    <hr>

    <span class="h5">สถานศึกษา</span>

    <div class="row mb-4">
        <div class="col ms-5">
            <label
for=""
class="form-label text-gray">ชื่อสถานศึกษา <font color="#e1032b">*</font></label>
            <input
v-model="dummyData.uni_name"
type="text"
class="form-control-plaintext"
required
readonly>
        </div>

        <div class="col">
            <label
for=""
class="form-label text-gray">คณะ <font color="#e1032b">*</font></label>
            <input
v-model="dummyData.fac_name"
type="text"
class="form-control-plaintext"
required
readonly>
        </div>

        <div class="col">
            <label
for=""
class="form-label text-gray">สาขาวิชา <font color="#e1032b">*</font></label>
            <input
v-model="dummyData.maj_name"
type="text"
class="form-control-plaintext"
required
readonly>
        </div>
    </div>

    <hr>

    <span class="h5">ข้อมูลที่อยู่ / ติดต่อ</span>

    <div class="row mb-2">
        <label
for=""
class="col-2 col-form-label ms-5 text-gray">บ้านเลขที่ </label>
        <div class="col">
            <input
v-model="mergedData.house_number"
type="text"
class="form-control-plaintext"
readonly>
        </div>

        <label
for=""
class="col-2 col-form-label text-gray">ซอย</label>
        <div class="col">
            <input
v-model="mergedData.alley"
type="text"
class="form-control-plaintext"
readonly>
        </div>
    </div>

    <div class="row mb-2">
        <label
for=""
class="col-2 col-form-label ms-5 text-gray">หมู่ </label>
        <div class="col">
            <input
v-model="mergedData.village_number"
type="text"
class="form-control-plaintext"
readonly>
        </div>

        <label
for=""
class="col-2 col-form-label text-gray">ถนน </label>
        <div class="col">
            <input
v-model="mergedData.street"
type="text"
class="form-control-plaintext"
readonly>
        </div>
    </div>

    <div class="row mb-2">
        <label
for=""
class="col-2 col-form-label ms-5 text-gray">จังหวัด </label>
        <div class="col">
            <input
v-model="mergedData.province"
type="text"
class="form-control-plaintext"
readonly>
        </div>

        <label
for=""
class="col-2 col-form-label text-gray">อำเภอ / เขต </label>
        <div class="col">
            <input
v-model="mergedData.district"
type="text"
class="form-control-plaintext"
readonly>
        </div>
    </div>

    <div class="row mb-2">
        <label
for=""
class="col-2 col-form-label ms-5 text-gray">ตำบล / แขวง </label>
        <div class="col">
            <input
v-model="mergedData.subdistrict"
type="text"
class="form-control-plaintext"
readonly>
        </div>

        <label
for=""
class="col-2 col-form-label text-gray">รหัสไปรษณีย์ </label>
        <div class="col">
            <input
v-model="mergedData.post_code"
type="text"
class="form-control-plaintext"
readonly>
        </div>
    </div>

    <div class="row mb-4">
        <label
for=""
class="col-2 col-form-label ms-5 text-gray">เบอร์โทรศัพท์ <font color="#e1032b">*</font></label>
        <div class="col">
            <input
v-model="mergedData.tel"
type="text"
class="form-control-plaintext"
readonly
required>
        </div>

        <label
for=""
class="col-2 col-form-label text-gray">อีเมลส่วนตัว <font color="#e1032b">*</font></label>
        <div class="col">
            <input
v-model="mergedData.email"
type="text"
class="form-control-plaintext"
readonly
required>
        </div>
    </div>

    <hr>

    <span class="h5">สัญญาการจ้างงาน</span>

    <div class="row mb-4">
        <div class="col ms-5">
            <label
for=""
class="form-label text-gray">ประเภทพนักงาน <font color="#e1032b">*</font></label>
            <input
v-model="dummyData.emp_type_name"
type="text"
class="form-control-plaintext"
required
readonly>
        </div>

        <div class="col">
            <label
for=""
class="form-label text-gray">เลขที่สัญญาจ้าง <font color="#e1032b">*</font></label>
            <input
v-model="mergedData.contract_number"
type="text"
class="form-control-plaintext"
required
readonly>
        </div>

        <div class="col">
            <label
for=""
class="form-label text-gray">วันที่เริ่มฝึกงาน <font color="#e1032b">*</font></label>
            <input
v-model="mergedData.start_date"
type="text"
class="form-control-plaintext"
required
readonly>
        </div>

        <div class="col">
            <label
for=""
class="form-label text-gray">วันที่ทำงานวันสุดท้าย <font color="#e1032b">*</font></label>
            <input
v-model="mergedData.last_work_date"
type="text"
class="form-control-plaintext"
required
readonly>
        </div>

        <div class="col">
            <label
for=""
class="form-label text-gray">วันที่สิ้นสุดสัญญาการฝึกงาน <font color="#e1032b">*</font>
            </label>
            <input
v-model="mergedData.contract_end_date"
type="text"
class="form-control-plaintext"
required
readonly>
        </div>
    </div>

    <hr>

    <span class="h5">สถานภาพทางทหาร</span>

    <div class="row mb-4">
        <label
for=""
class="col-2 col-form-label ms-5 text-gray">สถานภาพทางทหาร <font color="#e1032b">*</font></label>
        <div class="col">
            <input
v-model="dummyData.mili_name"
type="text"
class="form-control-plaintext"
readonly
required>
        </div>

        <label
for=""
class="col-2 col-form-label text-gray">เหตุผล</label>
        <div class="col">
            <input
v-model="mergedData.reason"
type="text"
class="form-control-plaintext"
readonly>
        </div>
    </div>

    <hr>

    <span class="h5">หมายเหตุอื่น ๆ เกี่ยวกับนักศึกษา</span>

    <div class="row">
        <label
for=""
class="col form-label ms-5 text-gray">หมายเหตุ</label>
    </div>

    <div class="row mb-4">
        <textarea
id=""
name=""
class="form-control col ms-5"
rows="2"></textarea>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { onUnmounted, onMounted } from 'vue'

const dummyData = ref({
    uni_name: '',
    fac_name: '',
    maj_name: '',
    role_name: '',
    gen_name: '',
    stat_name: '',
    martial_name: '',
    mili_name: '',
    emp_type_name: '',
})

const fullName = ref({
    thai: "",
    eng: "",
    nickname_th: "",
    nickname_en: "",
})

const mergedData = ref({})
const prop = defineProps({
    formData: Array,
    setConfirmationData: Function,
});

function formatDate(strDate) {
    if (!strDate) {
        return
    }

    strDate = new Date(strDate)

    const day = strDate.getDate()
    const month = strDate.getMonth() + 1
    const year = strDate.getFullYear()

    return day + "/" + month + "/" + year
}

onMounted(() => {
    prop.formData.forEach((data) => {
        mergedData.value = Object.assign(mergedData.value, data)

        if (data.fname) {
            fullName.value = {
                thai: data.prefix[0] + data.fname[0] + " " + data.lname[0],
                eng: data.prefix[1] + data.fname[1] + " " + data.lname[1],
                nickname_th: data.nickname[0],
                nickname_en: data.nickname[1]
            },

                dummyData.value = {
                    uni_name: data.university.uni_name,
                    fac_name: data.faculty.fac_name,
                    maj_name: data.major.maj_name,
                    gen_name: data.gender?.name,
                    martial_name: data.martial_status?.name,
                    mili_name: data.military_status?.name,
                }
        }
    })

    dummyData.value.emp_type_name = mergedData.value.emp_type.name
    dummyData.value.stat_name = mergedData.value.status.name
    dummyData.value.role_name = mergedData.value.role.role_name

    const file = mergedData.value.img

    if (file) {
        blah.src = URL.createObjectURL(file)
    }

    prop.setConfirmationData(mergedData.value)

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

/* .img-size {
    width: 150px;
    height: 150px;
    background-color: #90969E;
} */
</style>