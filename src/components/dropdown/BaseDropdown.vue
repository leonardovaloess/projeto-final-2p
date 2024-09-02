<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const props = defineProps({
  options: Array,
});

const openDrop = ref(false);
const dropdownRef = ref(null); // Referência ao contêiner do dropdown
const optionsRef = ref(null); // Referência à div de opções

const handleClickOutside = (event) => {
  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target) &&
    optionsRef.value &&
    !optionsRef.value.contains(event.target)
  ) {
    openDrop.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="btn-container" tabindex="1" ref="dropdownRef">
    <button @click="openDrop = !openDrop" tabindex="1">
      <svg
        width="20px"
        height="20px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <div class="options" v-if="openDrop" ref="optionsRef">
      <slot name="drop-options" class="drop-options"></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
button {
  border-radius: 8px;
  color: #fff;
  transform: rotate(90deg);

  &:hover {
    transition: 0.3s;
  }
}

.btn-container {
  position: relative;
}

.options {
  position: fixed;
  background-color: #ffffff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.336);
  z-index: 99999;
  right: 20; /* Corrigido para px */
  border-radius: 6px;
}
</style>
