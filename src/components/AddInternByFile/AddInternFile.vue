<!--
 AddInternFile
 display file upload field
 Author : Rawich Piboonsin
 Created date : 04-09-2566
-->

<template>
  <div class="d-flex flex-column mb-3">
    <LayoutMenuName page-name="เพิ่มนักศึกษาฝึกงาน > เพิ่มจากไฟล์ Excel" />

    <SectionSpace>
      <div id="upload-box" class="d-flex justify-content-center align-items-center mt-3 upload-box upload">
        <input id="file" accept=".xlsx" type="file" name="" @change="showFileName(readDataInFile)" />

        <div class="">
          <svg width="200" height="200" viewBox="0 0 250 251" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path class="fill-green" fill-rule="evenodd" clip-rule="evenodd"
              d="M239.116 21.8392H148.67V0.5L0 23.4751V224.861L148.67 250.5V218.871H239.116C241.855 219.01 244.538 218.057 246.578 216.221C248.617 214.385 249.848 211.815 250 209.073V31.6282C249.845 28.8878 248.614 26.3201 246.575 24.4859C244.535 22.6517 241.854 21.7002 239.116 21.8392ZM240.545 210.7H148.366L148.214 193.813H170.42V174.146H148.045L147.938 162.524H170.42V142.857H147.768L147.661 131.235H170.42V111.567H147.589V99.9457H170.42V80.2783H147.589V68.6566H170.42V48.9892H147.589V31.1097H240.545V210.7Z"
              fill="black" />
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M39.1405 77.1959L57.9091 76.0951L69.7073 109.29L83.6481 74.7258L102.417 73.625L79.625 120.754L102.417 168L82.5724 166.631L69.1738 130.617L55.7664 165.261L37.5312 163.615L58.7137 121.882L39.1405 77.1959Z"
              fill="white" />
          </svg>

          <span id="filename" class="row h5 mt-3">เลือกไฟล์ Excel หรือลากไฟล์ที่นี่</span>
        </div>
      </div>

      <div id="import-btn" class="d-flex mt-5">
        <button type="button" class="outline-gray btn" @click="$router.push('/')">
          ย้อนกลับ
        </button>

        <BaseButton @click="downloadExample()" class="ms-auto me-3" label="ดาวน์โหลดไฟล์ตัวอย่าง" />

        <button type="button" class="outline-red btn" @click="uploaded()">Import</button>
      </div>

      <!-- แสดงหน้าจอเลือกรายการเมื่อมีการอัปโหลดไฟล์แล้วเท่านั้น -->
      <InternSelect v-if="isUploaded" :excel-data="excelData" />
    </SectionSpace>
  </div>
</template>

<script setup>
import readXlsxFile from "read-excel-file";
import InternSelect from "./InternSelect.vue";
import { ref } from "vue";
import BaseButton from "../Component/BaseButton.vue";
import axios from "axios";
import SectionSpace from "../Component/SectionSpace.vue";

const excelData = ref({});
const examplePathFile = "../../src/assets/example_file.xlsx";
let isUploaded = ref(false);

/*
 * showFileName
 * แสดงชื่อและขนาดของไฟล์ที่อัปโหลด
 * param: callback function
 * return: -
 */
function showFileName(callback) {
  let file = document.getElementById("file");
  let display = document.getElementById("filename");
  let filename = file.files[0];

  display.innerText = `ไฟล์ที่เลือก : ${filename.name}
            ขนาด : ${(filename.size / 1024 / 1024).toFixed(2)} MB`;

  callback(filename);
}

/*
 * downloadExample
 * ดาวน์โหลดไฟล์ที่เป็นตัวอย่างในการ Import
 * param: -
 * return: -
 */
async function downloadExample() {
  /* let link = document.createElement("a");
  link.href = examplePathFile;
  link.download = "example_file";
  link.click(); */

  window.open(`${import.meta.env.VITE_API_HOST}/interns/file/example`)
}

/*
 * readDataInFile
 * อ่านข้อมูลในไฟล์ Excel ทั้งหมด
 * param: ไฟล์ Excel
 * return: -
 */
function readDataInFile(file) {
  readXlsxFile(file).then((rows) => {
    excelData.value = rows;
    excelData.value.splice(0, 1);
  });
}

/*
 * uploaded
 * ตรวจสอบว่ามีการอัปโหลดไฟล์แล้วหรือไม่
 * param: -
 * return: -
 */
function uploaded() {
  let file = document.getElementById("file");
  if (file.files[0]) {
    let uploadBox = document.getElementById("upload-box");
    let uploadButton = document.getElementById("import-btn");
    uploadBox.classList.add("d-none");
    uploadButton.classList.add("d-none");
    isUploaded.value = true;
  }
}
</script>

<style scoped>
input {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.upload-box {
  position: relative;
  text-align: center;
  border: 2px black dashed;
  height: 75vh;
}

.upload-box:hover {
  border: 2px #1d6f42 dashed;
  color: #1d6f42 !important;
}

.upload-box:hover .fill-green {
  fill: #1d6f42 !important;
}

.btn {
  width: 15vw;
}
</style>
