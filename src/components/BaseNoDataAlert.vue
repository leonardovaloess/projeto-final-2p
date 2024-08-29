<script setup>
const props = defineProps({
  title: String,
  text: String,
});
</script>

<template>
  <div class="container">
    <img src="../assets/img/png/no-data-rafiki.png" alt="" />
    <h1>{{ props.title }}</h1>
    <p>{{ props.text }}</p>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 350px;
  }

  h1 {
    font-size: 28px;
    color: rgb(66, 66, 66);
    margin-bottom: 10px;
  }

  p {
    color: grey;
  }

  @media (max-width: 630px) {
    img {
      width: 80%;
    }

    h1 {
      text-align: center;
      font-size: 20px;
    }

    p {
      text-align: center;
      font-size: 10px;
    }
  }
}
</style>
