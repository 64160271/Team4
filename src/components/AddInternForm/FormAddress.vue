<template>
    <div class="row mb-3">
        <span>ข้อมูลที่อยู่</span>
    </div>

    <hr>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">บ้านเลขที่ <font color="#e1032b">*</font></label>
            <input v-model="data.house_number" type="text" class="form-control" placeholder="123/123">
        </div>

        <div class="col">
            <label for="" class="form-label">หมู่ <font color="#e1032b">*</font></label>
            <input v-model="data.village_number" type="text" class="form-control" placeholder="0" >
        </div>
        
        <div class="col">
            <label for="" class="form-label">ซอย</label>
            <input v-model="data.alley" type="text" class="form-control" placeholder="ซอย">
        </div>
    </div>

    <div class="row mb-4">
        <div class="col">
            <label for="" class="form-label">ถนน <font color="#e1032b">*</font></label>
            <input v-model="data.street" type="text" class="form-control" placeholder="ถนน">
        </div>

        <div class="col">
            <label for="" class="form-label">ตำบล/แขวง <font color="#e1032b">*</font></label>
            <input v-model="data.subdistrict" type="text" class="form-control" placeholder="ตำบล" >
        </div>
        
        <div class="col">
            <label for="" class="form-label">อำเภอ/เขต <font color="#e1032b">*</font></label>
            <input v-model="data.district" type="text" class="form-control" placeholder="อำเภอ">
        </div>
    </div>

    <div class="row mb-5">
        <div class="col">
            <label for="" class="form-label">จังหวัด <font color="#e1032b">*</font></label>
            <input v-model="data.province" type="text" class="form-control" placeholder="ัจังหวัด">
        </div>

        <div class="col">
            <label for="" class="form-label">รหัสไปรษณีย์ <font color="#e1032b">*</font></label>
            <input v-model="data.post_code" type="text" class="form-control" placeholder="10000">
        </div>
    </div>

    <div class="row mb-3">
        <span>ข้อมูลติดต่อ</span>
    </div>

    <hr>

    <div class="row mb-5">
        <div class="col">
            <label for="" class="form-label">เบอร์โทรศัพท์มือถือ <font color="#e1032b">*</font></label>
            <input v-model="data.tel" type="text" class="form-control" placeholder="099-999-9999">
        </div>

        <div class="col">
            <label for="" class="form-label">อีเมลส่วนตัว <font color="#e1032b">*</font></label>
            <input v-model="data.email" name="email" type="email" class="form-control" placeholder="example@gmail.com">
        </div>
    </div>

    
</template>

<script setup>
import { ref } from 'vue';
import { onUnmounted } from 'vue'

const data = ref({
    house_number: '',
    village_number: '',
    alley: '',
    street: '',
    subdistrict: '',
    district: '',
    province: '',
    post_code: '',
    tel: '',
    email: '',
})

const prop = defineProps({
    setParentData: Function
})

onUnmounted(() => {
    prop.setParentData(2, data.value)
})
</script>

<style scoped>

</style>