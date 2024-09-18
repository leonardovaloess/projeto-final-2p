<script setup>
import { ref, onMounted, watch } from "vue";

import BaseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import CreateEditProfessorModal from "./Partials/CreateEditProfessorModal.vue";
import DeleteProfessorModal from "./Partials/DeleteProfessorModal.vue";
import BaseNoDataAlert from "@/components/BaseNoDataAlert.vue";
import BaseLoading from "@/components/BaseLoading.vue";
import BaseTable from "@/components/table/BaseTable.vue";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";
import { useUserStore } from "@/stores/users";
import formatDate from "@/utils/date";
const userStore = useUserStore();
const { getProfessores } = userStore;

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

const professorToEdit = ref(null);

const loading = ref(false);
loading.value = true;
loading.value = false;

const openModal = ref(false);
const openDeleteModal = ref(false);
const createModal = ref(true);
const search = ref(null);

const cancel = (ev) => {
  openModal.value = ev;
  openDeleteModal.value = ev;
  professorToEdit.value = null;
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
  tableData.value = await getProfessores();
  loading.value = false;
};

const handleSelect = (item, id) => {
  console.log("item", item);
  console.log("id", id);

  if (id == 0) {
    professorToEdit.value = item;
    openModal.value = true;
  }
  if (id == 1) {
    professorToEdit.value = item;
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
          label="Cadastrar Professor"
          @click="openModal = !openModal"
        />
      </div>
    </div>
    <div class="tasks" v-if="!loading">
      <div v-if="tableData">
        <BaseTable :fields="fields" :has-options="true">
          <template v-slot:body>
            <tr v-for="(row, index) in tableData" :key="index">
              <td v-for="field in fields" :key="field.key">
                {{
                  field.key == "created_at"
                    ? formatDate(row[field.key])
                    : row[field.key]
                }}
              </td>
              <td>
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
          text="Nenhum Professor Cadastrado"
          title="Nehnum Dado Encontrado!"
        />
      </div>
    </div>
    <div v-else class="loading">
      <BaseLoading class="loading-icon" />
    </div>
    <CreateEditProfessorModal
      :open="openModal"
      @update:open="cancel($event)"
      @update:refresh="refreshList($event)"
      :info="professorToEdit"
    />
    <DeleteProfessorModal
      :open="openDeleteModal"
      @update:open="cancel($event)"
      @update:refresh="refreshList($event)"
      :info="professorToEdit"
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
  @media (max-width: 630px) {
    gap: 1rem;
    padding: 15px;

    .btns-container {
      gap: 0.5rem;
    }

    .base-button {
      font-size: 10px;

      width: 10%;
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
  @media (max-width: 630px) {
    padding: 1rem;
  }
}
</style>
