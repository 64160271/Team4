<!--
    LeaveInfo
    หน้าจอเกี่ยวกับข้อมูลการลาของนักศึกษา
    Author : Rawich Piboonsin
    Created date : 13-11-2566
-->

<template>
  <LayoutMenu />

  <CardInternInfo class="my-3" :internId="internId">
    <div class="row mb-2">
      <label for="" class="col-md-3 col-form-label text-gray"> วันที่ลาทั้งหมด </label>
      <label for="" class="col-md-3 col-form-label text-gray">
        {{ leavesInfo.length }}
      </label>

      <label for="" class="col-md-3 col-form-label text-gray"> วันที่ลาได้้ </label>

      <label for="" class="col-md-3 col-form-label text-gray"> - </label>
    </div>
  </CardInternInfo>

  <SectionSpace noSpace>
    <div class="row mb-3">
      <SideLabelInput
        v-model="searchData"
        no-padding
        input-size="3"
        label="วันที่ลา"
        type="date"
      />

      <BaseButton
        label="+ เพิ่มข้อมูลการลา"
        @click="openModal = true"
        class="col-md-2 ms-auto"
      >
      </BaseButton>
    </div>

    <div class="row">
      <DataTable
        striped
        :total="filterData.length"
        :heads="tableHead"
        :items="filterData"
      >
        <template #lvs_duration_fake="{ data }">
          {{ getDuration(data.lvs_duration) }}
        </template>
        <template #open_file="{ data }">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="bi bi-card-image cursor-p outline-hov-red"
            viewBox="0 0 16 16"
            @click="showLeaveFile(data.lvs_file_path)"
          >
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            <path
              d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5z"
            />
          </svg>
        </template>
      </DataTable>
    </div>
  </SectionSpace>

  <BaseModal
    v-if="openModal"
    size="lg"
    @close="openModal = false"
    title="เพิ่มข้อมูลการลา"
    @save="formSubmit"
  >
    <BaseInput :value="today" class="mb-3" label="วันที่เพิ่มข้อมูล" disabled />

    <div class="row mb-3">
      <div class="col-md-6">
        <BaseInput :value="internName" label="ชื่อผู้ลา" disabled />
      </div>
      <div class="col-md-6">
        <BaseInput :value="internRole" label="ตำแหน่ง" disabled />
      </div>
    </div>

    <div class="mb-3">
      <BaseSelect
        :options="leavesType.list"
        v-model="formData.lvs_type"
        text="text"
        value="value"
        label="ประเภทการลา"
        :class="{ 'is-invalid': v$.lvs_type.$error }"
        required
      />
      <InvalidFeedback :errors="v$.lvs_type.$errors" />
    </div>

    <div class="mb-3">
      <label for="" class="form-label">หมายเหตุ</label>
      <textarea
        v-model="formData.lvs_reason"
        class="form-control"
        name=""
        id=""
        rows="3"
      ></textarea>
    </div>

    <div class="row mb-3">
      <label class="col-auto form-check-label" for="flexRadioDefault1">
        ระยะเวลา :
      </label>
      <Radio
        v-model="lvs_time"
        id="hour"
        class="col-md-2"
        name="time"
        value="hr"
        type="radio"
        label="ชั่วโมง"
        @change="formData.lvs_duration == 'F'"
        checked
      />
      <Radio
        v-model="lvs_time"
        id="day"
        class="col-auto"
        name="time"
        value="day"
        type="radio"
        label="วัน"
      />
    </div>

    <div v-if="lvs_time == 'hr'">
      <div class="row mb-3">
        <div class="col-md-4">
          <BaseInput
            required
            v-model="formData.lvs_from_date"
            type="date"
            label="วันที่ลา"
            :class="{ 'is-invalid': v$.lvs_from_date.$error }"
          />
          <InvalidFeedback :errors="v$.lvs_from_date.$errors" />
        </div>
        <div class="col-auto mt-auto">
          <Radio
            v-model="formData.lvs_duration"
            id="full-day"
            name="duration"
            value="F"
            type="radio"
            label="เต็มวัน"
            checked
          />
        </div>
        <div class="col-auto mt-auto">
          <Radio
            v-model="formData.lvs_duration"
            id="am"
            name="duration"
            value="AM"
            type="radio"
            label="ครึ่งวันเช้า"
          />
        </div>
        <div class="col-md-2 mt-auto">
          <Radio
            v-model="formData.lvs_duration"
            id="pm"
            name="duration"
            value="PM"
            type="radio"
            label="ครึ่งวันบ่าย"
          />
        </div>
      </div>
    </div>

    <div v-if="lvs_time == 'day'">
      <div class="row mb-3">
        <div class="col-md-5">
          <BaseInput
            required
            v-model="formData.lvs_from_date"
            type="date"
            label="วันเริ่มต้น"
            :class="{ 'is-invalid': v$.lvs_from_date.$error }"
          />
          <InvalidFeedback :errors="v$.lvs_from_date.$errors" />
        </div>
        <div class="col-md-5">
          <BaseInput
            required
            v-model="formData.lvs_to_date"
            :min="formData.lvs_from_date"
            type="date"
            label="วันสิ้นสุด"
            :class="{ 'is-invalid': v$.lvs_to_date.$error }"
          />
          <InvalidFeedback :errors="v$.lvs_to_date.$errors" />
        </div>
        <div class="col-md-2">
          <BaseInput
            :value="diffDate(formData.lvs_from_date, formData.lvs_to_date) || 0"
            label="รวม (วัน)"
            disabled
          />
        </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-auto my-auto">
        <label>เอกสารแนบ</label>
      </div>

      <BaseButton
        v-if="!formData.lvs_file"
        label="อัปโหลดไฟล์"
        class="upload-box col-md-3 sm"
      >
        <template #before-text>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="me-2 bi bi-upload outline-black"
            viewBox="0 0 16 16"
          >
            <path
              d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
            />
            <path
              d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z"
            />
          </svg>
        </template>
        <template #after-text>
          <input
            @change="showFileName"
            id="file-upload"
            class="file-upload"
            type="file"
            name=""
            accept="image/*,application/pdf"
          />
        </template>
      </BaseButton>

      <div class="col-md-5" v-if="formData.lvs_file">
        <div class="position-relative border border-dark rounded-3 py-2 mx-auto">
          <div class="text-overflow-ellipsis mx-2">{{ formData.lvs_file.name }}</div>
          <div
            class="col position-absolute top-0 end-0 me-1 cursor-p"
            @click="formData.lvs_file = ''"
          >
            x
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import LayoutMenu from "./LayoutMenu.vue";
import ApiService from "../../services/ApiService";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref, computed } from "vue";
import BaseInput from "../Component/BaseInput.vue";
import BaseButton from "../Component/BaseButton.vue";
import DataTable from "../Component/DataTable.vue";
import CardInternInfo from "./CardInternInfo.vue";
import BaseModal from "../Component/BaseModal.vue";
import Radio from "../Component/Radio.vue";
import BaseSelect from "../Component/BaseSelect.vue";
import { useLeavesType } from "../../stores/constData";
import { useInternName } from "../../stores/constData";
import { diffDate, slashDtoDashY } from "../../assets/js/func";
import SideLabelInput from "../Component/SideLabelInput.vue";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import InvalidFeedback from "../Component/InvalidFeedback.vue";

