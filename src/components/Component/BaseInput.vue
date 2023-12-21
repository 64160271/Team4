<!--
 ฺBaseInput
 Component สำหรับ Input
 Props:
    label: ข้อความด้านบนกล่องข้อความ
    modelValue: ตัวแปรที่ใช้สำหรับเก็บค่าจาก Input
-->

<template>
  <label for="" class="form-label text-gray"
    >{{ label }}
    <span class="text-danger" v-if="required">*</span>
  </label>
  <input
    :value="modelValue || value"
    :placeholder="placeholder"
    :type="input_type"
    class="form-control"
    :readonly="readonly"
    :required="required"
    @input="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
  />
</template>

<script setup>
const props = defineProps({
  label: {
    type: [Boolean, String],
  },
  placeholder: {
    type: [Boolean, String],
  },
  modelValue: {
    type: [Boolean, String],
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  value: {
    type: [Boolean, String],
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  input_type: {
    type: String,
    default: "text",
  },
  
});
</script>

<style scoped></style>
