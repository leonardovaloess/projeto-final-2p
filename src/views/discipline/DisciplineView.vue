<script setup>
import { ref, onMounted } from "vue";

import BaseLoading from "@/components/BaseLoading.vue";

import { useDisciplineStore } from "@/stores/discipline";
import { useRoute } from "vue-router";
import { useCourseStore } from "@/stores/course";
import SubmitContainer from "./partials/SubmitContainer.vue";
import TaskContainer from "./partials/TaskContainer.vue";
import WarningsContainer from "./partials/WarningsContainer.vue";

const disciplineStore = useDisciplineStore();
const { getDisciplineById, getDisciplineProfessor } = disciplineStore;

const courseStore = useCourseStore();
const { alunosCadastradosNoCurso } = courseStore;

const route = useRoute();

const menuSelectedId = ref(0);
const userTypeId = ref(null);
const disciplineData = ref([]);
const alunos = ref([]);
const professor = ref(null);

const loading = ref(false);
loading.value = true;
loading.value = false;

const initFunction = async () => {
  loading.value = true;
  userTypeId.value = localStorage.getItem("user_type_id");
  disciplineData.value = await getDisciplineById(route.params.disciplina_id);
  alunos.value = await alunosCadastradosNoCurso(disciplineData.value.curso_id);
  professor.value = await getDisciplineProfessor(route.params.disciplina_id);
  loading.value = false;
};

onMounted(async () => {
  await initFunction();
});
</script>

<template>
  <div class="page-background">
    <div class="page-head mb-5" v-if="!loading">
      <h1>{{ disciplineData.nome }}</h1>
    </div>
    <div class="main-container mt-1 w-100" v-if="!loading">
      <div class="discipline-nav-menu">
        <span
          @click="menuSelectedId = 0"
          :style="
            menuSelectedId == 0
              ? `color: black; text-decoration: underline;`
              : ''
          "
          >Tarefas</span
        >
        <span
          @click="menuSelectedId = 1"
          :style="
            menuSelectedId == 1
              ? `color: black; text-decoration: underline;`
              : ''
          "
          >Avisos</span
        >
        <span
          v-if="userTypeId == 2"
          @click="menuSelectedId = 2"
          :style="
            menuSelectedId == 2
              ? `color: black; text-decoration: underline;`
              : ''
          "
          >Envios</span
        >
      </div>
      <div class="main-content">
        <TaskContainer v-if="menuSelectedId == 0" />
        <WarningsContainer v-if="menuSelectedId == 1" />
        <SubmitContainer v-if="menuSelectedId == 2" />
      </div>
      <div class="users-list">
        <div class="professor">
          <h4>Professor:</h4>
          <div class="UserCard" v-if="professor">
            <img v-if="professor.user_img" :src="professor.user_img" alt="" />
            <img v-else src="../../assets/img/png/user_default.png" alt="" />
            {{ professor.nome }}
          </div>
        </div>
        <div class="alunos">
          <h4>Alunos:</h4>
          <div
            class="UserCard"
            v-for="aluno in alunos"
            :key="aluno.id"
            v-if="alunos.length"
          >
            <img v-if="aluno.user_img" :src="aluno.user_img" alt="Foto aluno" />
            <img v-else src="../../assets/img/png/user_default.png" alt="" />
            {{ aluno.nome }}
          </div>
        </div>
      </div>
    </div>
    <div v-else class="loading">
      <BaseLoading class="loading-icon" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-head {
  width: 100%;

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
  display: grid;
  grid-template-columns: 1fr 5fr 1.5fr;
  gap: 60px;

  flex: 1;

  .discipline-nav-menu {
    display: flex;
    flex-direction: column;
    gap: 5px;

    h2 {
      font-size: 24px;
    }
    span {
      color: grey;

      width: min-content;

      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }

  .main-content {
    padding: 0 20px;
  }

  .users-list {
    width: 100%;
    h4 {
      font-size: 15px;
      font-weight: 400;
    }
  }

  @media (max-width: 630px) {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .main-content {
      padding: 0;
      width: 100%;
    }

    .users-list {
      display: none;
    }
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
