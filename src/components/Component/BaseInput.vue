<template>
    <div class="col">
        <label for="" class="form-label text-gray">
            {{ label }}
            <span class="text-danger" v-if="isRequired">*</span>
        </label>
        <input type="text" class="form-control mb-2" required />
    </div>
</template>

<script setup>
const prop = defineProps(
    {
        label: [Boolean, String],
        isRequired: Boolean,
    }
)
</script>

<style scoped></style>