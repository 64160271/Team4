<template>
    <div class="row">
        <span class="col h5">จัดการข้อมูลมหาวิทยาลัย</span>

        <button class="col-2 btn outline-red ms-auto">เพิ่มมหาวิทยาลัย</button>
    </div>

    <div class="row w-75 mx-auto mt-3" v-for="(university, index) in universities">
        <div class="card outline-black">
            <div class="card-body">
                <div class="row" @click="showDetail[index] = !showDetail[index]">
                    <label class="col">{{ university.uni_name }}</label>
                    <div class="col-auto dropdown-toggle"></div>
                </div>
                <Transition>
                    <div class="row row-cols-3 mt-3" v-if="showDetail[index]">
                        <div class="col mb-3" v-for="faculty in university.faculties">
                            <div class="card">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item bg-red text-white">คณะ {{ faculty.fac_name }}</li>
                                    <ol class="list-group-item list-group-numbered">
                                        สาขา
                                        <li v-for="major in faculty.majors" class="list-group-item border-0">{{ major.maj_name }}</li>
                                    </ol>
                                </ul>
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
    await axios.get(`${import.meta.env.VITE_API_HOST}/universities`)
        .then((response) => {
            universities.value = response.data
            console.log(universities.value)
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