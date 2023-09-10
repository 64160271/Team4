<template>
    <div class="row mb-3">
        <span>ข้อมูลส่วนตัว</span>
    </div>

    <hr>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">คำนำหน้า (ไทย) <font color="#e1032b">*</font></label>
            <select @change="setPrefix(dummyPrefix)" v-model="dummyPrefix" name="prefix_thai" id="prefix_thai" class="form-select" required>
                <option disabled selected value="">--- เลือก ---</option>
                <option v-for="(prefix, index) in prefixes" :value="prefix">{{ prefix[0] }}</option>
            </select>
        </div>

        <div class="col">
            <label for="" class="form-label">คำนำหน้า (อังกฤษ)<font color="#e1032b">*</font></label>
            <input v-model="data.prefix[1]" type="text" class="form-control" required readonly>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">ชื่อจริง (ไทย) <font color="#e1032b">*</font></label>
            <input v-model="data.fname[0]" type="text" class="form-control" placeholder="พนิดา" required>
        </div>

        <div class="col">
            <label for="" class="form-label">ชื่อจริง (อังกฤษ) <font color="#e1032b">*</font></label>
            <input v-model="data.fname[1]" type="text" class="form-control" placeholder="Phanida" required>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">นามสกุล (ไทย) <font color="#e1032b">*</font></label>
            <input v-model="data.lname[0]" type="text" class="form-control" placeholder="ถำวาปี" required>
        </div>

        <div class="col">
            <label for="" class="form-label">นามสกุล (อังกฤษ) <font color="#e1032b">*</font></label>
            <input v-model="data.lname[1]" type="text" class="form-control" placeholder="Thamwapee" required>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">ชื่อเล่น (ไทย) <font color="#e1032b">*</font></label>
            <input v-model="data.nickname[0]" type="text" class="form-control" placeholder="ไอซ์" required>
        </div>

        <div class="col">
            <label for="" class="form-label">ชื่อเล่น (อังกฤษ) <font color="#e1032b">*</font></label>
            <input v-model="data.nickname[1]" type="text" class="form-control" placeholder="Ice" required>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">เลขบัตรประชาชน/พาสปอร์ต <font color="#e1032b">*</font></label>
            <input v-model="data.citizen_id" type="text" class="form-control" placeholder="xxxxxxxxxxxxx" required>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">วัน/เดือน/ปีเกิด <font color="#e1032b">*</font></label>
            <input @change="getAge(data.birth_date)" v-model="data.birth_date" type="date" class="form-control"
                placeholder="DD/MM/YYYY" required>
        </div>

        <div class="col">
            <label for="" class="form-label">อายุ</label>
            <input v-model="data.age" type="text" class="form-control" placeholder="0" disabled>
        </div>

        <div class="col">
            <label for="" class="form-label">เพศ <font color="#e1032b">*</font></label>
            <select v-model="data.gender" name="gender" id="gender" class="form-select" required>
                <option disabled selected value="">--- เลือก ---</option>
                <option v-for="gender in genders" :value="gender">{{ gender }}</option>
            </select>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">หมู่เลือด <font color="#e1032b">*</font></label>
            <select v-model="data.blood_type" name="blood" id="blood" class="form-select" required>
                <option disabled selected value="">--- เลือก ---</option>
                <option v-for="blood_type in bloodTypes" :value="blood_type">{{ blood_type }}</option>
            </select>
        </div>

        <div class="col">
            <label for="" class="form-label">น้ำหนัก (กิโลกรัม)</label>
            <input v-model="data.weight" type="text" class="form-control" placeholder="50.00">
        </div>

        <div class="col">
            <label for="" class="form-label">ส่วนสูง (เซนติเมตร)</label>
            <input v-model="data.height" type="text" class="form-control" placeholder="170.00">
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">สัญชาติ <font color="#e1032b">*</font></label>
            <input v-model="data.nationality" type="text" class="form-control" placeholder="ไทย" required>
        </div>

        <div class="col">
            <label for="" class="form-label">เชื้อชาติ <font color="#e1032b">*</font></label>
            <input v-model=data.nation type="text" class="form-control" placeholder="ไทย" required>
        </div>

        <div class="col">
            <label for="" class="form-label">ศาสนา <font color="#e1032b">*</font></label>
            <input v-model="data.religion" type="text" class="form-control" placeholder="พุทธ" required>
        </div>
    </div>

    <div class="row mb-5">
        <div class="col">
            <label for="" class="form-label">สถานภาพสมรส <font color="#e1032b">*</font></label>
            <select v-model=data.marital_status name="marital_status" id="marital_status" class="form-select" required>
                <option disabled selected value="">--- เลือก ---</option>
                <option v-for="(martial, index) in martialStatus" :value="martial">{{ martial }}</option>
            </select>
        </div>
    </div>

    <div class="row mb-3">
        <span>ข้อมูลสถานศึกษา</span>
    </div>

    <hr>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">ชื่อสถานศึกษา <font color="#e1032b">*</font></label>
            <select @change="changeFacultyData" v-model="data.university" name="university" id="university" class="form-select" required>
                <option disabled selected value="">--- เลือก ---</option>
                <option v-for="(university, index) in universities" :value="university">{{ university.uni_name }}</option>
            </select>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">คณะ <font color="#e1032b">*</font></label>
            <select @change="changeMajorData" v-model="data.faculty" name="faculty" id="faculty" class="form-select" required>
                <option disabled selected value="">--- เลือก ---</option>
                <option v-for="(faculty, index) in faculties" :value="faculty">{{ faculty.fac_name }}</option>
            </select>
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">สาขาวิชา <font color="#e1032b">*</font></label>
            <select v-model="data.major" name="major" id="major" class="form-select" required>
                <option disabled selected value="">--- เลือก ---</option>
                <option v-for="(major, index) in majors" :value="major">{{ major.maj_name }}</option>
            </select>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { onUnmounted, onMounted } from 'vue'
