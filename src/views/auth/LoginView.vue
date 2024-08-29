<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import BaseAlertError from "@/components/Alert/BaseAlertError.vue";
import BasePasswordInput from "@/components/input/BasePasswordInput.vue";
import { watch } from "vue";

const authStore = useAuthStore();
const { userLogin } = authStore;

const error = ref(false);
const router = useRouter();
const disabled = ref(true);

const payload = ref({
  email: "",
  password: "",
});

const handleSubmit = async () => {
  const login = await userLogin(payload.value);

  if (login) {
    localStorage.setItem("token-auth", login.token);
    localStorage.setItem("user_id", login.user_id);

    router.push({ path: "/home" });
  } else {
    error.value = true;

    setTimeout(() => {
      error.value = false;
    }, 3000);
  }
};

watch(payload.value, () => {
  if (payload.value.email.length > 1 && payload.value.password.length > 1) {
    disabled.value = false;
  } else {
    disabled.value = true;
  }
});
</script>

<template>
  <div class="flex login-view-container">
    <div class="form-container">
      <div class="form flex column">
        <h1 class="poppins-medium">Login</h1>
        <h2 class="poppins-medium">Seja bem-vindo ao Smart Edu!</h2>

        <div class="flex column input-container">
          <label>Email</label>
          <input
            type="email"
            placeholder="Insira seu email"
            :value="payload.email"
            @input="(ev) => (payload.email = ev.target.value)"
          />
        </div>
        <div class="flex column input-container">
          <BasePasswordInput label="Senha" v-model="payload.password" />
        </div>
        <div class="flex input-container w-100">
          <RouterLink class="password-span-text w-100" to="/register"
            >Esqueceu a senha?</RouterLink
          >
        </div>
        <button
          class="button"
          @click="handleSubmit"
          :class="disabled === true ? 'disabled' : ''"
          :disabled="disabled"
        >
          Entrar
        </button>
        <span>
          Não tem uma conta?
          <RouterLink class="login-span-text" to="/register"
            >Cadastre-se</RouterLink
          >
        </span>
        <img
          class="logo"
          src="../../assets/img/png/logo-1.png"
          alt=""
          style="width: 110px; margin: auto"
        />
        <BaseAlertError
          v-if="error"
          type="error"
          text="Email ou senha incorretos"
        />
      </div>
    </div>
    <div class="theme">
      <img src="../../assets/img/png/login-img2.jpg" alt="theme" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.disabled {
  opacity: 0.7;
}

h2 {
  text-align: center;
}

.password-span-text {
  color: var(--secondary);
  text-align: end;
  text-decoration: none;
  margin-left: 2px;
}
.login-span-text {
  color: var(--secondary);
  text-align: left;
  text-decoration: none;
}
.login-view-container {
  max-height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme {
  width: 50%;
  background-color: black;
  img {
    width: 100%;
    opacity: 0.6;
    height: 100vh;
    object-fit: cover;
  }
}
.form-container {
  width: 50%;
  padding: 2rem;

  .form {
    gap: 0.8rem;
    width: 450px;
    margin: auto;
    position: relative;

    h1 {
      text-align: center;
      font-size: 55px;
    }
    .input-container {
      gap: 0.3rem;
      input {
        padding: 0.7rem;
        border-radius: 8px;
        border: 1px solid #24242475;

        width: 100%;
      }
    }

    .button {
      background-color: var(--secondary);
      color: #fff;
      padding: 0.7rem;
      border: 1px solid rgba(83, 83, 83, 0.219);
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
    }

    @media (max-width: 1110px) {
      width: 90%;
    }
  }
}
@media (min-width: 0px) and (max-width: 850px) {
  .theme {
    display: none;
  }

  .form-container {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
