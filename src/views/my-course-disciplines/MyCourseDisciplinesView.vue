<script setup>
import { ref, onMounted, computed } from "vue";

import BaseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import DisciplineCard from "./Partials/DisciplineCard.vue";

import BaseNoDataAlert from "@/components/BaseNoDataAlert.vue";
import BaseLoading from "@/components/BaseLoading.vue";

import { useDisciplineStore } from "@/stores/discipline";
import { useRoute } from "vue-router";

const disciplineStore = useDisciplineStore();
const { getDisciplinesStudent } = disciplineStore;

const tableData = ref([]);

const filteredData = computed(() => {
  if (!search.value) return tableData.value;
  return tableData.value.filter((item) =>
    item.nome.toLowerCase().includes(search.value.toLowerCase())
  );
});

const route = useRoute();

const loading = ref(false);
loading.value = true;
loading.value = false;

const search = ref("");

const refreshListCard = async (ev) => {
  if (ev == true) {
    await initFunction();
  }
};

const initFunction = async () => {
  loading.value = true;
  const cursoId = route.params.curso_id;
  tableData.value = await getDisciplinesStudent(cursoId);
  loading.value = false;
};

onMounted(async () => {
  await initFunction();
});
</script>

<template>
  <div class="page-background">
    <div class="top flex align-center">
      <BaseInput
        class="base-input"
        v-model="search"
        placeholder="Buscar Disciplina..."
      />
      <div class="btns-container flex gap-1"></div>
    </div>
    <div class="tasks" v-if="!loading">
      <div v-if="filteredData">
        <div class="cards-container">
          <DisciplineCard
            @refresh="refreshListCard"
            v-for="discipline in filteredData"
            :key="discipline.id"
            :discipline="discipline"
          />
        </div>
      </div>
      <div v-else>
        <BaseNoDataAlert
          text="Nenhuma Disciplina Encontrada"
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
