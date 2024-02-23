<!--
 AddInternForm
 Parent of module add intern by form
 Author : Rawich Piboonsin
 Created date : 04-09-2566
-->

<template>
  <form id="form" class="needs-validation" enctype="multipart/form-data" novalidate>
    <LayoutMenuName backButton page-name="เพิ่มนักศึกษาฝึกงาน > กรอกแบบฟอร์ม" />

    <SectionSpace>
      <div class="row mx-auto" style="width: 90%">
        <div class="row nopadding border-bottom">
          <div class="col-auto my-auto">
            <div class="mb-4 text-center">
              <img
                id="blah"
                src="@/assets/images/person-nm.png"
                alt=""
                class="img bg-grays-200"
              />
            </div>

            <button
              id="picture"
              type="button"
              class="btn btn-sm outline-red position-relative px-4"
            >
              <input id="img-upload" type="file" accept="image/*" @change="showImg" />
              <CameraLogo />
              อัปโหลดรูปภาพ
            </button>
          </div>

          <!-- เริ่มต้นส่วนข้อมูลพนักงาน -->
          <div class="col-md-9 ms-auto">
            <div class="row my-2">
              <span class="h5 text-decoration-underline">ข้อมูลพนักงาน</span>
            </div>

            <div class="row gx-5 mb-3">
              <div class="col-md-6">
                <label for="" class="form-label text-gray"
                  >รหัสพนักงาน <span class="text-danger">*</span></label
                >
                <div class="input-group">
                  <span class="input-group-text">INT-</span>
                  <input
                    maxlength="4"
                    id="id"
                    v-model="personalInfo.intn_code"
                    placeholder="xxxx"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': v$.personal_info.intn_code.$error }"
                  />
                  <InvalidFeedback :errors="v$.personal_info.intn_code.$errors" />
                </div>
              </div>

              <div class="col-md-6">
                <BaseSelect
                  label="สถานะการฝึกงาน"
                  :options="statusList.list"
                  v-model="personalInfo.intn_work_status"
                  :class="{ 'is-invalid': v$.personal_info.intn_work_status.$error }"
                  required
                />
                <InvalidFeedback :errors="v$.personal_info.intn_work_status.$errors" />
              </div>
            </div>

            <div class="row mb-3 gx-5">
              <div class="col-md-6">
                <label for="" class="form-label text-gray">อีเมลพนักงาน</label>
                <div class="input-group">
                  <input
                    id="internemail"
                    v-model="personalInfo.intn_intern_email"
                    type="text"
                    class="form-control"
                    placeholder="660000"
                  />
                  <span class="input-group-text">@clicknext.com</span>
                </div>
              </div>

              <div class="col-md-6">
                <BaseSelect
                  label="ตำแหน่งงาน"
                  :options="roles"
                  v-model="workInfo.work_role_id"
                  value="role_id"
                  text="role_name"
                  :class="{ 'is-invalid': v$.work_info.work_role_id.$error }"
                  required
                />
                <InvalidFeedback :errors="v$.work_info.work_role_id.$errors" />
              </div>
            </div>

            <div class="row mb-3 gx-5">
              <div class="col-md-6">
                <label for="" class="form-label text-gray"
                  >ฝ่าย <span class="text-danger">*</span></label
                >
                <select
                  v-model="sectionsForm.section"
                  class="form-select"
                  :class="{ 'is-invalid': v$.work_info.work_section_id.$error }"
                  @change="setRelatedData"
                  required
                >
                  <option disabled selected value="">เลือก</option>
                  <option v-for="section in sections" :value="section">
                    {{ section.sec_name }}
                  </option>
                </select>
                <InvalidFeedback :errors="v$.work_info.work_section_id.$errors" />
              </div>

              <div class="col-md-6">
                <BaseSelect
                  label="พี่เลี้ยง"
                  :options="mentors"
                  v-model="personalInfo.intn_mentor_id"
                  value="ment_id"
                  text="ment_name"
                  placeholder="เลือก (ต้องเลือกฝ่ายก่อน)"
                  :class="{ 'is-invalid': v$.personal_info.intn_mentor_id.$error }"
                  required
                />
                <InvalidFeedback :errors="v$.personal_info.intn_mentor_id.$errors" />
              </div>
            </div>

            <div class="row mb-4 gx-5">
              <div class="col-md-6">
                <BaseSelect
                  label="แผนก"
                  :options="departments"
                  v-model="workInfo.work_department_id"
                  placeholder="เลือก (ต้องเลือกฝ่ายก่อน)"
                  value="dept_id"
                  text="dept_name"
                />
              </div>

              <div class="col-md-6">
                <BaseSelect
                  label="ทีม"
                  :options="teams"
                  v-model="workInfo.work_team_id"
                  value="team_id"
                  text="team_name"
                  placeholder="เลือก (ต้องเลือกฝ่ายก่อน)"
                  :class="{ 'is-invalid': v$.work_info.work_team_id.$error }"
                  required
                />
                <InvalidFeedback :errors="v$.work_info.work_team_id.$errors" />
              </div>
            </div>
          </div>
        </div>

        <!-- สิ้นสุดส่วนส่วนข้อมูลพนักงาน -->

        <!-- เริ่มต้นส่วนข้อมูลส่วนตัว -->

        <div class="mt-3 container border-bottom">
          <div class="row my-2">
            <span class="h5 text-decoration-underline">ข้อมูลส่วนตัว</span>
          </div>

          <div class="row mb-3">
            <div class="col-md-2">
              <label for="" class="form-label text-gray"
                >คำนำหน้า (ไทย) <span class="text-danger">*</span></label
              >
              <select
                id="thprefix"
                class="form-select"
                :class="{ 'is-invalid': v$.personal_info.intn_prefix_th.$error }"
                @change="changePrefix($event.target.value)"
                required
              >
                <option disabled selected value="">เลือก</option>
                <option v-for="(prefix, index) in prefixList.list" :value="prefix">
                  {{ prefix[0] }}
                </option>
              </select>
              <InvalidFeedback :errors="v$.personal_info.intn_prefix_th.$errors" />
            </div>

            <div class="col gx-5">
              <label for="" class="form-label text-gray"
                >ชื่อจริง (ไทย) <span class="text-danger">*</span></label
              >
              <input
                id="fname_th"
                v-model="personalInfo.intn_fname_th"
                type="text"
                placeholder="สมศรี"
                name="fname"
                class="form-control"
                :class="{ 'is-invalid': v$.personal_info.intn_fname_th.$error }"
                required
              />
              <InvalidFeedback :errors="v$.personal_info.intn_fname_th.$errors" />
            </div>

            <div class="col gx-5">
              <label for="" class="form-label text-gray"
                >นามสกุล (ไทย) <span class="text-danger">*</span></label
              >
              <input
                id="lname_th"
                v-model="personalInfo.intn_lname_th"
                placeholder="ลามากุล"
                type="text"
                name="lname"
                class="form-control"
                :class="{ 'is-invalid': v$.personal_info.intn_lname_th.$error }"
                required
              />
              <InvalidFeedback :errors="v$.personal_info.intn_lname_th.$errors" />
            </div>

            <div class="col-md-2">
              <label for="" class="form-label text-gray"
                >ชื่อเล่น (ไทย) <span class="text-danger">*</span></label
              >
              <input
                id="nickname_th"
                v-model="personalInfo.intn_nickname_th"
                placeholder="นวล"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.personal_info.intn_nickname_th.$error }"
                required
              />
              <InvalidFeedback :errors="v$.personal_info.intn_nickname_th.$errors" />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-2">
              <label for="" class="form-label text-gray">คำนำหน้า (อังกฤษ) </label>
              <input
                id="enprefix"
                :value="personalInfo.intn_prefix_en"
                type="text"
                class="form-control"
                readonly
              />
            </div>

            <div class="col gx-5">
              <label for="" class="form-label text-gray">ชื่อจริง (อังกฤษ)</label>
              <input
                id="fname_en"
                v-model="personalInfo.intn_fname_en"
                placeholder="Somsri"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.personal_info.intn_fname_en.$error }"
              />
              <InvalidFeedback :errors="v$.personal_info.intn_fname_en.$errors" />
            </div>

            <div class="col gx-5">
              <label for="" class="form-label text-gray">นามสกุล (อังกฤษ)</label>
              <input
                id="lname_en"
                v-model="personalInfo.intn_lname_en"
                placeholder="Lamakul"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.personal_info.intn_lname_en.$error }"
              />
              <InvalidFeedback :errors="v$.personal_info.intn_lname_en.$errors" />
            </div>

            <div class="col-2">
              <label for="" class="form-label text-gray">ชื่อเล่น (อังกฤษ)</label>
              <input
                id="nickname_en"
                v-model="personalInfo.intn_nickname_en"
                placeholder="Nual"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.personal_info.intn_nickname_en.$error }"
              />
              <InvalidFeedback :errors="v$.personal_info.intn_nickname_en.$errors" />
            </div>
          </div>

          <div class="row mb-3 gx-5">
            <div class="col-md-6">
              <label for="" class="form-label text-gray">เลขบัตรประชาชน/พาสปอร์ต</label>
              <input
                id="citizenid"
                v-model="personalInfo.intn_citizen_id"
                maxlength="13"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.personal_info.intn_citizen_id.$error }"
              />
              <InvalidFeedback :errors="v$.personal_info.intn_citizen_id.$errors" />
            </div>

            <div class="col-md-4">
              <label for="" class="form-label text-gray">วันเกิด </label>
              <input
                id="birthdate"
                v-model="personalInfo.intn_birth_date"
                type="date"
                class="form-control"
              />
            </div>

            <div class="col">
              <label for="" class="form-label text-gray">อายุ (ปี)</label>
              <input
                type="text"
                class="form-control"
                :value="getAge(personalInfo.intn_birth_date) || 0"
                readonly
                disabled
                :class="{ 'is-invalid': v$.personal_info.intn_birth_date.$error }"
              />
              <InvalidFeedback :errors="v$.personal_info.intn_birth_date.$errors" />
            </div>
          </div>

          <div class="row mb-3 gx-5">
            <div class="col">
              <BaseSelect
                label="เพศ"
                :options="genderList.list"
                v-model="personalInfo.intn_gender"
                :class="{ 'is-invalid': v$.personal_info.intn_gender.$error }"
                required
              />
              <InvalidFeedback :errors="v$.personal_info.intn_gender.$errors" />
            </div>

            <div class="col">
              <BaseSelect
                label="หมู่เลือด"
                :options="bloodTypeList.list"
                v-model="personalInfo.intn_blood_type"
              />
            </div>
          </div>

          <div class="row mb-3 gx-5">
            <div class="col-md-6">
              <label for="" class="form-label text-gray">น้ำหนัก (กิโลกรัม)</label>
              <input
                id="weight"
                v-model="personalInfo.intn_weight"
                type="number"
                class="form-control"
              />
            </div>

            <div class="col-md-6">
              <label for="" class="form-label text-gray">ส่วนสูง (เซนติเมตร)</label>
              <input
                id="height"
                v-model="personalInfo.intn_height"
                type="number"
                class="form-control"
              />
            </div>
          </div>

          <div class="row mb-3 gx-5">
            <div class="col">
              <label for="" class="form-label text-gray">สัญชาติ</label>
              <input
                id="nationality"
                v-model="personalInfo.intn_nationality"
                placeholder="ไทย"
                type="text"
                class="form-control"
              />
            </div>

            <div class="col">
              <label for="" class="form-label text-gray">เชื้อชาติ</label>
              <input
                id="nation"
                v-model="personalInfo.intn_nation"
                placeholder="ไทย"
                type="text"
                class="form-control"
              />
            </div>
          </div>

          <div class="row mb-4 gx-5">
            <div class="col">
              <label for="" class="form-label text-gray">ศาสนา</label>
              <input
                id="religion"
                v-model="personalInfo.intn_religion"
                placeholder="พุทธ"
                type="text"
                class="form-control mb-2"
              />
            </div>

            <div class="col">
              <BaseSelect
                label="สถานภาพสมรส"
                :options="martialStatusList.list"
                v-model="personalInfo.intn_martial_status"
              />
            </div>
          </div>
        </div>

        <div class="container border-bottom">
          <div class="row my-2">
            <span class="h5 text-decoration-underline">สถานศึกษา</span>
          </div>

          <div class="row mb-4">
            <div class="col">
              <label for="" class="form-label text-gray"
                >ชื่อสถานศึกษา <span class="text-danger">*</span></label
              >
              <select
                v-model="universitiesForm.university"
                class="form-select"
                :class="{ 'is-invalid': v$.college_info.col_university_id.$error }"
                @change="setFaculty"
                required
              >
                <option disabled selected value="">เลือก</option>
                <option v-for="university in universities" :value="university">
                  {{ university.uni_name }}
                </option>
              </select>
              <InvalidFeedback :errors="v$.college_info.col_university_id.$errors" />
            </div>

            <div class="col">
              <label for="" class="form-label text-gray"
                >คณะ <span class="text-danger">*</span></label
              >
              <select
                v-model="universitiesForm.faculty"
                class="form-select"
                :class="{ 'is-invalid': v$.college_info.col_faculty_id.$error }"
                @change="setMajor"
                required
              >
                <option disabled selected value="">เลือก (ต้องเลือกสถานศึกษาก่อน)</option>
                <option v-for="faculty in faculties" :value="faculty">
                  {{ faculty.fac_name }}
                </option>
              </select>
              <InvalidFeedback :errors="v$.college_info.col_faculty_id.$errors" />
            </div>

            <div class="col">
              <BaseSelect
                label="สาขาวิชา"
                :options="majors"
                v-model="personalInfo.intn_major_id"
                value="maj_id"
                text="maj_name"
                placeholder="เลือก (ต้องเลือกคณะก่อน)"
                :class="{ 'is-invalid': v$.personal_info.intn_major_id.$error }"
                required
              />
              <InvalidFeedback :errors="v$.personal_info.intn_major_id.$errors" />
            </div>
          </div>
        </div>

        <!-- สิ้นสุดส่วนข้อมูลส่วนตัว -->

        <!-- เริ่มต้นส่วนสัญญาการจ้างงาน -->

        <div class="container border-bottom">
          <div class="row my-2">
            <span class="h5 text-decoration-underline">สัญญาการจ้างงาน</span>
          </div>

          <div class="row mb-3">
            <div class="col-md-6">
              <BaseSelect
                label="ประเภทพนักงาน"
                :options="internTypeList.list"
                v-model="personalInfo.intn_intern_type"
                :class="{ 'is-invalid': v$.personal_info.intn_intern_type.$error }"
                required
                disabled
              />
              <InvalidFeedback :errors="v$.personal_info.intn_intern_type.$errors" />
            </div>

            <div class="col">
              <label for="" class="form-label text-gray">เลขที่สัญญาจ้าง</label>
              <input
                id="contractnum"
                v-model="personalInfo.intn_contract_number"
                type="text"
                class="form-control"
              />
            </div>
          </div>

          <div class="row mb-4">
            <div class="col">
              <label for="" class="form-label text-gray"
                >วันที่เริ่มฝึกงาน <span class="text-danger">*</span></label
              >
              <input
                id="startdate"
                v-model="personalInfo.intn_start_date"
                type="date"
                class="form-control"
                :class="{ 'is-invalid': v$.personal_info.intn_start_date.$error }"
                required
              />
              <InvalidFeedback :errors="v$.personal_info.intn_start_date.$errors" />
            </div>

            <div class="col">
              <label for="" class="form-label text-gray">วันที่ผ่านทดลองงาน</label>
              <input
                id="enddate"
                v-model="personalInfo.intn_end_date"
                type="date"
                class="form-control"
                :class="{ 'is-invalid': v$.personal_info.intn_end_date.$error }"
              />
              <InvalidFeedback :errors="v$.personal_info.intn_end_date.$errors" />
            </div>

            <div class="col">
              <label for="" class="form-label text-gray">วันสุดท้ายที่มาทำงาน</label>
              <input
                id="lastwork"
                v-model="personalInfo.intn_last_work_date"
                type="date"
                class="form-control"
                :class="{ 'is-invalid': v$.personal_info.intn_last_work_date.$error }"
              />
              <InvalidFeedback :errors="v$.personal_info.intn_last_work_date.$errors" />
            </div>

            <div class="col">
              <BaseInput
                label="วันที่สิ้นสุดสัญญา"
                id="contractend"
                v-model="personalInfo.intn_contract_end_date"
                type="date"
                :class="{ 'is-invalid': v$.personal_info.intn_contract_end_date.$error }"
                required
              />
              <InvalidFeedback
                :errors="v$.personal_info.intn_contract_end_date.$errors"
              />
            </div>
          </div>
        </div>

        <!-- สิ้นสุดส่วนสัญญาการจ้างงาน -->

        <!-- เริ่มต้นส่วนข้อมูลที่อยู่ / ติดต่อ -->

        <div class="container border-bottom">
          <div class="row my-2">
            <span class="h5 text-decoration-underline">ข้อมูลที่อยู่ / ติดต่อ</span>
          </div>

          <div class="row mb-3 gx-5">
            <div class="col">
              <label for="" class="form-label text-gray">บ้านเลขที่</label>
              <input
                v-model="address.addr_house_number"
                type="text"
                class="form-control"
              />
            </div>

            <div class="col">
              <label for="" class="form-label text-gray">ซอย</label>
              <input v-model="address.addr_alley" type="text" class="form-control" />
            </div>
          </div>

          <div class="row mb-3 gx-5">
            <div class="col">
              <label for="" class="form-label text-gray">หมู่</label>
              <input
                v-model="address.addr_village_number"
                type="number"
                class="form-control"
              />
            </div>

            <div class="col">
              <label for="" class="form-label text-gray">ถนน</label>
              <input v-model="address.addr_street" type="text" class="form-control" />
            </div>
          </div>

          <div class="row mb-3 gx-5">
            <div class="col">
              <label for="" class="form-label text-gray">ตำบล / แขวง</label>
              <input
                id="district"
                v-model="address.addr_subdistrict"
                type="text"
                class="form-control"
              />
            </div>

            <div class="col">
              <label for="" class="form-label text-gray">อำเภอ / เขต</label>
              <input
                id="amphoe"
                v-model="address.addr_district"
                type="text"
                class="form-control"
              />
            </div>
          </div>

          <div class="row mb-3 gx-5">
            <div class="col">
              <label for="" class="form-label text-gray">จังหวัด</label>
              <input
                id="province"
                v-model="address.addr_province"
                type="text"
                class="form-control"
              />
            </div>

            <div class="col">
              <label for="" class="form-label text-gray">รหัสไปรษณีย์</label>
              <input
                id="zipcode"
                v-model="address.addr_post_code"
                type="number"
                class="form-control"
              />
            </div>
          </div>

          <div class="row mb-4 gx-5">
            <div class="col">
              <label for="" class="form-label text-gray"
                >เบอร์โทรศัพท์ <span class="text-danger">*</span></label
              >
              <input
                id="tel"
                v-model="personalInfo.intn_tel"
                placeholder="xxx-xxx-xxxx"
                maxlength="12"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.personal_info.intn_tel.$error }"
                required
              />
              <InvalidFeedback :errors="v$.personal_info.intn_tel.$errors" />
            </div>

            <div class="col">
              <label for="" class="form-label text-gray"
                >อีเมลส่วนตัว <span class="text-danger">*</span></label
              >
              <input
                id="email"
                v-model="personalInfo.intn_email"
                placeholder="example@gmail.com"
                name="email"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': v$.personal_info.intn_email.$error }"
                required
              />
              <InvalidFeedback :errors="v$.personal_info.intn_email.$errors" />
            </div>
          </div>
        </div>

        <!-- สิ้นสุดส่วนข้อมูลที่อยู่ / ติดต่อ -->

        <div class="container border-bottom">
          <div class="row my-2">
            <span class="h5 text-decoration-underline">สถานภาพทางทหาร</span>
          </div>

          <div class="row mb-4 gx-5">
            <div class="col">
              <BaseSelect
                label="สถานภาพทางทหาร"
                :options="militaryStatusList.list"
                v-model="personalInfo.intn_military_status"
              />
            </div>

            <div class="col">
              <label for="" class="form-label text-gray">เหตุผล</label>
              <div class="col">
                <input
                  id="reason"
                  v-model="personalInfo.intn_reason"
                  type="text"
                  class="form-control"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="container border-bottom">
          <div class="row my-2">
            <span class="h5 text-decoration-underline">หมายเหตุอื่น ๆ</span>
          </div>

          <div class="row">
            <label for="" class="col form-label text-gray">หมายเหตุ</label>
          </div>

          <div class="row mb-4">
            <textarea id="" name="" class="form-control mb-2 col" rows="2"></textarea>
          </div>
        </div>
      </div>
    </SectionSpace>

    <footer class="footer shadow">
      <div class="row">
        <button
          type="button"
          class="col-md-2 btn outline-gray"
          @click="$router.push({ name: 'index' })"
        >
          ย้อนกลับ
        </button>
        <button type="" class="col-md-2 ms-auto btn outline-red me-4" @click="reset">
          รีเซ็ต
        </button>
        <button
          type="button"
          class="col-md-2 align-self-end btn outline-red"
          @click="submitForm"
        >
          บันทึก
        </button>
      </div>
    </footer>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { onMounted, toRaw } from "vue";
