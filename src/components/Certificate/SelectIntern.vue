<template>
    <div class="input-group">
        <div class="col-0">
            <button class="btn back" @click="$router.push('/certificates/selectSignature')">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="20" viewBox="0 0 19 20" fill="none">
                    <path
                        d="M11.4008 1.70312L3.10078 10.0031L11.4008 18.3031L10.0008 19.7031L0.300781 10.0031L10.0008 0.303123L11.4008 1.70312Z"
                        fill="black" />
                    <path d="M1.69922 11L1.69922 9L18.6992 9V11L1.69922 11Z" fill="black" />
                </svg>

            </button>
        </div>

        <div class="col">
            <LayoutMenuName page-name="เอกสารรับรอง > เลือกรายชื่อนักศึกษาฝึกงาน" />
        </div>

    </div>
    <div>
        <form action="">
            <BaseTable
                :heads="['รหัสนักศึกษาฝึกงาน', 'ชื่อ-นามสกุล', 'ชื่อเล่น', 'ตำแหน่ง', 'ชื่อทีม', 'วันที่เริ่มฝึกวาน', 'วันที่สิ้นสุดฝึกงาน']">
                <tr class="tb-hov tr-custom ">
                    <td scope="row" class="text-center">
                        <label class="checkbox-label">
                            <input class="checkbox" type="checkbox">
                            {{ intern.cer_intern_id }}
                        </label>
                    </td>
                    <td scope="row" class="text-center">{{ interns.intn_name_th }}</td>
                    <td scope="row" class="text-center">{{ interns.intn_nickname_th || '-' }}</td>
                    <td scope="row" class="text-center">{{ interns.work_infos[0].work_role.role_name }}</td>
                    <td scope="row" class="text-center">{{ interns.college_info.col_uni.uni_name || '-' }}</td>
                    <td scope="row" class="text-center">{{ interns.intn_start_date }}</td>
                    <td scope="row" class="text-center">{{ interns.intn_end_date || '-' }}</td>
                </tr>
            </BaseTable>
        </form>

        <div class="row mb-3 mt-4 me-1">
            <BaseButton class="col-auto ms-auto " label="ยืนยัน"
                @click="$router.push('/certificates/previewCertificate')" />
        </div>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import BaseButton from '../Component/BaseButton.vue';
import BaseTable from '../Component/BaseTable.vue';

const searchData = ref('')
const interns = ref([])
const total = ref()
const page = ref(1)
const pageMax = ref()
const pageSize = 10

async function setCurrentPage(pageNumber) {
    if (pageNumber > 0 && pageNumber <= pageMax.value) {
        page.value = pageNumber
        await getIntern()
    }
}

const getIntern = async () => {
    await axios.get(`${import.meta.env.VITE_API_HOST}/interns?page=${page.value}&limit=${pageSize}`)
        .then((response) => {
            interns.value = response.data.rows
            total.value = response.data.count
            pageMax.value = Math.ceil(total.value / pageSize)
        })
}


</script>

<style scoped>
.checkbox {
    display: flex;
    margin-right: 10px;
    width: 25px;
    height: 25px;
    margin-bottom: 5px;
}

.back {
    display: flex;
    margin-right: 10px;
    margin-bottom: 20px;

}

.checkbox-label {
    display: flex;
    align-items: center;
    margin-left: 50px;
}
</style>