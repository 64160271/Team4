<template>
  <label for="" class="form-label text-gray"
    >{{ label }}
    <span class="text-danger" v-if="required">*</span>
  </label>
  <select
    class="form-select"
    :value="modelValue"
    :required="required"
    @change="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
  >
    <option disabled v-if="setDefault" value="">{{ placeholder }}</option>
    <option
      v-if="firstOptionType == 'object'"
      :value="option[value]"
      v-for="option in options"
    >
      {{ option[text] }}
    </option>

    <option v-else :value="option" v-for="option in options">
      {{ option }}
    </option>
  </select>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  label: {
    type: [Boolean, String],
  },
  modelValue: {
    type: String,
  },
  required: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String,
  },
  setDefault: {
    type: Boolean,
    default: true,
  },
  text: {
    type: String,
  },
  options: {
    type: Array,
  },
  placeholder: {
    type: String,
    default: "เลือก",
  },
});

const firstOptionType = computed(() => {
  if (!props.options) {
    return null;
  }
  return props.options[0] ? typeof props.options[0] : null;
});
</script>

<style scoped></style>
