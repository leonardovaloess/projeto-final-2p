<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import BaseMobileSidebar from "./sidebar/BaseMobileSidebar.vue";
import ToggleThemeModal from "./ToggleThemeModal.vue";
const route = useRoute();
const mobileMenu = ref(false);

const openModal = ref(false);

const handleOpen = () => {
  mobileMenu.value = !mobileMenu.value;
};

const openThemeModal = () => {
  openModal.value = !openModal.value;
};

const cancel = (ev) => {
  openModal.value = ev;
};

const refresh = async (ev) => {
  if (ev == true) {
    openModal.value = false;
  }
};

onMounted(() => {
  console.log(route.name);
});
</script>

<template>
  <header>
    <div class="flex header-container">
      <h1>{{ route.name }}</h1>

      <button class="accessibility-btn" @click="openThemeModal">
        <svg
          width="48px"
          height="48px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            stroke="#fff"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M7 9L12 10M17 9L12 10M12 10V13M12 13L10 18M12 13L14 18"
            stroke="#fff"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 7C11.7239 7 11.5 6.77614 11.5 6.5C11.5 6.22386 11.7239 6 12 6C12.2761 6 12.5 6.22386 12.5 6.5C12.5 6.77614 12.2761 7 12 7Z"
            fill="#fff"
            stroke="#fff"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>
    <div class="menu-mobile">
      <svg
        width="40px"
        height="40px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        @click="handleOpen"
      >
        <path
          d="M4 6H20M4 12H20M4 18H20"
          stroke="#fff"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </header>
  <BaseMobileSidebar class="mobile-menu" v-if="mobileMenu" />

  <ToggleThemeModal
    :open="openModal"
    @update:open="cancel($event)"
    @update:refresh="refresh($event)"
  />
</template>

<style scoped lang="scss">
.header-container {
  width: 100%;

  align-items: center;
  justify-content: space-between;
}
.accessibility-btn:hover {
  transition: 0.4s;
  opacity: 0.6;
}
header {
  position: sticky;
  top: 0;
  right: 0;
  background-color: var(--secondary);
  color: #fff;
  border-bottom: 1px solid rgba(77, 77, 77, 0.192);
  width: 100%;
  height: 120px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 9999;

  @media (max-width: 840px) {
    font-size: 14px;
  }
}

.menu-mobile {
  display: none;
  @media (max-width: 840px) {
    display: block;
  }
}

.mobile-menu {
  position: fixed;
  width: 100%;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.525);
  height: 100vh;
  top: 14%;
  @media (max-width: 840px) {
    display: block;
  }
}
</style>
