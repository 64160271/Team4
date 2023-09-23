<template>
    <div class="col-auto">
        <img :src="getImage(intern.intn_image)" alt="" id="blah" class="img bg-grays-200" />
    </div>

    <div class="col ms-5 align-self-center mb-2">
        <div class="row mb-2">
            <span class="col h5 my-auto">ข้อมูลส่วนตัวเกี่ยวกับบริษัท</span>
        </div>

        <div class="row mb-2 ms-2">
            <label for="" class="col-md-2 col-form-label text-gray"> รหัสพนักงาน </label>
            <div class="col">
                <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_id" readonly
                    required />
            </div>

            <label for="" class="col-md-2 col-form-label text-gray"> สถานะพนักงาน </label>
            <div class="col">
                <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_work_status"
                    readonly required />
            </div>
        </div>

        <div class="row mb-2 ms-2">
            <label for="" class="col-md-2 col-form-label text-gray"> อีเมลพนักงาน </label>
            <div class="col">
                <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_intern_email"
                    readonly required />
            </div>

            <label for="" class="col-md-2 col-form-label text-gray"> ตำแหน่งงาน </label>
            <div class="col">
                <input placeholder="-" type="text" class="form-control-plaintext" :value="getWorkRole" readonly
                    required />
            </div>
        </div>

        <div class="row mb-2 ms-2">
            <label for="" class="col-md-2 col-form-label text-gray"> ฝ่าย </label>
            <div class="col">
                <input placeholder="-" type="text" class="form-control-plaintext" :value="getSection" readonly
                    required />
            </div>

            <label for="" class="col-md-2 col-form-label text-gray"> พี่เลี้ยง </label>
            <div class="col">
                <input placeholder="-" type="text" class="form-control-plaintext" :value="intern.intn_mentor?.ment_name"
                    readonly required />
            </div>
        </div>
    </div>

    <hr />

    <span class="h5">ข้อมูลส่วนตัว</span>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">
            ชื่อ-นามสกุล (ไทย)
        </label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_name_th" readonly
                required />
        </div>

        <label for="" class="col-2 col-form-label text-gray">ชื่อเล่น (ไทย)</label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext" :value="intern.intn_nickname_th" readonly
                required />
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">
            ชื่อ-นามสกุล (อังกฤษ)
        </label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext" :value="intern.intn_name_en" readonly
                required />
        </div>

        <label for="" class="col-2 col-form-label text-gray">ชื่อเล่น (อังกฤษ)</label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext" :value="intern.intn_nickname_en" readonly
                required />
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">เลขบัตรประชาชน/พาสปอร์ต</label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_citizen_id" readonly
                required />
        </div>

        <div class="col-2">
            <div class="row">
                <label for="" class="col-5 col-form-label text-gray"> วันเกิด </label>
                <input placeholder="-" type="text" class="col form-control-plaintext"
                    :value="formatDate(intern.intn_birth_date)" readonly required />
            </div>
        </div>

        <div class="col">
            <div class="row">
                <label for="" class="col-2 col-form-label text-gray">อายุ</label>
                <input placeholder="-" type="text" class="col form-control-plaintext"
                    :value="getAgeBuddisht(intern.intn_birth_date)" readonly />
            </div>
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">เพศ </label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_gender" readonly
                required />
        </div>

        <label for="" class="col-2 col-form-label text-gray">หมู่เลือด</label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_blood_type" readonly
                required />
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">น้ำหนัก (กิโลกรัม)</label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_weight" readonly />
        </div>

        <label for="" class="col-2 col-form-label text-gray">ส่วนสูง (เซนติเมตร)</label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_height" readonly />
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">สัญชาติ </label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_nationality" readonly
                required />
        </div>

        <label for="" class="col-2 col-form-label text-gray">เชื้อชาติ</label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_nation" readonly
                required />
        </div>
    </div>

    <div class="row mb-4">
        <label for="" class="col-2 col-form-label ms-5 text-gray">ศาสนา </label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_religion" readonly
                required />
        </div>

        <label for="" class="col-2 col-form-label text-gray">สถานภาพสมรส </label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_martial_status"
                readonly required />
        </div>
    </div>

    <hr />

    <span class="h5">สถานศึกษา</span>

    <div class="row mb-4">
        <div class="col ms-5">
            <label for="" class="form-label text-gray">ชื่อสถานศึกษา</label>
            <input placeholder="-" type="text" class="form-control-plaintext"
                :value="intern.college_info?.col_uni.uni_name" required readonly />
        </div>

        <div class="col">
            <label for="" class="form-label text-gray">คณะ </label>
            <input placeholder="-" type="text" class="form-control-plaintext"
                :value="intern.college_info?.col_faculty.fac_name" required readonly />
        </div>

        <div class="col">
            <label for="" class="form-label text-gray">สาขาวิชา </label>
            <input placeholder="-" type="text" class="form-control-plaintext"
                :value="intern.college_info?.col_major.maj_name" required readonly />
        </div>
    </div>

    <hr />

    <span class="h5">ข้อมูลที่อยู่ / ติดต่อ</span>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">บ้านเลขที่ </label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext"
                :value="intern.intn_address?.addr_house_number" readonly />
        </div>

        <label for="" class="col-2 col-form-label text-gray">ซอย</label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext" :value="intern.intn_address?.addr_alley"
                readonly />
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">หมู่ </label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext"
                :value="intern.intn_address?.addr_village_number" readonly />
        </div>

        <label for="" class="col-2 col-form-label text-gray">ถนน </label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext" :value="intern.intn_address?.addr_street"
                readonly />
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">จังหวัด </label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext"
                :value="intern.intn_address?.addr_province" readonly />
        </div>

        <label for="" class="col-2 col-form-label text-gray">อำเภอ / เขต </label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext"
                :value="intern.intn_address?.addr_district" readonly />
        </div>
    </div>

    <div class="row mb-2">
        <label for="" class="col-2 col-form-label ms-5 text-gray">ตำบล / แขวง </label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext"
                :value="intern.intn_address?.addr_subdistrict" readonly />
        </div>

        <label for="" class="col-2 col-form-label text-gray">รหัสไปรษณีย์ </label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext"
                :value="intern.intn_address?.addr_post_code" readonly />
        </div>
    </div>

    <div class="row mb-4">
        <label for="" class="col-2 col-form-label ms-5 text-gray">
            เบอร์โทรศัพท์
        </label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_tel" readonly
                required />
        </div>

        <label for="" class="col-2 col-form-label text-gray">อีเมลส่วนตัว </label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_email" readonly
                required />
        </div>
    </div>

    <hr />

    <span class="h5">สัญญาการจ้างงาน</span>

    <div class="row mb-4">
        <div class="col ms-5">
            <label for="" class="form-label text-gray">ประเภทพนักงาน </label>
            <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_intern_type" required
                readonly />
        </div>

        <div class="col">
            <label for="" class="form-label text-gray">เลขที่สัญญาจ้าง</label>
            <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_contract_num"
                required readonly />
        </div>

        <div class="col">
            <label for="" class="form-label text-gray">วันที่เริ่มฝึกงาน</label>
            <input placeholder="-" type="text" class="form-control-plaintext"
                :value="formatDate(intern.intn_start_date)" required readonly />
        </div>

        <div class="col">
            <label for="" class="form-label text-gray">วันที่สำเร็จการฝึกงาน</label>
            <input placeholder="-" type="text" class="form-control-plaintext" :value="formatDate(intern.intn_end_date)"
                required readonly />
        </div>

        <div class="col">
            <label for="" class="form-label text-gray"> วันที่ทำงานวันสุดท้าย </label>
            <input placeholder="-" type="text" class="form-control-plaintext"
                :value="formatDate(intern.intn_last_work_date)" required readonly />
        </div>

        <div class="col">
            <label for="" class="form-label text-gray">
                วันที่สิ้นสุดสัญญาการฝึกงาน
            </label>
            <input placeholder="-" type="text" class="form-control-plaintext"
                :value="formatDate(intern.intn_contract_end_date)" required readonly />
        </div>
    </div>

    <hr />

    <span class="h5">สถานภาพทางทหาร</span>

    <div class="row mb-4">
        <label for="" class="col-2 col-form-label ms-5 text-gray">
            สถานภาพทางทหาร
        </label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_military_status"
                readonly required />
        </div>

        <label for="" class="col-2 col-form-label text-gray">เหตุผล</label>
        <div class="col">
            <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_reason" readonly />
        </div>
    </div>

    <hr />

    <span class="h5">หมายเหตุอื่น ๆ เกี่ยวกับนักศึกษา</span>

    <div class="row">
        <label for="" class="col form-label ms-5 text-gray">หมายเหตุ</label>
    </div>

    <div class="row mb-4">
        <textarea name="" class="form-control col ms-5" id="" rows="2"></textarea>
    </div>
</template>

<script setup>
    import { onMounted, ref, computed } from "vue";
    import { useRoute } from "vue-router";
    import router from "@/router";
    import LayoutMenu from "./LayoutMenu.vue";
    import apiService from "../../services/api";
    import { formatDate, getAgeBuddisht } from "../../assets/js/func";

    const internProp = defineProps({
        intern: Object
    })

    const getWorkRole = computed(() => {
        if (internProp.intern.work_infos) {
            return internProp.intern.work_infos[0]?.work_role.role_name
        }

        return '-'
    })

    const getSection = computed(() => {
        if (internProp.intern.work_infos) {
            return internProp.intern.work_infos[0]?.work_sec.sec_name
        }

        return '-'
    })

    function getImage(img) {
        if (img != null || img != '') {
            return `../src/assets/images/interns/${img}`
        }
    }
</script>

<style scoped>
    hr {
        border: none;
        height: 1px;
        background-color: var(--main-color);
    }
</style>