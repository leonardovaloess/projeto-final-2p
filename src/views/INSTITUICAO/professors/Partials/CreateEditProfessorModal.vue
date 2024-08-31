<script setup>
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/input/BaseInput.vue";
import BaseModal from "@/components/modal/BaseModal.vue";
import { ref } from "vue";
import { watch } from "vue";
import BaseAlertError from "@/components/Alert/BaseAlertError.vue";
import BaseAlertSuccess from "@/components/Alert/BaseAlertSuccess.vue";

const props = defineProps({
  open: Boolean,
  create: Boolean,
});

const error = ref(false);
const textError = ref("Preencha todos os campos obrigatórios!");
const emit = defineEmits(["update:open", "update:refresh"]);

const success = ref(false);

const close = ref(props.open);

const payload = ref({
  name: "",
  email: "",
  password: "",
});

const handlePayload = async () => {
  if (payload.value.title) {
    const task = [];

    if (task) {
      close.value = false;
      emit("update:open", false);
      emit("update:refresh", true);
      success.value = true;

      setTimeout(() => {
        success.value = false;
      }, 3000);
    } else {
      error.value = true;

      setTimeout(() => {
        error.value = false;
      }, 3000);

      textError.value = "Não foi possivel criar a tarefa";
    }
  } else {
    error.value = true;

    setTimeout(() => {
      error.value = false;
    }, 3000);
  }
};

watch(
  () => props.open,
  (newVal) => {
    close.value = newVal;
  }
);

const handleClose = () => {
  close.value = false;
  emit("update:open", false);
};
</script>

<template>
  <BaseModal :open="close" :closeIcon="true">
    <template v-slot:header>
      <div class="header">
        <h1>{{ props.create ? "Cadastrar Professor" : "Editar Professor" }}</h1>
      </div>
    </template>
    <template v-slot:body>
      <div class="body">
        <label>Nome do professor</label>
        <BaseInput
          class="input"
          v-model="payload.name"
          label="Nome do professor"
          placeholder="título:"
        />
        <label>Email:</label>
        <BaseInput
          class="input"
          v-model="payload.email"
          label="Descrição (opcional)"
          placeholder="Email:"
        />
        <label>Senha:</label>
        <BaseInput
          class="input"
          v-model="payload.password"
          label="Descrição (opcional)"
          placeholder="Email:"
        />
      </div>
    </template>
    <template v-slot:footer>
      <div class="footer flex gap-1">
        <BaseButton class="cancel btn" label="Cancelar" @click="handleClose" />
        <BaseButton class="btn" label="Salvar" @click="handlePayload" />
      </div>
    </template>
  </BaseModal>

  <BaseAlertError v-if="error" class="alert" :text="textError"></BaseAlertError>
  <BaseAlertSuccess
    v-if="success"
    class="alert"
    text="Professor cadastrado com sucesso"
  ></BaseAlertSuccess>
</template>

<style scoped lang="scss">
.input {
  padding: 12px;
}

.btn {
  width: 110px;
}

.alert {
  z-index: 99999 !important;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    font-size: 30px;
    width: 100%;

    text-align: center;
  }
}

.body {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer {
  margin-top: 25px;
  align-items: center;
  justify-content: center;
}

.cancel {
  background-color: rgb(252, 31, 31);
}
</style>
