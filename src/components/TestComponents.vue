<template>
    <div class="row mb-5">
        <div class="row mb-3">
            <div class="col-md-3">
                <BaseInput label="ตัวเลข" v-model="val" required />
            </div>
        </div>

        <div class="row mb-3">
            <div class="col-md-2">
                <BaseButton label="บันทึก" @click="isOpen = true" />
            </div>

            <div class="col-md-2 my-auto">
                <BaseButton class="sm" label="บันทึก" @click="isOpen = true" />
            </div>
        </div>

        <div class="mb-3">
            <BaseTable :heads="['ลำดับ', 'รายชื่อ', 'สถานศึกษา', 'อร่อย']">
                <tr v-for="index in 3" class="tr-custom">
                    <td class="text-center">ทดสอบ</td>
                    <td class="text-center">ทดสอบ</td>
                    <td class="text-center">ทดสอบ</td>
                    <td class="text-center">
                        <BaseButton class="sm" />
                    </td>
                </tr>
            </BaseTable>
        </div>

        <div class="row mb-3">
            <BaseCard v-for="index in 4" title="Clicknext" sub="กรุงเทพมหานคร" content="พญาไท" />
        </div>

        <div class="row mb-3">
            <BaseCard v-for="index in 4" title="Clicknext" sub="กรุงเทพมหานคร" content="พญาไท">
                <BaseButton class="sm col-lg-4 mx-auto" label="เลือก" />
            </BaseCard>
        </div>

        <div class="row mb-3">
            <BaseCard v-for="index in 4" title="Clicknext" sub="กรุงเทพมหานคร" content="พญาไท">
                <EditIcon class="position-absolute top-0 end-0 m-2" />
            </BaseCard>
        </div>

        <BaseModal v-if="isOpen == true" 
        title="ดาวน์โหลดรายงานเบี้ยเลี้ยง"
        @close="isOpen = !isOpen">
            <div class="row mx-2">
                <div class="col">
                    <BaseInput required />
                </div>
            </div>
        </BaseModal>
    </div>
</template> 

<script setup>
import BaseButton from './Component/BaseButton.vue';
import BaseInput from './Component/BaseInput.vue';
import BaseTable from './Component/BaseTable.vue';
import BaseCard from './Component/BaseCard.vue'
import BaseModal from './Component/BaseModal.vue';
import EditIcon from './icons/EditIcon.vue'
import { ref } from 'vue';

const val = ref(0)
const isOpen = ref(false)

</script>

<style scoped></style>