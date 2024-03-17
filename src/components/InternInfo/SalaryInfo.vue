<!--
 SalaryInfo
 หน้าจอสำหรับแสดงข้อมูลเบี้ยเลี้ยงของนักศึกษาฝึกงาน
 Author : Rawich Piboonsin
 Created date : 04-12-2566
-->

<template>
  <LayoutMenu />

  <CardInternInfo class="my-3" :internId="internId">
    <div class="row mb-2">
      <label for="" class="col-md-3 col-form-label text-gray">
        เบี้ยเลี้ยงปัจจุบัน (บาท)
      </label>
      <label for="" class="col-md-3 col-form-label text-gray">
        {{ lastSalary }}
      </label>

      <label for="" class="col-md-3 col-form-label text-gray">
        เบี้ยเลี้ยงพิเศษ (บาท)
      </label>

      <label for="" class="col-md-3 col-form-label text-gray"> - </label>
    </div>
  </CardInternInfo>

  <SectionSpace noSpace>
    <div class="row mb-4 mt-2">
      <div class="col-auto my-auto nopadding">
        <label for="" class="col-form-label text-gray"
          >วันเริ่มต้นได้รับ - สิ้นสุด
        </label>
      </div>
      <div class="col-md-3 my-auto">
        <DatePicker
          placeholder="เริ่มต้น"
          pid="searchFrom"
          v-model="searchData.sal_from_date"
          readonly
        />
      </div>

      <div class="col-md-3">
        <DatePicker
          placeholder="สิ้นสุด"
          v-model="searchData.sal_to_date"
          pid="searchTo"
          readonly
        />
      </div>
    </div>

    <div class="row">
      <Loading v-if="!loaded" />
      <DataTable
        v-if="loaded"
        :total="filterData.length"
        striped
        hover-background
        :heads="tableHead"
        :items="filterData"
      >
        <template #total="{ data }">
          {{ calculateTotal(data) }}
        </template>
      </DataTable>
    </div>
  </SectionSpace>
</template>

<script setup>
import LayoutMenu from "./LayoutMenu.vue";
import ApiService from "../../services/ApiService";
import { useRoute } from "vue-router";
import { onMounted, ref, computed, isProxy, toRaw } from "vue";
import { useAddSalaryForm } from "../../stores/addSalaryFormdata";
import DataTable from "../Component/DataTable.vue";
import CardInternInfo from "./CardInternInfo.vue";
import BaseInput from "../Component/BaseInput.vue";
import SideLabelInput from "../Component/SideLabelInput.vue";
import { slashDtoDashY } from "../../assets/js/func";
import DatePicker from "../Component/DatePicker.vue";

const loaded = ref(false)
const internId = useRoute().params.id;
const salaries = ref([]);
const apiCall = new ApiService();
const tableHead = ref([
  { key: "sal_report.rep_code", title: "รหัสรายการ", align: "left" },
  { key: "sal_from_date", title: "วันเริ่มต้น", align: "center" },
  { key: "sal_to_date", title: "วันที่สิ้นสุด", align: "center" },
  { key: "sal_day", title: "จำนวนวันที่ได้รับ", align: "end" },
  { key: "sal_salary", title: "เบี้ยเลี้ยง (บาท/วัน)", align: "end" },
  { key: "sal_extra", title: "เบี้ยเลี้ยงพิเศษ (บาท)", align: "end" },
  { key: "total", title: "รวมเบี้ยเลี้ยง (บาท)", align: "end" },
]);

const searchData = ref({
  sal_from_date: "",
  sal_to_date: "",
});

/*
 * lastSalary
 * ฟังก์ชันสำหรับเรียกดูเบี้ยเลี้ยงปัจจุบันของนักศึกษา
 * param: -
 * return: เบี้ยเลี้ยงปัจจุบันของนักศึกษา
*/
const lastSalary = computed(() => {
  return salaries.value[0]?.sal_salary || "-";
});

onMounted(async () => {
  loaded.value = false
  salaries.value = await apiCall.getSalaryByInternId(internId);
  loaded.value = true
});

/*
 * calculateTotal
 * คำนวณเบี้ยเลี้ยงสุทธิของรายการเบี้ยเลี้ยงนั้นๆ
 * param: ข้อมูลเบี้ยเลี้ยง
 * return: เบี้ยเลี้ยงรวมของนักศึกษาในรูปทศนิยม 2 ตำแหน่ง
*/
function calculateTotal(data) {
  let total =
    Number(Number(data?.sal_salary) * Number(data?.sal_day)) + Number(data?.sal_extra);
  return total.toFixed(2);
}

/*
 * filterData
 * ฟังก์ชันสำหรับการค้นหาข้อมูลเบี้ยเลี้ยง
 * param: -
 * return: ข้อมูลเบี้ยเลี้ยงที่ตรงกับคำค้นหา
*/
const filterData = computed(() => {
  return salaries.value.filter((salary) => {
    return (
      slashDtoDashY(salary.sal_from_date) >= searchData.value.sal_from_date.trim() ||
      slashDtoDashY(salary.sal_to_date) <= searchData.value.sal_to_date.trim()
    );
  });
});
</script>

<style scoped></style>
