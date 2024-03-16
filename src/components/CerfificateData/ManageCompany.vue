<!--
    AddInternForm
    Parent of module add intern by form
    Author : keetapong Rodjanavichai
    Created date : 21-10-2566
-->
<template>
  <LayoutMenuName page-name="จัดการข้อมูลเอกสารรับรอง > บริษัท" />
  <SectionSpace>
    <div class="header">
      <div class="bx_nav row nopadding">
        <div class="col-md-4 my-auto nopadding">
          <SearchBox placeholder="ชื่อบริษัท สาขา" v-model="searchData" />
        </div>

          <BaseButton class="col-md-2 ms-auto" @click="openCreateModel = true" label="+ เพิ่มข้อมูล" />
      </div>

      <BaseModal size="lg" v-if="openCreateModel" @save="submitForm" @close="openCreateModel = false"
        title="เพิ่มข้อมูลบริษัท">
        <div class="row mb-3">
          <div class="col">
            <BaseInput class="" label="ชื่อบริษัท" input_type="text" v-model="companyData.com_name"
              placeholder="ชื่อบริษัท" required="required" :class="{ 'is-invalid': v$.com_name.$error }" />
            <InvalidFeedback :errors="v$.com_name.$errors" />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col">
            <BaseInput label="บ้านเลขที่" input_type="text" v-model="companyData.com_address.addr_house_number"
              placeholder="บ้านเลขที่" :class="{ 'is-invalid': v$.com_address.addr_house_number.$error }" />
            <InvalidFeedback :errors="v$.com_address.addr_house_number.$errors" />
          </div>

          <div class="col">
            <BaseInput label="หมู่" input_type="text" v-model="companyData.com_address.addr_village_number"
              placeholder="หมู่" />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col">
            <BaseInput label="ตรอก" input_type="text" v-model="companyData.com_address.addr_alley" placeholder="ตรอก" />
          </div>

          <div class="col">
            <BaseInput label="ถนน" input_type="text" v-model="companyData.com_address.addr_street" placeholder="ถนน" />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col">
            <BaseInput label="ตำบล/แขวง" input_type="text" v-model="companyData.com_address.addr_subdistrict"
              placeholder="ตำบล/แขวง" required="required"
              :class="{ 'is-invalid': v$.com_address.addr_subdistrict.$error }" />
            <InvalidFeedback :errors="v$.com_address.addr_subdistrict.$errors" />
          </div>

          <div class="col">
            <BaseInput label="อำเภอ/เขต" input_type="text" v-model="companyData.com_address.addr_district"
              placeholder="อำเภอ/เขต" required="required"
              :class="{ 'is-invalid': v$.com_address.addr_district.$error }" />
            <InvalidFeedback :errors="v$.com_address.addr_district.$errors" />
          </div>
        </div>

        <div class="row mb-3">
          <div class="col">
            <BaseInput label="สาขา(ชื่อจังหวัด)" input_type="text" v-model="companyData.com_address.addr_province"
              placeholder="สาขา(ชื่อจังหวัด)" required="required"
              :class="{ 'is-invalid': v$.com_address.addr_province.$error }" />
            <InvalidFeedback :errors="v$.com_address.addr_province.$errors" />
          </div>
          <div class="col">
            <BaseInput label="เลขไปรษณีย์" input_type="text" v-model="companyData.com_address.addr_post_code"
              placeholder="เลขไปรษณีย์" required="required"
              :class="{ 'is-invalid': v$.com_address.addr_post_code.$error }" />
            <InvalidFeedback :errors="v$.com_address.addr_post_code.$errors" />
          </div>
        </div>
      </BaseModal>
    </div>

    <div class="content_card row mb-2">
      <Loading v-if="!loaded" />
      <NotFound v-if="loaded && filterData.length < 1" />

      <BaseCard hover v-for="Company in filterData" class="outline-card mt-4" :title="Company.com_name"
        :sub="Company.com_address.addr_province">
        <template #after-title>
          <div class="text_content">
            {{ Company.com_address.addr_house_number }}
            {{ Company.com_address.addr_village_number }}
            {{ Company.com_address.addr_subdistrict }}
            {{ Company.com_address.addr_district }}
            {{ Company.com_address.addr_province }}
            {{ Company.com_address.addr_post_code }}
          </div>
          <button class="stroke_edit position-absolute top-0 end-0 m-1 p-1 w-25 h-25 border-0"
            style="border-radius: 50px; background-color: white" @click="openEditModel2(Company)">
            <EditIcon class="hov-outline-red" />
          </button>
        </template>
      </BaseCard>
    </div>
  </SectionSpace>

  <BaseModal size="lg" v-if="openEditModel" @save="submitFormedit" @close="openEditModel = false"
    title="แก้ไขข้อมูลบริษัท">
    <div class="row mb-3">
      <div class="col">
        <BaseInput class="" label="ชื่อบริษัท" input_type="text" :value="editedCompany.com_name"
          v-model="editedCompany.com_name" placeholder="ชื่อบริษัท" required="required"
          :class="{ 'is-invalid': vedit$.com_name.$error }" />
        <InvalidFeedback :errors="vedit$.com_name.$errors" />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <BaseInput label="บ้านเลขที่" input_type="text" :value="editedCompany.com_address.addr_house_number"
          v-model="editedCompany.com_address.addr_house_number" placeholder="บ้านเลขที่"
          :class="{ 'is-invalid': vedit$.com_address.addr_house_number.$error }" />
        <InvalidFeedback :errors="vedit$.com_address.addr_house_number.$errors" />
      </div>

      <div class="col">
        <BaseInput label="หมู่" input_type="text" :value="editedCompany.com_address.addr_village_number"
          v-model="editedCompany.com_address.addr_village_number" placeholder="หมู่" />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <BaseInput label="ตรอก" input_type="text" :value="editedCompany.com_address.addr_alley"
          v-model="editedCompany.com_address.addr_alley" placeholder="ตรอก" />
      </div>

      <div class="col">
        <BaseInput label="ถนน" input_type="text" :value="editedCompany.com_address.addr_street"
          v-model="editedCompany.com_address.addr_street" placeholder="ถนน" />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <BaseInput id="district" label="ตำบล/แขวง" input_type="text" :value="editedCompany.com_address.addr_subdistrict"
          v-model="editedCompany.com_address.addr_subdistrict" placeholder="ตำบล/แขวง" required="required"
          :class="{ 'is-invalid': vedit$.com_address.addr_subdistrict.$error }" />
        <InvalidFeedback :errors="vedit$.com_address.addr_subdistrict.$errors" />
      </div>

      <div class="col">
        <BaseInput id="amphoe" label="อำเภอ/เขต" input_type="text" :value="editedCompany.com_address.addr_district"
          v-model="editedCompany.com_address.addr_district" placeholder="อำเภอ/เขต" required="required"
          :class="{ 'is-invalid': vedit$.com_address.addr_district.$error }" />
        <InvalidFeedback :errors="vedit$.com_address.addr_district.$errors" />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <BaseInput id="province" label="สาขา(ชื่อจังหวัด)" input_type="text"
          :value="editedCompany.com_address.addr_province" v-model="editedCompany.com_address.addr_province"
          placeholder="สาขา(ชื่อจังหวัด)" required="required"
          :class="{ 'is-invalid': vedit$.com_address.addr_province.$error }" />
        <InvalidFeedback :errors="vedit$.com_address.addr_province.$errors" />
      </div>

      <div class="col">
        <BaseInput id="zipcode" label="เลขไปรษณีย์" input_type="text" :value="editedCompany.com_address.addr_post_code"
          v-model="editedCompany.com_address.addr_post_code" placeholder="เลขไปรษณีย์" required="required"
          :class="{ 'is-invalid': vedit$.com_address.addr_post_code.$error }" />
        <InvalidFeedback :errors="vedit$.com_address.addr_post_code.$errors" />
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import ApiService from "../../services/ApiService";
import BaseCard from "../Component/BaseCard.vue";
import BaseModal from "../Component/BaseModal.vue";
import BaseInput from "../Component/BaseInput.vue";
import BaseButton from "../Component/BaseButton.vue";
import EditIcon from "../icons/EditIcon.vue";
import Swal from "sweetalert2";
import { ref, onMounted, reactive, computed } from "vue";
import SearchBox from "../Component/SearchBox.vue";
import useVuelidate from "@vuelidate/core";
import InvalidFeedback from "../Component/InvalidFeedback.vue";
import { errorAlert } from "../../assets/js/func";
import { useRouter } from "vue-router";
import { required, helpers, maxLength } from "@vuelidate/validators";
import NotFound from "../Component/NotFound.vue";

