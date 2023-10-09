<template>
  <label for="" class="form-label text-gray"
    >{{ label }}
    <span class="text-danger" v-if="required">*</span>
  </label>
  <input
    :value="value"
    :placeholder="placeholder"
    :type="input_type"
    :model="model"
    class="form-control"
    :readonly="readonly"
    :required="required"
  />
</template>

<script setup>
const prop = defineProps({
  label: {
    type: [Boolean, String],
  },
  placeholder: {
    type: [Boolean, String],
  },
  model: {
    type: String,
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
});
</script>

<style scoped></style>
