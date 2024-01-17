  
<template>
    <LayoutMenuName page-name="รายงานเบี้ยเลี้ยง" />
    
    <div class="row">
        <div class="col-md-3">
            <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="radiotest" id="year" value="year" @change="testswitch">
            <label class="form-check-label" for="year">ปี</label>
        </div>

        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="radiotest" id="month" value="month" @change="testswitch">
            <label class="form-check-label" for="month">เดือน</label>
        </div>

        <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="radiotest" id="customized" value="customized" @change="testswitch">
            <label class="form-check-label" for="customized">กำหนดเอง</label>
        </div>
        </div>

    


        <div class="col" v-if="viewType == 1">
            <div class="form-check form-check-inline">
                <select v-model="selectedOption" id="dropdown">
                    <option v-for="i in listYear" value="">{{ i }}</option>
                </select>
            </div>

            <div class="form-check form-check-inline">
                -
            </div>

            <div class="form-check form-check-inline">
                <select v-model="selectedOption" id="dropdown">
                    <option v-for="i in listYear" value="">{{ i }}</option>
                </select>
            </div>
        </div>

        <div class="col" v-if="viewType == 2">
            <div class="form-check form-check-inline">
                <select v-model="selectedOption" id="dropdown">
                    <option v-for="i in listYear" value="">{{ i }}</option>
                </select>
            </div>

            <div class="form-check form-check-inline">
                :
            </div>

            <div class="form-check form-check-inline">
                <select v-model="selectedOption" id="dropdown">
                    <option v-for="i in listMonth" value="">{{ i }}</option>
                </select>
            </div>

            <div class="form-check form-check-inline">
                -
            </div>

            <div class="form-check form-check-inline">
                <select v-model="selectedOption" id="dropdown">
                    <option v-for="i in listMonth" value="">{{ i }}</option>
                </select>
            </div>
        </div>

        
        <div class="col" v-if="viewType == 3">
            <div class="form-check form-check-inline">
                <input type="date">
            </div>

            <div class="form-check form-check-inline">
                -
            </div>

            <div class="form-check form-check-inline">
                <input type="date">
            </div>
        </div>
    </div>

    <BaseTable :heads="tableHeads" v-if="viewType == 1" >
        <tr class="tb-hov tr-custom">
            <td class="text-center">2566</td>
            <td class="text-center">356</td>
            <td class="text-center">50</td>
            <td class="text-center">150,2300</td>
        </tr>
        <tr class="tb-hov tr-custom">
            <td class="text-center">2565</td>
            <td class="text-center">340</td>
            <td class="text-center">52</td>
            <td class="text-center">154,3600</td>
        </tr>
        <tr class="tb-hov tr-custom">
            <td class="text-center">2564</td>
            <td class="text-center">342</td>
            <td class="text-center">49</td>
            <td class="text-center">130,9000</td>
        </tr>
        <tr class="tb-hov tr-custom">
            <td class="text-center">2563</td>
            <td class="text-center">335</td>
            <td class="text-center">56</td>
            <td class="text-center">156,5000</td>
        </tr>
        <tr class="tb-hov tr-custom">
            <td class="text-center">2562</td>
            <td class="text-center">348</td>
            <td class="text-center">60</td>
            <td class="text-center">160,4000</td>
        </tr>
    </BaseTable>

    <BaseTable :heads="tableHeads" v-if="viewType == 2" >
        <tr class="tb-hov tr-custom">
            <td class="text-center">มกราคม</td>
            <td class="text-center">23</td>
            <td class="text-center">18</td>
            <td class="text-center">52,000</td>
        </tr>
        <tr class="tb-hov tr-custom">
            <td class="text-center">กุมภาพันธ์</td>
            <td class="text-center">21</td>
            <td class="text-center">17</td>
            <td class="text-center">46,200</td>
        </tr>
        <tr class="tb-hov tr-custom">
            <td class="text-center">มีนาคม</td>
            <td class="text-center">23</td>
            <td class="text-center">18</td>
            <td class="text-center">40,000</td>
        </tr>
        <tr class="tb-hov tr-custom">
            <td class="text-center">เมษายน</td>
            <td class="text-center">22</td>
            <td class="text-center">14</td>
            <td class="text-center">56,200</td>
        </tr>
        <tr class="tb-hov tr-custom">
            <td class="text-center">พฤษภาคม</td>
            <td class="text-center">22</td>
            <td class="text-center">13</td>
            <td class="text-center">30,000</td>
        </tr>
    </BaseTable>

    <BaseTable :heads="tableHeads" v-if="viewType == 3" >
        <tr class="tb-hov tr-custom">
            <td class="text-center">24/10/2565</td>
            <td class="text-center">8</td>
            <td class="text-center">5</td>
            <td class="text-center">9,000</td>
        </tr>
        <tr class="tb-hov tr-custom">
            <td class="text-center">25/10/2565</td>
            <td class="text-center">8</td>
            <td class="text-center">6</td>
            <td class="text-center">10,000</td>
        </tr>
        <tr class="tb-hov tr-custom">
            <td class="text-center">26/10/2565</td>
            <td class="text-center">8</td>
            <td class="text-center">5</td>
            <td class="text-center">9,600</td>
        </tr>
        <tr class="tb-hov tr-custom">
            <td class="text-center">27/10/2565</td>
            <td class="text-center">8</td>
            <td class="text-center">4</td>
            <td class="text-center">5,300</td>
        </tr>
        <tr class="tb-hov tr-custom">
            <td class="text-center">28/10/2565</td>
            <td class="text-center">8</td>
            <td class="text-center">2</td>
            <td class="text-center">3,000</td>
        </tr>
    </BaseTable>

    
</template>

<script setup>
import { ref } from 'vue';
import BaseTable from '@/components/Component/BaseTable.vue';

const viewType = ref(1)
const tableHeads = ref(['เดือน', 'จำนวนวันทั้งหมด', 'จำนวนนักศึกษาทั้งหมด', 'จำนวนเบี้ยเลี้ยงทั้งหมด']);

function testswitch() {
    const selectedOption = document.querySelector('input[name="radiotest"]:checked').value;
    
    if (selectedOption === 'year') {
        viewType.value = 1
        tableHeads.value = ['ปี', 'จำนวนวันทั้งหมด', 'จำนวนนักศึกษาทั้งหมด', 'จำนวนเบี้ยเลี้ยงทั้งหมด'];
    } else if (selectedOption === 'month') {
        viewType.value = 2
        tableHeads.value = ['เดือน', 'จำนวนวันทั้งหมด', 'จำนวนนักศึกษาทั้งหมด', 'จำนวนเบี้ยเลี้ยงทั้งหมด'];
    } else if (selectedOption === 'customized') {
        viewType.value = 3
        tableHeads.value = ['วัน', 'จำนวนชั่วโมงทั้งหมด', 'จำนวนนักศึกษาทั้งหมด', 'จำนวนเบี้ยเลี้ยงทั้งหมด'];
        
    }
}

const listYear = ref([2566,2565,2564,2563,2562,2561,2560])
const listMonth = ref(['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน'
                        ,'กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'])

</script>

<style scoped></style>
