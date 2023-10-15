<template>
    <label for="" class="row">{{ addressdd.house_number }}</label>
    <div class="col">
        <input v-model="addressdd.house_number" class="form-control" type="text" name="" id=""
            :class="{ 'is-invalid': v$.address.house_number.$error }">
        <span v-for="error in v$.address.house_number.$errors" :key="error.$uid" class="invalid-feedback">
            กรุณากรอกข้อมูล
        </span>
    </div>
    <button class="ms-3 btn btn-success" @click="validate()">
        ส่ง
    </button>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useInternFormData } from "../../stores/addInternFormData";
import useVuelidate from '@vuelidate/core' // validate
import { required } from '@vuelidate/validators' // validate
import BaseCard from '../Component/BaseCard.vue'
import BaseInput from '../Component/BaseInput.vue'

const formData = useInternFormData()
const addressdd = ref(formData.address)
const workInfo = ref(formData.work_info)
const rules = {
    address: {
        house_number: { required }
    }
}

const v$ = useVuelidate(rules, formData)

async function validate() {
    const result = await v$.value.$validate()
}

onMounted(async () => {

})
</script>

<style scoped></style>