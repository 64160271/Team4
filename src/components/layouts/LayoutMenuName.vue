<template>
  <div class="row mb-3 pt-4 bg-white">
    <span class="col-auto" v-if="backButton">
      <svg @click="$router.go(-1)" class="cursor-p" xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="24">
        <path d="m368-417 202 202-90 89-354-354 354-354 90 89-202 202h466v126H368Z" />
      </svg>
    </span>
    <span class="col h4 fw-bold text-custom"
      :class="backButton ? 'p-0' : 'px-5'">{{ pageName }}
    </span>
  </div>
</template>

<script setup>
const prop = defineProps({
  pageName: String,
  backButton: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.nm-color {
  border-color: var(--bs-border-color) !important;
}

div {
  margin-left: -48px !important;
  margin-right: -48px !important;
  /*     z-index: 50;
    width: 100%; */
}
</style>