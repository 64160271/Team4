  
<template>
    <LayoutMenuName page-name="รายงานเบี้ยเลี้ยง" />
    
    <div class="row mb-3">        
        <div class="col-md-2 my-auto">  
            <BaseSelect 
            placeholder="ปี" 
            @chang=""
            v-model="selectOptionYear" :options="listYear" />    
        </div>

        <div class="col-md-2 my-auto">  
            <BaseSelect 
            placeholder="ทีม"
            v-model="team_id" 
            :options="teams" 
            value="team_id"
            text="team_name" />     
        </div>

        <div class="row p-0 m-0 my-2">
            <div class="form-check form-check-inline fw-bold">
                รายงานค่าใช้จ่ายเบี้ยเลี้ยงสหกิจศึกษา ประจำปี : <span>{{ selectOptionYear }}</span>
             </div>     
        </div>

        <div class="row p-0 m-0 my-2">
            <div class="form-check form-check-inline fw-bold">
                ของทีม :  <span>{{ team_name }}</span>
             </div>  
        </div>
 
    </div>

    <div class="row ">
        <div class="border col-md-3 my-auto">
            เบี้ยเลี้ยง
        </div>
        
        <div class="border col-md-3 my-auto">
            เบี้ยเลี้ยงพิเศษ
        </div>
        
        <div class="border col-md-3 my-auto">
            เบี้ยเลี้ยงรวม
        </div>
    </div>

    <div class="container">
            <Bar v-if="loaded" :data="chartData" />
        </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import BaseTable from '@/components/Component/BaseTable.vue';
import DataTable from "../Component/DataTable.vue";
import BaseSelect from "../Component/BaseSelect.vue";
import apiService from "../../services/api";
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale  } from 'chart.js'
import axios from 'axios';


const selectOptionYear = ref()
const selectOptionTeam = ref()
const viewType = ref(1)
const name = ref('BarChart')
const loaded = ref(false)
const chartData = ref({
    labels: [],
    datasets: [],
})
const teams = ref([]);
const team_id = ref();


const listYear = ref([2567,2566,2565,2564,2563,2562,2561,2560,2559,2558])
const listTeam = ref(['Team1','Team2','Team3','Team4','Team5','Team6'
                        ,'Team7','Team8','Team9','Team10','Team11','Team12'])


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)




onMounted(async () => {
    let services = new apiService();
    teams.value = await services.getAllTeam();


    loaded.value = false
    try{
        const data = await axios.get(`${import.meta.env.VITE_API_HOST}/salaries/teams`)
            .then((response) => {
                return response.data
            })
        
        const teamName = data.map((d) => { return d.team_name })
        const sum = data.map((d) => { return d.sum_salary }) 

        chartData.value.labels = teamName
        chartData.value.datasets = [ { data : sum} ]
        loaded.value = true
    }catch(e) {
        console.error(e)
    }
})


</script>

<style scoped>

.border{
    border: 1px solid rgb(52, 51, 51);
    border-radius: 5px;
    height: 50px;
    text-align: center;
}

</style>
