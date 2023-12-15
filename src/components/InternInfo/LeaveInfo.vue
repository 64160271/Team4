<template>
  <div class="row mb-3">
    <LayoutMenu />

    <div class="row mb-3">
      <CardInternInfo :internId="internId">
      </CardInternInfo>
    </div>

    <div class="row mb-3">
      <BaseButton label="+ เพิ่มข้อมูลการลา" @click="openModal" class="col-md-2 ms-auto">

      </BaseButton>
    </div>

    <div class="row">
      <DataTable :heads="tableHead" :items="leavesInfo">
        <template #open_file>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
            class="bi bi-card-image cursor-p" viewBox="0 0 16 16">
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            <path
              d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5z" />
          </svg>
        </template>
      </DataTable>
    </div>

  </div>

  <div id="modal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="exampleModalLabel" class="modal-title">เพิ่มข้อมูลการลา</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="">
            <div class="row mb-4 mx-2">
              <div class="col">
                <BaseInput v-model="formData.write_date" type="date" required="true" />
              </div>
            </div>
            <div class="row mb-4 mx-2">
              <div class="col">
                <BaseInput v-model="formData.title" type="text" label="เรื่อง" placeholder="ชื่อเรื่อง" required="true" />
              </div>
            </div>

            <div class="row mb-4 mx-2">
              <div class="col">
                <BaseInput />
              </div>
            </div>

            <div class="row mb-4 mx-2">
              <div class="col">
                <BaseInput />
              </div>
            </div>

            <div class="row mb-4 mx-2">
              <div class="col">
                <BaseInput />
              </div>
            </div>

            <div class="row mb-4 mx-2">
              <div class="col">
                <BaseInput />
              </div>
            </div>

            <div class="row mb-4 mx-2">
              <div class="col">
                <BaseInput />
              </div>
            </div>

            <div class="row mb-4 mx-2">
              <div class="col">
                <BaseInput />
              </div>
            </div>

            <div class="row mb-4 mx-2">
              <div class="col">
                <BaseInput />
              </div>
            </div>

            <div class="row mb-4 mx-2">
              <div class="col">
                <BaseInput />
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer justify-content-center gap-4">
          <button type="button" class="col-md-3 btn outline-gray" data-bs-dismiss="modal" @click="closeModal">
            ยกเลิก
          </button>
          <button type="button" class="col-md-3 btn outline-red" @click="formSubmit">
            บันทึก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import LayoutMenu from "./LayoutMenu.vue";
import apiService from "../../services/api";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import BaseInput from "../Component/BaseInput.vue";
import BaseButton from "../Component/BaseButton.vue";
import { useLeaveFormData } from "../../stores/leaveFormData";
import { getImageFromBuffer2 } from "../../assets/js/func";
import DataTable from "../Component/DataTable.vue";
import CardInternInfo from "./CardInternInfo.vue";
import { Modal } from 'bootstrap'

const internId = useRoute().params.id;
const leavesInfo = ref([]);
const apiCall = new apiService();
const image = ref();
const formData = ref(useLeaveFormData());
const modal = ref();
const tableHead = ref(
  [
    { key: "lvs_created_at", title: "วันที่เพิ่มข้อมูล", align: 'center' },
    { key: "lvs_id", title: "เลขที่ใบลา" },
    { key: "lvs_type_name", title: "ประเภทการลา" },
    { key: "lvs_day", title: "ระยะเวลา" },
    { key: "lvs_updated_by_user.user_name", title: "ผู้ทำการแก้ไข" },
    { key: "open_file", title: "หลักฐาน", align: 'center' },
  ]
);

onMounted(async () => {
  leavesInfo.value = await apiCall.getLeaveInfoByInternId(internId);
  modal.value = new Modal("#modal", {});
});

function formSubmit() {
  console.log(formData.value);
}

function openModal() {
  modal.value.show();
}

function closeModal() {
  modal.value.hide();
}
</script>

<style scoped></style>
