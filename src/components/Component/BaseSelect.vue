<template>
  <label for="" class="form-label text-gray">{{ label }}
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
    type: String,
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

async function updatedValue() {
  emit('update:modelValue', event.target.value)
}

const firstOptionType = computed(() => {
  if (!props.options) {
    return null;
  }

  return props.options[0] ? typeof props.options[0] : null;
});
</script>

<style scoped></style>
