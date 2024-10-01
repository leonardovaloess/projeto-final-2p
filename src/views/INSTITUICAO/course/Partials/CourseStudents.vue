<script setup>
import BaseButton from "@/components/buttons/BaseButton.vue";

import BaseModal from "@/components/modal/BaseModal.vue";
import { onMounted, ref, computed } from "vue";
import { watch } from "vue";
import BaseAlertError from "@/components/Alert/BaseAlertError.vue";
import BaseAlertSuccess from "@/components/Alert/BaseAlertSuccess.vue";
import { useCourseStore } from "@/stores/course";
import BaseSelect from "@/components/select/BaseSelect.vue";
import BaseNoDataAlert from "@/components/BaseNoDataAlert.vue";
import { useUserStore } from "@/stores/users";
import BaseLoading from "@/components/BaseLoading.vue";

const courseStore = useCourseStore();
const { cadastrarAlunosNoCurso, alunosCadastradosNoCurso } = courseStore;

const userStore = useUserStore();
const { getAlunos } = userStore;

const filteredOptions = computed(() => {
  if (!selectValue.value.label) return options.value;
  return options.value.filter((item) =>
    item.label.toLowerCase().includes(selectValue.value.label.toLowerCase())
  );
});

const loading = ref(false);

const options = ref([
  {
    label: "Adicionar Todos",
    value: "todos",
  },
]);

const props = defineProps({
  open: Boolean,
  curso_id: Number,
});

const selectValue = ref({
  label: "",
  value: "nada",
});

const usuariosCadastrados = ref([]);

const alunosSelecionados = ref([]);

const error = ref(false);
const textSuccess = ref("");

const emit = defineEmits(["update:open", "update:refresh"]);

const success = ref(false);

const close = ref(props.open);

