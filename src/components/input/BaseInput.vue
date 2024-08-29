<script setup>
const props = defineProps({
  modelValue: String,
  label: String,
  placeholder: String,
});
</script>

<template>
  <input
    :placeholder="props.placeholder"
    :value="props.modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    v-bind="$attrs"
  />
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

input {
  border-radius: 8px;
  padding: 0.2rem 0.5rem;
  border: 2px solid #24242475;
  width: 100%;
}
</style>
