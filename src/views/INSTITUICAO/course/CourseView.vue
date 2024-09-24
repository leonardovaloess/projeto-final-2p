<script setup>
import { ref, onMounted, computed } from "vue";

import BaseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import CreateEditCourseModal from "./Partials/CreateEditCourseModal.vue";
import DeleteCourseModal from "./Partials/DeleteCourseModal.vue";
import BaseNoDataAlert from "@/components/BaseNoDataAlert.vue";
import BaseLoading from "@/components/BaseLoading.vue";
import BaseTable from "@/components/table/BaseTable.vue";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";
import { useCourseStore } from "@/stores/course";
import formatDate from "@/utils/date";
const courseStore = useCourseStore();
const { getCourses } = courseStore;

const fields = [
  { key: "id", label: "id" },
  { key: "nome", label: "Nome" },
  { key: "created_at", label: "Cadastro em" },
];

const optionsStatusCreation = [
  {
    id: 0,
    name: "Editar",
    icon: "edit",
  },
  {
    id: 1,
    name: "Desvincular",
    icon: "delete",
  },
];

const tableData = ref([]);
const filteredData = computed(() => {
  if (!search.value) return tableData.value;
  return tableData.value.filter((item) =>
    item.nome.toLowerCase().includes(search.value.toLowerCase())
  );
});

const courseToEdit = ref(null);
const loading = ref(false);
loading.value = true;
loading.value = false;

const openModal = ref(false);
const openDeleteModal = ref(false);
const createModal = ref(true);
const search = ref("");

const cancel = (ev) => {
  openModal.value = ev;
  openDeleteModal.value = ev;
  courseToEdit.value = null;
};

const refreshList = async (ev) => {
  if (ev == true) {
    openModal.value = false;
    openDeleteModal.value = false;
    await initFunction();
  }
};

const initFunction = async () => {
  loading.value = true;
  tableData.value = await getCourses();
  loading.value = false;
};

const handleSelect = (item, id) => {
  console.log("item", item);
  console.log("id", id);

  if (id == 0) {
    courseToEdit.value = item;
    openModal.value = true;
  }
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
  <div class="page-background">
    <div class="top flex align-center">
      <BaseInput
        class="base-input"
        v-model="search"
        placeholder="Buscar Professor..."
      />
      <div class="btns-container flex gap-1">
        <BaseButton
          class="base-button"
          label="Cadastrar Curso"
          @click="openModal = !openModal"
        />
      </div>
    </div>
    <div class="tasks" v-if="!loading">
      <div v-if="filteredData">
        <BaseTable :fields="fields" :has-options="true">
          <template v-slot:body>
            <tr v-for="(row, index) in filteredData" :key="index">
              <td v-for="field in fields" :key="field.key">
                {{
                  field.key == "created_at"
                    ? formatDate(row[field.key])
                    : row[field.key]
                }}
              </td>
              <td class="col-options">
                <BaseDropdown
                  :options="optionsStatusCreation"
                  @select="(option) => handleSelect(row, option.id)"
                />
              </td>
            </tr>
          </template>
        </BaseTable>
      </div>
      <div v-else>
        <BaseNoDataAlert
          text="Nenhum Curso Cadastrado"
          title="Nenhum Dado Encontrado!"
        />
      </div>
    </div>
    <div v-else class="loading">
      <BaseLoading class="loading-icon" />
    </div>
    <CreateEditCourseModal
      :open="openModal"
      @update:open="cancel($event)"
      @update:refresh="refreshList($event)"
      :info="courseToEdit"
    />
    <DeleteCourseModal
      :open="openDeleteModal"
      @update:open="cancel($event)"
      @update:refresh="refreshList($event)"
      :info="courseToEdit"
    />
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

.page-background {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  height: 100%;
}
</style>
