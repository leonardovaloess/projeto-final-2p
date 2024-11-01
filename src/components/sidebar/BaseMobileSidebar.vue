<script setup>
import { useRouter } from "vue-router";
import { links1, links2, links3 } from "./partials/navlink";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const { userLogout } = authStore;
const router = useRouter();
const user_type_id = localStorage.getItem("user_type_id");

const handleLogout = async () => {
  await userLogout();

  localStorage.removeItem("token-auth");
  localStorage.removeItem("user_id");

  router.push({ path: "/" });
};
</script>

<template>
  <nav>
    <div class="nav-container">
      <div class="nav-header">
        <img src="../../assets/img/png/logo-2.png" alt="" />
      </div>
      <pre>{{ user }}</pre>
      <div class="nav-links">
        {{ user }}
        <div v-if="user_type_id == 3" v-for="item in links3">
          <div class="flex gap-05 align-center">
            <p>{{ item.label }}</p>
            <svg
              class="close-link-icon"
              :class="{ rotate: !item.opened }"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              @click="item.opened = !item.opened"
            >
              <path
                d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z"
                fill="#0F0F0F"
              />
            </svg>
          </div>
          <div v-for="link in item.childreen" v-if="item.opened" class="links">
            <RouterLink
              class="link"
              :to="link.path"
              active-class="active-link"
              >{{ link.name }}</RouterLink
            >
          </div>
        </div>
        <div v-if="user_type_id == 2" v-for="item in links2">
          <div class="flex gap-05 align-center">
            <p>{{ item.label }}</p>
            <svg
              class="close-link-icon"
              :class="{ rotate: !item.opened }"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              @click="item.opened = !item.opened"
            >
              <path
                d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z"
                fill="#0F0F0F"
              />
            </svg>
          </div>
          <div v-for="link in item.childreen" v-if="item.opened" class="links">
            <RouterLink
              class="link"
              :to="link.path"
              active-class="active-link"
              >{{ link.name }}</RouterLink
            >
          </div>
        </div>
        <div v-if="user_type_id == 1" v-for="item in links1">
          <div class="flex gap-05 align-center">
            <p>{{ item.label }}</p>
            <svg
              class="close-link-icon"
              :class="{ rotate: !item.opened }"
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              @click="item.opened = !item.opened"
            >
              <path
                d="M18.2929 15.2893C18.6834 14.8988 18.6834 14.2656 18.2929 13.8751L13.4007 8.98766C12.6195 8.20726 11.3537 8.20757 10.5729 8.98835L5.68257 13.8787C5.29205 14.2692 5.29205 14.9024 5.68257 15.2929C6.0731 15.6835 6.70626 15.6835 7.09679 15.2929L11.2824 11.1073C11.673 10.7168 12.3061 10.7168 12.6966 11.1073L16.8787 15.2893C17.2692 15.6798 17.9024 15.6798 18.2929 15.2893Z"
                fill="#0F0F0F"
              />
            </svg>
          </div>
          <div v-for="link in item.childreen" v-if="item.opened" class="links">
            <RouterLink
              class="link"
              :to="link.path"
              active-class="active-link"
              >{{ link.name }}</RouterLink
            >
          </div>
        </div>
      </div>
      <div class="nav-footer">
        <button @click="handleLogout">
          Sair
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827"
              stroke="#fff"
              stroke-width="1.5"
              stroke-linecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.close-link-icon {
  transition: transform 0.3s ease-in-out;
}

.close-link-icon.rotate {
  transform: rotate(180deg);
}

.nav-container {
  width: 100%;
  background-color: var(--primary);
  z-index: 9999;
  display: flex;
  height: 70%;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  .nav-header {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 40%;
    }
  }

  .nav-links {
    background-color: #fff;
    width: 92%;
    border-radius: 7px;
    height: 70%;
    padding: 10px;
    display: flex;
    gap: 1.2rem;
    flex-direction: column;
  }
}

.links {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.link {
  padding: 10px;
  width: 100%;
  color: rgb(43, 43, 43);
  border-radius: 8px;
  text-decoration: none;
  margin-top: 10px;
  font-weight: 500;

  &:hover {
    background-color: rgb(158, 158, 158);
    transition: 0.3s;
  }
}

.nav-footer {
  width: 90%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    color: #fff;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.active-link {
  background-color: var(--secondary);
  color: #fff;
}
</style>
