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
    :value="modelValue"
    :placeholder="placeholder"
    :type="input_type"
    class="form-control"
    :readonly="readonly"
    :required="required"
    @input="$emit('update:modelValue', $event.target.value), valid()"
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
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
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
  rule: {
    type: [Boolean, Object]
  },
  
});
</script>

<style scoped></style>
