<template>
  <div class="row mb-3">
    <LayoutMenu />

    <div class="row mb-3">
      <button class="btn btn-std outline-red col-auto ms-auto" @click="openModal">
        แก้ไขข้อมูลเบี้ยเลี้ยง
      </button>
    </div>

    <div class="row">
      <table class="table table-borderless table-striped">
        <thead class="bg-red">
          <tr class="text-center tr-custom">
            <th scope="col" class="th-custom border-left">วันที่แก้ไข</th>
            <th scope="col" class="th-custom">วันที่ได้รับเบี้ยเลี้ยงเริ่มต้น</th>
            <th scope="col" class="th-custom">เบี้ยเลี้ยงก่อนหน้า (บาท)</th>
            <th scope="col" class="th-custom">เบี้ยงเลี้ยงที่ปรับแก้</th>
            <th scope="col" class="th-custom border-right">ผู้ทำการแก้ไข</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(salary, index) in salaries" class="tr-custom">
            <td class="text-center border-left">
              {{ salary.sal_edit_date || "-" }}
            </td>
            <td class="text-center">{{ salary.sal_from_date }}</td>
            <td class="text-center">{{ salaries[index + 1]?.sal_salary || "-" }}</td>
            <td class="text-center">{{ salary.sal_salary }}</td>
            <td class="text-center border-right">
              {{ salary.sal_edit_by_user.user_name || "-" }}
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="salaries == 0" class="text-center mt-5">
        <span class="h5">----- ไม่มีข้อมูลเบี้ยเลี้ยง -----</span>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div id="modal" class="modal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="exampleModalLabel" class="modal-title">แก้ไขจำนวนเบี้ยเลี้ยง</h5>
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
                <label for="" class="form-label text-gray"
                  >วันที่แก้ไข
                  <span class="text-danger">*</span>
                </label>
                <input
                  id=""
                  v-model="formData.edit_date"
                  type="date"
                  class="datepicker form-control"
                  name=""
                  :class="{ 'is-invalid': v$.edit_date.$error }"
                />
                <span
                  v-for="error in v$.edit_date.$errors"
                  :key="error.$uid"
                  class="invalid-feedback"
                >
                  กรุณากรอกข้อมูล
                </span>
              </div>
            </div>

            <div class="row mb-4 mx-2">
              <div class="col">
                <label for="" class="form-label text-gray"
                  >วันที่เริ่มต้นได้รับเบี้ยเลี้ยง
                  <span class="text-danger">*</span>
                </label>
                <input
                  id=""
                  v-model="formData.from_date"
                  type="date"
                  class="datepicker form-control"
                  name=""
                  :class="{ 'is-invalid': v$.from_date.$error }"
                />
                <span
                  v-for="error in v$.from_date.$errors"
                  :key="error.$uid"
                  class="invalid-feedback"
                >
                  กรุณากรอกข้อมูล
                </span>
              </div>
            </div>

            <div class="row mb-4 mx-2">
              <div class="col">
                <label for="" class="form-label text-gray"
                  >เบี้ยเลี้ยงปัจจุบัน (บาท)
                  <span class="text-danger">*</span>
                </label>
                <input
                  id=""
                  :value="lastSalary"
                  type="number"
                  class="form-control"
                  name=""
                  readonly
                />
              </div>
            </div>

            <div class="row mb-4 mx-2">
              <div class="col">
                <label for="" class="form-label text-gray"
                  >เบี้ยเลี้ยงที่ทำการแก้ไข (บาท)
                  <span class="text-danger">*</span>
                </label>
                <input
                  id=""
                  v-model="formData.salary"
                  type="number"
                  class="form-control"
                  name=""
                  :class="{ 'is-invalid': v$.salary.$error }"
                />
                <span
                  v-for="error in v$.salary.$errors"
                  :key="error.$uid"
                  class="invalid-feedback"
                >
                  กรุณากรอกข้อมูล
                </span>
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
import { onMounted, ref, computed, isProxy, toRaw } from "vue";
import { formatDate, getAgeBuddisht, confirmation } from "../../assets/js/func";
import { useAddSalaryForm } from "../../stores/addSalaryFormdata";
import Swal from "sweetalert2";
import router from "@/router";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const internId = useRoute().params.id;
const salaries = ref({});
const apiCall = new apiService();
const formData = ref(useAddSalaryForm());
const modal = ref();
const rules = toRaw(formData.value.rules);
const v$ = useVuelidate(rules, formData.value); // validate

const lastSalary = computed(() => {
  return salaries.value[0]?.sal_salary || 0;
});

onMounted(async () => {
  salaries.value = await apiCall.getSalaryByInternId(internId);
  modal.value = new bootstrap.Modal("#modal", {});
});

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
