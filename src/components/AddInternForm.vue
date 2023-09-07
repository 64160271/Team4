<template>
    <div class="d-flex flex-column mb-3">
        <span class="h5 my-auto front">เพิ่มแบบฟอร์ม</span>

        <div class="d-flex overflow-y-auto justify-content-center inpt-box mt-3">
            <!-- <Transition name="nested" duration="550"> -->
            <div class="row w-75 my-auto" v-if="pageShow==1">
                <FormCompanyInfo />
            </div>
            <!-- </Transition> -->

            <div class="w-75" v-if="pageShow==2">
                <FormPersonalInfo />
            </div>

            <div class="w-75" v-if="pageShow==3">
                <FormAddress />
            </div>

            <div class="w-75" v-if="pageShow==4">
                <FormContract />
            </div>

            <div class="w-75" v-if="pageShow==5">
                <FormMilitaryStatus />
            </div>

            <div class="w-75" v-if="pageShow==6">
                <FormWorkInfo />
            </div>

            <div class="row w-100 mt-3" v-if="pageShow==7">
                <FormConfirmation />
            </div>
        </div>

        <hr>
        <div class="row">
            <button class="col-2 mx-auto btn outline-gray" @click="--pageShow">ย้อนกลับ</button>
            <button class="col-2 mx-auto btn outline-red ms-auto" @click="++pageShow">ถัดไป</button>
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

const pageShow = ref(1)
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