<script setup>
import { ref, onMounted, computed } from "vue";

import BaseInput from "@/components/input/BaseInput.vue";

import BaseNoDataAlert from "@/components/BaseNoDataAlert.vue";
import BaseLoading from "@/components/BaseLoading.vue";

import { useRoute } from "vue-router";
import { useTaskStore } from "@/stores/task";

const tableData = ref([]);

const taskStore = useTaskStore();
const { getAllTasksStatus } = taskStore;

const filteredData = computed(() => {
  if (!search.value) return tableData.value;
  return tableData.value.filter((item) =>
    item.nome.toLowerCase().includes(search.value.toLowerCase())
  );
});

const tarefasConcluidas = ref(null);
const tarefasNaoConcluidas = ref(null);

const route = useRoute();

const loading = ref(false);

const search = ref("");

const initFunction = async () => {
  loading.value = true;
  tableData.value = await getAllTasksStatus();
  if (tableData.value) {
    tarefasConcluidas.value = tableData.value.tarefasConcluidas;
    tarefasNaoConcluidas.value = tableData.value.tarefasNaoConcluidas;
  }
  loading.value = false;
};

onMounted(async () => {
  await initFunction();
});
</script>

<template>
  <div class="page-background">
    <div class="tasks" v-if="!loading">
      <div v-if="filteredData">
        <div class="container flex w-100">
          <div class="left">
            <h3>Tarefas Não Concluídas</h3>
            <div v-if="tarefasNaoConcluidas" class="w-100">
              <div
                class="task-card"
                v-for="tarefa in tarefasNaoConcluidas"
                :key="tarefa.id"
              >
                <span>{{ tarefa.nome }} </span>
              </div>
            </div>
          </div>
          <div class="right">
            <h3>Tarefas Concluídas</h3>
            <div v-if="tarefasConcluidas" class="w-100">
              <div
                class="task-card"
                v-for="tarefa in tarefasConcluidas"
                :key="tarefa.id"
              >
                <span>{{ tarefa.nome }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <BaseNoDataAlert
          text="Nenhum Curso Encontrado"
          title="Nenhum Dado Encontrado!"
        />
      </div>
    </div>
    <div v-else class="loading">
      <BaseLoading class="loading-icon" />
    </div>
  </div>
</template>

<style scoped lang="scss">
h3 {
  font-weight: 500;
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

.top {
  gap: 1rem;
  justify-content: flex-start;
  width: 100%;
  flex-wrap: wrap;

  .base-input {
    flex: content;
  }
  @media (max-width: 1200px) {
    flex-direction: column;
    gap: 1rem;

    .btns-container {
      align-items: center;
      justify-content: space-between;
      width: 100%;

      .base-button {
        width: 100%;
        font-size: 12px;
      }
    }
  }

  @media (max-width: 400px) {
    .btns-container {
      flex-wrap: wrap;
      gap: 15px;
    }
  }
}

.tasks {
  width: 100%;

  gap: 40px;
  margin-top: 50px;
  justify-content: space-around;
  flex: 1;

  .container {
    .right,
    .left {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 20px;
      padding-bottom: 20px;
      gap: 10px;

      .task-card {
        border: 2px solid grey;
        padding: 15px;
        border-radius: 10px;
        width: 100%;
        margin-top: 10px;
      }
    }

    .left {
      border-right: 1px solid black;
    }

    .right {
      border-left: 1px solid black;
    }
  }

  @media (max-width: 630px) {
    margin-top: 20px;
  }
}

.cards-container {
  width: 100%;
  display: flex !important;
  flex-wrap: wrap;
  padding: 1rem;
  gap: 30px;
}

.page-background {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  height: 100%;
}
</style>
