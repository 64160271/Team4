<template>
    <LayoutMenuName page-name="รายงานเบี้ยเลี้ยง" />
    <div class="row">
        <div class="col-md-3">
            <div class="row">
                <div class="col-md-9">
                    <!-- ส่วนของ radio buttons -->
                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radiotest" id="year" value="year">
                        <label class="form-check-label" for="year">ปี</label>
                    </div>

                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radiotest" id="month" value="month">
                        <label class="form-check-label" for="month">เดือน</label>
                    </div>

                    <div class="form-check form-check-inline">
                        <input class="form-check-input" type="radio" name="radiotest" id="customized" value="customized">
                        <label class="form-check-label" for="customized">กำหนดเอง</label>
                    </div>
                </div>
                <div class="col-md-3">

                    <div>
                        <BaseButton label="เพิ่มข้อมูล" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <BaseTable>
        <tr>
            <th>
                รหัสรายการ
            </th>
            <th>
                จำนวนรายชื่อ
            </th>
            <th>
                วันที่สร้างรายการ
            </th>
            <th>
                วันที่แก้ไขรายการ
            </th>
            <th>
                ผู้แก้ไขสร้างรายการ
            </th>
            <th>
                ข้อมูลผู้แก้ไขล่าสุด
            </th>
            <th>
                สถานะ
            </th>
            <th>
                แก้ไข
            </th>
            <th>
                ลบ
            </th>
        </tr>
        <tr>
            <td>a</td>
            <td>ab</td>
            <td>bb</td>
            <td>ad</td>
            <td>ad</td>
            <td>fa</td>
            <td>af</td>
            <td>afa</td>
            <td>afa</td>
        </tr>
    </BaseTable>
</template>

<script setup>
import BaseButton from '../Component/BaseButton.vue'
import BaseTable from '../Component/BaseTable.vue'
</script>

<style scoped></style> 