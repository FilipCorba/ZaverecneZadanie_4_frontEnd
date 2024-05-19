<template>
  <div>
    <BarChart :chartData="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const chartData = ref({
  labels: [],
  datasets: [],
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Statistics Chart',
    },
  },
});

watch(
  () => props.data,
  (newData) => {
    if (newData && newData.length) {
      const labels = newData.map((item) => item.question_text);
      const datasets = newData.map((item, index) => ({
        label: `Question ${index + 1}`,
        data: item.answers.map((answer) => answer.answer_count),
        backgroundColor: `rgba(${(index + 1) * 50}, 99, 132, 0.5)`,
      }));

      chartData.value = {
        labels,
        datasets,
      };
    }
  },
  { immediate: true }
);
</script>

<style scoped>
/* Add any additional styles for your chart here */
</style>
