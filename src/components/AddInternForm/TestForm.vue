<template>
    <label for="" class="row">{{ address.house_number }}</label>
    <input v-model="address.house_number" class="form-control" type="text" name="" id="">
    <button class="ms-3 btn btn-success">
        ส่ง
    </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useInternFormData } from "../../stores/addInternFormData";
import useVuelidate from '@vuelidate/core' // validate
import { required } from '@vuelidate/validators' // validate

const formData = useInternFormData()
const address = ref(formData.address)
const workInfo = ref(formData.work_info)
const rules = {
    house_number: { required }
}

const v$ = useVuelidate(rules, formData.value)



onMounted(async () => {
    address.value = formData.value.address
})
</script>

<style scoped></style>