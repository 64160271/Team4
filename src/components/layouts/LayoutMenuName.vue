<template>
  <div class="row mb-3 pt-4 bg-white">
    <span class="h4 fw-bold text-custom px-5">{{ pageName }}</span>
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

  div {
    margin-left: -48px !important;
    margin-right: -48px !important;
  }
</style>