<!--
 InternData
 Display intern's information detail
 Author : Rawich Piboonsin
 Created date : 14-09-2566
-->

<template>
    <div class="d-flex flex-column mb-3">
        <span class="h5 my-auto front">ข้อมูลนักศึกษาฝึกงาน > {{ dummyData.name_th }}</span>

        <LayoutMenu />
        <hr>

        <div class="d-flex overflow-y-auto justify-content-center mt-3">
            <div class="row w-100">
                <div class="col-auto mb-3">
                    <img :src="getImage(intern.intn_image)" alt="" id="blah" class="img bg-grays-200">
                </div>

                <div class="col ms-5">
                    <div class="row">
                        <span class="col h5 my-auto">ข้อมูลส่วนตัวเกี่ยวกับบริษัท</span>
                        <a @click="isEdit = !isEdit, editData()" class="btn btn-sm rounded-custom col-auto" id="editButton">
                            <svg class="" width="27" height="32" viewBox="0 0 42 42" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8.05878 10.4102H5.70585C4.45778 10.4102 3.26083 10.9059 2.37831 11.7885C1.49579 12.671 1 13.8679 1 15.116V36.2923C1 37.5404 1.49579 38.7374 2.37831 39.6199C3.26083 40.5024 4.45778 40.9982 5.70585 40.9982H26.8822C28.1303 40.9982 29.3272 40.5024 30.2097 39.6199C31.0922 38.7374 31.588 37.5404 31.588 36.2923V33.9394"
                                    stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                <path
                                    d="M29.2361 5.7061L36.2949 12.7649M39.5537 9.43549C40.4804 8.5088 41.001 7.25194 41.001 5.9414C41.001 4.63086 40.4804 3.37399 39.5537 2.4473C38.627 1.52061 37.3701 1 36.0596 1C34.7491 1 33.4922 1.52061 32.5655 2.4473L12.7656 22.1766V29.2354H19.8244L39.5537 9.43549Z"
                                    stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </a>
                    </div>


                    <div class="row mb-2 mt-2">
                        <label for="" class="col-2 col-form-label text-gray">
                            รหัสพนักงาน
                        </label>
                        <div class="col">
                            <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_id"
                                readonly required>
                        </div>

                        <label for="" class="col-2 col-form-label text-gray">
                            สถานะพนักงาน
                        </label>
                        <div class="col">
                            <input placeholder="-" type="text" class="form-control-plaintext" v-model="dummyData.status"
                                readonly required>
                        </div>
                    </div>

                    <div class="row mb-2">
                        <label for="" class="col-2 col-form-label text-gray">
                            อีเมลพนักงาน
                        </label>
                        <div class="col">
                            <input placeholder="-" type="text" class="form-control-plaintext"
                                v-model="intern.intn_intern_email" readonly required>
                        </div>

                        <label for="" class="col-2 col-form-label text-gray">
                            ตำแหน่งงาน
                        </label>
                        <div class="col">
                            <input placeholder="-" type="text" class="form-control-plaintext" :value="getWorkRole" readonly
                                required>
                        </div>

                    </div>
                </div>

                <hr>

                <span class="h5">ข้อมูลส่วนตัว</span>

                <div class="row mb-2">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">
                        ชื่อ-นามสกุล (ไทย)
                    </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="dummyData.name_th"
                            readonly required>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">ชื่อเล่น (ไทย)</label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="dummyData.nickname_th"
                            readonly required>
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">
                        ชื่อ-นามสกุล (อังกฤษ)
                    </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="dummyData.name_en"
                            readonly required>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">ชื่อเล่น (อังกฤษ)</label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="dummyData.nickname_en"
                            readonly required>
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">เลขบัตรประชาชน / พาสปอร์ต</label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_citizen_id"
                            readonly required>
                    </div>

                    <div class="col-2">
                        <div class="row">
                            <label for="" class="col-5 col-form-label text-gray">
                                วันเกิด
                            </label>
                            <input placeholder="-" type="text" class="col form-control-plaintext"
                                :value="formatDate(intern.intn_birth_date)" readonly required>
                        </div>
                    </div>


                    <div class="col">
                        <div class="row">
                            <label for="" class="col-2 col-form-label text-gray">อายุ</label>
                            <input placeholder="-" type="text" class="col form-control-plaintext" :value="getAge()"
                                readonly>
                        </div>
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">เพศ </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="dummyData.gender"
                            readonly required>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">หมู่เลือด</label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_blood_type"
                            readonly required>
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">น้ำหนัก (กิโลกรัม)</label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_weight"
                            readonly>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">ส่วนสูง (เซนติเมตร)</label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_height"
                            readonly>
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">สัญชาติ </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_nationality"
                            readonly required>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">เชื้อชาติ</label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_nation"
                            readonly required>
                    </div>
                </div>

                <div class="row mb-4">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">ศาสนา </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_religion"
                            readonly required>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">สถานภาพสมรส </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="dummyData.martial_status"
                            readonly required>
                    </div>
                </div>

                <hr>

                <span class="h5">สถานศึกษา</span>

                <div class="row mb-4">
                    <div class="col ms-5">
                        <label for="" class="form-label text-gray">ชื่อสถานศึกษา</label>
                        <input placeholder="-" type="text" class="form-control-plaintext"
                            :value="intern.college_info?.col_uni.uni_name" required readonly>
                    </div>

                    <div class="col">
                        <label for="" class="form-label text-gray">คณะ </label>
                        <input placeholder="-" type="text" class="form-control-plaintext"
                            :value="intern.college_info?.col_faculty.fac_name" required readonly>
                    </div>

                    <div class="col">
                        <label for="" class="form-label text-gray">สาขาวิชา </label>
                        <input placeholder="-" type="text" class="form-control-plaintext"
                            :value="intern.college_info?.col_major.maj_name" required readonly>
                    </div>
                </div>

                <hr>

                <span class="h5">ข้อมูลที่อยู่ / ติดต่อ</span>

                <div class="row mb-2">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">บ้านเลขที่ </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_house_number"
                            readonly>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">ซอย</label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_alley"
                            readonly>
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">หมู่ </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext"
                            v-model="intern.intn_village_number" readonly>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">ถนน </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_street"
                            readonly>
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">จังหวัด </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_province"
                            readonly>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">อำเภอ / เขต </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_district"
                            readonly>
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">ตำบล / แขวง </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_subdistrict"
                            readonly>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">รหัสไปรษณีย์ </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_post_code"
                            readonly>
                    </div>
                </div>

                <div class="row mb-4">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">
                        เบอร์โทรศัพท์
                    </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_tel" readonly
                            required>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">อีเมลส่วนตัว </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_email"
                            readonly required>
                    </div>
                </div>

                <hr>

                <span class="h5">สัญญาการจ้างงาน</span>

                <div class="row mb-4">
                    <div class="col ms-5">
                        <label for="" class="form-label text-gray">ประเภทพนักงาน </label>
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="dummyData.intern_type"
                            required readonly>
                    </div>

                    <div class="col">
                        <label for="" class="form-label text-gray">เลขที่สัญญาจ้าง</label>
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_contact_num"
                            required readonly>
                    </div>

                    <div class="col">
                        <label for="" class="form-label text-gray">วันที่เริ่มฝึกงาน</label>
                        <input placeholder="-" type="text" class="form-control-plaintext"
                            :value="formatDate(intern.intn_start_date)" required readonly>
                    </div>

                    <div class="col">
                        <label for="" class="form-label text-gray">
                            วันที่ทำงานวันสุดท้าย
                        </label>
                        <input placeholder="-" type="text" class="form-control-plaintext"
                            :value="formatDate(intern.intn_last_work_date)" required readonly>
                    </div>

                    <div class="col">
                        <label for="" class="form-label text-gray">
                            วันที่สิ้นสุดสัญญาการฝึกงาน
                        </label>
                        <input placeholder="-" type="text" class="form-control-plaintext"
                            :value="formatDate(intern.intn_contract_end_date)" required readonly>
                    </div>
                </div>

                <hr>

                <span class="h5">สถานภาพทางทหาร</span>

                <div class="row mb-4">
                    <label for="" class="col-2 col-form-label ms-5 text-gray">
                        สถานภาพทางทหาร
                    </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext"
                            v-model="dummyData.military_status" readonly required>
                    </div>

                    <label for="" class="col-2 col-form-label text-gray">เหตุผล</label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_reason"
                            readonly>
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
import { onMounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import router from '@/router'
import axios from 'axios'
import LayoutMenu from './LayoutMenu.vue'
import { useStatusData } from '../../stores/constData'
import { useMilitaryStatus } from '../../stores/constData'
import { useGenderData } from '../../stores/constData'
import { useMartialStatus } from '../../stores/constData'
import { useInternType } from '../../stores/constData'

const intern = ref({})
const route = useRoute()
const id = route.params.id
const isEdit = ref(false)

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

const status = ref(useStatusData())
const internType = ref(useInternType())
const militaryStatus = ref(useMilitaryStatus())
const genders = ref(useGenderData())
const martialStatus = ref(useMartialStatus())

const getWorkRole = computed(() => {
    if (intern.value.work_infos) {
        return intern.value.work_infos[0]?.work_role.role_name
    }

    return '-'
})

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

    if (dummyData.value.name_en == "NaN undefined") dummyData.value.name_en = undefined
}

function editData() {
    let editButton = document.getElementById("editButton")

    if (isEdit.value) {
        let inputs = document.querySelectorAll(".form-control-plaintext")

        editButton.classList.remove("rounded-custom")
        editButton.classList.add("rounded-active")

        inputs.forEach((element) => {
            element.classList.remove("form-control-plaintext")
            element.classList.add("form-control")
            element.classList.add("d-class")
            element.classList.add("mb-2")
            element.removeAttribute('readonly')

        })

    } else if (!isEdit.value) {
        let inputs = document.querySelectorAll(".d-class")

        editButton.classList.add("rounded-custom")
        editButton.classList.remove("rounded-active")

        inputs.forEach((element) => {
            element.classList.remove("form-control")
            element.classList.remove("d-class")
            element.classList.remove("mb-2")
            element.classList.add("form-control-plaintext")
            element.setAttribute('readonly', true)
        })
    }

}

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

.rounded-custom {
    height: 45px;
    width: 45px;
    border-radius: 50%;
}

.rounded-custom:hover path {
    stroke: var(--main-color) !important;
}

.rounded-active {
    background-color: var(--main-color) !important;
    height: 45px;
    width: 45px;
    border-radius: 50%;
}

.rounded-active path {
    stroke: white !important;
}</style>