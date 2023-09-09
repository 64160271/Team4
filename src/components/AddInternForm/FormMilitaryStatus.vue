<template>
    <div class="row mb-3">
        <span>สถานภาพทางทหาร</span>
    </div>

    <hr>

    <div class="row mb-5">
        <div class="col">
            <label for="" class="form-label">สถานภาพทางทหาร</label>
            <select name="military_status" id="military_status" class="form-control" required>
                <option value="ยังไม่เกณฑ์ทหาร">ยังไม่เกณฑ์ทหาร</option>
                <option value="กำลังประจำกองทหาร">กำลังประจำกองทหาร</option>
                <option value="ผ่านการเกณฑ์ทหารมาแล้ว">ผ่านการเกณฑ์ทหารมาแล้ว</option>
                <option value="ได้รับยกเว้นการเกณฑ์ทหาร">ได้รับยกเว้นการเกณฑ์ทหาร</option>
            </select>
        </div>

        <div class="col">
            <label for="" class="form-label">เหตุผล</label>
            <input type="text" class="form-control" placeholder="">
        </div>
    </div>

</template>

<script setup>

</script>

<style scoped>

</style>