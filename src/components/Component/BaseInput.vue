<!--
 ฺBaseInput
 Component สำหรับ Input
 Props:
    label: ข้อความด้านบนกล่องข้อความ
    modelValue: ตัวแปรที่ใช้สำหรับเก็บค่าจาก Input
-->

<template>
  <label for="" class="form-label text-gray" v-if="label">{{ label }}
    <span class="text-danger" v-if="required">*</span>
  </label>
  <input :modelValue="modelValue" :type="input_type" class="form-control" :readonly="readonly" :required="required"
    @input="$emit('update:modelValue', $event.target.value)" v-bind="$attrs" :placeholder="placeholder" />
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

<style scoped>
input:focus {
  transition: 0s;
  box-shadow: none;
  outline: 2px solid rgb(0, 119, 255) !important;
  border: 1px solid white !important;
}

.is-invalid:focus {
  transition: 0s;
  box-shadow: none;
  border: 1px solid red !important;
  outline: 1px solid rgb(255, 0, 0) !important;
}
</style>
