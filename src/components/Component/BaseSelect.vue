<template>
    <label for="" class="form-label text-gray">{{ label }}
        <span class="text-danger" v-if="required">*</span>
    </label>
    <select 
        class="form-select" 
        :value="modelValue"  
        :required="required" 
        @change="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
    >
        <option disabled v-if="setDefault" value="">เลือก</option>
        <option v-if="typeof(options[0]) == 'object'" :value="option[value]" v-for="option in options">
            {{ option[text] }}
        </option>

        <option v-else :value="option" v-for="option in options">
            {{ option }}
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
    },
    setDefault: {
        type: Boolean,
    },
    text: {
        type: String,
    },
    options: {
        type: [Object, Array]
    }
});
</script>

<style scoped></style>