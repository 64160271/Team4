<template>
    <div class="d-flex flex-column mb-3">
        <span class="h5 my-auto front">ข้อมูลนักศึกษาฝึกงาน > {{ dummyData.name_th }}</span>

        <div class="d-flex overflow-y-auto justify-content-center mt-3">
            <div class="row w-100">
                <div class="col-auto mb-3">
                    <img :src="getImage(intern.intn_image)" alt="" id="blah" class="img bg-grays-200">
                </div>

                <div class="col ms-5">
                    <span class="row h5">ข้อมูลส่วนตัวเกี่ยวกับบริษัท</span>

                    <div class="row mb-2">
                        <label for="" class="col-2 col-form-label text-gray">รหัสพนักงาน <font color="#e1032b">*</font>
                        </label>
                        <div class="col">
                            <input type="text" class="form-control-plaintext" v-model="intern.intn_id" readonly required>
                        </div>

                        <label for="" class="col-2 col-form-label text-gray">สถานะพนักงาน <font color="#e1032b">*</font>
                        </label>
                        <div class="col">
                            <input type="text" class="form-control-plaintext" v-model="dummyData.status" readonly required>
                        </div>
                    </div>

                    <div class="row mb-2">
                        <label for="" class="col-2 col-form-label text-gray">อีเมลพนักงาน <font color="#e1032b">*</font>
                        </label>
                        <div class="col">
                            <input type="text" class="form-control-plaintext" v-model="intern.intn_intern_email" readonly
                                required>
                        </div>

                        <label for="" class="col-2 col-form-label text-gray">ตำแหน่งงาน <font color="#e1032b">*</font>
                        </label>
                        <div class="col">
                            <input type="text" class="form-control-plaintext" v-model="dummyData.role" readonly required>
                        </div>

                    </div>
                </div>

                <hr>

                <span class="h5">ข้อมูลส่วนตัว</span>

                <div class="row mb-2">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">ชื่อ-นามสกุล (ไทย) <font color="#e1032b">*
                        </font>
                    </label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="dummyData.name_th" readonly required>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">ชื่อเล่น (ไทย)</label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="dummyData.nickname_th" readonly required>
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">ชื่อ-นามสกุล (อังกฤษ) <font color="#e1032b">*
                        </font>
                    </label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="dummyData.name_en" readonly required>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">ชื่อเล่น (อังกฤษ)</label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="dummyData.nickname_en" readonly required>
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-auto col-form-label ms-5 text-gray">เลขบัตรประชาชน / พาสปอร์ต <font
                            color="#e1032b">*
                        </font></label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_citizen_id" readonly
                            required>
                    </div>

                    <div class="col-2">
                        <div class="row">
                            <label for="" class="col-5 col-form-label text-gray">วันเกิด <font color="#e1032b">*</font>
                            </label>
                            <input type="text" class="col form-control-plaintext" v-model="intern.intn_birth_date" readonly
                                required>
                        </div>
                    </div>


                    <div class="col">
                        <div class="row">
                            <label for="" class="col-2 col-form-label text-gray">อายุ</label>
                            <input type="text" class="col form-control-plaintext" :value="getAge()" readonly>
                        </div>
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">เพศ <font color="#e1032b">*</font></label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="dummyData.gender" readonly required>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">หมู่เลือด <font color="#e1032b">*</font></label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_blood_type" readonly
                            required>
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">น้ำหนัก (กิโลกรัม)</label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_weight" readonly>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">ส่วนสูง (เซนติเมตร)</label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_height" readonly>
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">สัญชาติ <font color="#e1032b">*</font></label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_nationality" readonly
                            required>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">เชื้อชาติ <font color="#e1032b">*</font></label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_nation" readonly required>
                    </div>
                </div>

                <div class="row mb-4">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">ศาสนา <font color="#e1032b">*</font></label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_religion" readonly required>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">สถานภาพสมรส <font color="#e1032b">*</font></label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="dummyData.martial_status" readonly
                            required>
                    </div>
                </div>

                <hr>

                <span class="h5">สถานศึกษา</span>

                <div class="row mb-4">
                    <div class="col ms-5">
                        <label for="" class="form-label text-gray">ชื่อสถานศึกษา <font color="#e1032b">*</font></label>
                        <input type="text" class="form-control-plaintext" v-model="dummyData.university" required readonly>
                    </div>

                    <div class="col">
                        <label for="" class="form-label text-gray">คณะ <font color="#e1032b">*</font></label>
                        <input type="text" class="form-control-plaintext" v-model="dummyData.faculty" required readonly>
                    </div>

                    <div class="col">
                        <label for="" class="form-label text-gray">สาขาวิชา <font color="#e1032b">*</font></label>
                        <input type="text" class="form-control-plaintext" v-model="dummyData.major" required readonly>
                    </div>
                </div>

                <hr>

                <span class="h5">ข้อมูลที่อยู่ / ติดต่อ</span>

                <div class="row mb-2">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">บ้านเลขที่ </label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_house_number" readonly>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">ซอย</label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_alley" readonly>
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">หมู่ </label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_village_number" readonly>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">ถนน </label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_street" readonly>
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">จังหวัด </label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_province" readonly>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">อำเภอ / เขต </label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_district" readonly>
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">ตำบล / แขวง </label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_subdistrict" readonly>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">รหัสไปรษณีย์ </label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_post_code" readonly>
                    </div>
                </div>

                <div class="row mb-4">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">เบอร์โทรศัพท์ <font color="#e1032b">*</font>
                    </label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_tel" readonly required>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">อีเมลส่วนตัว <font color="#e1032b">*</font></label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_email" readonly required>
                    </div>
                </div>

                <hr>

                <span class="h5">สัญญาการจ้างงาน</span>

                <div class="row mb-4">
                    <div class="col ms-5">
                        <label for="" class="form-label text-gray">ประเภทพนักงาน <font color="#e1032b">*</font></label>
                        <input type="text" class="form-control-plaintext" v-model="dummyData.intern_type" required readonly>
                    </div>

                    <div class="col">
                        <label for="" class="form-label text-gray">เลขที่สัญญาจ้าง <font color="#e1032b">*</font></label>
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_contact_num" required
                            readonly>
                    </div>

                    <div class="col">
                        <label for="" class="form-label text-gray">วันที่เริ่มฝึกงาน <font color="#e1032b">*</font></label>
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_start_date" required
                            readonly>
                    </div>

                    <div class="col">
                        <label for="" class="form-label text-gray">วันที่ทำงานวันสุดท้าย <font color="#e1032b">*</font>
                        </label>
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_last_work_date" required
                            readonly>
                    </div>

                    <div class="col">
                        <label for="" class="form-label text-gray">วันที่สิ้นสุดสัญญาการฝึกงาน <font color="#e1032b">*
                            </font>
                        </label>
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_contract_end_date" required
                            readonly>
                    </div>
                </div>

                <hr>

                <span class="h5">สถานภาพทางทหาร</span>

                <div class="row mb-4">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">สถานภาพทางทหาร <font color="#e1032b">*</font>
                    </label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="dummyData.military_status" readonly
                            required>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">เหตุผล</label>
                    <div class="col">
                        <input type="text" class="form-control-plaintext" v-model="intern.intn_reason" readonly>
                    </div>
                </div>

                <hr>

                <span class="h5">หมายเหตุอื่น ๆ เกี่ยวกับนักศึกษา</span>

                <div class="row">
                    <label for="" class="col form-label ms-5 text-gray">หมายเหตุ</label>
                </div>

                <div class="row mb-4">
                    <textarea name="" class="form-control col ms-5" id="" rows="2"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import axios from 'axios'

