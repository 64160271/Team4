<!--
 InternSelect
 display intern data from excel
 Author : Rawich Piboonsin
 Created date : 04-09-2566
-->

<template>
  <div class="form-check mt-3">
    <input id="main" type="checkbox" class="form-check-input" @change="checkAll" />
    <label for="main" id="select-all" name="select-all" class="form-check-label">เลือกทั้งหมด</label>
  </div>

  <form @submit.prevent="createInterns">
    <div class="row mt-2 table-wrapper-scroll-y my-custom-scrollbar">
      <BaseTable
        :heads="['ลำดับ', 'ชื่อ-นามสกุล', 'ชื่อเล่น', 'ตำแหน่งฝึกงาน', 'ทีม', 'วันที่เริ่มฝึกงาน', 'วันที่สิ้นสุดฝึกงาน', '']"
        :align="['center', 'left', 'left', 'left', 'left', 'center', 'center']">
        <tr v-for="(data, index) in excelData" class="tr-custom border-start border-end border-bottom"
          @click="checkRow(index)">
          <td>
            <div class="form-check my-auto">
              <input name="tb-check" :id="'tb-check' + index" type="checkbox" @click="checkRow(index)"
                class="form-check-input mt-2 p-2" @change="unSelectAll" />
              <label :for="'tb-check' + index" class="form-check-label ms-3">{{ index + 1 }}</label>
            </div>
          </td>
          <td>{{ data[7] + data[8] }}</td>
          <td class="text-left">{{ data[9] }}</td>
          <td class="text-left">{{ data[6] }}</td>
          <td class="text-left">{{ data[4] }}</td>
          <td class="text-center">{{ dateFormat(data[10]) }}</td>
          <td class="text-center">{{ dateFormat(data[11]) || "-" }}</td>
          <td v-if="data.duplicate" class="text-center" @mouseover.once="openTooltip">
            <img src="../../assets/images/warning.png" width="24" alt="" data-bs-toggle="tooltip"
              data-bs-placement="left"
              title="มีข้อมูลนี้อยู่ในระบบอยู่แล้ว หากทำการเพิ่มข้อมูลจะเป็นการแก้ไขข้อมูลที่มีอยู่" />
          </td>
        </tr>
      </BaseTable>
      <span v-if="nonSelectedError" class="h6 text-danger">กรุณาเลือกอย่างน้อย 1 ข้อมูล</span>
    </div>

  </form>

  <div class="row mt-2">
    <hr />

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
  import BaseTable from '../Component/BaseTable.vue'

  const selectedIndex = ref([]);
  const selectedData = ref([]);
  const nonSelectedError = ref(false)
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

  function dateFormat(date) {
    if (!date) {
      return;
    }

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return day + "/" + month + "/" + year;
  }

  /*
   * checkRow
   * เลือกข้อมูลในแถว
   * param: index (แถวของข้อมูล)
   * return: -
   */
  function checkRow(index) {
    let checkbox = document.getElementById('tb-check' + index)

    checkbox.click()
  }

  function isSelected() {
    let tbCheckBox = document.getElementsByName("tb-check");

    for (let i = 0; i < tbCheckBox.length; i++) {
      if (tbCheckBox[i].checked) {
        return true
      }
    }

    nonSelectedError.value = true
    return false
  }

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

            let fname_th = element.intn_fname_th
            let lname_th = element.intn_lname_th

            if (fname_th == fname && lname_th == lname) {
              props.excelData[index].duplicate = true;
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
        section: rawData[index][2],
        department: rawData[index][3],
        team: rawData[index][4],
        mentor: rawData[index][5],
        role: rawData[index][6],
        prefix: rawData[index][7],
        fname: name[0],
        lname: name[1],
        nickname: rawData[index][9],
        start_date: dateFormat(rawData[index][10]),
        end_date: dateFormat(rawData[index][11]),
        tel: rawData[index][13],
        email: rawData[index][14],
        university: rawData[index][15],
        faculty: rawData[index][16],
        major: rawData[index][17],
        duplicate: rawData[index]["duplicate"],
      };

      selectedData.value.push(row);
    });

    await axios
      .post(`${import.meta.env.VITE_API_HOST}/interns/bulk`, selectedData.value)
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
        });
      });
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
    border: 1px solid var(--main-color);
    background-color: var(--main-color);
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

  table {
    border-collapse: collapse;
    overflow: hidden;
  }

  th {
    color: white;
    background-color: transparent;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-collapse: collapse;
    overflow: auto;
  }

  tr {
    line-height: 40px;
    min-height: 30px;
    height: 30px;
    border-collapse: collapse;
    overflow: hidden;
  }
</style>