import {
  usePrefixData,
  useStatusData,
  useMilitaryStatus,
  useGenderData,
  useMartialStatus,
  useInternType,
  useBloodType,
} from "../../stores/constData";
import { useInternFormData, addInternFormRules } from "../../stores/addInternFormData";
import { getAge, confirmation, successAlert, errorAlert } from "../../assets/js/func";
import apiService from "../../services/api";
import useVuelidate from "@vuelidate/core"; // validate
import BaseInput from "../Component/BaseInput.vue";
import BaseSelect from "../Component/BaseSelect.vue";
import InvalidFeedback from "../Component/InvalidFeedback.vue";
import CameraLogo from "../icons/CameraLogo.vue";
import router from "@/router";
import SectionSpace from "../Component/SectionSpace.vue";

const formData = useInternFormData();
const personalInfo = ref(formData.personal_info);
const workInfo = ref(formData.work_info);
const collegeInfo = ref(formData.college_info);
const address = ref(formData.address);
const rules = toRaw(addInternFormRules);

const apiCall = new apiService();
const roles = ref({});
const sections = ref({});
const companies = ref([]);
const mentors = ref();
const departments = ref();
const teams = ref();
const universities = ref({});
const faculties = ref();
const majors = ref();
const prefixList = ref(usePrefixData());
const statusList = ref(useStatusData());
const internTypeList = ref(useInternType());
const militaryStatusList = ref(useMilitaryStatus());
const genderList = ref(useGenderData());
const martialStatusList = ref(useMartialStatus());
const bloodTypeList = ref(useBloodType());

