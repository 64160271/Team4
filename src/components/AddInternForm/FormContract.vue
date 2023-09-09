<template>
    <div class="row mb-3">
        <span>สัญญาการจ้างงาน</span>
    </div>

    <hr>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">ประเภทพนักงาน</label>
            <select name="faculty" id="faculty" class="form-control" required>
                <option value="นักศึกษาฝึกงาน">นักศึกษาฝึกงาน</option>
                <option value="พนักงานประจำ">พนักงานประจำ</option>
                <option value="พนักงานพาร์ทไทม์">พนักงานพาร์ทไทม์</option>
            </select>
        </div>

        <div class="col">
            <label for="" class="form-label">เลขที่สัญญาจ้าง</label>
            <input type="text" class="form-control" placeholder="10000">
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">วันที่เริ่มฝึกงาน </label>
            <input type="date" class="form-control" placeholder="DD/MM/YYYY">
        </div>

        <div class="col">
            <label for="" class="form-label">วันที่ทำงานวันสุดท้าย</label>
            <input type="date" class="form-control" placeholder="DD/MM/YYYY" >
        </div>
        
        <div class="col">
            <label for="" class="form-label">วันที่สิ้นสุดสัญญาการฝึกงาน</label>
            <input type="date" class="form-control" placeholder="DD/MM/YYYY">
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>

</style>