<!--
 Index
 Main Report Salary all, download report excel
 Author : Ukit Yeamyai
 Created date : 01-02-2567
-->

<template>
    <LayoutMenuName page-name="รายงานเบี้ยเลี้ยง" />

    <SectionSpace>
        <div class="row mb-3">
            <div class="col-md-2 my-auto nopadding">
                <BaseSelect placeholder="ปี" @change="fetchReport()" v-model="yearSelect" :options="listYear" />
            </div>

            <div class="col-md-2 my-auto">
                <BaseSelect @change="fetchTeamReport()" placeholder="ทีม" all-select v-model="team_id" :options="teams"
                    value="team_id" text="team_name" />
            </div>

            <button class="col-md-2 btn ms-auto outline-red p-0" @click="downloadExcelFile">
                ดาวน์โหลดรายงาน
            </button>
        </div>


        <div class="row my-3">
            <div class="fw-bold nopadding">
                รายงานค่าใช้จ่ายเบี้ยเลี้ยงสหกิจศึกษา ประจำปี : <span>{{ yearSelect }}</span>
            </div>
        </div>

        <div class="row my-2 mb-3">
            <div class="fw-bold nopadding">
                ของทีม : <span>{{ teamName || 'ทั้งหมด' }}</span>
            </div>
        </div>

        <div class="row mb-4 p-0" v-if="view == 'T'">

            <div class="border col me-2 my-auto py-3">
                <div class="row mx-auto">
                    <div class="col-md-5 text-center">
                        <img height="100" src="@/assets/images/wages.png" alt="">
                    </div>
                    <div class="col my-auto">
                        <div class="text">รวมเบี้ยเลี้ยง</div>
                        <div class="money">
                            <span> {{ '฿' + totalSalary.toFixed(2) || 0 }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="border col my-auto p-3 mx-2 my-auto">
                <div class="row mx-auto">
                    <div class="col-md-5 text-center">
                        <img height="100" src="@/assets/images/extra.png" alt="">
                    </div>
                    <div class="col my-auto">
                        <div class="text">รวมเบี้ยเลี้ยงพิเศษ</div>
                        <div class="money">
                            <span> {{ '฿' + totalExtra.toFixed(2) || 0 }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="border col my-auto p-3 ms-2 my-auto">
                <div class="row mx-auto">
                    <div class="col-md-5 text-center">
                        <img height="100" src="@/assets/images/total.png" alt="">
                    </div>
                    <div class="col my-auto">
                        <div class="text">รวมเบี้ยเลี้ยงทั้งหมด</div>
                        <div class="money">
                            <span> {{ '฿' + totalAll.toFixed(2) || 0 }}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        <div class="row">
            <Loading v-if="!loaded" />

            <Bar v-if="loaded && view == 'A'" :options="optionsYear" :data="chartAllData" />
            <Bar id="teamChart" v-if="loaded && view == 'T'" :options="optionsTeam" :data="chartTeamData"
                :plugins="[linePosition]" />
        </div>

    </SectionSpace>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BaseSelect from "../Component/BaseSelect.vue";
import ApiService from "../../services/ApiService";
import { Bar, Line } from "vue-chartjs";
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    LineElement,
    LineController,
    PointElement,
    CategoryScale,
    LinearScale,
} from "chart.js";
import axios from "axios";

const currentYear = new Date().getFullYear() + 543;
const view = ref("A");
const totalSalary = ref(0);
const totalExtra = ref(0);
const totalAll = ref(0);
const loaded = ref(false);
const yearSelect = ref(currentYear);
const teamName = ref("");

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    LineController,
    BarElement,
    CategoryScale,
    LinearScale
);

/*
 * optionsYear
 * สร้างกราฟออกมาเป็นแนวนอน โดยมีแกน X เป็น Salary และ แกน Y เป็น Teams รายปี
 * param:  -
 * return: -
 */
const optionsYear = ref({
    aspectRatio: 1.2,
    indexAxis: 'y',
    scales: {
        x: {
            title: {
                display: false,
                text: "Salary",
                font: {
                    size: 16,
                }
            },
        },
        y: {
            title: {
                display: false,
                text: "Teams",
                font: {
                    size: 16,
                }
            },
        },
    },
    plugins: {

        title: {
            display: true,
            text: "รายงานค่าใช้จ่ายเบี้ยเลี้ยงสหกิจศึกษา ประจำปี " + yearSelect.value,
            font: {
                size: 18,
                weight: 'bold',
            }
        },
    },
});

/*
 * linePosition
 * สร้างกราฟเป็น line
 * param:  -
 * return: -
 */
const linePosition = {
    id: 'linePosition',
    beforeDatasetsDraw(chart) {
        chart.getDatasetMeta(1).data.forEach((datapoint, index) => {
            datapoint.x = chart.getDatasetMeta(0).data[index].x
        })
        chart.getDatasetMeta(3).data.forEach((datapoint, index) => {
            datapoint.x = chart.getDatasetMeta(2).data[index].x
        })
    }
}


/*
 * optionsTeam
 * สร้างกราฟออกมาเป็นแนวตั้ง โดยมีแกน X เป็น Month และ แกน Y เป็น Salary ของทีม
 * param:  -
 * return: -
 */
const optionsTeam = ref({
    scales: {
        x: {
            title: {
                display: false,
                text: "Month",
                font: {
                    size: 16,
                }
            },
        },
        y: {
            title: {
                display: false,
                text: "Salary",
                font: {
                }
            },
        },
    },
    plugins: 
        {
            title: {
                display: true,
                text: "รายงานค่าใช้จ่ายเบี้ยเลี้ยงสหกิจศึกษา ประจำปี " + yearSelect.value + " ของทีม " + teamName.value,
                font: {
                    size: 18,
                    weight: 'bold',
                }
            },
        },
    
});

