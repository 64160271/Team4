<template>
    <div class="row mb-3">
        <span>ข้อมูลการทำงาน</span>
    </div>

    <hr>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">พี่เลี้ยง <font color="#e1032b">*</font></label>
            <select v-model=data.mentor name="menter" id="menter" class="form-select" required>
                <option disabled selected value="">--- เลือก ---</option>
                <option v-for="(mentor, index) in mentors" :value="mentor">{{ mentor }}</option>
            </select>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">ฝ่าย</label>
            <select v-model="data.section" name="faction" id="faction" class="form-select" required>
                <option disabled selected value="">--- เลือก ---</option>
                <option v-for="(section, index) in sections" :value="secton">{{ section }}</option>
            </select>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">แผนก</label>
            <select v-model="data.department" name="department" id="department" class="form-select" required>
                <option disabled selected value="">--- เลือก ---</option>
                <option v-for="(department, index) in departments" :value="department">{{ department.dept_name }}</option>
            </select>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">ตำแหน่งงาน</label>
            <select v-model="data.role" name="position" id="position" class="form-select" required>
                <option disabled selected value="">--- เลือก ---</option>
                <option v-for="(role, index) in roles" :value="role">{{ role }}</option>
            </select>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { onUnmounted, onMounted } from 'vue'
import axios from 'axios';

const mentors = ref({})
const sections = ref({})
const departments = ref({})
const roles = ref({})

const data = ref({
    mentor: '',
    section: '',
    department: '',
    role: '',
})

const prop = defineProps({
    setParentData: Function
})

const getAllMentor = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/mentors`)
        .then((response) => {
            majors.value = response.data
        })
}

const getAllSection = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/sections`)
        .then((response) => {
            majors.value = response.data
        })
}

const getAllDepartment = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/departments`)
        .then((response) => {
            majors.value = response.data
        })
}

const getAllRole = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/roles`)
        .then((response) => {
            majors.value = response.data
        })
}

onMounted(() => {
    getAllMentor(),
    getAllSection(),
    getAllDepartment(),
    getAllRole()
})

onUnmounted(() => {
    prop.setParentData(5, data.value)
})
</script>

<style scoped>

</style>