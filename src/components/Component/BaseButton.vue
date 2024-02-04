<!--
    BaseButton
    เป็น component หลักของปุ่มในระบบ
    Props:
      label: ชื่อที่ให้แสดงของปุ่ม
      back: เป็นการกำหนดค่าของปุ่ม
    Author : Team 4
    Created date : 14-11-2566
-->

<template>
  <button :class="back ? 'outline-gray': 'outline-red'" class="btn" v-bind="$attrs">
    <slot name="before-text"></slot>
    <span class="my-auto">{{ label }}</span>
    <slot name="after-text"></slot>
  </button>
</template>

<script setup>
const prop = defineProps({
  label: [String, Boolean],
  back: {
    type: Boolean,
    default: false,
  }
});
</script>

<style scoped>
.btn {
  height: 50px;
}

.sm {
  height: 38px;
}
</style>
