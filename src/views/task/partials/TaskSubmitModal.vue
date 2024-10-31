<script setup>
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/input/BaseInput.vue";

import BaseModal from "@/components/modal/BaseModal.vue";
import { ref, computed, onMounted } from "vue";
import { watch } from "vue";
import BaseAlertError from "@/components/Alert/BaseAlertError.vue";
import BaseAlertSuccess from "@/components/Alert/BaseAlertSuccess.vue";

import { useRoute } from "vue-router";
import { useTaskStore } from "@/stores/task";
import BaseTextarea from "@/components/input/BaseTextarea.vue";

const taskFile = ref(null);
const taskStore = useTaskStore();
const { submitTask } = taskStore;

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
  tarefa_id: route.params.task_id,
  texto: null,
  arquivo: null,
});

const close = ref(props.open);

const onFileSelected = (ev) => {
  payload.value.arquivo = ev.target.files;
};

const handlePayload = async () => {
  const formData = new FormData();
  formData.append("tarefa_id", payload.value.tarefa_id);
  formData.append("texto", payload.value.texto || null);
  formData.append(
    "arquivo",
    payload.value.arquivo ? payload.value.arquivo[0] : null
  );

  const response = await submitTask(formData);
  if (response) {
    textSuccess.value = "Tarefa Enviada com Sucesso!";
    success.value = true;
    emit("update:refresh", true);
    setTimeout(() => {
      success.value = false;
    }, 3000);
  } else {
    textError.value = "Falha ao Enviar Tarefa!";
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
      <div class="header flex flex-column">
        <h1>Enviar Tarefa</h1>
        <span>(Enviar ou Texto ou Arquivo)</span>
      </div>
    </template>
    <template v-slot:body>
      <div class="body">
        <div class="flex flex-column gap-05">
          <label>Texto/Resposta</label>
          <BaseTextarea
            class="input"
            v-model="payload.texto"
            placeholder="Texto/Resposta..."
          />
          <label>Arquivo </label>

          <input
            class="file-input"
            type="file"
            name="file"
            multiple
            @change="onFileSelected($event)"
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
          :disabled="!payload.arquivo && !payload.texto"
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
