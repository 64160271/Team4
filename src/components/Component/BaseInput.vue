<template>
  <label for="" class="form-label text-gray" v-if="label"
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
    @input="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
  />
</template>

<script setup>
defineProps({
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
});
</script>

<style scoped></style>