const sectionsForm = ref(formData.sectionsForm);
const universitiesForm = ref(formData.universitiesForm);

const v$ = useVuelidate(rules, formData); // validate

/*
 * submitForm
 * จัดการเมื่อมีการกดปุ่มบันทึก
 * param: -
 * return: -
 */
async function submitForm() {
  const validate = await v$.value.$validate(); /* validate แบบฟอร์ม */

  if (validate) {
    const result = await confirmation();
    if (result) {
      workInfo.value.work_from_date = personalInfo.value.intn_start_date;
      personalInfo.value.intn_code = new String("INT-").concat(
        personalInfo.value.intn_code
      );
      personalInfo.value.intn_intern_email.concat("@clicknext.com");

      /* สร้างข้อมูลนักศึกษาผ่าน API */
      await apiCall
        .createIntern({
          personal_info: formData.personal_info,
          address: formData.address,
          work_info: formData.work_info,
          college_info: formData.college_info,
          intn_image: formData.intn_image,
        })
        .then(() => {
          successAlert().then(() => {
            router.push({ name: "index" });
            formData.$reset(); /* ย้อนกลับหน้า index */
          });
        })
        .catch((err) => {
          errorAlert("เกิดข้อผิดพลาด: ข้อมูลซ้ำ");
        });

      personalInfo.value.intn_code = personalInfo.value.intn_code.replace("INT-", "");
    }
  }
}

