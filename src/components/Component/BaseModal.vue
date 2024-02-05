<!--
  BaseModal
  เป็น component หลักของ Modal ในระบบ
  Props:
    open: Boolean สำหรับกำหนดการเปิด/ปิด Modal
    title: หัวข้อ Modal
  Author : Team 4
  Created date : 14-11-2566
-->

<template>
  <div id="modal" class="modal" tabindex="-1" aria-hidden="true" v-show="open">
    <div
      class="modal-dialog modal-dialog-centered"
      :class="{ 'modal-lg': size == 'lg' }, { 'modal-xl': size == 'xl' }"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="exampleModalLabel" class="modal-title">{{ title }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="$emit('close')"
          ></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer justify-content-center gap-4">
          <button
            type="button"
            class="col-md-3 btn outline-gray"
            data-bs-dismiss="modal"
            @click="$emit('close')"
          >
            ยกเลิก
          </button>
          <button type="button" class="col-md-3 btn outline-red" @click="$emit('save')">
            บันทึก
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Modal } from "bootstrap";

const modal = ref();
const emit = defineEmits();

onMounted(() => {
  // กำหนดให้ modal เป็น modal แบบ bootstrap
  modal.value = new Modal("#modal", {});
  modal.value.show();
});

onUnmounted(() => {
  emit("close");
});

const props = defineProps({
  open: Boolean,
  title: String,
  size: [String, Boolean],
});
</script>

<style scoped></style>
