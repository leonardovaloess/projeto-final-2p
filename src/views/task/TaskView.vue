<script setup>
import { ref, onMounted, watch } from "vue";
import TaskSubmitModal from "./partials/TaskSubmitModal.vue";

import BaseLoading from "@/components/BaseLoading.vue";
import BaseAlertSuccess from "@/components/Alert/BaseAlertSuccess.vue";
import BaseAlertError from "@/components/Alert/BaseAlertError.vue";
import { useRoute } from "vue-router";
import { useTaskStore } from "@/stores/task";
import BaseTextarea from "@/components/input/BaseTextarea.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";

const taskStore = useTaskStore();
const {
  getTaskById,
  postTaskFile,
  getTaskFile,
  postTaskComment,
  getTaskComment,
  deleteTaskComment,
} = taskStore;

const error = ref(false);
const success = ref(false);

const openSubmitModal = ref(false);

const textError = ref(null);
const textSuccess = ref(null);

const user_id = ref(null);
const userTypeId = ref(null);
const comments = ref(null);
const route = useRoute();
const comment = ref(null);

const files = ref(null);
const taskData = ref(null);

const taskFiles = ref([]);

const loading = ref(false);
loading.value = true;
loading.value = false;

const cancel = (ev) => {
  openSubmitModal.value = ev;
};

const initFunction = async () => {
  loading.value = true;
  userTypeId.value = localStorage.getItem("user_type_id");
  taskData.value = await getTaskById(route.params.task_id);
  user_id.value = localStorage.getItem("user_id");
  taskFiles.value = await getTaskFile(route.params.task_id);
  const commentsData = await getTaskComment(route.params.task_id);
  if (commentsData) {
    comments.value = commentsData.comentarios;
  }
  loading.value = false;
};

const onFileSelected = (ev) => {
  files.value = Array.from(ev.target.files);
};

const downloadFile = (file) => {
  // Supondo que a URL base do seu servidor seja 'https://seuservidor.com/'

  const baseUrl = "https://squid-app-ivp7d.ondigitalocean.app";
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

const handleSendComment = async () => {
  const user_id = localStorage.getItem("user_id");

  if (comment.value) {
    const payload = {
      comentario: comment.value,
      tarefa_id: route.params.task_id,
      user_id: user_id,
    };
    const response = await postTaskComment(payload);

    if (response) {
      await initFunction();
      comment.value = null;
      success.value = true;
      textSuccess.value = "Comentário Enviado com Sucesso!";
      setTimeout(() => {
        success.value = false;
      }, 3000);
    } else {
      error.value = true;
      textError.value = "Erro ao enviar comentário!";
      setTimeout(() => {
        error.value = false;
      }, 3000);
    }
  } else {
    error.value = true;
    textError.value = "Comentário não pode ser Vazio!";
    setTimeout(() => {
      error.value = false;
    }, 3000);
  }
};

const handleDeleteComment = async (comentario_id) => {
  const response = await deleteTaskComment(comentario_id);
  if (response) {
    await initFunction();
    success.value = true;
    textSuccess.value = "Comentário Removido com Sucesso!";
    setTimeout(() => {
      success.value = false;
    }, 3000);
  } else {
    error.value = true;
    textError.value = "Erro ao Remover Comentário";
    setTimeout(() => {
      error.value = false;
    }, 3000);
  }
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
      <BaseButton
        label="Enviar Tarefa"
        v-if="userTypeId == '1'"
        @click="openSubmitModal = true"
      />
    </div>
    <div class="main-container mt-1 w-100" v-if="!loading && taskData">
      <div class="description-container">
        <h3 class="mb-3">Descrição:</h3>
        {{ taskData.descricao }}
        <h3 style="font-size: 16px" class="mt-5 mb-3">Arquivos:</h3>
        <div v-if="taskFiles" class="flex flex-column gap-05 mb-3">
          <span
            class="file"
            v-for="file in taskFiles"
            :href="file.material"
            @click="downloadFile(file)"
            >{{ file.titulo }}</span
          >
        </div>
        <input
          v-if="userTypeId !== '1'"
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
          v-model="comment"
        />
        <div class="comment-button flex align-end justify-end">
          <BaseButton label="Enviar Comentário." @click="handleSendComment" />
        </div>
        <div class="comments">
          <div v-if="comments" class="flex flex-column gap-1">
            <div
              v-for="comment in comments"
              :key="comment.id"
              class="flex flex-column gap-06 w-100"
            >
              <div class="flex align-center" style="gap: 12px">
                <img
                  style="
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                    border-radius: 50%;
                  "
                  src="../../../src/assets/img/png/user_default.png"
                  alt=""
                  v-if="!comment.user.user_img"
                />
                <img
                  style="
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                    border-radius: 50%;
                  "
                  :src="comment.user.user_img"
                  alt=""
                  v-else
                />

                <span style="font-weight: 500">{{ comment.user.nome }}</span>
                <svg
                  v-if="user_id == comment.user.id"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 48 48"
                  style="cursor: pointer"
                  fill="none"
                  @click="handleDeleteComment(comment.id)"
                >
                  <path
                    d="M14 12V6C14 5.46957 14.2107 4.96086 14.5858 4.58579C14.9609 4.21071 15.4696 4 16 4H32C32.5304 4 33.0391 4.21071 33.4142 4.58579C33.7893 4.96086 34 5.46957 34 6V12H44V16H40V42C40 42.5304 39.7893 43.0392 39.4142 43.4142C39.0391 43.7893 38.5304 44 38 44H10C9.46957 44 8.96086 43.7893 8.58579 43.4142C8.21071 43.0392 8 42.5304 8 42V16H4V12H14ZM18 8V12H30V8H18Z"
                    fill="red"
                  />
                </svg>
              </div>

              <span style="margin-left: 50px; color: rgb(85, 85, 85)"
                >· {{ comment.comentario }}</span
              >
            </div>
          </div>
          <div v-else class="w-100 flex justify-center">
            <span> Nenhum comentário </span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loading">
      <BaseLoading class="loading-icon" />
    </div>

    <TaskSubmitModal
      :open="openSubmitModal"
      @update:open="cancel($event)"
      @update:refresh="refreshList($event)"
      :info="user"
    />

    <BaseAlertError v-if="error" :text="textError" />
    <BaseAlertSuccess v-if="success" :text="textSuccess" />
  </div>
</template>

<style scoped lang="scss">
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
