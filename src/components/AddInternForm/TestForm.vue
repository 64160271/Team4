<template>
    <label for="" class="row">{{ address.te }}</label>
    <input v-model="address.te" type="text" name="" id="">
</template>

<script setup>
import { ref, onMounted, toRaw } from 'vue'
import { useInternFormData } from "../../stores/addInternFormData";

const formData = useInternFormData()
const address = ref(formData.address)
const workInfo = ref(formData.work_info)

onMounted(async () => {
    address.value = formData.value.address
})
</script>

<style scoped></style>