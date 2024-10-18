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
          <th class="col-options" v-if="props.hasOptions == true">OPÇÕES</th>
        </tr>
      </thead>
      <tbody>
        <slot name="body"></slot>
        <slot v-if="props.hasOptions == true" name="options"></slot>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.background-table {
  overflow-x: auto;
  overflow-y: hidden;
  border-radius: 10px;
}
</style>
