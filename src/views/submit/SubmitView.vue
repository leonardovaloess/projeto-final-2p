<script setup>
import { ref, onMounted, watch } from "vue";

import formatDate from "@/utils/date";
import BaseLoading from "@/components/BaseLoading.vue";
import BaseAlertSuccess from "@/components/Alert/BaseAlertSuccess.vue";
import BaseAlertError from "@/components/Alert/BaseAlertError.vue";
import { useRoute } from "vue-router";
import { useTaskStore } from "@/stores/task";
import BaseTextarea from "@/components/input/BaseTextarea.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import { useUserStore } from "@/stores/users";
import NotaModal from "./partials/NotaModal.vue";

const taskStore = useTaskStore();
const { getTaskSubmitById, getTaskById } = taskStore;
const userStore = useUserStore();
const { getAlunoById } = userStore;
const error = ref(false);
const success = ref(false);

const propsInfo = ref(null);
const route = useRoute();
const openNotaModal = ref(false);
const taskData = ref(null);
const textError = ref(null);
const textSuccess = ref(null);

const userTypeId = ref(null);
const userData = ref(null);
const taskSubmitData = ref(null);

const submitData = ref(null);

const loading = ref(false);

const cancel = (ev) => {
  openNotaModal.value = ev;
};

const refreshList = async (ev) => {
  if (ev == true) {
    openNotaModal.value = false;
    await initFunction();
  }
};

const initFunction = async () => {
  loading.value = true;
  submitData.value = await getTaskSubmitById(route.params.submit_id);

  if (submitData.value) {
    console.log(submitData.value);

    taskData.value = await getTaskById(submitData.value.envio.tarefa_id);
    userData.value = await getAlunoById(submitData.value.envio.aluno_id);

    propsInfo.value = {
      aluno_id: userData.value.id,
      tarefa_id: taskData.value.id,
    };
  }
  loading.value = false;
};

onMounted(async () => {
  await initFunction();
});
</script>

<template>
  <div class="page-background">
    <div
      class="page-head mb-5"
      v-if="!loading && submitData && taskData && userData"
    >
      <h1>{{ taskData.nome }} - {{ formatDate(taskData.data_entrega) }}</h1>

      <span style="font-size: 14px" class="task-submit-text"
        >Tarefa Entregue por {{ userData.nome }} -
        {{ formatDate(submitData.envio.created_at) }}</span
      >
    </div>
    <div class="main-container mt-1 w-100" v-if="!loading && submitData">
      <div class="description-container">
        <h3 class="mb-3">Texto de Resposta:</h3>
        {{ submitData.envio.texto }}
        <h3 style="font-size: 16px" class="mt-3 mb-3">Arquivos:</h3>
      </div>
      <div class="material-container"></div>
      <div class="nota-container flex align-center gap-05 w-100 justify-end">
        Nota: {{ submitData.nota_tarefa ? submitData.nota_tarefa : "_" }}/10
        <svg
          width="23px"
          height="23px"
          viewBox="0 0 576 512"
          xmlns="http://www.w3.org/2000/svg"
          style="cursor: pointer; margin-bottom: 5px"
          @click="openNotaModal = true"
        >
          <path
            d="m402.3 344.9 32-32c5-5 13.7-1.5 13.7 5.7v145.4c0 26.5-21.5 48-48 48h-352c-26.5 0-48-21.5-48-48v-352c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3h-241.5v352h352v-113.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8-262.6 262.6-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4 262.6-262.6c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zm-98.8 30.9-58.1-58.1-185.8 185.9-7.3 65.3 65.3-7.3zm64.8-79.7-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0l-30.9 30.9 58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"
          />
        </svg>
      </div>
    </div>

    <div v-else class="loading">
      <BaseLoading class="loading-icon" />
    </div>

    <NotaModal
      :open="openNotaModal"
      @update:open="cancel($event)"
      @update:refresh="refreshList($event)"
      :info="propsInfo"
    />

    <BaseAlertError v-if="error" :text="textError" />
    <BaseAlertSuccess v-if="success" :text="textSuccess" />
  </div>
</template>

<style scoped lang="scss">
.task-submit-text {
  color: rgb(2, 124, 2);

  background-color: rgb(177, 251, 177);
  padding: 3px 15px;
  border-radius: 20px;
}
.file-input {
  font-size: 12px;
}
.file {
  text-decoration: underline;
  color: rgb(93, 93, 93);
  cursor: pointer;
  width: fit-content;
}
h3 {
  font-weight: 500;
  font-size: 16px;
}
.page-head {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 18px;
    color: rgb(85, 85, 85);
    font-weight: 500;
  }

  padding-bottom: 20px;

  border-bottom: 2px solid rgba(202, 202, 202, 0.561);
}

.main-container {
  padding: 0 20px;
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 630px) {
    margin-top: 20px;
  }
}

.UserCard {
  border-bottom: 1px solid rgb(204, 204, 204);
  padding: 15px 0;
  display: flex;
  font-size: 14px;
  align-items: center;
  gap: 12px;
  img {
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 50%;
  }

  &:last-of-type {
    border: none;
  }
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

.page-background {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  height: 100%;
}
</style>
