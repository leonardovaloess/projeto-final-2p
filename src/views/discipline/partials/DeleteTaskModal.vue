<script setup>
import BaseButton from "@/components/buttons/BaseButton.vue";

import BaseModal from "@/components/modal/BaseModal.vue";
import { ref } from "vue";
import { watch } from "vue";
import BaseAlertError from "@/components/Alert/BaseAlertError.vue";
import BaseAlertSuccess from "@/components/Alert/BaseAlertSuccess.vue";

import { useTaskStore } from "@/stores/task";

const taskStore = useTaskStore();
const { deleteTask } = taskStore;

const props = defineProps({
  open: Boolean,
  info: Object,
});

const error = ref(false);
const textSuccess = ref("");
const textError = ref("");

const emit = defineEmits(["update:open", "update:refresh"]);

const taskToEditInModal = ref(null);
const success = ref(false);

const close = ref(props.open);

const handlePayload = async () => {
  const response = await deleteTask(taskToEditInModal.value.id);

  if (response) {
    close.value = false;
    emit("update:open", false);
    emit("update:refresh", true);
    textSuccess.value = "Tarefa deletado com Sucesso!";

    success.value = true;

    setTimeout(() => {
      success.value = false;
    }, 3000);
  } else {
    error.value = true;

    setTimeout(() => {
      error.value = false;
    }, 3000);

    textError.value = "Não foi possivel excluir a Tarefa";
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
        <h1>Excluir Tarefa</h1>
      </div>
    </template>
    <template v-slot:body>
      <div class="body" v-if="taskToEditInModal">
        <p>
          Você tem certeza que deseja excluir a Tarefa:
          <span style="font-weight: 600">{{ taskToEditInModal.nome }}</span
          >?
        </p>
      </div>
    </template>
    <template v-slot:footer>
      <div class="footer flex gap-1">
        <BaseButton class="cancel btn" label="Cancelar" @click="handleClose" />
        <BaseButton class="btn" label="Confirmar" @click="handlePayload" />
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
