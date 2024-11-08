<script setup>
import { ref, onMounted, watch, computed } from "vue";

import BaseLoading from "@/components/BaseLoading.vue";

import { useUserStore } from "@/stores/users";
import PieChart from "./partials/PieChart.vue";
import BarChart from "./partials/BarChart.vue";
import { useRoute, useRouter } from "vue-router";
import { useTaskStore } from "@/stores/task";
const taskStore = useTaskStore();
const { getUserCompletedTasksDashboard } = taskStore;
const userStore = useUserStore();
const { getAlunoById } = userStore;
const router = useRouter();

const route = useRoute();
const chartData = ref(null);
const tasksData = ref(null);
const aluno = ref(null);

const loading = ref(false);

const initFunction = async () => {
  loading.value = true;
  aluno.value = await getAlunoById(route.params.aluno_id);
  tasksData.value = await getUserCompletedTasksDashboard(route.params.aluno_id);

  chartData.value = {
    labels: ["Tarefas Entregues", "Tarefas Não entregues"],
    datasets: [
      {
        data: [
          tasksData.value.tarefas_feitas,
          tasksData.value.tarefas_nao_feitas,
        ],
        backgroundColor: ["#1a43c0", "#6188d3"],
        hoverOffset: 4,
      },
    ],
  };

  loading.value = false;
};

onMounted(async () => {
  await initFunction();
});
</script>

<template>
  <div class="page-background">
    <div class="main-content" v-if="!loading && aluno && tasksData">
      <div class="page-header flex align-center gap-1 w-100 mb-4">
        <div class="flex align-center gap-1">
          <img
            v-if="aluno.user_img"
            :src="aluno.user_img"
            alt=""
            width="120px"
            height="120px"
            style="border-radius: 30px; object-fit: cover"
            draggable="false"
          />
          <img
            v-else
            src="../../assets/img/png/user_default_large.png"
            width="120px"
            alt=""
          />
          <div class="flex flex-column gap-05">
            <span>
              <span style="font-weight: 600">Nome: </span>{{ aluno.nome }}</span
            >
            <span>
              <span style="font-weight: 600">Email: </span
              >{{ aluno.email }}</span
            >
          </div>
        </div>
        <div style="height: 50px">
          <span
            ><span style="font-weight: 600">Status: </span>
            <span class="badge">Risco de Reprovação</span></span
          >
        </div>
      </div>
      <div class="page-container w-100">
        <div class="charts">
          <span style="font-weight: 600">Entregas das Tarefas</span>
          <PieChart :data="chartData" />
          <span
            ><span style="font-weight: 600">Porcentagem de Envio:</span>
            {{ tasksData.porcentagem_de_envio }}%</span
          >
        </div>
        <div class="charts">
          <span style="font-weight: 600">Notas do Aluno</span>
          <BarChart />
          <span
            ><span style="font-weight: 600">Média das Notas:</span>
            {{ tasksData.porcentagem_de_envio }}</span
          >
        </div>
      </div>
    </div>
    <div class="loading" v-if="loading">
      <BaseLoading />
    </div>
  </div>
</template>

<style scoped lang="scss">
.badge {
  background-color: yellow;
  padding: 1px 10px;
  margin-left: 3px;
  border-radius: 10px;
  color: rgb(108, 108, 10);
}
.loading {
  height: 400px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 630px) {
    .loading-icon > svg {
      width: 100px;
      height: 100px;
    }
  }
}

.main-content {
  width: 100%;
  .page-header {
    width: 100%;
    padding: 20px;
    justify-content: space-between;
  }
  .page-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: 20px;
    .charts {
      width: 50%;
      padding: 1rem;
      border-radius: 10px;
      box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.162);
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }
  }
}
.page-background {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  height: 100%;
  @media (max-width: 630px) {
    padding: 1rem;
  }
}
</style>
