<script setup>
import { onMounted } from "vue";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";

const props = defineProps({
  course: Object,
});

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
  {
    id: 2,
    name: "Alunos",
    icon: "list",
  },
  {
    id: 3,
    name: "Disciplinas",
    icon: "eye",
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
};

onMounted(() => {
  console.log(props.fields);
});
</script>

<template>
  <div class="card-container">
    <BaseDropdown
      :options="options"
      class="dropdown-card"
      @select="(option) => handleSelect(course, option.id)"
    />
    <h2 class="w-100">{{ course.nome }}</h2>
  </div>
</template>

<style scoped lang="scss">
.card-container {
  position: relative;
  width: 250px;
  height: 250px;
  background-color: rgb(255, 255, 255);
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.221);

  .dropdown-card {
    position: absolute;
    left: 10px;
    top: 20px;
  }

  h2 {
    text-align: center;
    width: 100 !important;
    font-size: 16px;
    position: absolute;
    padding: 10px;
    background-color: rgba(214, 214, 214, 0.199);
    bottom: 0;
  }
}
</style>
