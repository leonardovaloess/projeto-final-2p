<script setup>
import { ref, onMounted, watch } from "vue";

import BaseLoading from "@/components/BaseLoading.vue";
import BaseAlertSuccess from "@/components/Alert/BaseAlertSuccess.vue";
import BaseAlertError from "@/components/Alert/BaseAlertError.vue";
import { useRoute } from "vue-router";
import { useTaskStore } from "@/stores/task";
import BaseTextarea from "@/components/input/BaseTextarea.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import { useWarningsStore } from "@/stores/warnings";

const warningStore = useWarningsStore();
const {
  getWarningById,
  getWarningComments,
  postWarningComment,
  deleteWarningComment,
} = warningStore;

const comments = ref(null);
const route = useRoute();
const user_id = localStorage.getItem("user_id");
const comment = ref(null);

const error = ref(false);
const success = ref(false);

const textError = ref(null);
const textSuccess = ref(null);

const warningData = ref(null);

const loading = ref(false);

const initFunction = async () => {
  loading.value = true;
  warningData.value = await getWarningById(route.params.warning_id);
  const commentsData = await getWarningComments(route.params.warning_id);
  if (commentsData) {
    comments.value = commentsData.comentarios;
  }
  loading.value = false;
};

const handleSendComment = async () => {
  if (comment.value) {
    const payload = {
      comentario: comment.value,
      aviso_id: route.params.warning_id,
    };
    const response = await postWarningComment(payload);

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
  const response = await deleteWarningComment(comentario_id);
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

onMounted(async () => {
  await initFunction();
});
</script>

<template>
  <div class="page-background">
    <div class="page-head mb-5" v-if="!loading && warningData">
      <h1>{{ warningData.titulo }}</h1>
    </div>
    <div class="main-container mt-1 w-100" v-if="!loading && warningData">
      <div class="description-container">
        <h3 class="mb-3">Descrição:</h3>
        {{ warningData.aviso }}
      </div>
      <div class="material-container"></div>
      <div class="comments-container mb-5" v-if="!loading && warningData">
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