const handlePayload = async () => {
  if (alunosSelecionados.value.length > 0) {
    const payload = {
      curso_id: props.curso_id,
      alunos_id: [],
    };

    alunosSelecionados.value.forEach((aluno) => {
      payload.alunos_id.push({ aluno_id: aluno.value });
    });

    const response = await cadastrarAlunosNoCurso(payload);

    if (response) {
      close.value = false;
      emit("update:open", false);
      emit("update:refresh", true);
      textSuccess.value = "Curso deletado com Sucesso!";

      success.value = true;

      setTimeout(() => {
        success.value = false;
      }, 3000);
    } else {
      error.value = true;

      setTimeout(() => {
        error.value = false;
      }, 3000);

      textError.value = "Não foi possivel deletar o Curso";
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

const initFunction = async () => {
  loading.value = true;
  const alunos = await getAlunos();
  usuariosCadastrados.value = await alunosCadastradosNoCurso(props.curso_id);

  alunos.forEach((aluno) => {
    options.value.push({
      label: aluno.nome,
      value: aluno.id,
    });
  });
  loading.value = false;
};

watch(
  () => props.curso_id,
  async (newVal) => {
    if (newVal !== null) {
      await initFunction();
    }
  }
);

watch(
  () => selectValue.value.value,
  (newVal) => {
    if (newVal) {
      if (newVal === "todos") {
        options.value.forEach((aluno) => {
          if (
            aluno.value !== "todos" &&
            !alunosSelecionados.value.some(
              (selected) => selected.value === aluno.value
            )
          ) {
            alunosSelecionados.value.push({
              label: aluno.label,
              value: aluno.value,
            });
          }
        });
        selectValue.value = {
          label: "",
          value: "",
        };
      } else {
        // Para outros valores, adiciona apenas se ainda não estiver na lista
        const novoObjeto = { ...selectValue.value };
        if (
          !alunosSelecionados.value.some(
            (aluno) => aluno.value === novoObjeto.value
          )
        ) {
          alunosSelecionados.value.push(novoObjeto);
        }
        selectValue.value = {
          label: "",
          value: "",
        };
      }
    }
  }
);
</script>

<template>
  <BaseModal :open="close" :closeIcon="true" width="900">
    <template v-slot:header>
      <div class="header mb-5">
        <h1>Alunos</h1>
      </div>
    </template>
    <template v-slot:body>
      <div class="body-container">
        <div class="left">
          <div class="flex flex-column gap-1">
            <h4>Cadastrar Alunos</h4>
            <BaseSelect
              class="input"
              :options="filteredOptions"
              v-model="selectValue.label"
              @select="selectValue = $event"
            />

            <div
              class="aluno-selecionado-card"
              v-for="(aluno, index) in alunosSelecionados"
              :key="index"
            >
              <span>{{ aluno.label }}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 48 48"
                style="cursor: pointer"
                fill="none"
                @click="alunosSelecionados.splice(index, 1)"
              >
                <path
                  d="M14 12V6C14 5.46957 14.2107 4.96086 14.5858 4.58579C14.9609 4.21071 15.4696 4 16 4H32C32.5304 4 33.0391 4.21071 33.4142 4.58579C33.7893 4.96086 34 5.46957 34 6V12H44V16H40V42C40 42.5304 39.7893 43.0392 39.4142 43.4142C39.0391 43.7893 38.5304 44 38 44H10C9.46957 44 8.96086 43.7893 8.58579 43.4142C8.21071 43.0392 8 42.5304 8 42V16H4V12H14ZM18 8V12H30V8H18Z"
                  fill="red"
                />
              </svg>
            </div>
          </div>
          <div class="ALunos-para-cadastrar"></div>
        </div>
        <div class="right">
          <div v-if="!loading">
            <h4 class="mb-4">Alunos Cadastrados</h4>
            <div
              class="flex flex-column gap-1"
              v-if="usuariosCadastrados.length > 0"
            >
              <div
                class="user-card"
                v-for="(usuario, index) in usuariosCadastrados"
                :key="index"
              >
                <img
                  v-if="usuario.user_img"
                  :src="usuario.user_img"
                  alt="usuario img"
                  style="
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                    border-radius: 50%;
                  "
                />
                <img
                  v-else
                  src="../../../../assets/img/png/user_default.png"
                  alt=""
                  width="40px"
                />
                <span>{{ usuario.nome }}</span>
              </div>
            </div>
            <div v-else>
              <BaseNoDataAlert width="300" text="Nenhum aluno cadastrado" />
            </div>
          </div>
          <div
            v-else
            class="flex w-100 align-center justify-center"
            style="height: 400px; position: relative"
          >
            <h4 class="mb-4" style="position: absolute; top: 0">
              Alunos Cadastrados
            </h4>

            <BaseLoading />
          </div>
        </div>
      </div>
    </template>
    <template v-slot:footer>
      <div class="footer flex gap-1">
        <BaseButton class="cancel btn" label="Cancelar" @click="handleClose" />
        <BaseButton
          class="btn"
          label="Cadastrar"
          @click="handlePayload"
          :disabled="alunosSelecionados.length < 0"
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
.user-card {
  padding: 15px;
  border: 2px solid rgb(201, 201, 201);
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.aluno-selecionado-card {
  padding: 15px;
  border: 2px solid rgb(201, 201, 201);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

h4 {
  font-size: 20px;
  font-weight: 450;
  width: 100%;
  text-align: center;
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

.body-container {
  display: flex;
  width: 100%;
  height: 400px;
  overflow-y: auto;
  .left {
    width: 50%;
    height: 400px;
    overflow-y: auto;
    padding: 10px 40px 10px 20px;
    border-right: 1px solid rgba(65, 65, 65, 0.31);
  }

  .right {
    width: 50%;
    height: 400px;
    overflow-y: auto;
    padding: 10px 20px 10px 40px;
    border-left: 1px solid rgba(65, 65, 65, 0.31);
  }
}
</style>
