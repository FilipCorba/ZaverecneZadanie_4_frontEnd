<template>
  <div class="chart-container">
    <v-carousel
      v-model="carouselIndex"
      elevation="10"
      progress="deep-orange-darken-2"
      hide-delimiters
      show-arrows="hover"
      continuous="false"
      class="carousel"
    >
      <v-carousel-item v-for="(question, index) in statistics" :key="index">
        <v-sheet class="sheet" height="100%">
          <div class="chart-wrapper" :style="{ height: '100%', width: '100%' }">
            <canvas
              :style="{ height: '100%' }"
              :id="'barChart' + index"
            ></canvas>
          </div>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from "vue";
import { getStatistics } from "@api/statistics";
import { useRoute } from "vue-router";
import Chart from "chart.js/auto";

const participation_id = ref(null);
const route = useRoute();
const statistics = ref([]);
const carouselIndex = ref(0); // Set initial index to start from second chart

const getStats = async () => {
  if (participation_id.value) {
    const result = await getStatistics(participation_id.value);
    if (result && Array.isArray(result.data)) {
      statistics.value = result.data;
      
    } else {
      console.error("Invalid data format received:", result);
    }
  } else {
    console.error("No participation_id found in the route query.");
  }
};

const createCharts = async (index) => {
  if (!Array.isArray(statistics.value)) {
    console.error("Statistics data is not an array:", statistics.value);
    return;
  }

  const question = statistics.value[index];

  // Ensure canvas element is available in the DOM
  await nextTick();
  const barChartCanvas = document.getElementById("barChart" + index);

  if (!barChartCanvas) {
    console.error(`Canvas element not found for question ${index}`);
    return;
  }

  // Clear existing chart if it exists
  if (barChartCanvas.chart) {
    barChartCanvas.chart.destroy();
  }

  // Data preparation for bar chart
  const barChartLabels = question.answers.map((answer) => answer.answer_text);
  const barChartData = question.answers.map((answer) => answer.answer_count);

  // Create Bar Chart
  barChartCanvas.chart = new Chart(barChartCanvas, {
    type: "bar",
    data: {
      labels: barChartLabels,
      datasets: [
        {
          label: "Total Responses",
          data: barChartData,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
  await nextTick();
  window.dispatchEvent(new Event("resize"));
};

onMounted(() => {
  participation_id.value = route.query.participation_id;
  getStats();
});

// Watcher to create charts when statistics are updated
watch(statistics, async (newStatistics) => {
  if (newStatistics.length > 0) {
    await nextTick();
    createCharts(carouselIndex.value); // Create chart for initial index
  }
});

// Watcher for carousel index changes
watch(carouselIndex, async (currentIndex) => {
  if (statistics.value.length > 0) {
    await nextTick();
    createCharts(currentIndex); // Create chart for current index
  }
});
</script>

<style scoped>
.chart-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sheet {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
