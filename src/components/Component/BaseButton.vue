<!--
 BaseButton
 Component สำหรับปุ่ม
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
