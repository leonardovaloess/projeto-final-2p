<script setup>
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/input/BaseInput.vue";

import BaseModal from "@/components/modal/BaseModal.vue";
import { ref } from "vue";
import { watch } from "vue";
import BaseAlertError from "@/components/Alert/BaseAlertError.vue";
import BaseAlertSuccess from "@/components/Alert/BaseAlertSuccess.vue";

import { useRoute } from "vue-router";
import { useTaskStore } from "@/stores/task";
import BaseTextarea from "@/components/input/BaseTextarea.vue";

const taskStore = useTaskStore();
const { postTaskGrade } = taskStore;

const props = defineProps({
  open: Boolean,
  info: Object,
});

const route = useRoute();

const error = ref(false);
const textSuccess = ref("");
const textError = ref("Preencha todos os campos obrigatórios!");
const emit = defineEmits(["update:open", "update:refresh"]);

const success = ref(false);

const payload = ref({
  tarefa_id: null,
  aluno_id: null,
  nota: null,
});

const close = ref(props.open);

watch(
  () => props.open,
  (newVal) => {
    close.value = newVal;
  }
);

const handlePayload = async () => {
  if (parseInt(payload.value.nota) > 10 || parseInt(payload.value.nota) < 0) {
    error.value = true;
    textError.value = "A nota deve ser entre 0 e 10 apenas";
    setTimeout(() => {
      error.value = false;
    }, 3000);
  } else {
    if (props.info) {
      payload.value.aluno_id = props.info.aluno_id;
      payload.value.tarefa_id = props.info.tarefa_id;
      const response = await postTaskGrade(payload.value);
      if (response) {
        emit("update:refresh", true);
        success.value = true;
        textSuccess.value = "Nota atribuída com sucesso";
        setTimeout(() => {
          success.value = false;
        }, 3000);
      } else {
        error.value = true;
        textError.value = "Nota já atribuída";
        setTimeout(() => {
          error.value = false;
        }, 3000);
      }
    }
  }
};

const handleClose = () => {
  close.value = false;
  emit("update:open", false);
};
</script>

<template>
  <BaseModal :open="close" :closeIcon="true">
    <template v-slot:header>
      <div class="header flex flex-column">
        <h1>Atribuir Nota</h1>
      </div>
    </template>
    <template v-slot:body>
      <div class="body">
        <div class="flex flex-column gap-05">
          <label>Nota:</label>
          <BaseInput
            class="input"
            v-model="payload.nota"
            type="number"
            placeholder="Nota no valor entre 0 e 10"
          />
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="footer flex gap-1">
        <BaseButton class="cancel btn" label="Cancelar" @click="handleClose" />
        <BaseButton
          class="btn"
          :label="'Enviar'"
          @click="handlePayload"
          :disabled="!payload.nota"
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
.file-input {
  font-size: 12px;
}
.file {
  text-decoration: underline;
  color: rgb(93, 93, 93);
  cursor: pointer;
  width: fit-content;
}
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
