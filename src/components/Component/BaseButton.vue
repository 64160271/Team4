<template>
  <button class="btn col outline-red">
    {{ label }}
  </button>
</template>

<script setup>
const prop = defineProps({
  label: [Boolean, String],
});
</script>

<style scoped>
.btn {
  height: 50px;
}
</style>
