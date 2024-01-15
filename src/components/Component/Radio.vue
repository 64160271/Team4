<template>
    <div class="form-check">
        <input class="form-check-input" 
            :type=type
            :value="value"
            v-bind="$attrs"
            :id="id"
            @change="updatedValue"
        >
        <label class="form-check-label" :for="id">
            {{ label }}
        </label>
    </div>
</template>

<script setup>
const emit = defineEmits()

const props = defineProps({
    type: [String, Boolean],
    modelValue: {
        type: [String, Number, Boolean],
        default: "",
    },
    label: {
        type: [String, Boolean],
        default: "",
    },
    id: [String, Boolean],
    value: [String, Boolean]
})

async function updatedValue() {
  emit('update:modelValue', event.target.value)
}

</script>

<style scoped></style>
