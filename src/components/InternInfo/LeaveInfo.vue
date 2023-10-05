<template>
  <div class="row mb-3">
    <LayoutMenu />

    <div class="row mb-3">
      <button class="btn outline-red col-auto ms-auto">เพิ่มข้อมูลการลา</button>
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
            <td class="text-center border-right"></td>
          </tr>
        </tbody>
      </table>

      <div v-if="leavesInfo == 0" class="text-center mt-5">
        <span class="h5">----- ไม่มีข้อมูลการลา -----</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import LayoutMenu from "./LayoutMenu.vue";
import apiService from "../../services/api";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";

const internId = useRoute().params.id;
const leavesInfo = ref({});
const apiCall = new apiService();

onMounted(async () => {
  leavesInfo.value = await apiCall.getLeaveInfoByInternId(internId);
});
</script>

<style scoped>
button {
  height: 50px;
}
</style>
