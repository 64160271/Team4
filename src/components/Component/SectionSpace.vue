<!--
    SectionSpace
    เป็น component หลักของการเว้นพื้นที่ว่างในระบบ
    Author : Team 4
    Created date : 01-02-2567
-->

<template>
  <div class="card px-4 border position-relative" :class="{ sect: !noSpace }">
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  noSpace: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
</style>
