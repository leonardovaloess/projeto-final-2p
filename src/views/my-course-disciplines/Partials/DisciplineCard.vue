<script setup>
import { onMounted, ref } from "vue";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";

import { useRouter } from "vue-router";

const openModal = ref(false);

const openDeleteModal = ref(false);
const router = useRouter();
const courseToEdit = ref(null);
const emit = defineEmits(["refresh"]);

const props = defineProps({
  discipline: Object,
});

const cancel = (ev) => {
  openModal.value = ev;
  openDeleteModal.value = ev;
  courseToEdit.value = null;
};

const refreshList = async (ev) => {
  if (ev == true) {
    openModal.value = false;
    openDeleteModal.value = false;
    emit("refresh", true);
  }
};

const options = [
  {
    id: 0,
    name: "Editar",
    icon: "edit",
  },
  {
    id: 1,
    name: "Excluir",
    icon: "delete",
  },
];

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

  if (id == 3) {
    router.push(`/course/${item.id}/disciplines`);
  }
};
</script>

<template>
  <div
    class="card-container"
    @click="router.push(`/discipline/${discipline.id}`)"
  >
    <img :src="discipline.disciplina_img" alt="" />
    <h2 class="w-100">{{ discipline.nome }}</h2>
  </div>
</template>

<style scoped lang="scss">
.card-container {
  position: relative;
  width: 250px;
  cursor: pointer;
  height: 250px;
  background-color: rgb(255, 255, 255);
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.221);
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .dropdown-card {
    position: absolute;
    right: 0px;
    top: 15px;
  }

  h2 {
    text-align: center;
    width: 100 !important;
    font-size: 16px;
    position: absolute;
    padding: 10px;
    background-color: rgb(255, 255, 255);
    bottom: 0;
  }

  &:hover {
    transition: 0.4s;
    opacity: 80%;
    h2 {
      text-decoration: underline;
    }
  }
}
</style>