/*
 * chartAllData
 * คำสั่งสร้างกราฟด้วย Chartjs ของปี
 * param:  -
 * return: -
 */
const chartAllData = ref({
    labels: [],
    datasets: [
        {
            label: "เบี้ยเลี้ยง",
            data: [],
            borderWidth: 1,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
        },
        {
            label: "เบี้ยเลี้ยงพิเศษ",
            data: [],
            borderWidth: 1,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
        },
    ],
});


/*
 * chartAllData
 * คำสั่งสร้างกราฟด้วย Chartjs ของทีม
 * param:  -
 * return: -
 */
const chartTeamData = ref({
    labels: [],
    datasets: [
        {
            label: "",
            data: [],
            borderWidth: 1,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
        },
        {
            type: 'line',
            label: "เบี้ยเลี้ยง",
            data: [],
            backgroundColor: "rgba(0, 191, 255, 0.1)",
            borderColor: "rgba(0, 191, 255, 0.8 )",
        },

        {
            label: "",
            data: [],
            borderWidth: 1,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
        },
        {
            type: 'line',
            label: "เบี้ยเลี้ยงพิเศษ",
            data: [],
            backgroundColor: "rgba(255, 105, 180, 0.1)",
            borderColor: "rgba(255, 105, 180, 1)",
        },
    ],
});
const teams = ref([]);
const team_id = ref();
const listYear = ref([]);

/*
 * fetchAllReport
 * คำสั่ง fetเch ข้อมูลมื่อเปลี่ยนปี
 * param: - 
 * return: -
 */

const fetchAllReport = async () => {
    view.value = "A";
    const params = {
        year: yearSelect.value - 543,
    };

    loaded.value = false;

    const data = await axios
        .get(`${import.meta.env.VITE_API_HOST}/salaries/teams`, { params })
        .then((response) => {
            return response.data;
        });

    const name = data.map((d) => {
        return d.team_name;
    });
    const extra = data.map((d) => {
        return d.sum_extra;
    });
    const salary = data.map((d) => {
        return d.sum_salary;
    });

    chartAllData.value.labels = name;
    chartAllData.value.datasets[0].data = salary;
    chartAllData.value.datasets[1].data = extra;
    optionsYear.value.plugins.title.text = "รายงานค่าใช้จ่ายเบี้ยเลี้ยงสหกิจศึกษา ประจำปี " + yearSelect.value
    loaded.value = true;
    teamName.value = ""
};


/*
 * fetchTeamReport
 * คำสั่ง fetch ข้อมูลเมื่อเปลี่ยนปีและทีม
 * param: -
 * return: -
 */
const fetchTeamReport = async () => {
    if (!team_id.value) {
        view.value = "A";
        fetchAllReport();
        return;
    }

    view.value = "T";
    const params = {
        year: yearSelect.value - 543,
    };

    loaded.value = false;

    const data = await axios
        .get(`${import.meta.env.VITE_API_HOST}/salaries/teams/${team_id.value}`, { params })
        .then((response) => {
            return response.data;
        });

    teamName.value = data.name;
    const month = data.reports.map((d) => {
        return d.month;
    });
    const extra = data.reports.map((d) => {
        return d.sum_extra;
    });
    const salary = data.reports.map((d) => {
        return d.sum_salary;
    });

    chartTeamData.value.labels = month;
    chartTeamData.value.datasets[0].data = salary;
    chartTeamData.value.datasets[1].data = salary;
    chartTeamData.value.datasets[2].data = extra;
    chartTeamData.value.datasets[3].data = extra;
    loaded.value = true;

    totalSalary.value = salary.reduce((a, b) => Number(a) + Number(b));
    totalExtra.value = extra.reduce((a, b) => Number(a) + Number(b));
    totalAll.value = totalSalary.value + totalExtra.value;
    optionsTeam.value.plugins.title.text = "รายงานค่าใช้จ่ายเบี้ยเลี้ยงสหกิจศึกษา ประจำปี " + yearSelect.value + " ของทีม " + teamName.value
};


/*
 * onMounted
 * เมื่อเข้ามาหน้า Report ให้แสดงกราฟข้อมูล
 * param: year 
 * return: -
 */
onMounted(async () => {
    const services = new ApiService();
    teams.value = await services.getAllTeam();

    try {
        await fetchAllReport();

        for (let i = currentYear; i > 2550; i--) {
            listYear.value.push(i);
        }
    } catch (e) {
        console.error(e);
    }
});

/*
 * fetchReport
 * ตรวจสอบค่าว่าเป็นแบบ ปี หรือ แบบ ทีม
 * param: - 
 * return: -
 */
const fetchReport = () => {
    if (view.value === "A" || team_id.value == "") {
        fetchAllReport();
    } else if (view.value === "T") {
        fetchTeamReport();
    }
};

/*
 * downloadExcelFile
 * ดาวน์โหลดfile excel ของรายงานเบี้ยเลี้ยง
 * param: - 
 * return: -
 */
const downloadExcelFile = async () => {
    window.open(`${import.meta.env.VITE_API_HOST}/salaries/excel`);
};
</script>

<style scoped>
.border {
    border: 1px solid rgb(34, 34, 34);
    border-radius: 8px;
}

.text {
    height: 30px;
    text-align: center;
}

.money {
    height: 30px;
    text-align: center;
}

.text {
    height: 30px;
    font-size: 20px;
}

.money {
    height: 30px;
    font-size: 16px;
}
</style>
