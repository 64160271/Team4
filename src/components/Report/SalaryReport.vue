<template>
  <LayoutMenuName page-name="รายงานเบี้ยเลี้ยง" />

  <SectionSpace>
    <div class="row mb-3 top-300">
      <div class="col-md-2 my-auto">
        <BaseSelect
          placeholder="ปี"
          @change="fetchReport()"
          v-model="yearSelect"
          :options="listYear"
        />
      </div>

      <div class="col-md-2 my-auto">
        <BaseSelect
          @change="fetchTeamReport()"
          placeholder="ทีม"
          all-select
          v-model="team_id"
          :options="teams"
          value="team_id"
          text="team_name"
        />
      </div>

      <button
        class="col-2 btn ms-auto me-3 btn-sm outline-red"
        @click="downloadExcelFile"
      >
        ดาวน์โหลด
      </button>

      <div class="row p-0 m-0 my-2">
        <div class="form-check form-check-inline fw-bold">
          รายงานค่าใช้จ่ายเบี้ยเลี้ยงสหกิจศึกษา ประจำปี : <span>{{ yearSelect }}</span>
        </div>
      </div>

      <div class="row p-0 m-0 my-2">
        <div class="form-check form-check-inline fw-bold">
          ของทีม : <span>{{ teamName }}</span>
        </div>
      </div>
    </div>

    <div class="row mb-4" v-if="view == 'T'">
      <div class="border col-md-3 my-auto mx-5">
        <div class="text mt-3">เบี้ยเลี้ยง</div>
        <div class="money">
          <span> {{ totalSalary.toFixed(2) || 0 }}</span>
        </div>
      </div>
      <div class="border col-md-3 my-auto mx-5">
        <div class="text mt-3">เบี้ยเลี้ยงพิเศษ</div>
        <div class="money">
          <span> {{ totalExtra.toFixed(2) || 0 }}</span>
        </div>
      </div>
      <div class="border col-md-3 my-auto mx-5">
        <div class="text mt-3">เบี้ยเลี้ยงทั้งหมด</div>
        <div class="money">
          <span> {{ totalAll.toFixed(2) }}</span>
        </div>
      </div>
    </div>

      <Bar v-if="loaded && view == 'A'" :options="optionsYear" :data="chartAllData" />
      <Bar v-if="loaded && view == 'T'" :options="optionsTeam" :data="chartTeamData" />
  </SectionSpace>
</template>

<script setup>
import { ref, onMounted } from "vue";
import BaseSelect from "../Component/BaseSelect.vue";
import apiService from "../../services/api";
import { Bar, Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
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
const name = ref("BarChart");
const loaded = ref(false);
const yearSelect = ref(currentYear);
const teamName = ref("");

const optionsYear = ref({
  aspectRatio: 1.2,
  indexAxis: 'y',
  scales: {
    x: {
      title: {
        display: true,
        text: "Salary",
      },
    },
    y: {
      title: {
        display: true,
        text: "Teams",
      },
    },
  },
  responsive: true,
  plugins: {

    title: {
      display: true,
      text: "Horizontal Bar Chart - Salary and Extra",
    },
  },
});

const optionsTeam = ref({
  scales: {
    x: {
      title: {
        display: true,
        text: "Month",
      },
    },
    y: {
      title: {
        display: true,
        text: "Salary",
      },
    },
  },
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Horizontal Bar Chart - Salary and Extra",
    },
  },
});

const chartAllData = ref({
  labels: [],
  datasets: [
    {
      label: "salary",
      barThickness: 30,
      data: [],
      borderWidth: 1,
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
    },
    {
      label: "extra",
      barThickness: 30,
      data: [],
      borderWidth: 1,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
    },
  ],
});

const chartTeamData = ref({
  labels: [],
  datasets: [
    {
      label: "salary",
      data: [],
      borderWidth: 1,
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
    },
    {
      label: "salary",
      data: [],
      backgroundColor: "rgba(0, 191, 255, 0.1)",
      borderColor: "rgba(0, 191, 255, 0.8 )",
    },
    {
      label: "extra",
      data: [],
      borderWidth: 1,
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
    },
    {
      label: "extra",
      data: [],
      backgroundColor: "rgba(255, 105, 180, 0.1)",
      borderColor: "rgba(255, 105, 180, 1)",
    },
  ],
});
const teams = ref([]);
const team_id = ref();
const listYear = ref([]);

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale
);

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

  const teamName = data.map((d) => {
    return d.team_name;
  });
  const extra = data.map((d) => {
    return d.sum_extra;
  });
  const salary = data.map((d) => {
    return d.sum_salary;
  });

  chartAllData.value.labels = teamName;
  chartAllData.value.datasets[0].data = salary;
  chartAllData.value.datasets[1].data = extra;
  loaded.value = true;
};

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
  chartTeamData.value.datasets[1].type = "line";
  chartTeamData.value.datasets[2].data = extra;
  chartTeamData.value.datasets[3].data = extra;
  chartTeamData.value.datasets[3].type = "line";
  loaded.value = true;

  totalSalary.value = salary.reduce((a, b) => Number(a) + Number(b));
  totalExtra.value = extra.reduce((a, b) => Number(a) + Number(b));
  totalAll.value = totalSalary.value + totalExtra.value;
};

onMounted(async () => {
  const services = new apiService();
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

const fetchReport = () => {
  if (view.value === "A" || team_id.value == "") {
    fetchAllReport();
  } else if (view.value === "T") {
    fetchTeamReport();
  }
};

const downloadExcelFile = async () => {
  window.open(`${import.meta.env.VITE_API_HOST}/salaries/excel`);
};
</script>

<style scoped>
.border {
  border: 1px solid rgb(34, 34, 34);
  border-radius: 10px;
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
