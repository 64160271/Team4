<template>
  <div class="row mb-3">
    <LayoutMenu />

    <div class="row mb-3">
      <CardInternInfo :internId="internId">
      </CardInternInfo>
    </div>

    <div class="row mb-3">
      <BaseButton label="+ เพิ่มข้อมูลการลา" @click="openModal = true" class="col-md-2 ms-auto">

      </BaseButton>
    </div>

    <div class="row">
      <DataTable :heads="tableHead" :items="leavesInfo">
        <template #lvs_duration="{ data }">
          {{ getDuration(data) }}
        </template>
        <template #open_file="{ data }">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
            class="bi bi-card-image cursor-p" viewBox="0 0 16 16" @click="showLeaveFile(data.lvs_id)">
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            <path
              d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5z" />
          </svg>
        </template>
      </DataTable>
    </div>

  </div>

  <BaseModal v-if="openModal" size="lg" @close="openModal = false" title="เพิ่มข้อมูลการลา">
    <BaseInput v-model="today" class="mb-3" label="วันที่เพิ่มข้อมูล" disabled />

    <div class="row mb-3">
      <div class="col-md-6">
        <BaseInput v-model="internName" label="ชื่อผู้ลา" disabled />
      </div>
      <div class="col-md-6">
        <BaseInput v-model="internRole" label="ตำแหน่ง" disabled />
      </div>
    </div>

    <BaseSelect :options="leavesType.list" v-model="formData.lvs_type" text="text" value="value" class="mb-3" label="ประเภทการลา" />

    <div class="mb-3">
      <label for="" class="form-label">หมายเหตุ</label>
      <textarea v-model="formData.lvs_reason" class="form-control" name="" id="" rows="3"></textarea>
    </div>

    <div class="row mb-3">
      <label class="col-auto form-check-label" for="flexRadioDefault1">
        ระยะเวลา :
      </label>
      <Radio v-model="formData.lvs_duration" id="hour" class="col-md-2" name="duration" value="hr" type="radio"
        label="ชั่วโมง" checked />
      <Radio v-model="formData.lvs_duration" id="day" class="col-auto" name="duration" value="day" type="radio"
        label="วัน" />
    </div>

    <div v-if="formData.lvs_duration == 'hr'">
      <div class="row mb-3">
        <div class="col-md-5">
          <BaseInput v-model="formData.lvs_from_date" type="time" label="เวลาเริ่มต้น" />
        </div>
        <div class="col-md-5">
          <BaseInput v-model="formData.lvs_to_date" type="time" label="เวลาสิ้นสุด" />
        </div>
        <div class="col-md-2">
          <BaseInput label="รวม (ชั่วโมง)" disabled />
        </div>
      </div>
    </div>

    <div v-if="formData.lvs_duration == 'day'">
      <div class="row mb-3">
        <div class="col-md-5">
          <BaseInput v-model="formData.lvs_from_date" type="date" label="วันเริ่มต้น" />
        </div>
        <div class="col-md-5">
          <BaseInput v-model="formData.lvs_to_date" :min="formData.lvs_to_date" type="date" label="วันสิ้นสุด" />
        </div>
        <div class="col-md-2">
          <BaseInput :value="diffDate(formData.lvs_from_date, formData.lvs_to_date) || 0" label="รวม (วัน)" disabled />
        </div>
      </div>
    </div>

    <div class="row mb-3">
      <div class="col-auto my-auto">
        <label>ไฟล์หลักฐานการลา</label>
      </div>

      <BaseButton v-if="!formData.lvs_file" label="อัปโหลดไฟล์" class="upload-box col-md-3 sm">
        <template #before-text>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="me-2 bi bi-upload"
            viewBox="0 0 16 16">
            <path
              d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
            <path
              d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
          </svg>
        </template>
        <template #after-text>
          <input @change="showFileName" id="file-upload" class="file-upload" type="file" name="" />
        </template>
      </BaseButton>

      <div class="col-md-5" v-if="formData.lvs_file">
        <div class="position-relative border border-dark rounded-3 py-2 mx-auto">
          <div class="text-overflow-ellipsis mx-2">{{ formData.lvs_file.name }}</div>
          <div class="col position-absolute top-0 end-0 me-1 cursor-p" @click="formData.lvs_file = ''">
            x
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup>
import LayoutMenu from "./LayoutMenu.vue";
import apiService from "../../services/api";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import BaseInput from "../Component/BaseInput.vue";
import BaseButton from "../Component/BaseButton.vue";
import DataTable from "../Component/DataTable.vue";
import CardInternInfo from "./CardInternInfo.vue";
import BaseModal from "../Component/BaseModal.vue";
import Radio from "../Component/Radio.vue";
import BaseSelect from "../Component/BaseSelect.vue";
import { useLeavesType } from "../../stores/constData"
import { useInternName } from "../../stores/constData";
import { diffDate, diffTime, parseTime, getImageFromBuffer2 } from "../../assets/js/func"

const internRole = ref()
const internName = ref()
const leavesType = ref(useLeavesType)
const internId = useRoute().params.id;
const leavesInfo = ref([]);
const apiCall = new apiService();
const file = ref()
const today = ref(new Date())
const openModal = ref(false)
const formData = ref({
  lvs_type: '',
  lvs_reason: '',
  lvs_from_date: '',
  lvs_to_date: '',
  lvs_file: '',
  lvs_duration: 'hr',
});
const tableHead = ref(
  [
    { key: "lvs_created_at", title: "วันที่เพิ่มข้อมูล", align: 'center' },
    { key: "lvs_id", title: "เลขที่ใบลา" },
    { key: "lvs_type_name", title: "ประเภทการลา" },
    { key: "lvs_duration", title: "ระยะเวลา" },
    { key: "lvs_updated_by_user.user_name", title: "ผู้ทำการแก้ไข" },
    { key: "open_file", title: "หลักฐาน", align: 'center' },
  ]
);

onMounted(async () => {
  leavesInfo.value = await apiCall.getLeaveInfoByInternId(internId);
  internName.value = await useInternName().getName
  internRole.value = await useInternName().getRole
});

async function showLeaveFile(id) {
    file.value = await apiCall.getLeaveInfoFile(id).then((file) => {
        return getImageFromBuffer2(file.file_type, file.file_image.data)
    })

    let img = new Image()
    img.src = file.value
    let win = window.open("")
    win.document.write(img.outerHTML)
}

function showFileName() {
    const imgUpload = document.getElementById("file-upload");

    if (imgUpload.files[0] != undefined) {
      formData.value.lvs_file = imgUpload.files[0];
    }
  }

function getDuration(data) {
  if (data.lvs_day) {
    return data.lvs_day + ' วัน'
  } else if (data.lvs_hour) {
    return data.lvs_hour + ' ชั่วโมง'
  }
}
</script>

<style scoped>
.upload-box {
  position: relative;
  text-align: center;
  border: 1px black dotted;
}

.file-upload {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.text-overflow-ellipsis {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>
