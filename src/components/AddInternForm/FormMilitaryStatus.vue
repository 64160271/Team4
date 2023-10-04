<template>
    <div class="row mb-3">
        <span>สถานภาพทางทหาร</span>
    </div>

    <hr>

    <div class="row mb-5">
        <div class="col">
            <label
for=""
class="form-label">สถานภาพทางทหาร</label>
            <select
id="military_status"
v-model="data.military_status"
name="military_status"
class="form-select"
required>
                <option
disabled
selected
value="">--- เลือก ---</option>
                <option
v-for="military_status in militaryStatus"
:value="military_status">{{ military_status }}</option>
            </select>
        </div>

        <div class="col">
            <label
for=""
class="form-label">เหตุผล</label>
            <input
v-model="data.reason"
type="text"
class="form-control"
placeholder="">
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { onUnmounted } from 'vue'

const militaryStatus = ref([
    'ยังไม่เกณฑ์ทหาร',
    'กำลังประจำกองทหาร',
    'ผ่านการเกณฑ์ทหารมาแล้ว',
    'ได้รับการยกเว้นการเกณฑ์ทหาร'
])

const data = ref({
    military_status: '',
    reason: '',
})

const prop = defineProps({
    setParentData: Function
})

onUnmounted(() => {
    prop.setParentData(4, data.value)
})
</script>

<style scoped>

</style>