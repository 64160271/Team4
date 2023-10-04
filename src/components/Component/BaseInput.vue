<template>
    <div class="col">
        <label
for=""
class="form-label text-gray">
            {{ label }}
            <span
v-if="isRequired"
class="text-danger">*</span>
        </label>
        <input
type="text"
class="form-control mb-2"
required />
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