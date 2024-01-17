<template>
  <div class="row mb-3">
    <LayoutMenu />

    <div class="row mb-3">
      <CardInternInfo :internId="internId">
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
    </div>

    <div class="row mb-3">
      <SideLabelInput type="date" label="วันเริ่มต้น - สิ้นสุด" noPadding />

      <div class="col-md-2">
        <BaseInput type="date" />
      </div>
    </div>

    <div class="row">
      <DataTable striped :heads="tableHead" :items="salaries">
        <template #total="{ data }">
          {{ calculateTotal(data) }}
        </template>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import LayoutMenu from "./LayoutMenu.vue";
import apiService from "../../services/api";
import { useRoute } from "vue-router";
import { onMounted, ref, computed, isProxy, toRaw } from "vue";
import { confirmation } from "../../assets/js/func";
import { useAddSalaryForm } from "../../stores/addSalaryFormdata";
import Swal from "sweetalert2";
import DataTable from "../Component/DataTable.vue";
import useVuelidate from "@vuelidate/core";
import CardInternInfo from "./CardInternInfo.vue";
import BaseInput from "../Component/BaseInput.vue";
import SideLabelInput from "../Component/SideLabelInput.vue";

const internId = useRoute().params.id;
const salaries = ref([]);
const apiCall = new apiService();
const formData = ref(useAddSalaryForm());
const modal = ref();
const rules = toRaw(formData.value.rules);
const v$ = useVuelidate(rules, formData.value); // validate
const tableHead = ref([
  { key: "sal_report.rep_code", title: "รหัสรายการ", align: "left" },
  { key: "sal_from_date", title: "วันเริ่มต้น", align: "center" },
  { key: "sal_to_date", title: "วันที่สิ้นสุด", align: "center" },
  { key: "sal_day", title: "จำนวนวันที่ได้รับ", align: "end" },
  { key: "sal_salary", title: "เบี้ยเลี้ยง (บาท/วัน)", align: "end" },
  { key: "sal_extra", title: "เบี้ยเลี้ยงพิเศษ (บาท)", align: "end" },
  { key: "total", title: "รวมเบี้ยเลี้ยง (บาท)", align: "end" },
]);

const searchKey = ref({
  sal_from_date: "",
  sal_to_date: "",
});

const lastSalary = computed(() => {
  return salaries.value[0]?.sal_salary || "-";
});

onMounted(async () => {
  salaries.value = await apiCall.getSalaryByInternId(internId);
  modal.value = new bootstrap.Modal("#modal", {});
});

function calculateTotal(data) {
  let total =
    Number(Number(data?.sal_salary) * Number(data?.sal_day)) + Number(data?.sal_extra);
  return total.toFixed(2);
}

async function formSubmit() {
  const validate = await v$.value.$validate();
  if (validate) {
    const result = await confirmation();
    if (result) {
      formData.value.intern_id = internId;
      await apiCall.createSalaryData(formData.value).then(() => {
        Swal.fire({
          icon: "success",
          text: "บันทึกข้อมูลเสร็จสิ้น",
          showConfirmButton: false,
          timer: 3000,
        }).then(() => {
          location.reload();
        });
      });
    }
  }
}

function openModal() {
  modal.value.show();
}

function closeModal() {
  modal.value.hide();
}
</script>

<style scoped></style>
