<template>
  <div class="row border-bottom nm-color mb-3">
    <span class="h4 fw-bold text-custom">{{ pageName }}</span>
  </div>
</template>

<script setup>

  const prop = defineProps({
    pageName: String
  })

</script>

<style scoped>
  .nm-color {
    border-color: var(--bs-border-color) !important;
  }
</style>