const loaded = ref(false)
const searchData = ref("");
const router = useRouter();
const apiCall = new ApiService();
const companies = ref([]);
const openCreateModel = ref(false);
const openEditModel = ref(false);
let editCompanyId = 0;

const CompanyNameFeedback = 'ข้อมูลต้องไม่เป็นอักขระพิเศษ'
const CompanyProvinceFeedback = 'ข้อมูลต้องไม่เป็นตัวเลขหรืออักขระพิเศษ'
const Feedback_postcode = 'ข้อมูลต้องเป็นตัวเลขเท่านั้น' 
const size_post_code = 'ควรกรอกไม่เกิน 5 ตัวเลข' 

const requiredNotSpecialcharacters = helpers.regex(/^[a-zA-Z0-9ก-์\s]*$/)        // อักขระพิเศษ
const requiredNotSpecialcharactersAndnumber = helpers.regex(/^[a-zA-Zก-์]*$/)        // ตัวเลขหรืออักขระพิเศษ
const requiredNotSpNumCh = helpers.regex(/^[0-9]*$/)        // ตัวเลขไทย, ตัวหนังสือ, อักขระพิเศษ

const postLength = (v) => v ? (v.length == 5) : true

const filterData = computed(() => {
  return companies.value.filter((company) => {
    return (
      company.com_name.indexOf(searchData.value.trim()) > -1 ||
      company.com_address.addr_province.indexOf(searchData.value.trim()) > -1
    );
  });
});

