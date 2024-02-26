  
<template>
    <LayoutMenuName page-name="รายงานเบี้ยเลี้ยง" />
    
    <div class="row mb-3">        
        <div class="col-md-2 my-auto">  
            <BaseSelect 
            placeholder="ปี" 
            @change="fetchReport()"
            v-model="yearSelect" 
            :options="listYear" />    
        </div>

        <div class="col-md-2 my-auto">  
            <BaseSelect
            @change="fetchTeamReport()"
            placeholder="ทีม"
            v-model="team_id" 
            :options="teams" 
            value="team_id"
            text="team_name" />     
        </div>

        <button class="col-2 btn ms-auto btn-sm outline-red" @click="">    
            ดาวน์โหลด  
        </button>

        <div class="row p-0 m-0 my-2">
            <div class="form-check form-check-inline fw-bold">
                รายงานค่าใช้จ่ายเบี้ยเลี้ยงสหกิจศึกษา ประจำปี : <span>{{ yearSelect }}</span>
             </div>     
        </div>

        <div class="row p-0 m-0 my-2">
            <div class="form-check form-check-inline fw-bold">
                ของทีม :  <span>{{ team_id }}</span>
             </div>  
        </div>
 
    </div>

    <div class="row" v-if="view == 'T'" >
        <div class="border col-md-3 my-auto mx-4">
            <div class="text mt-3">
                เบี้ยเลี้ยง 
            </div>
            <div class="money">
                <span> {{ sum_salary }}</span>
            </div>
        </div>
        
        <div class="border col-md-3 my-auto mx-4">
            <div class="text mt-3">
                เบี้ยเลี้ยงพิเศษ
            </div>
            <div class="money">
                <span> {{ sum_ex }}</span>
            </div>
        </div>
        
        <div class="border col-md-3 my-auto mx-4">
            <div class="text mt-3">
                เบี้ยเลี้ยงทั้งหมด
            </div>
            <div class="money">
                <span> {{ sum_ex }}</span>
            </div>
        </div>
    </div>

    <div class="container">
            <Bar v-if="loaded && view == 'A'"  :options="optionsYear" :data="chartData" />
            <Bar v-if="loaded && view == 'T'"  :options="optionsTeam" :data="chartData" />
        </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import BaseSelect from "../Component/BaseSelect.vue";
import apiService from "../../services/api";
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale  } from 'chart.js'
import axios from 'axios';

const currentYear = new Date().getFullYear() + 543
const view = ref('A')
const name = ref('BarChart')
const loaded = ref(false)
const yearSelect = ref(currentYear)
const optionsYear = ref({
    indexAxis: 'y', 
    scales: {
        
        x: {
            title: {
                display: true,
                text: 'Salary',
                
            }
        },
        y: {
            title: {
                display: true,
                text: 'Teams'
            },
        },
    },
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Horizontal Bar Chart - Salary and Extra'
        }
    },
})

const optionsTeam = ref({
    scales: {
        x: {
            title: {
                display: true,
                text: 'Month',
                
            }
        },
        y: {
            title: {
                display: true,
                text: 'Salary'
            },
        },
    },
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Horizontal Bar Chart - Salary and Extra'
        }
    },
    
})

const chartData = ref({
    labels: [],
    datasets: [
        {
            label:'salary', data :[],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            barThickness: 20,
            
        },
        {
            label:'extra', data :[],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            barThickness: 20,
            
        },
    ],
})

const teams = ref([]);
const team_id = ref();
const listYear = ref([])

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const fetchAllReport = (async () => {
    view.value = 'A'
    const params = {
        year: yearSelect.value - 543,
    }

    loaded.value = false

    const data = await axios.get(`${import.meta.env.VITE_API_HOST}/salaries/teams`, { params })
        .then((response) => {
            return response.data
        })
        
    const teamName = data.map((d) => { return d.team_name })
    const extra = data.map((d) => {return d.sum_extra})
    const salary = data.map((d) => { return d.sum_salary }) 
        
    chartData.value.labels = teamName;
    chartData.value.datasets[0].data = salary;
    chartData.value.datasets[1].data = extra ;
    loaded.value = true
})

const fetchTeamReport = (async () => {
    view.value = 'T'
    console.log(yearSelect.value)
    const params = {
        year: yearSelect.value - 543,
    }

    loaded.value = false

    const data = await axios.get(`${import.meta.env.VITE_API_HOST}/salaries/teams/${team_id.value}`, { params })
        .then((response) => {
            return response.data
        })
        
    const month = data.reports.map((d) => { return d.month })
    const extra = data.reports.map((d) => {return d.sum_extra})
    const salary = data.reports.map((d) => { return d.sum_salary }) 
        
    chartData.value.labels = month;
    chartData.value.datasets[0].data = salary;
    chartData.value.datasets[1].data = extra ;
    loaded.value = true


})

onMounted(async () => {
    const services = new apiService();
    teams.value = await services.getAllTeam();

    try{
        await fetchAllReport()

        for (let i = currentYear ; i > 2550 ; i--) {
            listYear.value.push(i)
        }
        
    }catch(e) {
        console.error(e)
    }

    
})

const fetchReport = () => {
    if(view.value === "A"){
        fetchAllReport()
    }else if (view.value === "T"){
        fetchTeamReport()
    }
}
    
async function downloadExcelFile(){

    window.open(`${import.meta.env.VITE_API_HOST}`)

}

</script>

<style scoped>

.border{
    border: 1px solid rgb(52, 51, 51);
    border-radius: 5px;
    height: 50px;
    text-align: center;
}

</style>
