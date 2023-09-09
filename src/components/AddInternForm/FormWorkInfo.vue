<template>
    <div class="row mb-3">
        <span>ข้อมูลการทำงาน</span>
    </div>

    <hr>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">พี่เลี้ยง <font color="#e1032b">*</font></label>
            <select name="menter" id="menter" class="form-control" required>
                <option value="-">-</option>
            </select>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">ฝ่าย</label>
            <select name="faction" id="faction" class="form-control" required>
                <option value="-">-</option>
            </select>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">แผนก</label>
            <select name="department" id="department" class="form-control" required>
                <option value="-">-</option>
            </select>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">ตำแหน่งงาน</label>
            <select name="position" id="position" class="form-control" required>
                <option value="-">-</option>
            </select>
        </div>
    </div>

</template>

<script setup>

</script>

<style scoped>

</style>