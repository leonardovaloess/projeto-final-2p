<script setup>
import { ref } from "vue";
import { useTaskStore } from "@/stores/tasks";
import { onMounted, watch } from "vue";

import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseModal from "@/components/modal/BaseModal.vue";
import BaseAlertError from "@/components/Alert/BaseAlertError.vue";
import BaseAlertSuccess from "@/components/Alert/BaseAlertSuccess.vue";
import BaseNoDataAlert from "@/components/BaseNoDataAlert.vue";

const taskStore = useTaskStore();
const { toggleTaskStatus } = taskStore;

const props = defineProps({
  toDoArr: Array,
  completedArr: Array,
});
const tab = ref(null);

const confirmModal = ref(false);
const confirm = ref(false);
const success = ref(false);
const taskToComplete = ref({});
const error = ref(false);

const emit = defineEmits(["update:refresh"]);

const handleConfirmModalOpen = (task) => {
  confirmModal.value = !confirmModal.value;
  taskToComplete.value = task;
};

const handlePayload = async () => {
  const response = await toggleTaskStatus(
    taskToComplete.value.id,
    taskToComplete.value.done
  );

  console.log(response);
  if (response) {
    confirmModal.value = false;

    success.value = true;

    emit("update:refresh", true);

    setTimeout(() => {
      success.value = false;
    }, 3000);
  } else {
    error.value = true;

    setTimeout(() => {
      error.value = false;
    }, 3000);
  }
};

const handleToDoSwitch = async (task) => {
  await toggleTaskStatus(task.id, !task.done);
  emit("update:refresh", true);
};

const handleCloseModal = (task) => {
  task.done = !task.done;
  confirmModal.value = false;
};
</script>

<template>
  <v-tabs v-model="tab" bg-color="" class="tabs">
    <v-tab value="to-do" class="tab"> Para fazer</v-tab>
    <v-tab value="completed" class="tab">Concluídas</v-tab>
  </v-tabs>

  <v-card-text class="teste">
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="to-do" class="window">
        <div class="tasks-list" v-if="props.toDoArr.length">
          <div v-for="task in props.toDoArr" :key="task.id" class="card">
            <h2 class="card-title">{{ task.title }}</h2>
            <div class="flex align-center gap-1">
              <v-checkbox
                color="success"
                hide-details
                v-model="task.done"
                @click="handleConfirmModalOpen(task)"
              ></v-checkbox>
            </div>
          </div>
        </div>
        <div class="no-data-alert" v-else>
          <BaseNoDataAlert
            title="Nenhuma Tarefa Encontrada!"
            text="Não foi encontrado nenhuma tarefa para seu usuário"
          />
        </div>
      </v-tabs-window-item>

      <v-tabs-window-item value="completed" class="window">
        <div class="tasks-list" v-if="props.completedArr.length">
          <div
            v-for="task in props.completedArr"
            :key="task.id"
            class="card completed"
          >
            <div class="flex gap-1 align-center justify-center">
              <h2 class="card-title">{{ task.title }}</h2>
            </div>
            <div class="flex align-center justify-center">
              <v-checkbox
                color="success"
                hide-details
                v-model="task.done"
                width=""
                @click="handleToDoSwitch(task)"
              ></v-checkbox>
            </div>
          </div>
        </div>
        <div class="no-data-alert" v-else>
          <BaseNoDataAlert
            title="Nenhuma Tarefa Encontrada!"
            text="Não foi encontrado nenhuma tarefa concluída para seu usuário"
          />
        </div>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card-text>

  <BaseModal :open="confirmModal" :closeIcon="true">
    <template v-slot:header>
      <div class="header">
        <h1>Deseja marcar esta Tarefa como concluída?</h1>
      </div>
    </template>

    <template v-slot:footer>
      <div class="footer flex gap-1">
        <BaseButton
          class="cancel btn"
          label="Cancelar"
          @click="handleCloseModal(taskToComplete)"
        />
        <BaseButton class="btn" label="Sim" @click="handlePayload" />
      </div>
    </template>
  </BaseModal>

  <BaseAlertError v-if="error" class="alert" :text="textError"></BaseAlertError>
  <BaseAlertSuccess
    v-if="success"
    class="alert"
    text="Tarefa concluída com sucesso"
  ></BaseAlertSuccess>
</template>

<style scoped lang="scss">
.btn {
  width: 110px;
}

.no-data-alert {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.alert {
  z-index: 99999 !important;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 25px;
    width: 100%;
    color: rgb(73, 73, 73) !important;
    text-align: center;
  }
}

.body {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer {
  margin-top: 25px;
  align-items: center;
  justify-content: center;
}

.cancel {
  background-color: rgb(252, 31, 31);
}

.teste {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.tasks-list {
  max-height: 500px;
  overflow-y: auto;
}

.tabs {
  border: none !important;
}

.tab {
  border: none !important;
  color: rgb(104, 104, 104);
  font-family: "poppins", sans-serif !important;
}

.card {
  border: 2px solid rgb(180, 180, 180);
  padding: 7px 20px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  overflow-x: auto;
  overflow-y: hidden;
  h2 {
    color: rgb(85, 85, 85);
    font-weight: 500;
  }
  .btn {
    border-radius: 30px;
  }

  @media (max-width: 630px) {
    h2 {
      font-size: 15px;
    }

    & {
      width: 100%;
      padding: 0px 10px;
    }
  }
}
.window {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.completed {
  background-color: rgb(202, 250, 202);
  border: 2px solid rgb(108, 187, 108);

  h2 {
    text-decoration: line-through;
  }
}
</style>
