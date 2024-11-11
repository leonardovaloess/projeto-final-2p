<script setup>
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/input/BaseInput.vue";
import BaseModal from "@/components/modal/BaseModal.vue";
import { ref, computed } from "vue";
import { watch } from "vue";
import BaseAlertError from "@/components/Alert/BaseAlertError.vue";
import BaseAlertSuccess from "@/components/Alert/BaseAlertSuccess.vue";
import BaseTextarea from "@/components/input/BaseTextarea.vue";

import { useRoute } from "vue-router";
import { useTaskStore } from "@/stores/task";
import { useWarningsStore } from "@/stores/warnings";

const taskStore = useTaskStore();
const { createTask } = taskStore;

const warningStore = useWarningsStore();
const { createWarning } = warningStore;

const props = defineProps({
  open: Boolean,
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
  titulo: "",
  aviso: "",
  disciplina_id: route.params.disciplina_id,
});

const disabled = computed(() => {
  if (!props.info) {
    if (!payload.value.titulo || !payload.value.aviso) {
      return true;
    } else {
      return false;
    }
  } else {
    if (!taskToEditInModal.value.nome || !taskToEditInModal.value.email) {
      return true;
    } else {
      return false;
    }
  }
});

const handlePayload = async () => {
  if (payload.value.titulo && payload.value.aviso) {
    const task = await createWarning(payload.value);

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
        titulo: "",
        aviso: "",

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
        <h1>Criar Aviso</h1>
      </div>
    </template>
    <template v-slot:body>
      <div class="body">
        <label>Título do Aviso:</label>
        <BaseInput
          class="input"
          v-model="payload.titulo"
          placeholder="Título..."
        />
        <label>Descrição:</label>
        <BaseTextarea
          class="input"
          v-model="payload.aviso"
          placeholder="Descrição..."
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
          :disabled="disabled"
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
