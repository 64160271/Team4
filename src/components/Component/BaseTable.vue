<!--
    BaseTable
    เป็น component หลักของตารางในระบบ
    Props:
        heads: ข้อความที่ปรากฏบนหัวตาราง
        align: การจัดเรียงข้อความของหัวตารางแต่ละตัว
    Author : Team 4
    Created date : 14-11-2566
-->

<template>
    <div class="rounded-3">
        <table id="myTable" class="table" v-bind="$attrs">
            <thead class="bg-red">
                <tr class="tr-custom">
                    <th scope="col" v-for="(head, index) in heads" class="th-custom fw-bold col-auto" :class="{ 'border-left': (index == 0) },
                        { 'border-right': (index == heads.length - 1) },
                        { 'text-center': (align[index] == 'center') },
                        { 'text-left': (align[index] == 'left') },
                        { 'text-right': (align[index] == 'right') }">
                        {{ head }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <slot></slot>   
            </tbody>
        </table>
    </div>
</template>

<script setup>
defineProps({
    heads: Array,
    align: {
        type: Array,
        default: Array(10).fill('center')
    },
})
</script>

<style scoped>
.th-custom {
    color: white !important;
    background-color: transparent !important;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-collapse: collapse;
    overflow: hidden;
}

.tr-custom {
    line-height: 40px;
    min-height: 30px;
    height: 30px;
}

.tb-hov:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.tb-hov:hover td {
    color: var(--main-color);
}

.border-left {
    border-radius: 8px 0 0 0px;
}

.border-right {
    border-radius: 0 8px 0 0;
}
</style>