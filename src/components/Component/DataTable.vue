<template>
    <div class="rounded-3">
        <table id="myTable" class="table" v-bind="$attrs">
            <thead class="bg-red">
                <tr class="tr-custom">
                    <th scope="col" v-for="(head, index) in heads" class="th-custom fw-bold col-auto" :class="{ 'border-left': (index == 0) },
                        { 'border-right': (index == heads.length - 1) },
                        { 'text-left': !head.align },
                        { ['text-' + head.align]: head.align }">
                            {{ head.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="(item, index) in items"
                    class="tr-custom border-start border-end"
                >
                    <td v-for="head in heads" :class="{ ['text-' + head.align]: head.align }">
                        <span>{{ _.get(item, head.key) }}</span>
                        <slot :index="item" :name="head.key" v-if="!(_.get(item, head.key))"></slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import _ from 'lodash'

const props = defineProps({
    heads: [Array, Boolean],
    items: [Array, Boolean],
    hovers: [Boolean]
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

.border-left {
    border-radius: 8px 0 0 0px;
}

.border-right {
    border-radius: 0 8px 0 0;
}
</style>

