<script setup>
import { onMounted } from "vue";
const props = defineProps({
  fields: Array,
  rows: Array,
  hasOptions: Boolean,
});

onMounted(() => {
  console.log(props.fields);
});
</script>

<template>
  <div class="background-table">
    <table>
      <thead>
        <tr>
          <th v-for="field in fields" :key="field.key">{{ field.label }}</th>
          <th v-if="props.hasOptions == true">OPÇÕES</th>
        </tr>
      </thead>
      <tbody>
        <slot name="body"></slot>
        <slot v-if="props.hasOptions == true" name="options"></slot>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss"></style>