import axios from 'axios';

const dummyPrefix = ref('')

const universities = ref({})
const faculties = ref({})
const majors = ref({})

const prefixes = ref([
    ['นาย', 'Mr.'],
    ['นาง', 'Mrs.'],
    ['นางสาว', 'Ms.']
])

const genders = ref([
    'ชาย', 
    'หญิง',
    'ไม่ระบุ'
])

const bloodTypes = ref([
    'A', 'B', 'AB', 'O'
])

const martialStatus = ref([
    'โสด', 'มีแฟนแล้ว', 'หมั้น',
    'สมรส', 'แยกกันอยู่', 'หย่าร้าง',
    'หม้าย', 'ซับซ้อน'
])

const data = ref({
    prefix: ['', ''],
    fname: ['', ''],
    lname: ['', ''],
    nickname: ['', ''],
    citizen_id: '',
    birth_date: '',
    gender: '',
    blood_type: '',
    weight: '',
    height: '',
    nationality: '',
    nation: '',
    religion: '',
    university: '',
    faculty: '',
    major: '',
    marital_status: '',
    age: Number(0)
})

const prop = defineProps({
    setParentData: Function
})

function setPrefix(index) {
    console.log(index)
    data.value.prefix[0] = index[0]
    data.value.prefix[1] = index[1]
}

function changeFacultyData() {
    let university = data.value.university
    data.value.faculty = ''
    data.value.major = ''

    console.log(university)

    faculties.value = university.faculties
    majors.value = universities.faculties.majors
}

function getAge(birthdate) {
    birthdate = new Date(birthdate)
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear() -
        (today.getMonth() < birthdate.getMonth() ||
            (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate()));
    data.value.age = age
}

const getAllUniversity = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/universities`)
        .then((response) => {
            universities.value = response.data
        })
}

const getAllFaculty = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/faculties`)
        .then((response) => {
            faculties.value = response.data

            console.log(faculties.value)
        })
}

const getAllMajor = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/majors`)
        .then((response) => {
            majors.value = response.data
        })
}

onMounted(() => {
    getAllUniversity()
}),

onUnmounted(() => {
    prop.setParentData(1, data.value)
})

</script>

<style scoped></style>