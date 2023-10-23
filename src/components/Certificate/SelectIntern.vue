<template>
    <div class="input-group">
        <div class="col-0">
            <button class="btn back" @click="$router.push('/certificates/selectSignature')">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                    <path
                        d="M11.4008 1.70312L3.10078 10.0031L11.4008 18.3031L10.0008 19.7031L0.300781 10.0031L10.0008 0.303123L11.4008 1.70312Z"
                        fill="black" />
                    <path d="M1.69922 11L1.69922 9L18.6992 9V11L1.69922 11Z" fill="black" />
                </svg>

            </button>
        </div>

        <div class="col">
            <LayoutMenuName page-name="เอกสารรับรอง > เลือกรายชื่อนักศึกษาฝึกงาน" />
        </div>

    </div>
    <div>
        <BaseTable
            :heads="['รหัสนักศึกษาฝึกงาน', 'ชื่อ-นามสกุล', 'ชื่อเล่น', 'ตำแหน่ง', 'ชื่อทีม', 'วันที่เริ่มฝึกวาน', 'วันที่สิ้นสุดฝึกงาน']">
            <tr class="tb-hov tr-custom ">
                <td scope="row" class="text-center">
                    <label class="checkbox-label">
                        <input class="checkbox" type="checkbox">
                        00001
                    </label>
                </td>
                <td scope="row" class="text-center">นางสาวคัทยา รินรดา</td>
                <td scope="row" class="text-center">โซเฟีย</td>
                <td scope="row" class="text-center">MakeWebEasy</td>
                <td scope="row" class="text-center">เกษตรศาสตร์</td>
                <td scope="row" class="text-center">28-11-2566</td>
                <td scope="row" class="text-center">28-03-2567</td>
            </tr>
        </BaseTable>
        <div class="row mb-3 mt-4 me-1">
            <BaseButton class="col-auto ms-auto " label="ยืนยัน" @click="$router.push('/certificates/previewCertificate')" />
        </div>
        

    </div>
</template>

<script setup>
import BaseButton from '../Component/BaseButton.vue';
import BaseTable from '../Component/BaseTable.vue';
</script>

<style scoped>
.checkbox {
    display: flex;
    margin-right: 10px;
    width: 25px;
    height: 25px;
    margin-bottom: 5px;
}
.back {
    display: flex;
    margin-right: 10px;
    margin-bottom: 20px;

}

.checkbox-label {
    display: flex;
    align-items: center;
    margin-left: 50px;
}
</style>