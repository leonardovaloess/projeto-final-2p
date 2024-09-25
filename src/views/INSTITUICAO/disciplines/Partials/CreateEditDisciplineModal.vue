<script setup>
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/input/BaseInput.vue";
import BaseSelect from "@/components/select/BaseSelect.vue";
import BaseModal from "@/components/modal/BaseModal.vue";
import { ref, computed } from "vue";
import { watch } from "vue";
import BaseAlertError from "@/components/Alert/BaseAlertError.vue";
import BaseAlertSuccess from "@/components/Alert/BaseAlertSuccess.vue";
import { useCourseStore } from "@/stores/course";

const courseStore = useCourseStore();
const { createCourse, editCourse } = courseStore;

const props = defineProps({
  open: Boolean,
  info: Object,
});

const selectValue = ref({
  label: "",
  value: null,
});

const error = ref(false);
const textSuccess = ref("");
const textError = ref("Preencha todos os campos obrigatórios!");
const emit = defineEmits(["update:open", "update:refresh"]);

const courseToEditInModal = ref(null);
const success = ref(false);

const close = ref(props.open);

const payload = ref({
  nome: "",
  descricao: "aaa",
  periodos: "1",
});

const options = ref([
  {
    label: "opcao 1",
    value: 1,
  },
  {
    label: "opcao 2",
    value: 2,
  },
  {
    label: "opcao 3",
    value: 1,
  },
  {
    label: "opcao 4",
    value: 2,
  },
]);

const filteredOptions = computed(() => {
  if (!selectValue.value.label) return options.value;
  return options.value.filter((item) =>
    item.label.toLowerCase().includes(selectValue.value.label.toLowerCase())
  );
});

const handlePayload = async () => {
  if (!props.info) {
    if (payload.value.nome) {
      const course = await createCourse(payload.value);

      if (course) {
        close.value = false;
        textSuccess.value = "course Criado com Sucesso!";
        emit("update:open", false);
        emit("update:refresh", true);
        success.value = true;

        setTimeout(() => {
          success.value = false;
        }, 3000);

        payload.value = {
          nome: "",
          descricao: "aaa",
          periodos: "1",
        };
      } else {
        error.value = true;

        setTimeout(() => {
          error.value = false;
        }, 3000);

        textError.value = "Não foi possivel cadastrar o Curso";
      }
    } else {
      error.value = true;

      setTimeout(() => {
        error.value = false;
      }, 3000);
    }
  } else {
    const response = await editCourse(
      courseToEditInModal.value.id,
      courseToEditInModal.value
    );

    if (response) {
      close.value = false;
      emit("update:open", false);
      emit("update:refresh", true);
      textSuccess.value = "Curso editado com Sucesso!";

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
      courseToEditInModal.value = { ...newVal };
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
          {{ props.info ? "Editar Disciplina" : "Cadastrar Disciplina" }}
        </h1>
      </div>
    </template>
    <template v-slot:body>
      <div class="body" v-if="!props.info">
        <div class="flex flex-column gap-05">
          <label>Nome da Disciplina:</label>
          <BaseInput
            class="input"
            v-model="payload.nome"
            placeholder="Nome da Disciplina:"
          />
        </div>

        <div class="flex flex-column gap-05">
          <label>Professor Responsável:</label>
          <BaseSelect
            class="input"
            :options="filteredOptions"
            v-model="selectValue.label"
            @select="selectValue = $event"
          />
        </div>
      </div>
      <div class="body" v-else>
        <label>Nome do Curso</label>
        <BaseInput
          class="input"
          v-model="courseToEditInModal.nome"
          placeholder="Nome da Disciplina:"
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

.cancel {
  background-color: rgb(252, 31, 31);
}
</style>
