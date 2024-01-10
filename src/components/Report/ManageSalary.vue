<template>
    <LayoutMenuName page-name="รายงานเบี้ยเลี้ยง" />
    <div class="row">
        <div class="col-auto ml-duto align-items-start">
            <!-- ส่วนของ radio buttons -->
            <div class="form-check form-check-inline">
                <BaseInput v-model="searchData" type="text" id="search-bar" class="bg-grays-200 form-control"
                    placeholder="Search" />
            </div>

            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="radiotest" id="month" value="month">
                <label class="form-check-label" for="month">ปี</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="radiotest" id="customized" value="customized">
                <label class="form-check-label" for="customized">ทีม</label>
            </div>
        </div>
        <div class="col-auto ms-auto ">
            <div>
                <BaseButton label="เพิ่มข้อมูล" />
            </div>
        </div>
    </div>
    <div class="mb-3">
            <BaseTable :heads="['รหัสรายการ', 'จำนวนชื่อ', 'วันที่สร้างรายการ', 'วันที่แก้ไขรายการ' , 'ผู้แก้ไขสร้างรายการ' ,
        'ผู้แก้ไขข้อมูลล่าสุด' ,'สถานะ' ,'แก้ไข' ,'ลบ']">
                <tr v-for="index in 3" class="tr-custom">
                    <td class="text-center">some</td>
                    <td class="text-center">some</td>
                    <td class="text-center">some</td>
                    <td class="text-center">some</td>
                    <td class="text-center">some</td>
                    <td class="text-center">some</td>
                    <td class="text-center">some</td>
                    <td class="text-center">some</td>
                    <td class="text-center">
                        <BaseButton class="sm" />
                    </td>
                </tr>
            </BaseTable>
        </div>
</template>

<script setup>
import BaseButton from '../Component/BaseButton.vue'
import BaseTable from '../Component/BaseTable.vue'
import BaseInput from '../Component/BaseInput.vue'
</script>

<style scoped></style> 