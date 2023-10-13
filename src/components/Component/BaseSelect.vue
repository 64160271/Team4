<template>
    <label for="" class="form-label text-gray">{{ label }}
        <span class="text-danger" v-if="required">*</span>
    </label>
    <select 
        class="form-select" 
        :value="modelValue"  
        :required="required" 
        @click="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
    >
        <option v-for="option in options">
            
        </option>
    </select>
</template>

<script setup>
defineProps({
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
        default: false,
    },
    options: [Array, Object]
});
</script>

<style scoped></style>