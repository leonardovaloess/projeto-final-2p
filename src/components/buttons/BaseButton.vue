<script setup>
const props = defineProps({
  label: String,
  customCLick: Function,
});
</script>

<template>
  <button @click="props.customCLick">
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
</style>