const searchData = ref("");
const router = useRouter();
const internRole = ref();
const internName = ref();
const leavesType = ref(useLeavesType);
const internId = useRoute().params.id;
const leavesInfo = ref([]);
const apiCall = new ApiService();
const today = ref(new Date());
const openModal = ref(false);
const lvs_time = ref("hr");
const formData = ref({
  lvs_type: "",
  lvs_reason: "",
  lvs_from_date: "",
  lvs_to_date: "",
  lvs_file: "",
  lvs_intern_id: "",
  lvs_duration: "F",
});

const rules = {
  lvs_type: { required },
  lvs_from_date: { required },
  lvs_to_date: { required },
};
const v$ = useVuelidate(rules, formData.value);

const tableHead = ref([
  { key: "lvs_id", title: "เลขที่ใบลา", align: "center" },
  { key: "lvs_from_date", title: "วันที่ลา", align: "center" },
  { key: "lvs_to_date", title: "ถึงวันที่", align: "center" },
  { key: "lvs_type_name", title: "ประเภทการลา" },
  { key: "lvs_duration_fake", title: "ระยะเวลา" },
  { key: "lvs_updated_by_user.user_name", title: "ผู้ทำการแก้ไข" },
  { key: "open_file", title: "หลักฐาน", align: "center" },
]);

onMounted(async () => {
  leavesInfo.value = await apiCall.getLeaveInfoByInternId(internId);
  internName.value = await useInternName().getName;
  internRole.value = await useInternName().getRole;
});

/*
 * reset
 * จัดการเมื่อมีการกดบันทึก
 * param: -
 * return: -
*/

async function formSubmit() {
  if (lvs_time.value == "hr") formData.value.lvs_to_date = formData.value.lvs_from_date;
  else if (lvs_time.value == "day") formData.value.lvs_duration = "M";

  const validate = await v$.value.$validate();

  if (validate) {
    formData.value.lvs_intern_id = internId;
    try {
      await apiCall.createLeaveInfo(formData.value);
      router.go();
    } catch (e) {
      return e;
    }
  }
}

/*
 * showLeaveFile
 * แสดงหน้าต่างใหม่เมื่อทำการกด
 * param: path
 * return: -
*/

function showLeaveFile(path) {
  window.open(path);
}

/*
 * showFileName
 * โชว์ชื่อของไฟล์
 * param: -
 * return: -
*/

function showFileName() {
  const imgUpload = document.getElementById("file-upload");

  if (imgUpload.files[0] != undefined) {
    formData.value.lvs_file = imgUpload.files[0];
  }
}

/*
 * getDuration
 * แปลงระยะเวลา
 * param: duration
 * return: duration
*/

function getDuration(duration) {
  const isNumber = !isNaN(duration) && !isNaN(parseFloat(duration));

  if (isNumber) return `${duration} วัน`;
  else return duration;
}

const filterData = computed(() => {
  return leavesInfo.value.filter((leaveInfo) => {
    return slashDtoDashY(leaveInfo.lvs_from_date) >= searchData.value.trim();
  });
});
</script>

<style scoped></style>
