<!--
    Fac
    หน้าจอสำหรับจัดการในส่วนคณะและสาขา
    Author : Wilailak Prathummat
    Created date : 24-08-2566
-->

<template>
    <LayoutMenuName page-name="จัดการข้อมูลมหาวิทยาลัย" />

    <div class="row">
        <button class="col-2 btn outline-red ms-auto">เพิ่มมหาวิทยาลัย</button>
    </div>


    <div v-for="(university, index) in universities" class="row w-75 mx-auto mt-2">
        <div class="card outline-black mb-3">
            <div class="card-body">
                <div class="row" @click="showDetail[index] = !showDetail[index]">
                    <label class="col">{{ university.uni_name }}</label>
                    <div class="col-auto dropdown-toggle"></div>
                </div>
                <Transition>
                    <div v-if="showDetail[index]" class="row row-cols-3 mt-3">
                        <div v-for="faculty in university.faculties" class="col mb-3">
                            <div class="card">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item bg-red text-white">คณะ {{ faculty.fac_name }}</li>
                                        <EditIcon class="position-absolute top-0 end-0 m-1 p-1 fill-white" />
                                    <ol class="list-group-item list-group-numbered">
                                        สาขา
                                        <li v-for="major in faculty.majors" class="list-group-item border-0">
                                            {{ major.maj_name }}
                                        </li>
                                    </ol>
                                </ul>
                            </div>
                        </div>

                        <div class="col my-auto">
                            <div class="card border-0">
                                <div class="card-body text-center">
                                    <button class="btn bg-custom" @click="modalOpen = !open, uniName = university.uni_name">
                                        เพิ่มคณะ
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
            </div>
        </div>
    </div>
    <BaseModal :title="uniName" v-if="modalOpen" @close="modalOpen = false" @save="submitForm">
        <div class="row g-3 align-items-center mx-4 mb-2">
            <div class="col-2">
                <label for="facultyName" class="col-form-label">คณะ</label>
            </div>
            <div class="col-9">
                <input type="text" id="facName" class="form-control">
            </div>
        </div>
        <div v-for="i in countRow" class="row g-3 align-items-center mx-4 mb-2">
            <div class="col-2">
                <label for="majorName" class="col-form-label">สาขา</label>
            </div>
            <div class="col-9">
                <input type="text" id="majorName" class="form-control">                          
            </div>
            <button type="button" class="col-md-1 btn btn-outline-secondary rounded-circle" @click="$event.target.parentElement.remove()">-</button>
        </div>       
        <div class="row">
            <button type="button" class="col-1 btn btn-outline-secondary mx-auto rounded-circle" @click="countRow++">+</button>
        </div>
    </BaseModal>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import BaseModal from '../Component/BaseModal.vue';
import EditIcon from '../icons/EditIcon.vue';
import BaseInput from '../Component/BaseInput.vue';
import { confirmation } from '../../assets/js/func';


const showDetail = ref([])
const universities = ref({})
const modalOpen = ref(false)
const uniName = ref()
const countRow = ref(1)
const formData = ref({
    faculty:{
        fac_name:''
    },
    major:[{
        maj_name:''
    }]
})

const getAllUniversity = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/universities`)
        .then((response) => {
            universities.value = response.data
            console.log(universities.value)
        })
}

onMounted(() => {
    getAllUniversity()
})

async function submitForm() {
    const result = await confirmation()
}

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
    transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}

.rounded-circle {
    border-radius: 50%;
}

.fill-white svg path {
  fill: white !important;
}
</style>