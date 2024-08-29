<script setup>
import { ref, onMounted, watch } from "vue";

import BaseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import CreateEditTaskModal from "./Partials/CreateEditTaskModal.vue";
import BaseLoading from "@/components/BaseLoading.vue";

import TaskTab from "./Partials/TaskTab.vue";
import { useTaskStore } from "@/stores/tasks";

const loading = ref(false);
loading.value = true;
loading.value = false;

const openModal = ref(false);
const createModal = ref(true);
const search = ref(null);

const taskStore = useTaskStore();
const { getToDoTasks, getCompletedTasks } = taskStore;

const toDotasks = ref([]);
const completedTasks = ref([]);

const refreshList = async (ev) => {
  if (ev == true) {
    openModal.value = false;
    await initFunction();
  }
};

const initFunction = async () => {
  loading.value = true;
  toDotasks.value = await getToDoTasks();
  completedTasks.value = await getCompletedTasks();

  loading.value = false;
};

const filterTasks = (tasks, query) => {
  if (!query) return tasks;
  return tasks.filter((task) =>
    task.title.toLowerCase().includes(query.toLowerCase())
  );
};

onMounted(async () => {
  await initFunction();
});

watch(search, async (newVal) => {
  const query = newVal || "";
  toDotasks.value = filterTasks(await getToDoTasks(), query);
  completedTasks.value = filterTasks(await getCompletedTasks(), query);
});
</script>

<template>
  <div class="page-background">
    <div class="top flex align-center">
      <BaseInput
        class="base-input"
        v-model="search"
        placeholder="Buscar Tarefa..."
      />
      <div class="btns-container flex gap-1">
        <BaseButton
          class="base-button"
          label="Adicionar Tarefa"
          @click="openModal = !openModal"
        />
        <BaseButton
          class="base-button"
          label="Editar Tarefa"
          @click="openModal = !openModal"
        />
        <BaseButton
          class="base-button"
          label="Excluir Tarefa"
          @click="openModal = !openModal"
        />
      </div>
    </div>
    <div class="tasks" v-if="!loading">
      <TaskTab
        :to-do-arr="toDotasks"
        :completed-arr="completedTasks"
        @update:refresh="refreshList"
      />
    </div>
    <div v-else class="loading">
      <BaseLoading class="loading-icon" />
    </div>
    <CreateEditTaskModal
      :open="openModal"
      @update:open="openModal = $event"
      @update:refresh="refreshList($event)"
      :create="createModal"
    />
  </div>
</template>

<style scoped lang="scss">
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
  @media (max-width: 630px) {
    gap: 1rem;
    padding: 15px;

    .btns-container {
      gap: 0.5rem;
    }

    .base-button {
      font-size: 10px;

      width: 10%;
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
  @media (max-width: 630px) {
    margin-top: 20px;
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
