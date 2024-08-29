<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseMobileSidebar from "./sidebar/BaseMobileSidebar.vue";
import { onMounted } from "vue";

const route = useRoute();

const mobileMenu = ref(false);

const handleOpen = () => {
  mobileMenu.value = !mobileMenu.value;
};

onMounted(() => {
  console.log(route.name);
});
</script>

<template>
  <header>
    <div>
      <h1>{{ route.name }}</h1>
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
          stroke="#fff  "
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </header>
  <BaseMobileSidebar class="mobile-menu" v-if="mobileMenu" />
</template>

<style scoped lang="scss">
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
  text-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  z-index: 9999;

  @media (max-width: 840px) {
    font-size: 14px;
    z-index: 9999;
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
button {
  background-color: red;
  color: #fff;
  padding: 0.4rem;
  border-radius: 7px;
  cursor: pointer;
}
</style>
