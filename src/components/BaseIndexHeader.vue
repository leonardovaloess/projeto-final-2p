<script setup>
import { ref } from "vue";
const openMobile = ref(false);

const handleOpen = () => {
  openMobile.value = !openMobile.value;
};
</script>

<template>
  <header>
    <img src="../assets/img/png/logo2-removebg-preview.png" alt="" />
    <div class="links">
      <RouterLink to="/register" class="link register-link poppins-medium"
        >Cadastre-se</RouterLink
      >
      <RouterLink to="/login" class="link poppins-medium">Login</RouterLink>
    </div>
    <div class="mobile-btn">
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
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
  </header>
  <div class="mobile-menu-background" v-if="openMobile">
    <div class="mobile-menu-container">
      <svg
        class="close-icon"
        width="30px"
        height="30px"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
        @click="handleOpen"
      >
        <path
          fill="#000000"
          d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"
        />
      </svg>
      <div class="links">
        <RouterLink to="/register" class="link register-link poppins-medium"
          >Cadastre-se</RouterLink
        >
        <RouterLink to="/login" class="link poppins-medium">Login</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.link {
  color: #407bff;
  text-decoration: none;
  font-weight: 400;
  letter-spacing: 3px;
  font-size: 18px;
  margin-left: 2rem;
}

.register-link {
  background-color: #407bff;
  color: #fff;
  padding: 10px 22px;
  border-radius: 7px;
  box-shadow: 2px 5px 19px 10px #407cff57;
}

header {
  width: 100%;
  display: flex;
  padding: 5px 36px;
  align-items: center;
  justify-content: space-between;
  z-index: 10;

  img {
    width: 130px;
  }
  .mobile-btn {
    display: none;
  }

  @media (max-width: 670px) {
    .links {
      display: none;
    }

    .mobile-btn {
      display: block;
    }
  }
}

.mobile-menu-background {
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.247);
  width: 100vw;
  z-index: 99;
  height: 100vh;

  .mobile-menu-container {
    transform: translateX(200px);
    position: fixed;
    right: 0;
    height: 100vh;
    animation: moveleft 0.45s linear forwards;
    width: 320px;
    background-color: #fff;
    padding: 20px;
    .link {
      margin-left: 0;
    }
    .links {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 60px;
      gap: 20px;
    }
    .close-icon {
      position: fixed;
      right: 20px;
    }
  }
}
button {
  background-color: red;
  color: #fff;
  padding: 0.4rem;
  border-radius: 7px;
  cursor: pointer;
}

@keyframes moveleft {
  100% {
    transform: translateX(0);
  }
}
</style>
