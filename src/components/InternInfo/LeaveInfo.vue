<template>
  <div class="row mb-3">
    <LayoutMenu />

    <div class="row mb-3">
      <BaseButton label="เพิ่มข้อมูลการลา" @click="openModal" class="col-auto ms-auto" />
    </div>

    <div class="row">
      <table class="table table-borderless table-striped">
        <thead class="bg-red">
          <tr class="text-center tr-custom">
            <th scope="col" class="th-custom border-left">วันที่แก้ไข</th>
            <th scope="col" class="th-custom">เลขที่ใบลา</th>
            <th scope="col" class="th-custom">ประเภทการลา</th>
            <th scope="col" class="th-custom">จำนวนวัน</th>
            <th scope="col" class="th-custom">ผู้ทำการแก้ไข</th>
            <th scope="col" class="th-custom border-right">หลักฐาน</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(leave, index) in leavesInfo" class="tr-custom">
            <td class="text-center border-left">{{ leave.lvs_edit_date || "-" }}</td>
            <td class="text-center">{{ leave.lvs_id }}</td>
            <td class="text-center">{{ leave.lvs_type_name }}</td>
            <td class="text-center">{{ leave.lvs_leave_day }}</td>
            <td class="text-center">{{ leave.lvs_edit_by_user.user_name }}</td>
            <td class="text-center border-right">
              <a class="btn">
                <PictureLogo />
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="leavesInfo == 0" class="text-center mt-5">
        <span class="h5">----- ไม่มีข้อมูลการลา -----</span>
      </div>
    </div>
  </div>

  <div id="modal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="exampleModalLabel" class="modal-title">เพิ่มข้อมูลการลา</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
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
                <BaseInput
                  v-model="formData.title"
                  type="text"
                  label="เรื่อง"
                  placeholder="ชื่อเรื่อง"
                  required="true"
                />
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
          <button
            type="button"
            class="col-md-3 btn outline-gray"
            data-bs-dismiss="modal"
            @click="closeModal"
          >
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
import PictureLogo from "../icons/PictureLogo.vue";
import BaseInput from "../Component/BaseInput.vue";
import BaseButton from "../Component/BaseButton.vue";
import { useLeaveFormData } from "../../stores/leaveFormData";

const internId = useRoute().params.id;
const leavesInfo = ref({});
const apiCall = new apiService();
const formData = ref(useLeaveFormData());
const modal = ref();

onMounted(async () => {
  leavesInfo.value = await apiCall.getLeaveInfoByInternId(internId);
  modal.value = new bootstrap.Modal("#modal", {});
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
