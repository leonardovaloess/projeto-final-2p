<script setup>
import BaseInput from "@/components/input/BaseInput.vue";
import { useTaskStore } from "@/stores/task";
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseLoading from "@/components/BaseLoading.vue";
import formatDate from "@/utils/date.js";
const openModal = ref(false);
const loading = ref(false);

const route = useRoute();
const taskStore = useTaskStore();
const { getAllSubmitTasksByDiscipline } = taskStore;

const userTypeId = ref(null);

const data = ref(false);

const filteredData = computed(() => {
  if (!searchAluno.value && !searchTask.value) return data.value;

  if (searchAluno.value) {
    return data.value.filter((item) =>
      item.usuario_nome.toLowerCase().includes(searchAluno.value.toLowerCase())
    );
  }

  if (searchTask.value) {
    return data.value.filter((item) =>
      item.tarefa_nome.toLowerCase().includes(searchTask.value.toLowerCase())
    );
  }
});

const searchTask = ref(null);
const searchAluno = ref(null);

const emit = defineEmits(["refresh"]);
const props = defineProps({
  course: Object,
});

const initFunction = async () => {
  console.log(route.params.disciplina_id);

  loading.value = true;
  userTypeId.value = localStorage.getItem("user_type_id");
  data.value = await getAllSubmitTasksByDiscipline(route.params.disciplina_id);
  loading.value = false;
};

onMounted(async () => {
  await initFunction();
});
</script>

<template>
  <div class="tasks-container">
    <div
      class="button-container mb-5 w-100 gap-05 flex align-center justify-end"
    >
      <BaseInput placeholder="Buscar Tarefa..." v-model="searchTask" />
      <BaseInput placeholder="Buscar Aluno..." v-model="searchAluno" />
    </div>

    <div class="cards flex column gap-1" v-if="!loading">
      <div
        v-if="filteredData"
        class="card-task"
        v-for="data in filteredData"
        :key="data.entrega_id"
      >
        <svg
          width="30"
          height="30"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M34 4H40C40.5304 4 41.0391 4.21071 41.4142 4.58579C41.7893 4.96086 42 5.46957 42 6V42C42 42.5304 41.7893 43.0391 41.4142 43.4142C41.0391 43.7893 40.5304 44 40 44H8C7.46957 44 6.96086 43.7893 6.58579 43.4142C6.21071 43.0391 6 42.5304 6 42V6C6 5.46957 6.21071 4.96086 6.58579 4.58579C6.96086 4.21071 7.46957 4 8 4H14V0H18V4H30V0H34V4ZM34 8V12H30V8H18V12H14V8H10V40H38V8H34ZM14 16H34V20H14V16ZM14 24H34V28H14V24Z"
            fill="grey"
          />
        </svg>
        <RouterLink :to="`/submit/${data.entrega_id}`" class="link"
          >{{ data.tarefa_nome }} -
          <span style="font-weight: 600">Entregue por:</span>
          {{ data.usuario_nome }} -
          {{ formatDate(data.data_entregue) }}</RouterLink
        >
      </div>
      <div v-else class="w-100 flex align-center justify-center">
        <span>Nenhuma Tarefa</span>
      </div>
    </div>
    <div v-else class="w-100 flex align-center justify-center">
      <BaseLoading />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-task {
  border: 2px solid rgb(191, 191, 191);
  padding: 15px;
  color: black !important;
  display: flex;
  position: relative;
  align-items: center;
  gap: 10px;
  border-radius: 5px;
  font-size: 14px;
  color: rgb(46, 46, 46);
  text-decoration: none;
  .link {
    color: black;
    text-decoration: none;
  }

  .dropdown {
    position: absolute;
    right: 0;
  }

  &:hover {
    transition: 0.4s;
    text-decoration: underline;
    background-color: rgb(241, 241, 241);
  }
}

.line-button {
  text-decoration: underline;
  width: 220px;
  color: rgb(117, 117, 117);
}

@media (max-width: 630px) {
  .button-container {
    flex-direction: column;
    position: relative;
    align-items: flex-start;
    height: 80px;
  }

  .line-button {
    width: fit-content;
    position: absolute;
    left: 0px;
    bottom: 40px;
  }
}
</style>
