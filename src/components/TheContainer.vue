<script setup>
import BaseHeader from "@/components/BaseHeader.vue";
import BaseSidebar from "./sidebar/BaseSidebar.vue";
</script>

<template>
  <div class="page-background">
    <BaseSidebar class="sidebar" />

    <main :class="`main `">
      <BaseHeader class="header" />
      <div class="base-padding">
        <div class="background">
          <router-view class="view" />
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.page-background {
  display: flex;
  position: relative;
}

.view {
  z-index: 0;
}
.sidebar {
  position: fixed;
  z-index: 99;
  box-shadow: 10px 0px 105px rgba(0, 0, 0, 0.267);
}

.base-padding {
  background-color: #d4d4d4;
  padding: 2rem;
  flex: 1;
  z-index: 0;
}

.header {
  position: sticky;
  top: 0;
  right: 0;
  z-index: 9999;
}
.main {
  transition: all ease-in-out 0.4s;
  display: flex;
  flex-direction: column;
  margin-left: 240px;
  width: 100%;
  height: 100vh;
  background-color: red;
}
.page {
  margin-left: 200px;
}

.background {
  background-color: #fff;
  border-radius: 10px;
  height: 100%;
}
@media (min-width: 0px) and (max-width: 840px) {
  .main {
    margin-left: 0px;
  }
}
</style>