const intern = ref({})
const route = useRoute()
const id = route.params.id

const dummyData = ref({
    name_th: '',
    name_en: '',
    nickname_th: '',
    nickname_en: '',
    status: '',
    intern_type: '',
    military_status: '',
    gender: '',
    martial_status: '',
    role: '',
    university: '',
    faculty: '',
    major: '',
})

const status = ref(
    [
        'กำลังทำงาน',
        'พ้นสภาพ'
    ]
)

const internType = ref(
    [
        'นักศึกษาฝึกงาน',
        'พนักงานประจำ',
        'พนักงานพาร์ทไทม์'
    ]
)

const militaryStatus = ref(
    [
        'ยังไม่เกณฑ์ทหาร',
        'กำลังประจำกองทหาร',
        'ผ่านการเกณฑ์ทหารมาแล้ว',
        'ได้รับการยกเว้นการเกณฑ์ทหาร'
    ]
)

const genders = ref(
    [
        'ชาย',
        'หญิง',
        'ไม่ระบุ'

    ]
)

const martialStatus = ref(
    [
        'โสด',
        'มีแฟนแล้ว',
        'หมั้น',
        'สมรส',
        'แยกกันอยู่',
        'หย่าร้าง',
        'หม้าย',
        'ซับซ้อน'
    ]
)

const getInternById = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/interns/${id}`)
        .then((response) => {
            intern.value = response.data
        })

    let prefix = intern.value.intn_prefix.split("|")
    let fname = intern.value.intn_fname.split("|")
    let lname = intern.value.intn_lname.split("|")
    let nickname = intern.value.intn_nickname.split("|")

    dummyData.value.martial_status = martialStatus.value[intern.value.intn_marital_status - 1]
    dummyData.value.gender = genders.value[intern.value.intn_gender - 1]
    dummyData.value.military_status = militaryStatus.value[intern.value.intn_military_status - 1]
    dummyData.value.intern_type = internType.value[intern.value.intn_emoployee_type - 1]
    dummyData.value.status = status.value[intern.value.intn_work_status - 1]

    dummyData.value.name_th = prefix[0] + fname[0] + " " + lname[0]
    dummyData.value.name_en = prefix[1] + fname[1] + " " + lname[1]
    dummyData.value.nickname_th = nickname[0]
    dummyData.value.nickname_en = nickname[1]

    if (Array.isArray(intern.work_infos)) {
        dummyData.value.role = intern.work_infos[0].work_role.role_name
    }

    dummyData.value.university = intern.value.intn_college_info.col_uni.uni_name
    dummyData.value.faculty = intern.value.intn_college_info.col_faculty.fac_name
    dummyData.value.major = intern.value.intn_college_info.col_major.maj_name

    console.log(dummyData.value)

}

function formatDate(strDate) {
    if (!strDate) {
        return
    }

    strDate = new Date(strDate)

    const day = strDate.getDate()
    const month = strDate.getMonth()
    const year = strDate.getFullYear()

    return day + "/" + month + "/" + year
}

function getImage(img) {
    if (img != null || img != '') {
        return `../src/assets/images/interns/${img}`
    }
}

function getAge() {
    if (intern.value.intn_birth_date) {
        const birthdate = new Date(intern.value.intn_birth_date)
        const today = new Date();
        const age = today.getFullYear() - birthdate.getFullYear() + 543 -
            (today.getMonth() < birthdate.getMonth() ||
                (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
        return age
    }
}

onMounted(() =>
    getInternById(),
)

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
</style>