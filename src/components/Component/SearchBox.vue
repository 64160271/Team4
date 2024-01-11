<template>
    <div class="input-group">
        <span class="bg-grays-200 input-group-text" id="basic-addon1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search"
                viewBox="0 0 16 16">
                <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
        </span>
        <input :modelValue="modelValue" type="text" id="search-bar" class="bg-grays-200 form-control" placeholder="Search"
            aria-label="" aria-describedby="basic-addon1" @input="emit('search', $event.target.value)" />
    </div>
</template>

<script setup>
const emit = defineEmits(['search'])

const props = defineProps({
    placeholder: {
        type: [Boolean, String],
    },
    modelValue: {
        type: [Boolean, String],
        default: false,
    },
})
</script>

<style scoped></style>