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
      <SideLabelInput
        v-model="searchData.sal_from_date"
        type="date"
        label="วันเริ่มต้น - สิ้นสุด"
        noPadding
      />

      <div class="col-md-2">
        <BaseInput v-model="searchData.sal_to_date" type="date" />
      </div>
    </div>

    <div class="row">
      <DataTable
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
import apiService from "../../services/api";
import { useRoute } from "vue-router";
import { onMounted, ref, computed, isProxy, toRaw } from "vue";
import { useAddSalaryForm } from "../../stores/addSalaryFormdata";
import DataTable from "../Component/DataTable.vue";
import CardInternInfo from "./CardInternInfo.vue";
import BaseInput from "../Component/BaseInput.vue";
import SideLabelInput from "../Component/SideLabelInput.vue";
import { slashDtoDashY } from "../../assets/js/func";

const internId = useRoute().params.id;
const salaries = ref([]);
const apiCall = new apiService();
const formData = ref(useAddSalaryForm());
const modal = ref();
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

const lastSalary = computed(() => {
  return salaries.value[0]?.sal_salary || "-";
});

onMounted(async () => {
  salaries.value = await apiCall.getSalaryByInternId(internId);
});

function calculateTotal(data) {
  let total =
    Number(Number(data?.sal_salary) * Number(data?.sal_day)) + Number(data?.sal_extra);
  return total.toFixed(2);
}

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
