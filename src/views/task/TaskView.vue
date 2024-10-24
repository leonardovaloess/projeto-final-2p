<script setup>
import { ref, onMounted, watch } from "vue";

import BaseLoading from "@/components/BaseLoading.vue";

import { useRoute } from "vue-router";
import { useTaskStore } from "@/stores/task";
import BaseTextarea from "@/components/input/BaseTextarea.vue";

const taskStore = useTaskStore();
const { getTaskById, postTaskFile, getTaskFile } = taskStore;
const route = useRoute();

const menuSelectedId = ref(0);
const files = ref(null);
const taskData = ref(null);
const alunos = ref([]);
const professor = ref(null);
const taskFiles = ref([]);

const loading = ref(false);
loading.value = true;
loading.value = false;

const initFunction = async () => {
  loading.value = true;
  taskData.value = await getTaskById(route.params.task_id);
  taskFiles.value = await getTaskFile(route.params.task_id);
  loading.value = false;
};

const onFileSelected = (ev) => {
  files.value = Array.from(ev.target.files);
};

const downloadFile = (file) => {
  // Supondo que a URL base do seu servidor seja 'https://seuservidor.com/'

  const baseUrl = "https://squid-app-ivp7d.ondigitalocean.app/api/";
  const downloadUrl = `${baseUrl}${file.material}`;

  // Cria um elemento <a> dinamicamente
  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = file.titulo;
  link.target = "_blank"; // Opcional: abre em nova aba

  // Adiciona o elemento ao DOM e aciona o download
  document.body.appendChild(link);
  link.click();

  // Remove o elemento do DOM após o clique
  document.body.removeChild(link);
};

watch(
  () => files.value,
  async () => {
    if (files.value && files.value.length > 0) {
      // Criando FormData
      const formData = new FormData();
      formData.append("titulo", files.value[0].name);
      formData.append("material", files.value[0]); // Adicionando o arquivo
      formData.append("tarefa_id", route.params.task_id);

      console.log(...formData); // Para verificar o conteúdo do formData

      // Enviando o FormData no POST
      await postTaskFile(formData);
      await initFunction();
    }
  }
);
onMounted(async () => {
  await initFunction();
});
</script>

<template>
  <div class="page-background">
    <div class="page-head mb-5" v-if="!loading && taskData">
      <h1>{{ taskData.nome }}</h1>
    </div>
    <div class="main-container mt-1 w-100" v-if="!loading && taskData">
      <div class="description-container">
        <h3 class="mb-3">Descrição:</h3>
        {{ taskData.descricao }}
        <h3 style="font-size: 16px" class="mt-5 mb-3">Arquivos:</h3>
        <div v-if="taskFiles.length > 0" class="flex flex-column gap-05 mb-3">
          <span
            class="file"
            v-for="file in taskFiles"
            :href="file.material"
            @click="downloadFile(file)"
            >{{ file.titulo }}</span
          >
        </div>
        <input
          class="file-input"
          type="file"
          name="file"
          multiple
          @change="onFileSelected($event)"
        />
      </div>
      <div class="material-container"></div>
      <div class="comments-container mb-5" v-if="!loading && taskData">
        <h3 class="mb-2">Comentários:</h3>
        <BaseTextarea
          style="height: 80px; border-width: 1.5px"
          placeholder="Deixe um comentário sobre a atividade..."
        />
      </div>
    </div>

    <div v-else class="loading">
      <BaseLoading class="loading-icon" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.file-input {
  font-size: 12px;
}
.file {
  text-decoration: underline;
  color: rgb(93, 93, 93);

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
