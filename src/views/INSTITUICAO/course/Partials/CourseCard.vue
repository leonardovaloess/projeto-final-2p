<script setup>
import { onMounted, ref } from "vue";
import BaseDropdown from "@/components/dropdown/BaseDropdown.vue";
import CreateEditCourseModal from "./CreateEditCourseModal.vue";
import DeleteCourseModal from "./DeleteCourseModal.vue";
import CourseStudents from "./CourseStudents.vue";
import { useRouter } from "vue-router";

const openModal = ref(false);

const openDeleteModal = ref(false);

const openStudentsModal = ref(false);
const option_id = ref(null);
const router = useRouter();
const courseToEdit = ref(null);
const emit = defineEmits(["refresh"]);
const props = defineProps({
  course: Object,
});

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
  if (id == 0) {
    courseToEdit.value = item;
    openModal.value = true;
  }
  if (id == 1) {
    courseToEdit.value = item;
    openDeleteModal.value = true;
  }
  if (id == 2) {
    courseToEdit.value = item.id;
    option_id.value = 2;
    openStudentsModal.value = true;
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
      :white-icon="false"
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

  <CourseStudents
    :open="openStudentsModal"
    :option_id="option_id"
    @update:open="cancel($event)"
    @update:refresh="refreshList($event)"
    :curso_id="courseToEdit"
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
  width: 240px;
  height: 240px;
  background-color: rgb(255, 255, 255);
  box-shadow: 1px 3px 16px rgba(0, 0, 0, 0.219);
  border-radius: 6px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .dropdown-card {
    position: absolute;
    right: 0px;
    top: 0px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    padding: 20px;
    padding-right: 35px;
    border-bottom-left-radius: 50%;
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

  @media (max-width: 650px) {
    width: 100%;
  }
}
</style>
