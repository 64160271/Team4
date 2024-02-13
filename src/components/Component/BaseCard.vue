<!--
 ฺBaseCard
 Component สำหรับการ์ด
 Props:
    title: หัวข้อการ์ด
    sub: หัวข้อย่อย
    content: เนื้อหาของการ์ด
-->

<template>
    <div class="col-md-3">
        <div class="card h-100 content border shadow-sm text-center">
            <div class="card-body">
                <h6 class="card-title py-2">{{ title }}</h6>

                <div class="row py-2">
                    <label>{{ sub }}</label>
                </div>

                <div class="row py-2">
                    <label>{{ content }}</label>
                </div>
                
                <div class="row py-2">
                    <slot></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: [Boolean, String],
    image: [Boolean, String],
    sub: String,
    content: String,
})
</script>

<style scoped>
.card:hover {
    border-color: var(--main-color) !important;
    color: var(--main-color) !important
}
</style>