<script setup>
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/input/BaseInput.vue";
import BaseModal from "@/components/modal/BaseModal.vue";
import { ref } from "vue";
import { watch } from "vue";
import BaseAlertError from "@/components/Alert/BaseAlertError.vue";
import BaseAlertSuccess from "@/components/Alert/BaseAlertSuccess.vue";
import { useUserStore } from "@/stores/users";

const userStore = useUserStore();
const { createUser, editAluno } = userStore;

const props = defineProps({
  open: Boolean,
  info: Object,
});

const error = ref(false);
const textSuccess = ref("");
const textError = ref("Preencha todos os campos obrigatórios!");
const emit = defineEmits(["update:open", "update:refresh"]);

const alunoToEditInModal = ref(null);
const success = ref(false);

const close = ref(props.open);

const payload = ref({
  nome: "",
  email: "",
  senha: "",
  type_id: "1",
});

const handlePayload = async () => {
  if (!props.info) {
    if (payload.value.email) {
      const aluno = await createUser(payload.value);

      if (aluno) {
        close.value = false;
        textSuccess.value = "aluno Criado com Sucesso!";
        emit("update:open", false);
        emit("update:refresh", true);
        success.value = true;

        setTimeout(() => {
          success.value = false;
        }, 3000);

        payload.value = {
          nome: "",
          email: "",
          senha: "",
          type_id: "1",
        };
      } else {
        error.value = true;

        setTimeout(() => {
          error.value = false;
        }, 3000);

        textError.value = "Não foi possivel cadastrar o aluno";
      }
    } else {
      error.value = true;

      setTimeout(() => {
        error.value = false;
      }, 3000);
    }
  } else {
    const response = await editAluno(
      alunoToEditInModal.value.id,
      alunoToEditInModal.value
    );

    if (response) {
      close.value = false;
      emit("update:open", false);
      emit("update:refresh", true);
      textSuccess.value = "aluno editado com Sucesso!";

      success.value = true;

      setTimeout(() => {
        success.value = false;
      }, 3000);
    } else {
      error.value = true;

      setTimeout(() => {
        error.value = false;
      }, 3000);

      textError.value = "Não foi possivel editar o aluno";
    }
  }
};

watch(
  () => props.open,
  (newVal) => {
    close.value = newVal;
  }
);

watch(
  () => props.info,
  (newVal) => {
    //console.log("posttoedit");

    if (newVal) {
      alunoToEditInModal.value = { ...newVal };
    }
  },
  { immediate: true }
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
        <h1>
          {{ props.info ? "Editar aluno" : "Cadastrar aluno" }}
        </h1>
      </div>
    </template>
    <template v-slot:body>
      <div class="body" v-if="!props.info">
        <label>Nome do aluno</label>
        <BaseInput
          class="input"
          v-model="payload.nome"
          label="Nome do aluno"
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
          v-model="payload.senha"
          label="Descrição (opcional)"
          placeholder="Senha:"
        />
      </div>
      <div class="body" v-else>
        <label>Nome do aluno</label>
        <BaseInput
          class="input"
          v-model="alunoToEditInModal.nome"
          label="Nome do aluno"
          placeholder="título:"
        />
        <label>Email:</label>
        <BaseInput
          class="input mb-2"
          v-model="alunoToEditInModal.email"
          label="Descrição (opcional)"
          placeholder="Email:"
        />
      </div>
    </template>
    <template v-slot:footer>
      <div class="footer flex gap-1">
        <BaseButton class="cancel btn" label="Cancelar" @click="handleClose" />
        <BaseButton
          class="btn"
          :label="!props.info ? 'Cadastrar' : 'Salvar'"
          @click="handlePayload"
        />
      </div>
    </template>
  </BaseModal>

  <BaseAlertError v-if="error" class="alert" :text="textError"></BaseAlertError>
  <BaseAlertSuccess
    v-if="success"
    class="alert"
    :text="textSuccess"
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
</style>
