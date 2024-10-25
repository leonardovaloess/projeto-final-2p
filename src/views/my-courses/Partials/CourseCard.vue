<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const emit = defineEmits(["refresh"]);

const props = defineProps({
  discipline: Object,
});
</script>

<template>
  <div
    class="card-container"
    @click="router.push(`/myDisciplines/${discipline.id}`)"
  >
    <img :src="discipline.curso_img" alt="" />
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