function formatTel() {
  $("#tel").inputmask("999-999-9999");
}

/*
 * reset
 * รีเซ็ตค่าในแบบฟอร์ม
 * param: -
 * return: -
 */
function reset() {
  formData.reset();

  /* personalInfo.value = formData.personal_info;
    workInfo.value = formData.work_info;
    collegeInfo.value = formData.college_info;
    address.value = formData.address; */
}

/*
 * setFaculty
 * กำหนดข้อมูลคณะที่แสดงในตัวเลือก โดยให้แสดงเฉพาะคณะที่อยู่ในสถานศึกษาที่เลือก
 * param: -
 * return: -
 */
function setFaculty() {
  collegeInfo.value.col_university_id = universitiesForm.value.university.uni_id;
  faculties.value = universitiesForm.value.university.faculties;
  universitiesForm.value.faculty = "";

  majors.value = "";
  personalInfo.value.intn_major_id = "";
  collegeInfo.value.col_faculty_id = "";
}

/*
 * setMajor
 * กำหนดข้อมูลสาขาวิชาที่แสดงในตัวเลือก โดยให้แสดงเฉพาะสาขาที่อยู่ในคณะที่เลือก
 * param: -
 * return: -
 */
function setMajor() {
  collegeInfo.value.col_faculty_id = universitiesForm.value.faculty.fac_id;
  majors.value = universitiesForm.value.faculty.majors;
  personalInfo.value.intn_major_id = "";
}

