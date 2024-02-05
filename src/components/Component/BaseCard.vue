<!--
  BaseCard
  เป็น component หลักของการ์ดในระบบ
  Props:
    title: หัวข้อการ์ด
    sub: หัวข้อย่อย
    content: เนื้อหาของการ์ด
  Author : Team 4
  Created date : 14-11-2566
-->

<template>
  <div class="col-md-3">
    <div
      :class="{ 'card-hover': hover }"
      class="card h-100 content border shadow-sm text-center"
    >
      <div class="card-body">
        <slot name="before-title"></slot>

        <h6 class="card-title py-2 fw-bold">{{ title }}</h6>

        <div class="row py-2">
          <label>{{ sub }}</label>
        </div>

        <div class="row py-2">
          <label>{{ content }}</label>
        </div>

        <div class="row py-2">
          <slot name="after-title"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: [Boolean, String],
  image: [Boolean, String],
  sub: String,
  content: String,
  hover: [Boolean, String],
});
</script>

<style scoped>
.card-hover:hover {
  border-color: var(--main-color) !important;
  color: var(--main-color) !important;
}
</style>
