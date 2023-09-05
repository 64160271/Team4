<template>
    <div class="form-check mt-3">
        <input type="checkbox" class="form-check-input">
        <label for="" class="form-check-label">เลือกทั้งหมด</label>
    </div>

    <div class="row mt-2">
        <table class="table table-borderless">
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
                
            </tbody>
        </table>
    </div>
</template>

<script setup>

</script>

<style scoped>
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
    overflow: hidden;
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