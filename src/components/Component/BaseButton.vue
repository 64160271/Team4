<template>
  <button class="btn outline-red" v-bind="$attrs">
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

.sm {
  height: 38px;
}
</style>
