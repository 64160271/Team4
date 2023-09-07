<template>
    <div class="d-flex flex-column mb-3">
        <span class="h5 my-auto">เพิ่มแบบฟอร์ม</span>

        <div class="d-flex border overflow-auto flex-column justify-content-center align-items-center inpt-box mt-3 mb-3">
            <!-- <Transition name="nested" duration="550"> -->
            <div class="row w-75">
                <FormCompanyInfo />
            </div>
            <!-- </Transition> -->

            <div class="row w-75">
                <FormPersonalInfo />
            </div>

            <div class="row w-75">
                <FormAddress />
            </div>

            <div class="row w-75">
                <FormContract />
            </div>

            <div class="row w-75">
                <FormMilitaryStatus />
            </div>

            <div class="row w-75">
                <FormWorkInfo />
            </div>

            <div class="row border w-100">
                <FormConfirmation />
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
import FormContract from './AddInternForm/FormContract.vue'
import FormMilitaryStatus from './AddInternForm/FormMilitaryStatus.vue'
import FormWorkInfo from './AddInternForm/FormWorkInfo.vue'
import FormConfirmation from './AddInternForm/FormConfirmation.vue'

import { ref } from 'vue'

const show = ref(true)
</script>

<style scoped>
.inpt-box {
    height: 75vh;
}

.nested-enter-active,
.nested-leave-active {
    transition: all 0.3s ease-in-out;
}

/* delay leave of parent element */
.nested-leave-active {
    transition-delay: 0.25s;
}

.nested-enter-from,
.nested-leave-to {
    transform: translateY(30px);
    opacity: 0;
}

/* we can also transition nested elements using nested selectors */
.nested-enter-active .inner,
.nested-leave-active .inner {
    transition: all 0.3s ease-in-out;
}

/* delay enter of nested element */
.nested-enter-active .inner {
    transition-delay: 0.25s;
}

.nested-enter-from .inner,
.nested-leave-to .inner {
    transform: translateX(30px);
    /*
  	Hack around a Chrome 96 bug in handling nested opacity transitions.
    This is not needed in other browsers or Chrome 99+ where the bug
    has been fixed.
  */
    opacity: 0.001;
}
</style>