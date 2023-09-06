<template>
    <div class="d-flex flex-column mb-3">
        <span class="h5 my-auto">เพิ่มแบบฟอร์ม</span>

        <div class="d-flex justify-content-center align-items-center inpt-box text-center mt-3">
            <div class="row w-75">
                <FormCompanyInfo />
            </div>
        </div>

        <div class="row">
            <button class="col-2 mx-auto btn outline-gray">ยกเลิก</button>
            <button class="col-2 mx-auto btn outline-red ms-auto">ถัดไป</button>
        </div>
    </div>
</template>

<script setup>
import FormCompanyInfo from './AddInternForm/FormCompanyInfo.vue'
import FormPersonalInfo from './AddInternForm/FormPersonalInfo.vue'
import FormAddress from './AddInternForm/FormAddress.vue'
import FormContract from './AddInternForm/FormCompanyInfo.vue'
import FormMilitaryStatus from './AddInternForm/FormMilitaryStatus.vue'
import FormWorkInfo from './AddInternForm/FormWorkInfo.vue'

</script>

<style scoped>
.inpt-box {
    height: 70vh;
}

</style>