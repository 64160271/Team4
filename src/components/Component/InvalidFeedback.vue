<template>
    <span v-for="error in errors" :key="error.$uid" class="invalid-feedback">
        กรุณากรอกข้อมูล
    </span>
</template>

<script setup>
defineProps({
    errors: {
        type: Array
    }
})
</script>

<style scoped></style>