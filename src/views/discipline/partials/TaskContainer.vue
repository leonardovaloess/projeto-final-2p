<script setup>
import CreateEditTask from "./CreateEditTask.vue";
import DeleteTaskModal from "./DeleteTaskModal.vue";
import BaseInput from "@/components/input/BaseInput.vue";
import { useTaskStore } from "@/stores/task";
import { onMounted, ref, computed } from "vue";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";
import { useRoute, useRouter } from "vue-router";
import BaseLoading from "@/components/BaseLoading.vue";

const openModal = ref(false);
const loading = ref(false);

const route = useRoute();
const taskStore = useTaskStore();
const { getTasks } = taskStore;

const openDeleteModal = ref(false);

const data = ref(false);

const filteredData = computed(() => {
  if (!search.value) return data.value;
  return data.value.filter((item) =>
    item.nome.toLowerCase().includes(search.value.toLowerCase())
  );
});

const search = ref(null);

const openStudentsModal = ref(false);
const option_id = ref(null);
const router = useRouter();
const courseToEdit = ref(null);
const emit = defineEmits(["refresh"]);
const props = defineProps({
  course: Object,
});

const initFunction = async () => {
  console.log(route.params.disciplina_id);

  loading.value = true;
  data.value = await getTasks(route.params.disciplina_id);
  loading.value = false;
};

const cancel = (ev) => {
  option_id.value = null;
  openModal.value = ev;
  openDeleteModal.value = ev;
  openStudentsModal.value = ev;
  courseToEdit.value = null;
};

const refreshList = async (ev) => {
  if (ev == true) {
    option_id.value = null;

    openModal.value = false;
    openDeleteModal.value = false;
    await initFunction();
    emit("refresh", true);
  }
};

const options = [
  {
    id: 1,
    name: "Excluir",
    icon: "delete",
  },
];

const handleSelect = (item, id) => {
  if (id == 1) {
    courseToEdit.value = item;
    openDeleteModal.value = true;
  }
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
      <BaseInput placeholder="Buscar Tarefa..." v-model="search" />
      <button class="line-button" @click="openModal = true">
        + Adicionar Tarefa
      </button>
    </div>

    <div class="cards flex column gap-1" v-if="!loading">
      <div
        v-if="filteredData"
        class="card-task"
        v-for="data in filteredData"
        :key="data.id"
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
        <RouterLink :to="`/task/${data.id}`" class="link">{{
          data.nome
        }}</RouterLink>
        <BaseDropdown
          class="dropdown"
          :options="options"
          @select="(option) => handleSelect(data, option.id)"
        />
      </div>
      <div v-else class="w-100 flex align-center justify-center">
        <span>Nenhuma Tarefa</span>
      </div>
    </div>
    <div v-else class="w-100 flex align-center justify-center">
      <BaseLoading />
    </div>
  </div>

  <CreateEditTask
    :open="openModal"
    @update:open="cancel($event)"
    @update:refresh="refreshList($event)"
    :info="courseToEdit"
  />

  <DeleteTaskModal
    :open="openDeleteModal"
    @update:open="cancel($event)"
    @update:refresh="refreshList($event)"
    :info="courseToEdit"
  />
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
