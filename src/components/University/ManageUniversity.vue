<template>
    <LayoutMenuName page-name="จัดการข้อมูลมหาวิทยาลัย" />

    <div class="row">
        <button class="col-2 btn outline-red ms-auto" @click="isOpen = true">เพิ่มมหาวิทยาลัย</button>
    </div>

    <BaseModal v-if="isOpen == true" 
        title="เพิ่มข้อมูลมหาวิทยาลัย"
        @close="isOpen = !isOpen">
        <div class="col-md-12">
        <div class="text-center">
            <img
                id="blah"
                src="#"
                alt=""
                class="img bg-grays-200">
        </div>

        <div class="row mt-4">
            <button id="picture" class="mx-auto col-sm-6 btn btn-sm outline-red position-relative">
            <input 
                id="img-upload"
                type="file"
                accept="image/*"
                @change="showImg" />
            <svg
                width="35"
                height="35"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
            <path d="M19.9474 36.5556H5.21053C4.09383 36.5556 3.02286 36.0873 2.23323 35.2538C1.44361 34.4203 1 33.2899 1 32.1111V12.1111C1 10.9324 1.44361 9.80191 2.23323 8.96841C3.02286 8.13492 4.09383 7.66667 5.21053 7.66667H7.31579C8.43249 7.66667 9.50345 7.19841 10.2931 6.36492C11.0827 5.53142 11.5263 4.40096 11.5263 3.22222C11.5263 2.63285 11.7481 2.06762 12.1429 1.65087C12.5377 1.23413 13.0732 1 13.6316 1H26.2632C26.8215 1 27.357 1.23413 27.7518 1.65087C28.1466 2.06762 28.3684 2.63285 28.3684 3.22222C28.3684 4.40096 28.812 5.53142 29.6017 6.36492C30.3913 7.19841 31.4622 7.66667 32.5789 7.66667H34.6842C35.8009 7.66667 36.8719 8.13492 37.6615 8.96841C38.4511 9.80191 38.8947 10.9324 38.8947 12.1111V19.8889"
                stroke="var(--main-color)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round" />
            <path
                class="stroke-white"
                d="M34.6854 41.0026V27.6693M34.6854 27.6693L41.0012 34.3359M34.6854 27.6693L28.3697 34.3359M19.9486 27.6693C21.6237 27.6693 23.2301 26.9669 24.4145 25.7166C25.599 24.4664 26.2644 22.7707 26.2644 21.0026C26.2644 19.2345 25.599 17.5388 24.4145 16.2886C23.2301 15.0383 21.6237 14.3359 19.9486 14.3359C18.2736 14.3359 16.6671 15.0383 15.4827 16.2886C14.2982 17.5388 13.6328 19.2345 13.6328 21.0026C13.6328 22.7707 14.2982 24.4664 15.4827 25.7166C16.6671 26.9669 18.2736 27.6693 19.9486 27.6693Z"
                stroke="var(--main-color)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round" />
            </svg>
               ตรามหาวิทยาลัย
            </button>
            <div class="col-md-12 mt-3" >
                <BaseInput label="ชื่อมหาวิทยาลัย" v-model="formData.uni_name" placeholder="มหาวิทยาลัย"/>
            </div>
        </div>
        
    </div>

    </BaseModal>


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
                                    <button class="btn bg-custom">
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

   
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import BaseButton from '../Component/BaseButton.vue';
import BaseInput from '../Component/BaseInput.vue';
import BaseModal from '../Component/BaseModal.vue';

const showDetail = ref([])
const universities = ref({})
const isOpen = ref(false) 
const formData =ref({
    uni_name:'',
    uni_logo:''
})

const getAllUniversity = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/universities/related`)
        .then((response) => {
            universities.value = response.data
            console.log(universities.value)
        })
}

function showImg() {
    const imgUpload = document.getElementById("img-upload")

    if (imgUpload.files[0] != undefined) {
        formData.value.uni_logo = imgUpload.files[0]
    }

    if (formData.value.uni_logo) {
        blah.src = URL.createObjectURL(formData.value.uni_logo)
    }
}

onMounted(() => {
    getAllUniversity()
})

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
</style>