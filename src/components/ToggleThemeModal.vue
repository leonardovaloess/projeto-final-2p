<script setup>
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseInput from "@/components/input/BaseInput.vue";
import BaseSelect from "@/components/select/BaseSelect.vue";
import BaseModal from "@/components/modal/BaseModal.vue";
import { ref, computed, onMounted, watch } from "vue";

import BaseAlertError from "@/components/Alert/BaseAlertError.vue";
import BaseAlertSuccess from "@/components/Alert/BaseAlertSuccess.vue";

import { useRoute } from "vue-router";

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

const success = ref(false);

const close = ref(props.open);

const themes = {
  normal: {
    "--primary": "#00358a",
    "--secondary": "#1a43c0",
    "--red": "rgb(252, 31, 31)",
  },
  deuteranopia: {
    "--primary": "#0066cc",
    "--secondary": "#2a82d7",
    "--red": "rgb(255, 127, 80)",
  },
  protanopia: {
    "--primary": "#005aa7",
    "--secondary": "#3a7bd5",
    "--red": "rgb(255, 165, 0)",
  },
  tritanopia: {
    "--primary": "#4c9f70",
    "--secondary": "#7fc580",
    "--red": "rgb(255, 99, 71)",
  },
};

const options = ref([
  {
    label: "Normal",
    value: 1,
  },
  {
    label: "Deuteranopia",
    value: 2,
  },
  {
    label: "Protanopia",
    value: 3,
  },
  {
    label: "Tritanopia",
    value: 4,
  },
]);

const filteredOptions = computed(() => {
  if (!selectValue.value.label) return options.value;
  return options.value.filter((item) =>
    item.label.toLowerCase().includes(selectValue.value.label.toLowerCase())
  );
});

const handleClose = () => {
  selectValue.value = {
    label: "",
    value: null,
  };
  changeTheme({
    label: "Normal",
    value: 1,
  });
  close.value = false;
  emit("update:open", false);
};

const handleConfirm = () => {
  close.value = false;
  emit("update:refresh", true);
};
const changeTheme = (theme) => {
  const selectedTheme =
    theme.label.toLowerCase() === "deuteranopia"
      ? themes.deuteranopia
      : theme.label.toLowerCase() === "protanopia"
      ? themes.protanopia
      : theme.label.toLowerCase() === "tritanopia"
      ? themes.tritanopia
      : themes.normal;

  Object.entries(selectedTheme).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
};

watch(
  () => selectValue.value,
  (newVal) => {
    changeTheme(newVal);
  }
);
</script>

<template>
  <BaseModal :open="props.open" :closeIcon="true">
    <template v-slot:header>
      <div class="header">
        <h1>Acessibilidade</h1>
      </div>
    </template>
    <template v-slot:body>
      <div class="body" style="height: 110px">
        <div class="flex flex-column gap-05">
          <label>Tema para Daltonismo:</label>

          <BaseSelect
            class="input"
            :options="filteredOptions"
            v-model="selectValue.label"
            @select="selectValue = $event"
          />
        </div>
        <span></span>
      </div>
    </template>
    <template v-slot:footer>
      <div class="footer flex gap-1">
        <BaseButton class="cancel btn" label="Cancelar" @click="handleClose" />
        <BaseButton class="btn" label="Confirmar" @click="handleConfirm" />
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
