<!--
 InternSelect
 display intern data from excel
 Author : Rawich Piboonsin
 Created date : 04-09-2566
-->

<template>
    <div class="form-check mt-3">
        <input @change="checkAll" id="main" type="checkbox" class="form-check-input rounded-circle" />
        <label for="" class="form-check-label">เลือกทั้งหมด</label>
    </div>

    <form @submit.prevent="createInterns">
        <div class="row mt-2 table-wrapper-scroll-y my-custom-scrollbar">
            <table class="table table-borderless fixed-head" id="tb-data">
                <thead class="text-center bg-red">
                    <tr>
                        <th scope="col" class="col-2 border-left">ลำดับ</th>
                        <th scope="col">ชื่อ - นามสกุล</th>
                        <th scope="col">ชื่อเล่น</th>
                        <th scope="col">ตำแหน่ง</th>
                        <th scope="col">มหาวิทยาลัย</th>
                        <th scope="col" class="col-sm-auto">วันที่เริ่มฝึกงาน</th>
                        <th scope="col" class="col-sm-auto border-right">วันที่สิ้นสุดฝึกงาน</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(data, index) in excelData">
                        <td scope="row" class="d-flex justify-content-start">
                            <input @change="unSelectAll" name="tb-check" type="checkbox"
                                class="my-auto form-check-input rounded-circle ms-2" />
                            <label for="" class="mx-auto">{{ index + 1 }}</label>
                        </td>
                        <td scope="row">{{ data[7] + data[8] }}</td>
                        <td scope="row" class="text-center">{{ data[9] }}</td>
                        <td scope="row" class="text-center">{{ data[6] }}</td>
                        <td scope="row" class="text-center">{{ data[15] }}</td>
                        <td scope="row" class="text-center">{{ dateFormat(data[10]) }}</td>
                        <td scope="row" class="text-center">{{ dateFormat(data[11]) || '-' }}</td>
                        <td v-if="data.duplicate" class="text-center" @mouseover.once="openTooltip">
                            <img src="../../assets/images/warning.png" width="24" alt=""
                            data-bs-toggle="tooltip" data-bs-placement="left"
                            title="มีข้อมูลนี้อยู่ในระบบอยู่แล้ว หากทำการเพิ่มข้อมูลจะเป็นการแก้ไขข้อมูลที่มีอยู่">
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </form>

    <div class="row mt-2">
        <hr>

        <span class="col">รายการทั้งหมด {{ excelData.length || 0 }} รายการ</span>
        <button @click="confirmation" type="button" class="col-sm-2 btn outline-red ms-auto">บันทึก</button>
    </div>
</template>

<script setup>
import axios from 'axios';
import Swal from 'sweetalert2'
import { ref, onMounted } from 'vue';
import $ from 'jquery'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { Tooltip } from 'bootstrap/dist/js/bootstrap.esm.min.js'
import router from '@/router'

const selectedIndex = ref([])
const selectedData = ref([])
const props = defineProps({
    excelData: Array
})

function openTooltip() {
    let tooltipList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipList.forEach(tooltipNode => new Tooltip(tooltipNode))
}

function checkAll() {
    let main = document.getElementById("main")
    let tbCheckBox = document.getElementsByName("tb-check")

    for (let i = 0; i < tbCheckBox.length; i++) {
        tbCheckBox[i].checked = main.checked
    }
}

function unSelectAll() {
    let main = document.getElementById("main")
    main.checked = false
}

function dateFormat(date) {
    if (!date) {
        return
    }

    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    return day + "/" + month + "/" + year
}

function confirmation() {

    Swal.fire({
        text: 'คุณต้องการบันทึกข้อมูลหรือไม่',
        icon: 'warning',
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
        confirmButtonColor: 'var(--main-color)',
        reverseButtons: true,
        focusConfirm: false,
    }).then((result) => {

        if (result.isConfirmed) {
            createInterns()
        }
    })
}

const getAllIntern = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/interns`)
        .then((response) => {
            const interns = response.data
            let fname = ''
            let lname = ''

            if (Array.isArray(interns)) {
                props.excelData.forEach((data, index) => {

                    let name = data[8].split(" ")
                    fname = name[0]
                    lname = name[1]

                    interns.forEach((element) => {

                        if (element.intn_fname == fname
                            && element.intn_lname == lname) {
                            props.excelData[index].duplicate = true
                        }
                    })
                })
            }
        })
}

async function createInterns() {

    let checked = $('[name="tb-check"]')

    $.each(checked, function () {
        let $this = $(this)

        if ($this.is(":checked")) {
            let index = $(this).parent().parent().index()
            selectedIndex.value.push(index)
        }
    })

    selectedIndex.value.forEach((index) => {
        let rawData = props.excelData
        let name = rawData[index][8].split(" ")
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
            duplicate: rawData[index]["duplicate"]
        }

        selectedData.value.push(row)
    })

    await axios.post(`${import.meta.env.VITE_API_HOST}/interns/file`, selectedData.value)
        .then((response) => console.log(response)).then(() => {
            Swal.fire({
                icon: 'success',
                text: 'บันทึกข้อมูลเสร็จสิ้น',
                showConfirmButton: false,
                timer: 3000
            }).then(() => {
                selectedData.value = []
                selectedIndex.value = []
                router.push({name: 'index'})
            })
        })
}

onMounted(() => {
    getAllIntern()
})

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
    height: 70vh;
    overflow: auto;
}

.table-wrapper-scroll-y {
    display: block;
}

table {
    border-collapse: collapse;
    overflow: hidden;
}

.border-left {
    border-radius: 30px 0 0 30px;
}

.border-right {
    border-radius: 0 30px 30px 0;
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

.tb-hov:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

.tb-hov:hover td {
    color: var(--main-color);
}
</style>