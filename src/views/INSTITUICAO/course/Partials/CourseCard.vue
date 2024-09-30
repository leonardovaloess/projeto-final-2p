<script setup>
import { onMounted, ref } from "vue";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";
import CreateEditCourseModal from "./CreateEditCourseModal.vue";
import DeleteCourseModal from "./DeleteCourseModal.vue";
import { useRouter } from "vue-router";

const openModal = ref(false);

const openDeleteModal = ref(false);
const router = useRouter();
const courseToEdit = ref(null);
const emit = defineEmits(["refresh"]);
const props = defineProps({
  course: Object,
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
  {
    id: 2,
    name: "Alunos",
    icon: "view",
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

  if (id == 3) {
    localStorage.setItem("course_id", item.id);
    router.push(`/course/${item.id}/disciplines`);
  }
};
</script>

<template>
  <div class="card-container">
    <BaseDropdown
      :options="options"
      class="dropdown-card"
      :white-icon="true"
      @select="(option) => handleSelect(course, option.id)"
    />
    <img :src="course.curso_img" alt="" />
    <h2 class="w-100">{{ course.nome }}</h2>
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
</template>

<style scoped lang="scss">
.card-container {
  position: relative;
  width: 250px;
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
    left: 10px;
    top: 20px;
  }

  h2 {
    text-align: center;
    width: 100 !important;
    font-size: 16px;
    position: absolute;
    padding: 10px;
    background-color: rgba(214, 214, 214, 0.829);
    bottom: 0;
  }
}
</style>
