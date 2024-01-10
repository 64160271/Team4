<template>
    <LayoutMenuName page-name="รายงานเบี้ยเลี้ยง" />
    <div class="row mb-3">
        <div class="col-auto my-auto">
            <!-- ส่วนของ radio buttons -->
            <div class="form-check form-check-inline">
                <input v-model="searchData" type="text" id="search-bar" class="bg-grays-200 form-control"
                    placeholder="Search" aria-label="" aria-describedby="basic-addon1" />
            </div>

            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="radiotest" id="month" value="month">
                <label class="form-check-label" for="month">เดือน</label>
            </div>

            <div class="form-check form-check-inline">
                <BaseSelect 
                />
            </div>
        </div>
        <div class="col-auto ms-auto my-auto">
            <div>
                <BaseButton label="เพิ่มข้อมูล" />
            </div>
        </div>
    </div>
    <DataTable :heads="dataHead">

    </DataTable>
</template>

<script setup>
import { ref } from 'vue';
import BaseButton from '../Component/BaseButton.vue'
import DataTable from '../Component/DataTable.vue'
import BaseSelect from '../Component/BaseSelect.vue'

const dataHead = ref([
    { key: "rep_id", title: "รหัสรายการ", align: "center" },
    { key: "rep_count_name", title: "จำนวนรายชื่อ", align: "right" },
    { key: "rep_created_at", title: "วันที่สร้างรายการ", align: "center" },
    { key: "rep_updated_at", title: "วันที่แก้ไขรายการ", align: "center" },
    { key: "rep_created_user", title: "ผู้สร้างรายการ" },
    { key: "rep_update_user", title: "ผู้แก้ไขข้อมูลล่าสุด" },
    { key: "rep_status", title: "สถานะ", align: "center" },
    { key: "rep_action", title: "แก้ไข / ลบ", align: "center" },

])

</script>

<style scoped></style> 