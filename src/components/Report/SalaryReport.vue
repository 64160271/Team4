<!-- <template>
    <LayoutMenuName page-name="รายงานเบี้ยเลี้ยง" />


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
    <div class="col-2 mr-200 form-check form-check-inline" >
        <input type="date" class="form-control" min="2530-01-01" max="2566-12-31" placeholder="DD/MM/YYYY">
    </div>
    -
    <div class="col-2 mr-200 form-check form-check-inline" >
        <input type="date" class="form-control" min="2530-01-01" max="2566-12-31" placeholder="DD/MM/YYYY">
    </div>
    


   

    <BaseTable :heads="['เดือน', 'จำนวนวันทั้งหมด', 'จำนวนนักศึกษาทั้งหมด', 'จำนวนเบี้ยเลี้ยงทั้งหมด']">
    </BaseTable>
    
</template>

<script setup>
import BaseTable from '@/components/Component/BaseTable.vue';
const tableHeads = ref(['เดือน', 'จำนวนวันทั้งหมด', 'จำนวนนักศึกษาทั้งหมด', 'จำนวนเบี้ยเลี้ยงทั้งหมด']);

function testswitch() {
    const selectedOption = document.querySelector('input[name="radiotest"]:checked').value;
    
    if (selectedOption === 'year') {
        tableHeads.value = ['ปี', 'คอลัมน์2', 'คอลัมน์3', 'คอลัมน์4'];
    } else if (selectedOption === 'month') {
        tableHeads.value = ['เดือน', 'จำนวนวันทั้งหมด', 'จำนวนนักศึกษาทั้งหมด', 'จำนวนเบี้ยเลี้ยงทั้งหมด'];
    } else if (selectedOption === 'customized') {
        tableHeads.value = ['คอลัมน์1', 'คอลัมน์2', 'คอลัมน์3', 'คอลัมน์4'];
    }
}
</script>

<style scoped></style> -->
<template>
    <LayoutMenuName page-name="รายงานเบี้ยเลี้ยง" />
    
    <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="radiotest" id="year" value="year" @change="testswitch">
        <label class="form-check-label" for="year">ปี</label>
    </div>

    <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="radiotest" id="month" value="month" @change="testswitch">
        <label class="form-check-label" for="month">เดือน</label>
    </div>

    <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="radiotest" id="customized" value="customized" @change="testswitch">
        <label class="form-check-label" for="customized">กำหนดเอง</label>
    </div>

    <!-- ... ส่วนอื่น ๆ ของโค้ด ... -->

    <BaseTable :heads="tableHeads">
    </BaseTable>
</template>

<script setup>
import { ref } from 'vue';
import BaseTable from '@/components/Component/BaseTable.vue';

const tableHeads = ref(['เดือน', 'จำนวนวันทั้งหมด', 'จำนวนนักศึกษาทั้งหมด', 'จำนวนเบี้ยเลี้ยงทั้งหมด']);

function testswitch() {
    const selectedOption = document.querySelector('input[name="radiotest"]:checked').value;
    
    if (selectedOption === 'year') {
        tableHeads.value = ['ปี', 'จำนวนวันทั้งหมด', 'จำนวนนักศึกษาทั้งหมด', 'จำนวนเบี้ยเลี้ยงทั้งหมด'];
    } else if (selectedOption === 'month') {
        tableHeads.value = ['เดือน', 'จำนวนวันทั้งหมด', 'จำนวนนักศึกษาทั้งหมด', 'จำนวนเบี้ยเลี้ยงทั้งหมด'];
    } else if (selectedOption === 'customized') {
        tableHeads.value = ['วัน', 'จำนวนวันทั้งหมด', 'จำนวนนักศึกษาทั้งหมด', 'จำนวนเบี้ยเลี้ยงทั้งหมด'];
        
    }
}

</script>

<style scoped></style>
