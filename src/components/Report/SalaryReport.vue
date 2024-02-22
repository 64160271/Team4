  
<template>
    <LayoutMenuName page-name="รายงานเบี้ยเลี้ยง" />
    
    <div class="row">        
        <div class="col-md-2 my-auto">  
            <BaseSelect v-model="selectOptionYear" :options="listYear" placeholder="ปี" />    
        </div>
        <div class="col-md-2 my-auto">  
            <BaseSelect v-model="selectOptionTeam" :options="listTeam" placeholder="ทีม" />     
        </div>

        <div class="row p-0 m-0 my-2">
            <div class="form-check form-check-inline fw-bold">
                รายงานค่าใช้จ่ายเบี้ยเลี้ยงสหกิจศึกษา ประจำปี : <span>{{ selectOptionYear }}</span>
             </div>     
        </div>

        <div class="row p-0 m-0 my-2">
            <div class="form-check form-check-inline fw-bold">
                ของทีม :  <span>{{ selectOptionTeam }}</span>
             </div>  
        </div>
    </div>


    <!-- <DataTable :heads="tableHeadYear"></DataTable>
    

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
    </BaseTable> -->

    
</template>

<script setup>
import { ref } from 'vue';
import BaseTable from '@/components/Component/BaseTable.vue';
import DataTable from "../Component/DataTable.vue";
import BaseSelect from "../Component/BaseSelect.vue"
import apiService from "../../services/api";


const selectOptionYear = ref()
const selectOptionTeam = ref()
const viewType = ref(1)

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

const listYear = ref([2567,2566,2565,2564,2563,2562,2561,2560,2559,2558])
const listTeam = ref(['Team1','Team2','Team3','Team4','Team5','Team6'
                        ,'Team7','Team8','Team9','Team10','Team11','Team12'])
const apiCall = new apiService();


</script>

<style scoped></style>