/*
 * setRelatedData
 * กำหนดข้อมูลที่สัมพันธ์กันกับฝ่ายที่แสดงในตัวเลือก เช่น ทีม แผนก พี่เลี้ยง โดยให้แสดงเฉพาะข้อมูลที่อยู่ในฝ่ายที่เลือกเท่านั้น
 * param: -
 * return: -
 */
function setRelatedData() {
  workInfo.value.work_section_id = sectionsForm.value.section.sec_id;
  teams.value = sectionsForm.value.section.teams;
  departments.value = sectionsForm.value.section.departments[0]
    ? sectionsForm.value.section.departments
    : "";
  mentors.value = sectionsForm.value.section.mentors;

  workInfo.value.work_team_id = null;
  workInfo.value.work_department_id = null;
  personalInfo.value.intn_mentor_id = null;
}

/*
 * setFilledData
 * จัดการกับความสัมพันธ์ของข้อมูลในตัวเลือกของ ฝ่าย และ มหาวิทยาลัย หากผู้ใช้มีการย้อนกลับไปที่หน้าจอ
 * param: -
 * return: -
 */
function setFilledData() {
  if (sectionsForm.value.section) {
    teams.value = sectionsForm.value.section.teams;
    departments.value = sectionsForm.value.section.departments;
    mentors.value = sectionsForm.value.section.mentors;
  }

  if (universitiesForm.value.university) {
    faculties.value = universitiesForm.value.university.faculties;

    if (universitiesForm.value.faculty) {
      majors.value = universitiesForm.value.faculty.majors;
    }
  }
}

