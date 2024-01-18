<template>
    <div class="mx-auto" style="width: 85%">
        <div class="row border-bottom">
            <div class="col-auto">
                <img id="blah" :src="intern?.intn_image_path" alt="" class="img bg-grays-200" />
            </div>

            <div class="col align-self-center ms-5 mb-2">
                <div class="row mb-2">
                    <span class="h5 text-decoration-underline">ข้อมูลพนักงาน</span>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-md-2 col-form-label text-gray"> รหัสพนักงาน </label>
                    <div class="col">
                        <input v-model="intern.intn_code" placeholder="-" type="text" class="form-control-plaintext"
                            readonly required />
                    </div>

                    <label for="" class="col-md-2 col-form-label text-gray"> สถานะพนักงาน </label>
                    <div class="col">
                        <input v-model="intern.intn_work_status" placeholder="-" type="text"
                            class="form-control-plaintext" readonly required />
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-md-2 col-form-label text-gray"> อีเมลพนักงาน </label>
                    <div class="col">
                        <input v-model="intern.intn_intern_email" placeholder="-" type="text"
                            class="form-control-plaintext" readonly required />
                    </div>

                    <label for="" class="col-md-2 col-form-label text-gray"> ตำแหน่งงาน </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" :value="getWorkRole" readonly
                            required />
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-md-2 col-form-label text-gray"> ฝ่าย </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" :value="getSection" readonly
                            required />
                    </div>

                    <label for="" class="col-md-2 col-form-label text-gray"> พี่เลี้ยง </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext"
                            :value="intern.intn_mentor?.ment_name" readonly required />
                    </div>
                </div>

                <div class="row mb-2">
                    <label for="" class="col-md-2 col-form-label text-gray"> แผนก </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext" :value="getDepartment" readonly
                            required />
                    </div>

                    <label for="" class="col-md-2 col-form-label text-gray"> ทีม </label>
                    <div class="col">
                        <input placeholder="-" type="text" class="form-control-plaintext"
                            :value="getTeam" readonly required />
                    </div>
                </div>
            </div>
        </div>

        <div class="row border-bottom">
            <div class="row my-2">
                <span class="h5 text-decoration-underline">ข้อมูลส่วนตัว</span>
            </div>

            <div class="row mb-2">
                <label for="" class="col-2 col-form-label text-gray">
                    ชื่อ-นามสกุล (ไทย)
                </label>
                <div class="col">
                    <input v-model="intern.intn_name_th" placeholder="-" type="text" class="form-control-plaintext"
                        readonly required />
                </div>

                <label for="" class="col-2 col-form-label text-gray">ชื่อเล่น (ไทย)</label>
                <div class="col">
                    <input placeholder="-" type="text" class="form-control-plaintext" :value="intern.intn_nickname_th"
                        readonly required />
                </div>
            </div>

            <div class="row mb-2">
                <label for="" class="col-2 col-form-label text-gray">
                    ชื่อ-นามสกุล (อังกฤษ)
                </label>
                <div class="col">
                    <input placeholder="-" type="text" class="form-control-plaintext" :value="intern.intn_name_en"
                        readonly required />
                </div>

                <label for="" class="col-2 col-form-label text-gray">ชื่อเล่น (อังกฤษ)</label>
                <div class="col">
                    <input placeholder="-" type="text" class="form-control-plaintext" :value="intern.intn_nickname_en"
                        readonly required />
                </div>
            </div>

            <div class="row mb-2">
                <label for="" class="col-2 col-form-label text-gray">เลขบัตรประชาชน/พาสปอร์ต</label>
                <div class="col">
                    <input v-model="intern.intn_citizen_id" placeholder="-" type="text" class="form-control-plaintext"
                        readonly required />
                </div>

                <div class="col-2">
                    <div class="row">
                        <label for="" class="col-5 col-form-label text-gray"> วันเกิด </label>
                        <input placeholder="-" type="text" class="col form-control-plaintext"
                            :value="intern.intn_birth_date" readonly required />
                    </div>
                </div>

                <div class="col">
                    <div class="row">
                        <label for="" class="col-auto col-form-label text-gray">อายุ (ปี)</label>
                        <input placeholder="-" type="text" class="col form-control-plaintext"
                            :value="intern.intn_age" readonly />
                    </div>
                </div>
            </div>

            <div class="row mb-2">
                <label for="" class="col-2 col-form-label text-gray">เพศ </label>
                <div class="col">
                    <input v-model="intern.intn_gender" placeholder="-" type="text" class="form-control-plaintext"
                        readonly required />
                </div>

                <label for="" class="col-2 col-form-label text-gray">หมู่เลือด</label>
                <div class="col">
                    <input v-model="intern.intn_blood_type" placeholder="-" type="text" class="form-control-plaintext"
                        readonly required />
                </div>
            </div>

            <div class="row mb-2">
                <label for="" class="col-2 col-form-label text-gray">น้ำหนัก (กิโลกรัม)</label>
                <div class="col">
                    <input v-model="intern.intn_weight" placeholder="-" type="text" class="form-control-plaintext"
                        readonly />
                </div>

                <label for="" class="col-2 col-form-label text-gray">ส่วนสูง (เซนติเมตร)</label>
                <div class="col">
                    <input v-model="intern.intn_height" placeholder="-" type="text" class="form-control-plaintext"
                        readonly />
                </div>
            </div>

            <div class="row mb-2">
                <label for="" class="col-2 col-form-label text-gray">สัญชาติ </label>
                <div class="col">
                    <input v-model="intern.intn_nationality" placeholder="-" type="text" class="form-control-plaintext"
                        readonly required />
                </div>

                <label for="" class="col-2 col-form-label text-gray">เชื้อชาติ</label>
                <div class="col">
                    <input v-model="intern.intn_nation" placeholder="-" type="text" class="form-control-plaintext"
                        readonly required />
                </div>
            </div>

            <div class="row mb-4">
                <label for="" class="col-2 col-form-label text-gray">ศาสนา </label>
                <div class="col">
                    <input v-model="intern.intn_religion" placeholder="-" type="text" class="form-control-plaintext"
                        readonly required />
                </div>

                <label for="" class="col-2 col-form-label text-gray">สถานภาพสมรส </label>
                <div class="col">
                    <input v-model="intern.intn_martial_status" placeholder="-" type="text"
                        class="form-control-plaintext" readonly required />
                </div>
            </div>
        </div>

        <div class="row border-bottom">
            <div class="row my-2">
                <span class="h5 text-decoration-underline">สถานศึกษา</span>
            </div>

            <div class="row mb-4">
                <div class="col">
                    <label for="" class="form-label text-gray">ชื่อสถานศึกษา</label>
                    <input placeholder="-" type="text" class="form-control-plaintext"
                        :value="getCollegeInfo.maj_faculty?.fac_university?.uni_name" required readonly />
                </div>

                <div class="col">
                    <label for="" class="form-label text-gray">คณะ </label>
                    <input placeholder="-" type="text" class="form-control-plaintext"
                        :value="getCollegeInfo.maj_faculty?.fac_name" required readonly />
                </div>

                <div class="col">
                    <label for="" class="form-label text-gray">สาขาวิชา </label>
                    <input placeholder="-" type="text" class="form-control-plaintext"
                        :value="intern.intn_major?.maj_name" required readonly />
                </div>
            </div>
        </div>

        <div class="row border-bottom">
            <div class="row my-2">
                <span class="h5 text-decoration-underline">ข้อมูลที่อยู่ / ติดต่อ</span>
            </div>

            <div class="row mb-2">
                <label for="" class="col-2 col-form-label text-gray">บ้านเลขที่ </label>
                <div class="col">
                    <input placeholder="-" type="text" class="form-control-plaintext"
                        :value="intern.intn_address?.addr_house_number" readonly />
                </div>

                <label for="" class="col-2 col-form-label text-gray">ซอย</label>
                <div class="col">
                    <input placeholder="-" type="text" class="form-control-plaintext"
                        :value="intern.intn_address?.addr_alley" readonly />
                </div>
            </div>

            <div class="row mb-2">
                <label for="" class="col-2 col-form-label text-gray">หมู่ </label>
                <div class="col">
                    <input placeholder="-" type="text" class="form-control-plaintext"
                        :value="intern.intn_address?.addr_village_number" readonly />
                </div>

                <label for="" class="col-2 col-form-label text-gray">ถนน </label>
                <div class="col">
                    <input placeholder="-" type="text" class="form-control-plaintext"
                        :value="intern.intn_address?.addr_street" readonly />
                </div>
            </div>

            <div class="row mb-2">
                <label for="" class="col-2 col-form-label text-gray">จังหวัด </label>
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
                <label for="" class="col-2 col-form-label text-gray">ตำบล / แขวง </label>
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
                <label for="" class="col-2 col-form-label text-gray">
                    เบอร์โทรศัพท์
                </label>
                <div class="col">
                    <input v-model="intern.intn_tel" placeholder="-" type="text" class="form-control-plaintext" readonly
                        required />
                </div>

                <label for="" class="col-2 col-form-label text-gray">อีเมลส่วนตัว </label>
                <div class="col">
                    <input v-model="intern.intn_email" placeholder="-" type="text" class="form-control-plaintext"
                        readonly required />
                </div>
            </div>
        </div>

        <div class="row border-bottom">
            <div class="row my-2">
                <span class="h5 text-decoration-underline">สัญญาการจ้างงาน</span>
            </div>

            <div class="row mb-4">
                <div class="col">
                    <label for="" class="form-label text-gray">ประเภทพนักงาน </label>
                    <input v-model="intern.intn_intern_type" placeholder="-" type="text" class="form-control-plaintext"
                        required readonly />
                </div>

                <div class="col">
                    <label for="" class="form-label text-gray">เลขที่สัญญาจ้าง</label>
                    <input v-model="intern.intn_contract_num" placeholder="-" type="text" class="form-control-plaintext"
                        required readonly />
                </div>

                <div class="col">
                    <label for="" class="form-label text-gray">วันที่เริ่มฝึกงาน</label>
                    <input placeholder="-" type="text" class="form-control-plaintext"
                        :value="(intern.intn_start_date)" required readonly />
                </div>

                <div class="col">
                    <label for="" class="form-label text-gray">วันที่สำเร็จการฝึกงาน</label>
                    <input placeholder="-" type="text" class="form-control-plaintext"
                        :value="(intern.intn_end_date)" required readonly />
                </div>

                <div class="col">
                    <label for="" class="form-label text-gray"> วันที่ทำงานวันสุดท้าย </label>
                    <input placeholder="-" type="text" class="form-control-plaintext"
                        :value="(intern.intn_last_work_date)" required readonly />
                </div>

                <div class="col">
                    <label for="" class="form-label text-gray">
                        วันที่สิ้นสุดสัญญาการฝึกงาน
                    </label>
                    <input placeholder="-" type="text" class="form-control-plaintext"
                        :value="(intern.intn_contract_end_date)" required readonly />
                </div>
            </div>

        </div>

        <div class="row border-bottom">
            <div class="row my-2">
                <span class="h5 text-decoration-underline">สถานภาพทางทหาร</span>
            </div>

            <div class="row mb-4">
                <label for="" class="col-2 col-form-label text-gray">
                    สถานภาพทางทหาร
                </label>
                <div class="col">
                    <input v-model="intern.intn_military_status" placeholder="-" type="text"
                        class="form-control-plaintext" readonly required />
                </div>

                <label for="" class="col-2 col-form-label text-gray">เหตุผล</label>
                <div class="col">
                    <input v-model="intern.intn_reason" placeholder="-" type="text" class="form-control-plaintext"
                        readonly />
                </div>
            </div>
        </div>

        <div class="row my-2">
            <span class="h5 text-decoration-underline">หมายเหตุอื่น ๆ</span>
        </div>

        <div class="row">
            <label for="" class="col form-label text-gray">หมายเหตุ</label>
        </div>

        <div class="row mb-4">
            <textarea id="" name="" class="form-control col" rows="2"></textarea>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, computed } from "vue";
    import { formatDate, getAgeBuddisht, getImageFromBuffer } from "../../assets/js/func";

    const internProp = defineProps({
        intern: Object
    })

    const getCollegeInfo = computed(() => {
        if (internProp.intern.intn_major) {
            return internProp.intern.intn_major
        }

        return '-'
    })

    const getWorkRole = computed(() => {
        if (internProp.intern.work_infos) {
            return internProp.intern.work_infos[0]?.work_role.role_name
        }

        return '-'
    })

    const getSection = computed(() => {
        if (internProp.intern.work_infos) {
            return internProp.intern.work_infos[0]?.work_section.sec_name
        }

        return '-'
    })

    const getDepartment = computed(() => {
        if (internProp.intern.work_infos) {
            return internProp.intern.work_infos[0]?.work_department?.dept_name
        }

        return '-'
    })

    const getTeam = computed(() => {
        if (internProp.intern.work_infos) {
            return internProp.intern.work_infos[0]?.work_team.team_name
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

    .border-bottom {
        border-color: var(--main-color) !important;
        margin-bottom: 12px;
    }

    label {
        font-weight: bold !important;
    }
</style>