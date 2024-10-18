<script setup>
const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
  disabled: Boolean,
});
</script>

<template>
  <textarea
    :placeholder="props.placeholder"
    :value="props.modelValue"
    :class="props.disabled ? 'disabled' : ''"
    @input="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
    :disabled="props.disabled"
    rows="8"
  ></textarea>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

textarea {
  border-radius: 8px;
  padding: 0.2rem 0.5rem;
  border: 2px solid #24242475;
  width: 100%;

  box-sizing: border-box;
  resize: none; /* remove as opções de redimensionamento */
}

.disabled {
  background-color: rgba(187, 187, 187, 0.53);
}
</style>