/*
 * changePrefix
 * กำหนดคำนำหน้าของภาษาอังกฤษให้สัมพันธ์กับภาษาไทย (นาย -> Mr.)
 * param: คำนำหน้าภาษาไทย
 * return: -
 */
function changePrefix(prefix) {
  let splitted = prefix.split(",");
  personalInfo.value.intn_prefix_th = splitted[0];
  personalInfo.value.intn_prefix_en = splitted[1];
}

/*
 * showImg
 * แสดงรูปภาพเมื่อมีการอัปโหลดไฟล์รูปแบบ
 * param: -
 * return: -
 */
function showImg() {
  const imgUpload = document.getElementById("img-upload");

  if (imgUpload.files[0] != undefined) {
    formData.intn_image = imgUpload.files[0];
  }

  if (formData.intn_image) {
    blah.src = URL.createObjectURL(formData.intn_image);
  }
}

onMounted(async () => {
  await Promise.all([
    (sections.value = await apiCall.getAllSectionWithRelated()),
    (universities.value = await apiCall.getAllUniversityWithRelated()),
    (roles.value = await apiCall.getAllRole()),
    (companies.value = await apiCall.getAllCompany()),
  ]);

  setFilledData();
  showImg();

  /* สำหรับตัว Autocomplete ที่อยู่ */
  $.Thailand({
    $district: $("#district"), // input ของตำบล
    $amphoe: $("#amphoe"), // input ของอำเภอ
    $province: $("#province"), // input ของจังหวัด
    $zipcode: $("#zipcode"), // input ของรหัสไปรษณีย์

    onDataFill: function (data) {
      address.value.addr_subdistrict = data.district;
      address.value.addr_district = data.amphoe;
      address.value.addr_province = data.province;
      address.value.addr_post_code = data.zipcode;
    },
  });
});
</script>

<style scoped>
.bg-grays-200 {
  background-color: #8d969b30 !important;
}

.img {
  height: 150px;
  width: 150px;
  border-radius: 50%;
  border: 1px solid var(--main-color);
}

.border-bottom {
  border-color: var(--main-color) !important;
  /* border-color: var(--main-color) !important; */
  margin-bottom: 12px;
}

.nm-color {
  border-color: var(--bs-border-color) !important;
}

/* input {
  border: 1px solid rgba(0, 0, 0, 0.575)
}

select {
  border: 1px solid rgba(0, 0, 0, 0.575)
} */

input:focus {
  transition: 0s;
  box-shadow: none;
  border: 2px solid rgb(0, 119, 255);
}

select:focus {
  transition: 0s;
  box-shadow: none;
  border: 2px solid rgb(0, 119, 255);
}

.is-invalid:focus {
  transition: 0s;
  box-shadow: none;
}
</style>
