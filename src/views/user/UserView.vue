<script setup>
import { ref, onMounted, watch } from "vue";

import BaseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseLoading from "@/components/BaseLoading.vue";
import { useUserStore } from "@/stores/users";

const userStore = useUserStore();
const { getUserProfile } = userStore;

const loading = ref(false);
const user = ref(null);

const disableEdit = ref(true);

const initFunction = async () => {
  loading.value = true;
  user.value = await getUserProfile();
  loading.value = false;
};

const testDisabled = () => {
  alert("click");
};
onMounted(async () => {
  await initFunction();
});
</script>

<template>
  <div class="page-background">
    <div
      v-if="!loading && user"
      class="container flex flex-column justify-center"
    >
      <h2 class="mb-3">Dados do Usuário:</h2>
      <div class="input-container mb-3">
        <label>Nome de Usuário:</label>
        <BaseInput class="input" v-model="user.nome" :disabled="disableEdit" />
      </div>
      <div class="input-container">
        <label for="email">Email:</label>
        <BaseInput class="input" v-model="user.email" :disabled="disableEdit" />
      </div>
      <div class="btns flex mt-4 gap-05">
        <BaseButton class="edit-btn" label="Editar" />
        <BaseButton
          label="Salvar"
          :disabled="disableEdit"
          @click="testDisabled"
        />
      </div>

      <h2 class="mb-3">Nova Senha</h2>
      <div class="input-container mb-3">
        <label>Senha Atual:</label>
        <BaseInput class="input" />
      </div>
      <div class="input-container">
        <label for="email">Nova Senha:</label>
        <BaseInput class="input" />
      </div>
      <div class="btns flex mt-4 gap-05">
        <BaseButton label="Mudar Senha" />
      </div>
    </div>

    <div v-else class="loading">
      <BaseLoading class="loading-icon" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.loading {
  height: 400px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 630px) {
    .loading-icon > svg {
      width: 100px;
      height: 100px;
    }
  }
}

.btns {
  justify-content: end;
}

.container {
  width: 600px;
}

.input {
  padding: 12px;
}

.edit-btn {
  background-color: rgb(45, 45, 45);
  color: #fff;
}

.page-background {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  height: 100%;
  @media (max-width: 630px) {
    padding: 1rem;
  }
}
</style>
