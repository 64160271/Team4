<template>
  <div class="row mb-3">
    <LayoutMenu />

    <div class="row mb-3">
      <CardInternInfo :internId="internId">
        <div class="row mb-2">
          <label for="" class="col-md-3 col-form-label text-gray">
            เบี้ยเลี้ยงปัจจุบัน (บาท)
          </label>
          <div class="col-auto">
            <input placeholder="-" :value="lastSalary" type="text" class="form-control-plaintext" readonly
              required />
          </div>

          <label for="" class="col-md-3 col-form-label text-gray"> เบี้ยเลี้ยงพิเศษ (บาท) </label>
          <div class="col-auto">
            <input placeholder="-" value="" type="text" class="form-control-plaintext" readonly
              required />
          </div>
        </div>
      </CardInternInfo>
    </div>

    <div class="row">
      <DataTable striped :heads="tableHead" :items="salaries">
        <template #total="{ data }">
          {{ calculateTotal(data) }}
        </template>
      </DataTable>
    </div>
  </div>

  <!-- Modal -->
  <div id="modal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="exampleModalLabel" class="modal-title">แก้ไขจำนวนเบี้ยเลี้ยง</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form action="">
            <div class="row mb-4 mx-2">
              <div class="col">
                <label for="" class="form-label text-gray">วันที่เริ่มต้นได้รับเบี้ยเลี้ยง
                  <span class="text-danger">*</span>
                </label>
                <input id="" v-model="formData.from_date" type="date" class="datepicker form-control" name=""
                  :class="{ 'is-invalid': v$.from_date.$error }" />
                <span v-for="error in v$.from_date.$errors" :key="error.$uid" class="invalid-feedback">
                  กรุณากรอกข้อมูล
                </span>
              </div>
            </div>

            <div class="row mb-4 mx-2">
              <div class="col">
                <label for="" class="form-label text-gray">เบี้ยเลี้ยงปัจจุบัน (บาท)
                  <span class="text-danger">*</span>
                </label>
                <input id="" :value="lastSalary" type="number" class="form-control" name="" readonly />
              </div>
            </div>

            <div class="row mb-4 mx-2">
              <div class="col">
                <label for="" class="form-label text-gray">เบี้ยเลี้ยงที่ทำการแก้ไข (บาท)
                  <span class="text-danger">*</span>
                </label>
                <input id="" v-model="formData.salary" type="number" class="form-control" name=""
                  :class="{ 'is-invalid': v$.salary.$error }" />
                <span v-for="error in v$.salary.$errors" :key="error.$uid" class="invalid-feedback">
                  กรุณากรอกข้อมูล
                </span>
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
import { onMounted, ref, computed, isProxy, toRaw } from "vue";
import { formatDate, getAgeBuddisht, confirmation } from "../../assets/js/func";
import { useAddSalaryForm } from "../../stores/addSalaryFormdata";
import Swal from "sweetalert2";
import DataTable from "../Component/DataTable.vue";
import useVuelidate from "@vuelidate/core";
import CardInternInfo from "./CardInternInfo.vue";
import { required } from "@vuelidate/validators";

const internId = useRoute().params.id;
const salaries = ref([]);
const apiCall = new apiService();
const formData = ref(useAddSalaryForm());
const modal = ref();
const rules = toRaw(formData.value.rules);
const v$ = useVuelidate(rules, formData.value); // validate
const tableHead = ref([
  { key: "sal_report.rep_code", title: "รหัสรายการ", align: 'left' },
  { key: "sal_from_date", title: "วันเริ่มต้น", align: 'center' },
  { key: "sal_to_date", title: "วันที่สิ้นสุด", align: 'center' },
  { key: "sal_day", title: "จำนวนวันที่ได้รับ", align: 'end' },
  { key: "sal_salary", title: "เบี้ยเลี้ยง (บาท/วัน)", align: 'end' },
  { key: "sal_extra", title: "เบี้ยเลี้ยงพิเศษ (บาท)", align: 'end' },
  { key: "total", title: "รวมเบี้ยเลี้ยง (บาท)", align: 'end' },
]
);

const lastSalary = computed(() => {
  return salaries.value[0]?.sal_salary || '-';
});

onMounted(async () => {
  salaries.value = await apiCall.getSalaryByInternId(internId);
  modal.value = new bootstrap.Modal("#modal", {});
});

function calculateTotal(data) {
  let total = Number(Number(data?.sal_salary) * Number(data?.sal_day)) + Number(data?.sal_extra)
  return total.toFixed(2)
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
