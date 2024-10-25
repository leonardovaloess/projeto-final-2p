<script setup>
import CreateEditWarning from "./CreateEditWarning.vue";
import DeleteWarningModal from "./DeleteWarningModal.vue";
import BaseInput from "@/components/input/BaseInput.vue";

import { onMounted, ref, computed } from "vue";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";
import { useRoute, useRouter } from "vue-router";
import BaseLoading from "@/components/BaseLoading.vue";
import { useWarningsStore } from "@/stores/warnings";

const userTypeId = ref(null);
const openModal = ref(false);
const loading = ref(false);
const route = useRoute();
const warningStore = useWarningsStore();
const { getWarnings } = warningStore;

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
const warningToEdit = ref(null);
const emit = defineEmits(["refresh"]);
const props = defineProps({
  course: Object,
});

const initFunction = async () => {
  loading.value = true;
  userTypeId.value = localStorage.getItem("user_type_id");
  data.value = await getWarnings(route.params.disciplina_id);
  loading.value = false;
};

const cancel = (ev) => {
  option_id.value = null;
  openModal.value = ev;
  openDeleteModal.value = ev;
  openStudentsModal.value = ev;
  warningToEdit.value = null;
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
  if (id == 0) {
    warningToEdit.value = item;
    openModal.value = true;
  }
  if (id == 1) {
    warningToEdit.value = item;
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
      <BaseInput placeholder="Buscar Aviso..." v-model="search" />
      <button
        class="line-button"
        @click="openModal = true"
        v-if="userTypeId !== '1'"
      >
        + Adicionar Aviso
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
            d="M6.66651 33.3335V23.3335C6.66651 19.7973 8.07126 16.4059 10.5718 13.9054C13.0722 11.4049 16.4636 10.0002 19.9998 10.0002C23.5361 10.0002 26.9274 11.4049 29.4279 13.9054C31.9284 16.4059 33.3332 19.7973 33.3332 23.3335V33.3335H34.9998V36.6668H4.99984V33.3335H6.66651ZM9.99984 33.3335H29.9998V23.3335C29.9998 20.6813 28.9463 18.1378 27.0709 16.2624C25.1955 14.3871 22.652 13.3335 19.9998 13.3335C17.3477 13.3335 14.8041 14.3871 12.9288 16.2624C11.0534 18.1378 9.99984 20.6813 9.99984 23.3335V33.3335ZM18.3332 3.3335H21.6665V8.3335H18.3332V3.3335ZM32.9632 8.0135L35.3198 10.3702L31.7865 13.9052L29.4282 11.5485L32.9632 8.0135ZM4.67984 10.3702L7.03651 8.0135L10.5715 11.5468L8.21651 13.9068L4.67984 10.3702ZM11.6665 23.3335C11.6665 21.1234 12.5445 19.0037 14.1073 17.4409C15.6701 15.8781 17.7897 15.0002 19.9998 15.0002V18.3335C18.6738 18.3335 17.402 18.8603 16.4643 19.798C15.5266 20.7356 14.9998 22.0074 14.9998 23.3335H11.6665Z"
            fill="grey"
          />
        </svg>
        <RouterLink :to="`/warning/${data.id}`" class="link">{{
          data.titulo
        }}</RouterLink>
        <BaseDropdown
          class="dropdown"
          :options="options"
          @select="(option) => handleSelect(data, option.id)"
        />
      </div>
      <div v-else class="w-100 flex align-center justify-center">
        <span>Nenhum Aviso</span>
      </div>
    </div>
    <div v-else class="w-100 flex align-center justify-center">
      <BaseLoading />
    </div>
  </div>

  <CreateEditWarning
    :open="openModal"
    @update:open="cancel($event)"
    @update:refresh="refreshList($event)"
    :info="warningToEdit"
  />

  <DeleteWarningModal
    :open="openDeleteModal"
    @update:open="cancel($event)"
    @update:refresh="refreshList($event)"
    :info="warningToEdit"
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
