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
const { deleteProfessor } = userStore;

const props = defineProps({
  open: Boolean,
  info: Object,
});

const error = ref(false);
const textSuccess = ref("");

const emit = defineEmits(["update:open", "update:refresh"]);

const professorToEditInModal = ref(null);
const success = ref(false);

const close = ref(props.open);

const handlePayload = async () => {
  const response = await deleteProfessor(professorToEditInModal.value.id);

  if (response) {
    close.value = false;
    emit("update:open", false);
    emit("update:refresh", true);
    textSuccess.value = "Professor deletado com Sucesso!";

    success.value = true;

    setTimeout(() => {
      success.value = false;
    }, 3000);
  } else {
    error.value = true;

    setTimeout(() => {
      error.value = false;
    }, 3000);

    textError.value = "Não foi possivel deletar o Professor";
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
      professorToEditInModal.value = { ...newVal };
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
        <h1>Desvincular Professor</h1>
      </div>
    </template>
    <template v-slot:body>
      <div class="body" v-if="professorToEditInModal">
        <p>
          Você tem certeza que deseja desvincular o professor:
          <span style="font-weight: 600">{{ professorToEditInModal.nome }}</span
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

.cancel {
  background-color: rgb(252, 31, 31);
}
</style>
