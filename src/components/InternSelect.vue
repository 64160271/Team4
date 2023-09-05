<template>
    <div class="form-check mt-3">
        <input @change="checkAll" id="main" type="checkbox" class="form-check-input rounded-circle">
        <label for="" class="form-check-label">เลือกทั้งหมด</label>
    </div>

    <div class="row mt-2 table-wrapper-scroll-y my-custom-scrollbar">
        <table class="table table-borderless fixed-head">
            <thead class="text-center bg-red">
                <tr>
                    <th scope="col" class="col-2 border-left">รหัสนักศึกษาฝึกงาน</th>
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
                    <td scope="row" class="text-center">
                        <div class="form-check">
                            <input name="tb-check" type="checkbox" class="form-check-input rounded-circle">
                            <label for="" class="form-check-label">{{ index + 1 }}</label>
                        </div>
                    </td>
                    <td scope="row">{{ data[8] }}</td>
                    <td scope="row" class="text-center">{{ data[9] }}</td>
                    <td scope="row">{{ data[6] }}</td>
                    <td scope="row">{{ data[15] }}</td>
                    <td scope="row" class="text-center">{{ data[10] }}</td>
                    <td scope="row" class="text-center">{{ data[11] || '-' }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="mt-auto">
        <hr>
        <span>รายการทั้งหมด {{ excelData.length - 1 || 0 }} รายการ</span>
    </div>
</template>

<script setup>
const props = defineProps({
    excelData: Array
})

function checkAll() {
    let main = document.getElementById("main")
    let tbCheckBox = document.getElementsByName("tb-check")
    for (let i = 0 ; i < tbCheckBox.length ; i++) {
        tbCheckBox[i].checked = main.checked
    }

}
</script>

<style scoped>
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
    color: #e1032b;
}</style>