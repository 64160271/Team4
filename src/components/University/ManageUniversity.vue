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

const showDetail = ref([])
const universities = ref({})

const getAllUniversity = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/universities/related`)
        .then((response) => {
            universities.value = response.data
        })
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