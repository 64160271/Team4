<!--
 ฺBaseSelect
 Component สำหรับ Select Dropdown
 Props:
    label: ข้อความด้านบนกล่องตัวเลือก
    modelValue: ตัวแปรที่ใช้สำหรับเก็บค่าจาก Input
    setDefault: กำหนดให้มีตัวเลือกเริ่มต้น
    options: ชุดข้อมูลของตัวเลือก
    text: ข้อความในตัวเลือก
    value: ค่าของตัวเลือกแต่ละตัว
-->

<template>
  <label for="" class="form-label text-gray" v-if="label">{{ label }}
    <span class="text-danger" v-if="required">*</span>
  </label>
  <select 
    class="form-select" 
    :value="modelValue" 
    :required="required" 
    @change="updatedValue"
    v-bind="$attrs"
   >
    <option disabled selected v-if="setDefault && firstOptionType != null" value="">{{ placeholder }}</option>
    <option 
     v-if="firstOptionType == 'object'"
     v-for="option in options" 
     :value="option[value]">
      {{ option[text] }}
    </option>

    <option v-else-if="firstOptionType != null" :value="option" v-for="option in options">
      {{ option }}
    </option>
    <option v-else disabled selected value="">{{ placeholder }}</option>
  </select>
</template>

<script setup>
import { computed } from "vue";

const emit = defineEmits()

const props = defineProps({
  label: {
    type: [Boolean, String],
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
    default: null,
  },
  setDefault: {
    type: Boolean,
    default: true,
  },
  text: {
    type: String,
  },
  options: {
    type: [Array, Object, String],
  },
  placeholder: {
    type: String,
    default: "เลือก",
  },
});

/*
 * updatedValue
 * Update ค่า modelValue และส่งไปยัง Component ที่เรียกใช้
 * param: -
 * return: null
 */
async function updatedValue() {
  emit('update:modelValue', event.target.value)
}

/* ตรวจสอบประเภทตัวแปรของตัวเลือก */
const firstOptionType = computed(() => {
  if (!props.options) {
    return null;
  }

  return props.options[0] ? typeof props.options[0] : null;
});
</script>

<style scoped></style>
