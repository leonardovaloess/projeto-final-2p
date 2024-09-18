<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import BaseAlertError from "@/components/Alert/BaseAlertError.vue";
import { watch } from "vue";

const authStore = useAuthStore();
const { registerUser } = authStore;

const error = ref(false);
const router = useRouter();
const disabled = ref(true);

const passwordConfirm = ref("");
const payload = ref({
  nome: "",
  email: "",
  senha: "",
});

const handleSubmit = async () => {
  if (payload.value.senha !== passwordConfirm.value) {
    error.value = true;
    setTimeout(() => {
      error.value = false;
    }, 3000);
    return;
  }

  const login = await registerUser(payload.value);

  if (login) {
    localStorage.setItem("token-auth", login.token);
    localStorage.setItem("user_type_id", login.type_id);
    router.push({ path: "/home" });
  } else {
    error.value = true;

    setTimeout(() => {
      error.value = false;
    }, 3000);
  }
};

watch(payload.value, () => {
  if (
    payload.value.email.length > 1 &&
    payload.value.senha.length > 1 &&
    payload.value.nome.length > 1
  ) {
    disabled.value = false;
  } else {
    disabled.value = true;
  }
});
</script>

<template>
  <div class="flex login-view-container">
    <div class="form-container">
      <div class="flex column form">
        <h1 class="poppins-medium">Cadastrar Instituição</h1>

        <div class="flex column input-container">
          <label>Nome da Instituição</label>
          <input
            type="text"
            placeholder="Insira seu nome de usuário"
            :value="payload.nome"
            @input="(ev) => (payload.nome = ev.target.value)"
          />
        </div>
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
          <label>Senha</label>
          <input
            type="password"
            placeholder="Crie sua senha"
            :value="payload.senha"
            @input="(ev) => (payload.senha = ev.target.value)"
          />
        </div>
        <div class="flex column input-container">
          <label>Confirme sua senha</label>
          <input
            type="password"
            placeholder="Crie sua senha"
            :value="passwordConfirm"
            @input="(ev) => (passwordConfirm = ev.target.value)"
          />
        </div>
        <button
          @click="handleSubmit"
          :class="disabled === true ? 'disabled' : ''"
          :disabled="disabled"
        >
          Entrar
        </button>
        <span>
          Tem uma conta?
          <RouterLink class="login-span-text" to="/">Faça seu login</RouterLink>
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
          text="As senhas não coincidem"
        />
      </div>
    </div>
    <div class="theme">
      <img src="../../assets/img/png/login-img.jpg" alt="theme" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.disabled {
  opacity: 0.6;
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
    gap: 0.5rem;
    width: 500px;
    margin: auto;
    h1 {
      text-align: center;
      font-size: 45px;
    }
    .input-container {
      gap: 0.3rem;
      input {
        padding: 0.6rem;
        border-radius: 8px;
        border: 1px solid #24242475;
      }
    }

    button {
      background-color: var(--secondary);
      color: #fff;
      padding: 0.6rem;
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
