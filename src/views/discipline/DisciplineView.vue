<script setup>
import { ref, onMounted } from "vue";

import BaseLoading from "@/components/BaseLoading.vue";

import { useDisciplineStore } from "@/stores/discipline";
import { useRoute } from "vue-router";
import { useCourseStore } from "@/stores/course";

const disciplineStore = useDisciplineStore();
const { getDisciplineById, getDisciplineProfessor } = disciplineStore;

const courseStore = useCourseStore();
const { alunosCadastradosNoCurso } = courseStore;

const route = useRoute();

const disciplineData = ref([]);
const alunos = ref([]);
const professor = ref(null);

const loading = ref(false);
loading.value = true;
loading.value = false;

const initFunction = async () => {
  loading.value = true;
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
    <div class="main-container w-100" v-if="!loading">
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
.main-container {
  width: 100%;
  position: relative;
  gap: 40px;
  justify-content: space-around;
  flex: 1;

  @media (max-width: 630px) {
    margin-top: 20px;
  }

  .users-list {
    width: 250px;
    position: absolute;
    right: 0;

    h4 {
      font-size: 15px;
      font-weight: 400;
    }
  }
}

.UserCard {
  border-bottom: 1px solid rgb(204, 204, 204);
  padding: 15px 0;
  display: flex;
  font-size: 12px;
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
  padding: 2rem;
  height: 100%;
}
</style>
