<script setup>
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { onMounted, ref } from "vue";

// Registra os componentes necessários para o gráfico de barras
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const ctx = ref(null);

onMounted(() => {
  const canvas = ctx.value.getContext("2d");

  new Chart(canvas, {
    type: "bar",
    data: {
      labels: ["Nota 1", "Nota 2", "Nota 3", "Nota 4", "Nota 5"], // Representa as cinco notas
      datasets: [
        {
          label: "Notas do Aluno",
          data: [8, 6.5, 9, 7.5, 10], // Dados das notas do aluno
          backgroundColor: [
            "#1a43c0", // Cor base
            "#1e57e6", // Variação 1
            "#3b6de6", // Variação 2
            "#527fe6", // Variação 3
            "#6992e6", // Variação 4
          ],
          borderColor: ["#163cac", "#1b4dd3", "#3762d3", "#4c75d3", "#6188d3"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true, // Começa o eixo y em zero
          max: 10, // Limita o eixo y até a nota máxima (10)
        },
      },
      plugins: {
        legend: {
          display: true, // Exibe a legenda
          position: "top", // Posição da legenda
        },
        tooltip: {
          enabled: true, // Exibe tooltips ao passar o mouse sobre as barras
        },
      },
    },
  });
});
</script>

<template>
  <div class="chart">
    <canvas ref="ctx" id="myChart"></canvas>
  </div>
</template>

<style scoped>
.chart {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 100%;
}
</style>
