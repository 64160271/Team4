<!--
 FormAddress
 Display address input form
 Author : Rawich Piboonsin
 Created date : 04-09-2566
-->

<template>
    <div class="row mb-3">
        <span>ข้อมูลที่อยู่ (สามารถข้ามได้)</span>
    </div>

    <hr>

    <div class="row mb-4">
        <div class="col">
            <label
for=""
class="form-label">บ้านเลขที่ </label>
            <input
v-model="data.house_number"
type="text"
class="form-control"
placeholder="123/123">
        </div>

        <div class="col">
            <label
for=""
class="form-label">หมู่ </label>
            <input
v-model="data.village_number"
type="text"
class="form-control"
placeholder="0">
        </div>

        <div class="col">
            <label
for=""
class="form-label">ซอย</label>
            <input
v-model="data.alley"
type="text"
class="form-control"
placeholder="ซอย">
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label
for=""
class="form-label">ถนน </label>
            <input
v-model="data.street"
type="text"
class="form-control"
placeholder="ถนน">
        </div>

        <div class="col">
            <label
for=""
class="form-label">ตำบล/แขวง </label>
            <input
id="district"
v-model="data.subdistrict"
type="text"
class="form-control"
placeholder="ตำบล">
        </div>

        <div class="col">
            <label
for=""
class="form-label">อำเภอ/เขต </label>
            <input
id="amphoe"
v-model="data.district"
type="text"
class="form-control"
placeholder="อำเภอ">
        </div>
    </div>

    <div class="row mb-5">
        <div class="col">
            <label
for=""
class="form-label">จังหวัด </label>
            <input
id="province"
v-model="data.province"
type="text"
class="form-control"
placeholder="ัจังหวัด">
        </div>

        <div class="col">
            <label
for=""
class="form-label">รหัสไปรษณีย์ </label>
            <input
id="zipcode"
v-model="data.post_code"
type="text"
class="form-control"
placeholder="10000">
        </div>
    </div>

    <div class="row mb-3">
        <span>ข้อมูลติดต่อ</span>
    </div>

    <hr>

    <div class="row mb-5">
        <div class="col">
            <label
for=""
class="form-label">เบอร์โทรศัพท์มือถือ <font color="#e1032b">*</font></label>
            <input
v-model="data.tel"
type="text"
class="form-control"
placeholder="099-999-9999">
        </div>

        <div class="col">
            <label
for=""
class="form-label">อีเมลส่วนตัว <font color="#e1032b">*</font></label>
            <input
v-model="data.email"
name="email"
type="email"
class="form-control"
placeholder="example@gmail.com">
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { onUnmounted, onMounted } from 'vue'
import { useAddressStore } from '../../stores/formData';

const data = ref(useAddressStore())
/* const data = ref({
    house_number: '',
    village_number: Number(),
    alley: '',
    street: '',
    subdistrict: '',
    district: '',
    province: '',
    post_code: Number(),
    tel: '',
    email: '',
}) */

const prop = defineProps({
    setParentData: Function
})

/* onMounted(() => {
    let recaptchaScript1 = document.createElement('script')
    let recaptchaScript2 = document.createElement('script')
    let recaptchaScript3 = document.createElement('script')
    let recaptchaScript4 = document.createElement('script')

    recaptchaScript4.setAttribute('src', 'https://code.jquery.com/jquery-3.2.1.min.js')
    recaptchaScript1.setAttribute('src', 'https://earthchie.github.io/jquery.Thailand.js/jquery.Thailand.js/dependencies/JQL.min.js')
    recaptchaScript2.setAttribute('src', 'https://earthchie.github.io/jquery.Thailand.js/jquery.Thailand.js/dependencies/typeahead.bundle.js')
    recaptchaScript3.setAttribute('src', 'https://earthchie.github.io/jquery.Thailand.js/jquery.Thailand.js/dist/jquery.Thailand.min.js')

    document.head.appendChild(recaptchaScript1)
    document.head.appendChild(recaptchaScript2)
    document.head.appendChild(recaptchaScript3)
    document.head.appendChild(recaptchaScript4)
}) */

onMounted(() => {
    console.log(data.value)
})

onUnmounted(() => {
    prop.setParentData(2, data.value)
})
</script>

<style scoped>
hr {
    background-color: var(--main-color);
    height: 1px;
    border: none;
}

span {
    color: var(--main-color);
    font-size: 1.1rem;
}

</style>