<script setup>
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/input/BaseInput.vue";
import BaseModal from "@/components/modal/BaseModal.vue";
import { ref } from "vue";
import { watch } from "vue";
import BaseAlertError from "@/components/Alert/BaseAlertError.vue";
import BaseAlertSuccess from "@/components/Alert/BaseAlertSuccess.vue";
import BaseTextarea from "@/components/input/BaseTextarea.vue";

import { useRoute } from "vue-router";
import { useTaskStore } from "@/stores/task";

const taskStore = useTaskStore();
const { createTask } = taskStore;

const props = defineProps({
  open: Boolean,
  info: Object,
});

const route = useRoute();

const error = ref(false);
const textSuccess = ref("");
const textError = ref("Preencha todos os campos obrigatórios!");
const emit = defineEmits(["update:open", "update:refresh"]);

const taskToEditInModal = ref(null);
const success = ref(false);

const close = ref(props.open);

const payload = ref({
  nome: "",
  descricao: "",
  disciplina_id: route.params.disciplina_id,
  data_entrega: "",
});

const handlePayload = async () => {
  if (!props.info) {
    if (
      payload.value.nome &&
      payload.value.descricao &&
      payload.value.data_entrega
    ) {
      const task = await createTask(payload.value);

      if (task) {
        close.value = false;
        textSuccess.value = "Tarefa Criada com Sucesso!";
        emit("update:open", false);
        emit("update:refresh", true);
        success.value = true;

        setTimeout(() => {
          success.value = false;
        }, 3000);

        payload.value = {
          nome: "",
          descricao: "",
          data_entrega: "",
          disciplina_id: route.params.disciplina_id,
        };
      } else {
        error.value = true;

        setTimeout(() => {
          error.value = false;
        }, 3000);

        textError.value = "Não foi possivel cadastrar a Tarefa";
      }
    } else {
      error.value = true;
      textError.value = "Preencha todos os campos";
      setTimeout(() => {
        error.value = false;
      }, 3000);
    }
  } else {
    const response = await editTask(
      taskToEditInModal.value.id,
      taskToEditInModal.value
    );

    if (response) {
      close.value = false;
      emit("update:open", false);
      emit("update:refresh", true);
      textSuccess.value = "Tarefa editada com Sucesso!";

      success.value = true;

      setTimeout(() => {
        success.value = false;
      }, 3000);
    } else {
      error.value = true;

      setTimeout(() => {
        error.value = false;
      }, 3000);

      textError.value = "Não foi possivel editar o Professor";
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
      taskToEditInModal.value = { ...newVal };
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
          {{ props.info ? "Editar Tarefa" : "Cadastrar Tarefa" }}
        </h1>
      </div>
    </template>
    <template v-slot:body>
      <div class="body" v-if="!props.info">
        <label>Nome da Tarefa</label>
        <BaseInput class="input" v-model="payload.nome" placeholder="Nome..." />
        <label>Descrição</label>
        <BaseTextarea
          class="input"
          v-model="payload.descricao"
          placeholder="Descrição..."
        />
        <label>Data de Entrega:</label>
        <BaseInput
          class="input"
          v-model="payload.data_entrega"
          placeholder="YYYY-MM-DD"
        />
      </div>
      <div class="body" v-else>
        <label>Nome da Tarefa</label>
        <BaseInput
          class="input"
          v-model="taskToEditInModal.nome"
          placeholder="Nome do Curso..."
        />
        <label>Capa do Curso:</label>
        <BaseInput
          class="input"
          v-model="taskToEditInModal.descricao"
          placeholder="Url da imagem..."
        />
        <label>Data de Entrega:</label>
        <BaseInput
          class="input"
          v-model="taskToEditInModal.data_entrega"
          placeholder="YYYY-MM-DD"
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
