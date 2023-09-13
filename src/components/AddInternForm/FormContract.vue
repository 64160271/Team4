<template>
    <div class="row mb-3">
        <span>สัญญาการจ้างงาน</span>
    </div>

    <hr>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">ประเภทพนักงาน <font color="#e1032b">*</font></label>
            <select v-model="data.emp_type" name="type" id="type" class="form-select" required>
                <option disabled selected value="">--- เลือก ---</option>
                <option v-for="(intern_type, index) in internType">{{ intern_type }}</option>
            </select>
        </div>

        <div class="col">
            <label for="" class="form-label">เลขที่สัญญาจ้าง <font color="#e1032b">*</font></label>
            <input v-model="data.contract_number" type="text" class="form-control" placeholder="10000">
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">วันที่เริ่มฝึกงาน <font color="#e1032b">*</font></label>
            <input v-model="data.start_date" type="date" class="form-control" placeholder="DD/MM/YYYY">
        </div>

        <div class="col">
            <label for="" class="form-label">วันที่ทำงานวันสุดท้าย </label>
            <input v-model="data.last_work_date" type="date" class="form-control" placeholder="DD/MM/YYYY" >
        </div>
        
        <div class="col">
            <label for="" class="form-label">วันที่สิ้นสุดสัญญาการฝึกงาน <font color="#e1032b">*</font></label>
            <input v-model="data.contract_end_date" type="date" class="form-control" placeholder="DD/MM/YYYY">
        </div>
    </div>

    <div class="row mb-3">
        <span>ข้อมูลการทำงาน</span>
    </div>

    <hr>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">พี่เลี้ยง <font color="#e1032b">*</font></label>
            <select v-model=data.mentor name="menter" id="menter" class="form-select" required>
                <option disabled selected value="">--- เลือก ---</option>
                <option v-for="(mentor, index) in mentors" :value="mentor">{{ mentor.ment_fname + " " + mentor.ment_lname }}</option>
            </select>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">ฝ่าย <font color="#e1032b">*</font></label>
            <select v-model="data.section" name="faction" id="faction" class="form-select" required>
                <option disabled selected value="">--- เลือก ---</option>
                <option v-for="(section, index) in sections" :value="secton">{{ section.sec_name }}</option>
            </select>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">แผนก <font color="#e1032b">*</font></label>
            <select v-model="data.department" name="department" id="department" class="form-select" required>
                <option disabled selected value="">--- เลือก ---</option>
                <option v-for="(department, index) in departments" :value="department">{{ department.dept_name }}</option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { onUnmounted, onMounted } from 'vue'
import axios from 'axios'

const internType = ref([
    'นักศึกษาฝึกงาน',
    'พนักงานประจำ',
    'พนักงานพาร์ทไทม์'
])

const mentors = ref({})
const sections = ref({})
const departments = ref({})
const roles = ref({})

const data = ref({
    emp_type: '',
    contract_number: '',
    start_date: '',
    last_work_date: '',
    contract_end_date: '',
    mentor: '',
    section: '',
    department: '',
})

const prop = defineProps({
    setParentData: Function
})

const getAllMentor = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/mentors`)
        .then((response) => {
            mentors.value = response.data
        })
}

const getAllSection = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/sections`)
        .then((response) => {
            sections.value = response.data
        })
}

const getAllDepartment = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/departments`)
        .then((response) => {
            departments.value = response.data
        })
}

const getAllRole = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/roles`)
        .then((response) => {
            roles.value = response.data
        })
}

onMounted(() => {
    getAllMentor(),
    getAllSection(),
    getAllDepartment(),
    getAllRole()
})

onUnmounted(() => {
    prop.setParentData(3, data.value)
})

</script>

<style scoped>

</style>