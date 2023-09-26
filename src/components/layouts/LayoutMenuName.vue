<template>
  <div class="row border-bottom mb-3">
    <span class="h4 fw-bold text-custom">{{ pageName }}</span>
  </div>
</template>

<style scoped>
    .border-bottom {
        border-color: none !important;
    }
</style>

<script setup> 

const prop = defineProps({
    pageName: String
})

</script>
