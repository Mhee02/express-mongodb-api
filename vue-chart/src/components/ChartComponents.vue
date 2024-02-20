<script setup lang="ts">
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";
import axios from "axios";

const chartRef = ref(null);
const selectedYear = ref(null);
let myChart = null;

const selectYear = ref([]);
for (let year = 1950; year <= 2020; year++) {
  selectYear.value.push(year.toString());
}

onMounted(async () => {
  await fetchUserData(); // Fetch data when component mounted
});

const fetchUserData = async () => {
  if (!selectedYear.value) return; // ตรวจสอบว่า selectedYear ไม่เป็น null ก่อนทำงาน

  const ctx = chartRef.value.getContext("2d");
  if (myChart) {
    myChart.destroy();
  }

  const responseDataYear = await axios.get(
    `http://localhost:8080/users/${selectedYear.value}`
  );
  const users = responseDataYear.data;
  console.log(users);

  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: users.map((user) => user["Country name"]),
      datasets: [
        {
          label: "Population",
          data: users.map((user) => user["Population"]),
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
</script>

<template>
  <div class="max-w-full mt-10">
    <div>
      <h2 class="flex justify-center">Chart</h2>
      <div class="flex justify-center">
        <label for="year">Select a year:</label>
        <select id="year" v-model="selectedYear" @change="fetchUserData">
          <option v-for="year in selectYear" :value="year">{{ year }}</option>
        </select>
      </div>
      <canvas ref="chartRef" id="myChart"></canvas>
    </div>
  </div>
</template>

<style scoped>
#myChart {
  width: 100%;
  height: 600px;
}
</style>
