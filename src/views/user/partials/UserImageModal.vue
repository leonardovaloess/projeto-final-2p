<script setup>
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/input/BaseInput.vue";

import BaseModal from "@/components/modal/BaseModal.vue";
import { ref, computed, onMounted } from "vue";
import { watch } from "vue";
import BaseAlertError from "@/components/Alert/BaseAlertError.vue";
import BaseAlertSuccess from "@/components/Alert/BaseAlertSuccess.vue";

import { useUserStore } from "@/stores/users";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const { editUserProfile } = userStore;

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

const close = ref(props.open);

const handlePayload = async () => {
  const response = await editUserProfile(props.info);
  if (response) {
    textSuccess.value = "Foto de Perfil Alterada com Sucesso!!";
    success.value = true;
    emit("update:refresh");
    setTimeout(() => {
      success.value = false;
    }, 3000);
  } else {
    textError.value = "Falha ao Alterar Foto de Perfil!!!";
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
        <h1>Alterar Foto</h1>
      </div>
    </template>
    <template v-slot:body>
      <div class="body">
        <div class="flex flex-column gap-05">
          <label>URL da Imagem</label>
          <BaseInput
            class="input"
            v-model="props.info.user_img"
            placeholder="URL da imagem"
          />
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="footer flex gap-1">
        <BaseButton class="cancel btn" label="Cancelar" @click="handleClose" />
        <BaseButton class="btn" :label="'Salvar'" @click="handlePayload" />
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

.cancel {
  background-color: rgb(252, 31, 31);
}
</style>
