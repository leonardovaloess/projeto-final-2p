<script setup>
import { ref, onMounted, watch } from "vue";

import BaseInput from "@/components/input/BaseInput.vue";
import BaseButton from "@/components/buttons/BaseButton.vue";
import BaseLoading from "@/components/BaseLoading.vue";
import { useUserStore } from "@/stores/users";

const userStore = useUserStore();
const { getUserProfile } = userStore;

const loading = ref(false);
const user = ref(null);

const initFunction = async () => {
  loading.value = true;
  user.value = await getUserProfile();
  loading.value = false;
};

onMounted(async () => {
  await initFunction();
});
</script>

<template>
  <div class="page-background">
    <div v-if="!loading">
      {{ user }}
    </div>

    <div v-else class="loading">
      <BaseLoading class="loading-icon" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.loading {
  height: 400px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 630px) {
    .loading-icon > svg {
      width: 100px;
      height: 100px;
    }
  }
}

.page-background {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  height: 100%;
  @media (max-width: 630px) {
    padding: 1rem;
  }
}
</style>
