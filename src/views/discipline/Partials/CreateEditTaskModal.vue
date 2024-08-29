<script setup>
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/input/BaseInput.vue";
import BaseModal from "@/components/modal/BaseModal.vue";
import { useTaskStore } from "@/stores/tasks";
import { ref } from "vue";
import { watch } from "vue";
import BaseAlertError from "@/components/Alert/BaseAlertError.vue";
import BaseAlertSuccess from "@/components/Alert/BaseAlertSuccess.vue";

const taskStore = useTaskStore();
const { createTask } = taskStore;

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
  title: "",
  content: "",
});

const handlePayload = async () => {
  if (payload.value.title) {
    const task = await createTask(payload.value);

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
        <h1>{{ props.create ? "Criar tarefa" : "Editar Tarefa" }}</h1>
      </div>
    </template>
    <template v-slot:body>
      <div class="body">
        <label>Título da tarefa (obrigatório)</label>
        <BaseInput
          class="input"
          v-model="payload.title"
          label="Título da Tarefa (obrigatório)"
          placeholder="título"
        />
        <label>Descrição (opcional)</label>
        <BaseInput
          class="input"
          v-model="payload.content"
          label="Descrição (opcional)"
          placeholder="Descrição"
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
    text="Tarefa criada com sucesso"
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
    font-size: 35px;
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
