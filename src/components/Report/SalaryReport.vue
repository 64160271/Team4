<template>
    <LayoutMenuName page-name="รายงานเบี้ยเลี้ยง" />


    <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
        <label class="form-check-label" for="inlineRadio1">1</label>
    </div>

    <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
        <label class="form-check-label" for="inlineRadio1">1</label>
    </div>
    <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
        <label class="form-check-label" for="inlineRadio1">1</label>
    </div>
    <div class="col-2 mr-200" style="justify-content: center;">
        <input type="date" class="form-control" min="2530-01-01" max="2566-12-31" placeholder="DD/MM/YYYY">
    </div>

    <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
        <label class="form-check-label" for="inlineRadio1">1</label>
    </div>
    <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
        <label class="form-check-label" for="inlineRadio1">1</label>
    </div>
    <div class="form-check form-check-inline">
        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1">
        <label class="form-check-label" for="inlineRadio1">1</label>
    </div>


    <BaseTable :heads="['เดือน', 'จำนวนวันทั้งหมด', 'จำนวนนักศึกษาทั้งหมด', 'จำนวนเบี้ยเลี้ยงทั้งหมด']">
    </BaseTable>
</template>

<script setup>
import BaseTable from '@/components/Component/BaseTable.vue';
</script>

<style scoped></style>