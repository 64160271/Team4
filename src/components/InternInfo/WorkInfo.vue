<template>
  <div class="row mb-3">
    <LayoutMenu />

    <div class="row mx-auto my-3" style="width: 80%">
      <div class="col-auto">
        <img id="blah" :src="getImage()" alt="" class="img bg-grays-200" />
      </div>

      <div class="col ms-5 align-self-center">
        <div class="row mb-2 ms-2">
          <label for="" class="col-md-2 col-form-label text-gray"> ฝ่าย </label>
          <div class="col">
            <input
              placeholder="-"
              :value="sectionName"
              type="text"
              class="form-control-plaintext"
              readonly
              required
            />
          </div>

          <label for="" class="col-md-2 col-form-label text-gray"> แผนก </label>
          <div class="col">
            <input
              placeholder="-"
              :value="departmentName"
              type="text"
              class="form-control-plaintext"
              readonly
              required
            />
          </div>
        </div>

        <div class="row mb-2 ms-2">
          <label for="" class="col-md-2 col-form-label text-gray"> ตำแหน่งงาน </label>
          <div class="col">
            <input
              placeholder="-"
              :value="roleName"
              type="text"
              class="form-control-plaintext"
              readonly
              required
            />
          </div>

          <label for="" class="col-md-2 col-form-label text-gray"> พี่เลี้ยง </label>
          <div class="col">
            <input
              placeholder="-"
              :value="mentor?.ment_name"
              type="text"
              class="form-control-plaintext"
              readonly
              required
            />
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <BaseButton class="col-md-2 ms-auto" label="เพิ่มข้อมูลการทำงาน" />
    </div>

    <div class="row mt-2">
      <table class="table table-borderless table-striped">
        <thead class="bg-red">
          <tr class="text-center tr-custom">
            <th scope="col" class="th-custom border-left">วันที่แก้ไข</th>
            <th scope="col" class="th-custom">วันที่เริ่มโปรเจกต์</th>
            <th scope="col" class="th-custom">วันที่โปรเจกต์เสร็จสิ้น</th>
            <th scope="col" class="th-custom">ชื่อโปรเจกต์</th>
            <th scope="col" class="th-custom">พี่เลี้ยง</th>
            <th scope="col" class="th-custom">ผู้ทำการแก้ไข</th>
            <th scope="col" class="th-custom border-right">หลักฐาน</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="work in workInfo" class="tr-custom">
            <td></td>
            <td>{{ work.work_from_date }}</td>
            <td>{{ work.work_to_date }}</td>
            <td>{{}}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import LayoutMenu from "./LayoutMenu.vue";
import { useRoute } from "vue-router";
import apiService from "../../services/api";
import BaseButton from "../Component/BaseButton.vue";

const internId = useRoute().params.id;
const apiCall = new apiService();
const workInfo = ref({});
const mentor = ref();

const sectionName = computed(() => {
  return workInfo.value[0]?.work_sec?.sec_name || "-";
});

const departmentName = computed(() => {
  return workInfo.value[0]?.work_dept?.dept_name || "-";
});

const roleName = computed(() => {
  return workInfo.value[0]?.work_role?.role_name || "-";
});

onMounted(async () => {
  workInfo.value = await apiCall.getWorkInfoByInternId(internId);
  mentor.value = await apiCall.getMentorByInternId(internId);
  console.log(workInfo.value);
});

function getImage(img) {
  if (img != null || img != "") {
    return `../src/assets/images/interns/${img}`;
  }
}
</script>

<style scoped></style>
