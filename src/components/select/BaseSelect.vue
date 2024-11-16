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
      :placeholder="props.placeholder ? props.placeholder : 'Selecione...'"
      :value="props.modelValue"
      @focusin="showOptions = true"
      @focusout="showOptions = false"
      :class="props.disabled ? 'disabled' : ''"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      :disabled="props.disabled"
    />
    <span class="select-btn">
      <svg
        width="28"
        height="28"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.9999 26.3438L33.8999 16.4438L36.7279 19.2718L23.9999 31.9998L11.2719 19.2718L14.0999 16.4438L23.9999 26.3438Z"
          fill="black"
        />
      </svg>
    </span>
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

.select-btn {
  position: absolute;
  top: 12px;
  right: 15px;
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
    padding: 14px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.104);

    &:last-of-type {
      border: none;
    }
  }
}
</style>
