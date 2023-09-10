<template>
    <div class="row mb-3">
        <span>สัญญาการจ้างงาน</span>
    </div>

    <hr>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">ประเภทพนักงาน</label>
            <select v-model="data.emp_type" name="type" id="type" class="form-select" required>
                <option disabled selected value="">--- เลือก ---</option>
                <option v-for="(intern_type, index) in internType">{{ intern_type }}</option>
            </select>
        </div>

        <div class="col">
            <label for="" class="form-label">เลขที่สัญญาจ้าง</label>
            <input v-model="data.contract_number" type="text" class="form-control" placeholder="10000">
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">วันที่เริ่มฝึกงาน </label>
            <input v-model="data.start_date" type="date" class="form-control" placeholder="DD/MM/YYYY">
        </div>

        <div class="col">
            <label for="" class="form-label">วันที่ทำงานวันสุดท้าย</label>
            <input v-model="data.last_work_date" type="date" class="form-control" placeholder="DD/MM/YYYY" >
        </div>
        
        <div class="col">
            <label for="" class="form-label">วันที่สิ้นสุดสัญญาการฝึกงาน</label>
            <input v-model="data.contract_end_date" type="date" class="form-control" placeholder="DD/MM/YYYY">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { onUnmounted, onMounted } from 'vue'

const internType = ref([
    'นักศึกษาฝึกงาน',
    'พนักงานประจำ',
    'พนักงานพาร์ทไทม์'
])

const data = ref({
    emp_type: '',
    contract_number: '',
    start_date: '',
    last_work_date: '',
    contract_end_date: '',
})

const prop = defineProps({
    setParentData: Function
})

onUnmounted(() => {
    prop.setParentData(3, data.value)
})

</script>

<style scoped>

</style>