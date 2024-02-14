<!--
  ManageSignature
  หน้าจอการจัดการเกี่ยวกับลายเซ็นของผู้อนุมัติให้ผ่านการฝึกงาน
  Author : Phanida Thamwapee
  Created date : 13-11-2566
-->

<template>
  <LayoutMenuName page-name="จัดการข้อมูลลายเซ็น" />

  <SectionSpace>
    <div class="row mb-4 nopadding">
      <div class="nopadding col-md-4 my-auto">
        <SearchBox placeholder="ชื่อเจ้าของลายเซ็น ตำแหน่ง" v-model="searchData" />
      </div>

      <BaseButton
        class="col-md-2 btn outline-red ms-auto"
        label="+ เพิ่มข้อมูล"
        @click="add()"
      />
    </div>

    <div class="row" v-if="filterData.length <= 0 && loaded">
      <NotFound />
    </div>

    <div v-if="!loaded" class="d-flex justify-content-center">
      <div class="spinner-border" role="status"></div>
    </div>

    <div class="row mb-2">
      <BaseCard
        v-for="signature in filterData"
        title=" "
        :sub="signature.sign_name"
        :content="signature.sign_role"
        class="mb-4"
        hover
      >
        <template #before-title>
          <EditIcon
            @click="edit(signature)"
            class="position-absolute top-0 end-0 m-2 cursor-p hov-outline-red"
          />
          <img width="110" height="90" :src="signature.sign_image_path" alt="" />
        </template>
        <template #after-title>
          <span class="text-center">
            {{ signature.sign_company?.com_name }}
          </span>
        </template>
      </BaseCard>
    </div>
  </SectionSpace>

  <BaseModal
    v-if="openModal == true"
    title="เพิ่มข้อมูลลายเซ็น"
    size="lg"
    @close="openModal = false"
    @save="submitForm"
  >
    <div class="row mx-2">
      <div class="col">
        <!-- แถวกรอกข้อมูลชื่อ -->
        <div class="row mb-3">
          <div class="col-md-3">
            <BaseSelect
              label="คำนำหน้า"
              v-model="formData.sign_prefix"
              :options="prefix"
              required
              :class="{ 'is-invalid': v$.sign_prefix.$error }"
            >
            </BaseSelect>
            <InvalidFeedback :errors="v$.sign_prefix.$errors" />
          </div>
          <div class="col">
            <BaseInput
              label="ชื่อ"
              v-model="formData.sign_fname"
              :value="formData.sign_fname"
              placeholder="ชื่อ"
              required
              :class="{ 'is-invalid': v$.sign_fname.$error }"
            >
            </BaseInput>
            <InvalidFeedback :errors="v$.sign_fname.$errors" />
          </div>
          <div class="col">
            <BaseInput
              label="นามสกุล"
              v-model="formData.sign_lname"
              :value="formData.sign_lname"
              placeholder="นามสกุล"
              required
              :class="{ 'is-invalid': v$.sign_lname.$error }"
            >
            </BaseInput>
            <InvalidFeedback :errors="v$.sign_lname.$errors" />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <BaseInput
              label="ตำแหน่ง"
              placeholder="ตำแหน่ง"
              v-model="formData.sign_role"
              :value="formData.sign_role"
              required
              :class="{ 'is-invalid': v$.sign_role.$error }"
            >
            </BaseInput>
            <InvalidFeedback :errors="v$.sign_role.$errors" />
          </div>
          <div class="col-md-6">
            <BaseSelect
              label="บริษัท"
              v-model="formData.sign_company_id"
              :options="companies"
              text="com_name"
              value="com_id"
              required
              :class="{ 'is-invalid': v$.sign_company_id.$error }"
            >
            </BaseSelect>
            <InvalidFeedback :errors="v$.sign_company_id.$errors" />
          </div>
        </div>

        <label for="inputImage" class="form-label text-gray"
          >ไฟล์รูปภาพลายเซ็น <span class="text-danger">*</span></label
        >

        <div class="row">
          <div class="col text-center">
            <button
              id="picture"
              type="button"
              class="btn outline-red position-relative px-4 mb-3"
              v-if="!formData.sign_image"
            >
              <input id="img-upload" type="file" accept="image/*" @change="showImg" />

              <svg
                class="me-1"
                width="20"
                height="20"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.9474 36.5556H5.21053C4.09383 36.5556 3.02286 36.0873 2.23323 35.2538C1.44361 34.4203 1 33.2899 1 32.1111V12.1111C1 10.9324 1.44361 9.80191 2.23323 8.96841C3.02286 8.13492 4.09383 7.66667 5.21053 7.66667H7.31579C8.43249 7.66667 9.50345 7.19841 10.2931 6.36492C11.0827 5.53142 11.5263 4.40096 11.5263 3.22222C11.5263 2.63285 11.7481 2.06762 12.1429 1.65087C12.5377 1.23413 13.0732 1 13.6316 1H26.2632C26.8215 1 27.357 1.23413 27.7518 1.65087C28.1466 2.06762 28.3684 2.63285 28.3684 3.22222C28.3684 4.40096 28.812 5.53142 29.6017 6.36492C30.3913 7.19841 31.4622 7.66667 32.5789 7.66667H34.6842C35.8009 7.66667 36.8719 8.13492 37.6615 8.96841C38.4511 9.80191 38.8947 10.9324 38.8947 12.1111V19.8889"
                  stroke="var(--main-color)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  class="stroke-white"
                  d="M34.6854 41.0026V27.6693M34.6854 27.6693L41.0012 34.3359M34.6854 27.6693L28.3697 34.3359M19.9486 27.6693C21.6237 27.6693 23.2301 26.9669 24.4145 25.7166C25.599 24.4664 26.2644 22.7707 26.2644 21.0026C26.2644 19.2345 25.599 17.5388 24.4145 16.2886C23.2301 15.0383 21.6237 14.3359 19.9486 14.3359C18.2736 14.3359 16.6671 15.0383 15.4827 16.2886C14.2982 17.5388 13.6328 19.2345 13.6328 21.0026C13.6328 22.7707 14.2982 24.4664 15.4827 25.7166C16.6671 26.9669 18.2736 27.6693 19.9486 27.6693Z"
                  stroke="var(--main-color)"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              อัปโหลดไฟล์
            </button>
          </div>
        </div>

        <div class="row" v-if="v$.sign_image.$error">
          <span class="text-center" :class="{ 'is-invalid': v$.sign_image.$error }">
            <InvalidFeedback :errors="v$.sign_image.$errors" />
          </span>
        </div>

        <div class="row" v-if="formData.sign_image">
          <div class="position-relative col-5 border border-dark rounded-3 py-2 mx-auto">
            <div class="text-overflow-ellipsis mx-2">
              {{ formData.sign_image.name || formData.sign_image }}
            </div>
            <div
              class="col position-absolute top-0 end-0 me-1 pointer"
              @click="formData.sign_image = ''"
            >
              X
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import BaseButton from "../Component/BaseButton.vue";
import BaseCard from "../Component/BaseCard.vue";
import EditIcon from "../icons/EditIcon.vue";
import BaseModal from "../Component/BaseModal.vue";
import BaseInput from "../Component/BaseInput.vue";
import BaseSelect from "../Component/BaseSelect.vue";
import { ref } from "vue";
import ApiService from "../../services/ApiService";
import { onMounted, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import SearchBox from "../Component/SearchBox.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import InvalidFeedback from "../Component/InvalidFeedback.vue";
import { errorAlert } from "../../assets/js/func";
import NotFound from "../Component/NotFound.vue";

const router = useRouter();
const openModal = ref(false);
const initialState = {
  sign_prefix: "",
  sign_fname: "",
  sign_lname: "",
  sign_role: "",
  sign_company_id: "",
  sign_image: "",
};

const loaded = ref(false);
const formData = reactive({ ...initialState });
const modalMode = ref("");
const prefix = ref(["นาย", "นางสาว", "นาง"]);
const apiCall = new ApiService();
const signatures = ref([]);
const companies = ref([]);
const searchData = ref("");
let signEditId = 0;

const rules = {
  sign_prefix: { required },
  sign_fname: { required },
  sign_lname: { required },
  sign_role: { required },
  sign_company_id: { required },
  sign_image: { required },
};
const v$ = useVuelidate(rules, formData);

/*
 * filterData
 * ฟังก์ชันสำหรับ filter ข้อมูล
 * param: -
 * return: ข้อมูลที่ถูกกรองตามเงื่อนไข
 */
const filterData = computed(() => {
  let key = searchData.value.trim();
  return signatures.value.filter((signature) => {
    return signature.sign_name.indexOf(key) > -1 || signature.sign_role.indexOf(key) > -1;
  });
});

/*
 * submitForm
 * จัดการเมื่อมีการกดปุ่มบันทึก
 * param: -
 * return: -
 */
async function submitForm() {
  const validate = await v$.value.$validate();

  if (validate) {
    if (modalMode.value == "add") {
      await apiCall
        .createSignature(formData)
        .then(() => {
          router.go();
        })
        .catch((e) => {
          errorAlert(e.response.data, true);
        });
    } else if (modalMode.value == "edit") {
      /* ลบ sign_img ทิ้งหากเป็น file เดิม ป้องกันการสร้างไฟล์ซ้ำซ้อน */
      const temp = formData.sign_image;
      if (typeof formData.sign_image != "object") {
        delete formData["sign_image"];
      }

      await apiCall
        .editSignature(formData, signEditId)
        .then(() => {
          router.go();
        })
        .catch((e) => {
          formData.sign_image = temp;
          errorAlert(e.response.data, true);
        });
    }
  }
}

/*
 * add
 * เปิด Modal เมื่อทำการกดปุ่มเพิ้มข้อมูล
 * param: -
 * return: -
 */

async function add() {
  Object.assign(formData, initialState);
  openModal.value = true;
  modalMode.value = "add";
}

/*
 * edit
 * ทำการเปิด Modal เมื่อกดปุ่มแก้ไข
 * param: signature
 * return: -
 */

async function edit(signature) {
  Object.assign(formData, {
    sign_prefix: signature?.sign_prefix,
    sign_fname: signature?.sign_fname,
    sign_lname: signature?.sign_lname,
    sign_role: signature?.sign_role,
    sign_company_id: signature?.sign_company_id,
    sign_image: signature?.sign_image,
  });

  openModal.value = true;
  signEditId = signature.sign_id;

  /* แสดงรูปภาพในแบบฟอร์ม */
  /* let blah = document.getElementById("blah");
    if (blah) {
        blah.src = formData.value.uni_file;
    } */
  modalMode.value = "edit";
}

/*
 * showImg
 * การนำรูปภาพมาแสดง
 * param: -
 * return: -
 */

function showImg() {
  const imgUpload = document.getElementById("img-upload");

  if (imgUpload.files[0] != undefined) {
    formData.sign_image = imgUpload.files[0];
  }
}
onMounted(async () => {
  signatures.value = await apiCall.getAllSignatureWithCompany();
  companies.value = await apiCall.getAllCompany();
  loaded.value = true;
});
</script>

<style scoped>
.text-overflow-ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.pointer {
  cursor: pointer;
}
</style>
