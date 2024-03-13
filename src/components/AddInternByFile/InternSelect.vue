<!--
 InternSelect
 display intern data from excel
 Author : Rawich Piboonsin
 Created date : 04-09-2566
-->

<template>
  <div class="form-check mt-1">
    <input id="main" type="checkbox" class="form-check-input" @change="checkAll" />
    <label for="main" id="select-all" name="select-all" class="form-check-label">เลือกทั้งหมด</label>
  </div>

  <form @submit.prevent="createInterns">
    <div class="row mt-2 table-wrapper-scroll-y my-custom-scrollbar">
      <BaseTable :heads="[
        'ลำดับ',
        'ชื่อ-นามสกุล',
        'ชื่อเล่น',
        'ตำแหน่งฝึกงาน',
        'ทีม',
        'วันที่เริ่มฝึกงาน',
        'วันที่สิ้นสุดฝึกงาน',
        '',
      ]" :align="['center', 'left', 'left', 'left', 'left', 'center', 'center']">
        <tr v-for="(data, index) in excelData" class="tr-custom border-start border-end border-bottom"
          @click="checkRow(index)" :class="{ 'bg-duplicate': data.duplicate }">
          <td>
            <div class="form-check my-auto">
              <input name="tb-check" :id="'tb-check' + index" type="checkbox" @click="checkRow(index)"
                class="form-check-input mt-2 p-2" @change="unSelectAll" />
              <label :for="'tb-check' + index" class="form-check-label ms-3">{{
                index + 1
              }}</label>
            </div>
          </td>
          <td>{{ data[7] + data[8] }}</td>
          <td class="text-left">{{ data[9] }}</td>
          <td class="text-left">{{ data[6] }}</td>
          <td class="text-left">{{ data[4] }}</td>
          <td class="text-center">{{ dateFormat(data[10]) }}</td>
          <td class="text-center">{{ dateFormat(data[11]) || "-" }}</td>
          <td v-if="data.duplicate" class="text-center" @mouseover.once="openTooltip">
            <svg xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="24" data-bs-toggle="tooltip" data-bs-placement="left"
              title="มีข้อมูลนี้อยู่ในระบบอยู่แล้ว หากทำการเพิ่มข้อมูลจะเป็นการแก้ไขข้อมูลที่มีอยู่">
              <path
                d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" 
                fill="#cc3300" />
            </svg>
          </td>
        </tr>
      </BaseTable>
      <span v-if="nonSelectedError" class="h6 text-danger">กรุณาเลือกอย่างน้อย 1 ข้อมูล</span>
    </div>
  </form>

  <div class="row mt-2">

    <span class="col">รายการทั้งหมด {{ excelData.length || 0 }} รายการ</span>
    <button type="button" class="col-sm-2 btn outline-red ms-auto" @click="confirmation">
      บันทึก
    </button>
  </div>
</template>

<script setup>
import axios from "axios";
import Swal from "sweetalert2";
import { ref, onMounted } from "vue";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Tooltip } from "bootstrap/dist/js/bootstrap.esm.min.js";
import router from "@/router";
import BaseTable from "../Component/BaseTable.vue";
import { errorAlert } from "../../assets/js/func"

const selectedIndex = ref([]);
const selectedData = ref([]);
const nonSelectedError = ref(false);
const props = defineProps({
  excelData: Array,
});

/*
 * openTooltip
 * แสดงข้อความของการแจ้งเตือนข้อมูลซ้ำ
 * param: -
 * return: -
 */
function openTooltip() {
  let tooltipList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipList.forEach((tooltipNode) => new Tooltip(tooltipNode));
}

/*
 * checkAll
 * เลือกข้อมูลทั้งหมดภายในไฟล์
 * param: -
 * return: -
 */
function checkAll() {
  let main = document.getElementById("main");
  let tbCheckBox = document.getElementsByName("tb-check");

  for (let i = 0; i < tbCheckBox.length; i++) {
    tbCheckBox[i].checked = main.checked;
  }
}

/*
 * unSelectAll
 * ยกเลิกการเลือกทั้งหมด
 * param: -
 * return: -
 */
function unSelectAll() {
  let main = document.getElementById("main");
  main.checked = false;
}

