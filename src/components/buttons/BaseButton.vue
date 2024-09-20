<script setup>
const props = defineProps({
  label: String,
  customCLick: Function,
  disabled: Boolean,
});
</script>

<template>
  <button
    :class="props.disabled ? 'disabled' : ''"
    :disabled="props.disabled"
    @click="props.customCLick"
  >
    {{ props.label }}
  </button>
</template>

<style scoped lang="scss">
button {
  padding: 0.3rem 1rem;
  background-color: var(--secondary);
  border-radius: 8px;
  color: #fff;

  &:hover {
    background-color: var(--primary);
    transition: 0.3s;
  }
}

.disabled {
  opacity: 0.5;

  &:hover {
    background-color: var(--secondary);
  }
}
</style>
