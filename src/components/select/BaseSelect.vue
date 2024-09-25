<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  options: Array,
  disabled: Boolean,
});

const emit = defineEmits(["select"]);
const showOptions = ref(false);

const handleSelect = (option) => {
  emit("select", {
    label: option.label,
    value: option.value,
  });
  // Fechar as opções após selecionar
  showOptions.value = false;
};
</script>

<template>
  <div class="select-container">
    <input
      placeholder="Selecione..."
      :value="props.modelValue"
      @focusin="showOptions = true"
      @focusout="showOptions = false"
      :class="props.disabled ? 'disabled' : ''"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      :disabled="props.disabled"
    />
    <div class="options-container" v-if="showOptions">
      <span
        v-for="(option, index) in props.options"
        :key="index"
        @mousedown="handleSelect(option)"
      >
        {{ option.label }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.select-container {
  position: relative;
  width: 100%;
  padding: 0 !important;

  z-index: 9999;
}

input {
  border-radius: 8px;
  padding: 12px;
  border: 2px solid #24242475;
  width: 100%;
}

.disabled {
  background-color: rgba(187, 187, 187, 0.53);
}

.options-container {
  position: absolute;
  display: flex;
  box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.286);
  flex-direction: column;
  background-color: #fff;
  z-index: 99999 !important;
  width: 100%;
  max-height: 120px;
  overflow-y: auto;

  span {
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.324);

    &:last-of-type {
      border: none;
    }
  }
}
</style>