/*
 * dateFormat
 * แปลงข้อมูลวันที่เป็น dd/mm/yyyy
 * param: วันที่ที่ต้องการแปลง
 * return: วันที่แบบ dd/mm/yyyy
*/
function dateFormat(date) {
  if (!date) {
    return;
  }

  return new Date(date).toLocaleDateString(
    'th-TH', { day: '2-digit', month: '2-digit', year: 'numeric' }
  ).replace(/\//g, '/')
}

/*
 * dateFormatToDB
 * ฟังก์ชันแปลงวันที่เป็นแบบ ISO เพื่อบันทึกเข้าฐานข้อมูล
 * param: วันที่ที่ต้องการแปลง
 * return: วันที่แบบ ISO
*/
function dateFormatToDB(date) {
  if (!date) {
    return undefined;
  }

  let isoDate = new Date(date).toISOString()

  return isoDate.split('T')[0]
}

/*
 * checkRow
 * เลือกข้อมูลในแถว
 * param: index (แถวของข้อมูล)
 * return: -
 */
function checkRow(index) {
  let checkbox = document.getElementById("tb-check" + index);

  checkbox.click();
}

/*
 * isSelected
 * ฟังก์ชันสำหรับตรวจสอบว่ามีการเลือกข้อมูลแล้วหรือไม่
 * param: -
 * return: true (มีการเลือกแล้ว), false (ยังไม่มีการเลือก)
*/
function isSelected() {
  let tbCheckBox = document.getElementsByName("tb-check");

  for (let i = 0; i < tbCheckBox.length; i++) {
    if (tbCheckBox[i].checked) {
      return true;
    }
  }

  nonSelectedError.value = true;
  return false;
}

/*
 * confirmation
 * ฟังก์ชันสำหรับแสดง popup ยืนยันการเพิ่มข้อมูล
 * param: -
 * return: -
*/
function confirmation() {
  if (isSelected()) {
    Swal.fire({
      text: "คุณต้องการบันทึกข้อมูลหรือไม่",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "var(--main-color)",
      reverseButtons: true,
      focusConfirm: false,
    }).then((result) => {
      if (result.isConfirmed) {
        createInterns();
      }
    }).catch((e) => {
      console.log(e)
      errorAlert(e)
    });
  }
}

/*
 * getAllIntern
 * เรียกดูข้อมูลของนักศึกษาทั้งหมด และตรวจสอบข้อมูลซ้ำ
 * param: -
 * return: -
 */
const getAllIntern = async () => {
  await axios.get(`${import.meta.env.VITE_API_HOST}/interns`).then((response) => {
    const interns = response.data;
    let fname = "";
    let lname = "";

    if (Array.isArray(interns.rows)) {
      props.excelData.forEach((data, index) => {
        let name = data[8].split(" ");
        fname = name[0];
        lname = name[1];

        interns.rows.forEach((element) => {
          let fname_th = element.intn_fname_th;
          let lname_th = element.intn_lname_th;

          if (fname_th == fname && lname_th == lname) {
            props.excelData[index].duplicate = true;
            props.excelData[index].intn_id = element.intn_id
          }
        });
      });
    }
  });
};

/*
 * createInterns
 * สร้างข้อมูลนักศึกษาโดยมีการนำข้อมูลไปทำเป็น object ก่อน
 * param: -
 * return: -
 */
async function createInterns() {
  let checked = $('[name="tb-check"]');

  $.each(checked, function () {
    let $this = $(this);

    if ($this.is(":checked")) {
      let index = $(this).parent().parent().parent().index();
      selectedIndex.value.push(index);
    }
  });

  selectedIndex.value.forEach((index) => {
    let rawData = props.excelData;
    let name = rawData[index][8].split(" ");
    let row = {
      intn_id: rawData[index]["intn_id"],
      sec_name: rawData[index][2],
      dept_name: rawData[index][3],
      team_name: rawData[index][4],
      ment_name: rawData[index][5],
      role_name: rawData[index][6],
      intn_prefix_th: rawData[index][7],
      intn_fname_th: name[0],
      intn_lname_th: name[1],
      intn_nickname_th: rawData[index][9],
      intn_start_date: dateFormatToDB(rawData[index][10]),
      intn_end_date: dateFormatToDB(rawData[index][11]),
      intn_contract_end_date: dateFormatToDB(rawData[index][12]),
      intn_tel: rawData[index][13],
      intn_email: rawData[index][14],
      uni_name: rawData[index][15],
      fac_name: rawData[index][16],
      maj_name: rawData[index][17],
      duplicate: rawData[index]["duplicate"],
      intn_work_status: 'กำลังทำงาน',
      intn_intern_type: 'นักศึกษาฝึกงาน',
      intn_updated_by: 1
    };

    selectedData.value.push(row);
  });


  await axios
    .post(`${import.meta.env.VITE_API_HOST}/interns/file/create`, selectedData.value)
    .then((response) => console.log(response))
    .then(() => {
      Swal.fire({
        icon: "success",
        text: "บันทึกข้อมูลเสร็จสิ้น",
        showConfirmButton: false,
        timer: 3000,
      }).then(() => {
        selectedData.value = [];
        selectedIndex.value = [];
        router.push({ name: "index" });
      })
    }).catch((e) => {
      selectedData.value = [];
      selectedIndex.value = [];
      errorAlert(e.response.data, true)
    });;
}

onMounted(() => {
  getAllIntern();
});
</script>

<style scoped>
input[type="checkbox"] {
  border: 1px solid black;
}

input[type="checkbox"]:checked {
  border: 1px solid green;
  background-color: green;
}

.tooltip-inner {
  font-size: 0.875rem !important;
}

.fixed-head {
  overflow: auto;
}

.fixed-head,
thead,
th {
  position: sticky !important;
  top: 0 !important;
  z-index: 1;
}

.my-custom-scrollbar {
  height: 75vh;
  overflow: auto;
}

.table-wrapper-scroll-y {
  display: block;
}

tr {
  background-color: transparent !important;
}

.bg-duplicate td {
  background-color: rgb(255, 241, 221) !important;
}
</style>
