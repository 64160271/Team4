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
.sect {
  margin-top: 75px !important;
}
</style>
