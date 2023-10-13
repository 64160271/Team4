<template>
    <div class="border rounded-3">
        <table id="myTable" class="table table-borderless" v-bind="$attrs">
            <thead class="text-center bg-red">
                <tr class="tr-custom">
                    <th scope="col" v-for="(head, index) in heads" class="th-custom fw-bold col-auto" :class="{ 'border-left': (index == 0) },
                        { 'border-right': (index == heads.length - 1) }">
                        {{ head }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <slot></slot>
            </tbody>
        </table>
    </div>
</template>

<script setup>
defineProps({
    heads: Array
})
</script>

<style scoped>
.th-custom {
    color: white !important;
    background-color: transparent !important;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-collapse: collapse;
    overflow: hidden;
}

.tr-custom {
    line-height: 40px;
    min-height: 30px;
    height: 30px;
}

.tb-hov:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.tb-hov:hover td {
    color: var(--main-color);
}

.border-left {
    border-radius: 8px 0 0 8px;
}

.border-right {
    border-radius: 0 8px 8px 0;
}
</style>