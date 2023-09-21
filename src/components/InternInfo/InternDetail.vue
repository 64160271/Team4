<template>
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
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_id" readonly
                            required>
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
                        <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_intern_email"
                            readonly required>
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
                    <input placeholder="-" type="text" class="form-control-plaintext" v-model="dummyData.name_th" readonly
                        required>
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
                    <input placeholder="-" type="text" class="form-control-plaintext" v-model="dummyData.name_en" readonly
                        required>
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
                        <input placeholder="-" type="text" class="col form-control-plaintext" :value="getAge()" readonly>
                    </div>
                </div>
            </div>

            <div class="row mb-2">
                <label for="" class="col-2 col-form-label ms-5 text-gray">เพศ </label>
                <div class="col">
                    <input placeholder="-" type="text" class="form-control-plaintext" v-model="dummyData.gender" readonly
                        required>
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
                    <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_weight" readonly>
                </div>

                <label for="" class="col-2 col-form-label text-gray">ส่วนสูง (เซนติเมตร)</label>
                <div class="col">
                    <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_height" readonly>
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
                    <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_nation" readonly
                        required>
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
                    <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_alley" readonly>
                </div>
            </div>

            <div class="row mb-2">
                <label for="" class="col-2 col-form-label ms-5 text-gray">หมู่ </label>
                <div class="col">
                    <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_village_number"
                        readonly>
                </div>

                <label for="" class="col-2 col-form-label text-gray">ถนน </label>
                <div class="col">
                    <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_street" readonly>
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
                    <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_email" readonly
                        required>
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
                    <input placeholder="-" type="text" class="form-control-plaintext" v-model="dummyData.military_status"
                        readonly required>
                </div>

                <label for="" class="col-2 col-form-label text-gray">เหตุผล</label>
                <div class="col">
                    <input placeholder="-" type="text" class="form-control-plaintext" v-model="intern.intn_reason" readonly>
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
</template>

<script setup>

</script>

<style scoped></style>