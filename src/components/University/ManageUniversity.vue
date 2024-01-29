<template>
    <LayoutMenuName page-name="จัดการมหาวิทยาลัย" />

    <div class="row mb-4">
        <div class="col-md-3 my-auto">
            <SearchBox class="my-auto" />
        </div>

        <BaseButton label="เพิ่มมหาวิทยาลัย" class="col-md-2 ms-auto" @click="isOpen = true">
            <template #before-text>
                <ManageUniversityIcon class="fill-red" />
            </template>
        </BaseButton>
    </div>

    <BaseModal v-if="isOpen == true" @save="formSubmit" title="เพิ่มข้อมูลมหาวิทยาลัย" @close="isOpen = false">
        <div class="col-md-12">
            <div class="text-center">
                <img id="blah" src="#" alt="" class="img-add bg-grays-200">
            </div>

            <div class="row mt-4">
                <button id="picture" class="mx-auto col-sm-6 btn btn-sm outline-red position-relative">
                    <input id="img-upload" type="file" accept="image/*" @change="showImg" />
                    <CameraLogoVue />
                    ตรามหาวิทยาลัย
                </button>
                <div class="col-md-12 mt-3">
                    <BaseInput label="ชื่อมหาวิทยาลัย" v-model="formData.uni_name" placeholder="มหาวิทยาลัย" />
                </div>
            </div>

        </div>

    </BaseModal>


    <div v-for="(university, index) in universities" class="row w-75 mx-auto mt-2">
        <div class="card outline-black mb-3">
            <div class="card-body">
                <div class="row" @click="showDetail[index] = !showDetail[index]">
                    <label class="col">
                        <span class="me-2">
                            <img class="img" :src="university.uni_image_path" height="40" width="40">
                        </span>
                        {{ university.uni_name }}
                    </label>
                    <EditIcon class="ms-auto col-auto" />
                    <div class="col-auto dropdown-toggle my-auto"></div>
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
import SearchBox from '../Component/SearchBox.vue';
import ManageUniversityIcon from '../icons/ManageUniversityIcon.vue';
import { useRouter } from 'vue-router';
import CameraLogoVue from '../icons/CameraLogo.vue';
import EditIcon from '../icons/EditIcon.vue';

const router = useRouter()
const showDetail = ref([])
const universities = ref({})
const isOpen = ref(false)
const formData = ref({
    uni_name: 'มหาวิทยาลัย',
    uni_file: '',
})

const getAllUniversity = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/universities/related`)
        .then((response) => {
            universities.value = response.data
        })
}

function showImg() {
    const imgUpload = document.getElementById("img-upload")

    if (imgUpload.files[0] != undefined) {
        formData.value.uni_file = imgUpload.files[0]
    }

    if (formData.value.uni_file) {
        blah.src = URL.createObjectURL(formData.value.uni_file)
    }
}

async function formSubmit() {
    await axios.post(`${import.meta.env.VITE_API_HOST}/universities`, formData.value, { headers: { "Content-Type": "multipart/form-data" } })
    router.go()
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

.img {
    width: 80px;
    height: 80px;
    border: none;

}

.img-add {
    height: 150px;
    width: 150px;
    border-radius: 50%;
    border: 1px solid var(--main-color);
}
</style>