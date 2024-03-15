<!--
 ฺBaseInput
 Component สำหรับ Input
 Props:
    label: ข้อความด้านบนกล่องข้อความ
    modelValue: ตัวแปรที่ใช้สำหรับเก็บค่าจาก Input
-->

<template>
  <div class="col-auto my-auto" :class="{ nopadding: noPadding }">
    <label for="" class="col-form-label text-gray" v-if="label"
      >{{ label }}
      <span class="text-danger" v-if="required">*</span>
    </label>
  </div>
  <div :class="[`col-md-${inputSize}`, 'my-auto']">
    <input
      :modelValue="modelValue"
      :type="input_type"
      class="form-control"
      :readonly="readonly"
      :required="required"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      :placeholder="placeholder"
    />
  </div>
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
  noPadding: {
    type: Boolean,
    default: false,
  },
  inputSize: {
    type: [Boolean, Number],
    default: 2
  }
});
</script>

<style scoped>
input:focus {
  transition: 0s;
  box-shadow: none;
  outline: 2px solid rgb(0, 119, 255) !important;
  border: 1px solid white !important;
}
</style>
