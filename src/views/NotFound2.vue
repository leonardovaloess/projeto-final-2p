<script setup></script>

<template>
  <div>
    <h1>Permissão não concedida!</h1>
    <router-link to="/profile" class="mt-4"> Voltar para o perfil</router-link>
  </div>
</template>

<style lang="scss" scoped>
.container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .body-huge {
    width: 490px;
    color: var(--neutral-700);
  }
}
</style>