const companyData = reactive({
  com_name: "",
  com_address: {
    addr_house_number: "",
    addr_village_number: "",
    addr_alley: "",
    addr_street: "",
    addr_subdistrict: "",
    addr_district: "",
    addr_province: "",
    addr_post_code: "",
  },
});

const rules = {
  com_name: {  // ชื่อบริษัท
    required,
    requiredNotSpecialcharacters: helpers.withMessage(CompanyNameFeedback, requiredNotSpecialcharacters)
  },
  com_address: {
    addr_house_number: {   // บ้านเลขที่
      required,
      requiredNotSpNumCh: helpers.withMessage(Feedback_postcode, requiredNotSpNumCh)
    },
    addr_subdistrict: {  // ตำบล
      required,
      requiredNotSpecialcharactersAndnumber: helpers.withMessage(CompanyProvinceFeedback, requiredNotSpecialcharactersAndnumber)
    },
    addr_district: {   // อำเภอ
      required,
      requiredNotSpecialcharactersAndnumber: helpers.withMessage(CompanyProvinceFeedback, requiredNotSpecialcharactersAndnumber)
    },
    addr_province: {   // จังหวัด
      required,
      requiredNotSpecialcharactersAndnumber: helpers.withMessage(CompanyProvinceFeedback, requiredNotSpecialcharactersAndnumber)
    },
    addr_post_code: {   // เลขไปรษณีย์
      required,
      requiredNotSpNumCh: helpers.withMessage(Feedback_postcode, requiredNotSpNumCh),
      postLength: helpers.withMessage(size_post_code, postLength), 
    },
  },
};

const v$ = useVuelidate(rules, companyData);

async function submitForm() {
  const validate = await v$.value.$validate();

  if (validate) {
    await apiCall
      .createCompany(companyData)
      .then(() => {
        router.go();
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          Swal.fire({
            icon: "error",
            text: "มีข้อมูลบริษัทนี้อยู่แล้ว",
            showConfirmButton: true,
          });
        } else {
          Swal.fire({
            icon: "error",
            text: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
            showConfirmButton: true,
          });
        }
      });
  }
}

// เพิ่ม ref สำหรับเก็บข้อมูลบริษัทที่จะแก้ไข
const editedCompany = reactive({
  com_name: "",
  com_address: {
    addr_house_number: "",
    addr_village_number: "",
    addr_alley: "",
    addr_street: "",
    addr_subdistrict: "",
    addr_district: "",
    addr_province: "",
    addr_post_code: "",
  },
});
const vedit$ = useVuelidate(rules, editedCompany);

async function submitFormedit() {
  const validate = await vedit$.value.$validate();

  if (validate) {
    await apiCall
      .editCompany(editedCompany, editCompanyId)
      .then(() => {
        router.go();
      })
      .catch((e) => {
        errorAlert(e.response.data);
      });
  }
}

// ฟังก์ชันที่เรียกเมื่อปุ่ม Edit ถูกคลิก
const openEditModel2 = (company) => {
  Object.assign(editedCompany, {
    com_name: company?.com_name,
    com_address: {
      addr_house_number: company.com_address?.addr_house_number,
      addr_village_number: company.com_address?.addr_village_number,
      addr_alley: company.com_address?.addr_alley,
      addr_street: company.com_address?.addr_street,
      addr_subdistrict: company.com_address?.addr_subdistrict,
      addr_district: company.com_address?.addr_district,
      addr_province: company.com_address?.addr_province,
      addr_post_code: company.com_address?.addr_post_code,
    },
  });
  editCompanyId = company.com_id;
  openEditModel.value = true;
};

onMounted(async () => {
    loaded.value = false
  companies.value = await apiCall.getCompanyWithAddress();
  loaded.value = true

  $.Thailand({
    $district: $("#district"), // input ของตำบล
    $amphoe: $("#amphoe"), // input ของอำเภอ
    $province: $("#province"), // input ของจังหวัด
    $zipcode: $("#zipcode"), // input ของรหัสไปรษณีย์

    /* onDataFill: function (data) {
        address.value.addr_subdistrict = data.district;
        address.value.addr_district = data.amphoe;
        address.value.addr_province = data.province;
        address.value.addr_post_code = data.zipcode;
      }, */
  });
});
</script>
