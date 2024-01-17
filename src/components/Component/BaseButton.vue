<!--
 BaseButton
 Component สำหรับปุ่ม
-->

<template>
  <button class="btn outline-red" v-bind="$attrs">
    <slot name="before-text"></slot>
    <span class="my-auto">{{ label }}</span>
    <slot name="after-text"></slot>
  </button>
</template>

<script setup>
const prop = defineProps({
  label: [String, Boolean],
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
