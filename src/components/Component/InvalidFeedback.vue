<template>
    <span v-for="error in errors" :key="error.$uid" class="invalid-feedback">
        <template v-if="error.$validator == 'required'">
            กรุณากรอกข้อมูล
        </template>
        <template v-else>
            {{ error.$message }}
        </template>
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