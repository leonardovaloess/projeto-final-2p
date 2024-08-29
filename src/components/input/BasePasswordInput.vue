<script setup>
import { ref } from "vue";

const passwordInput = ref("password");

const showPassword = () => {
  if (passwordInput.value === "password") {
    passwordInput.value = "text";
  } else {
    passwordInput.value = "password";
  }
};

const props = defineProps({
  modelValue: String,
  label: String,
});
</script>

<template>
  <div classs="container flex column">
    <label>{{ props.label }}</label>

    <div class="password-input">
      <input
        :type="passwordInput"
        placeholder="Insira sua senha"
        :value="props.modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        v-bind="$attrs"
      />
      <button class="pass-btn" @click="showPassword">
        <svg
          clip-rule="evenodd"
          fill-rule="evenodd"
          stroke-linejoin="round"
          stroke-miterlimit="2"
          width="24px"
          height="22px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"
            fill-rule="nonzero"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  gap: 0.3rem;
}
.password-input {
  width: 100%;
  display: flex;

  position: relative;
  .pass-btn {
    padding: 0 5px;
    width: 25px;
    position: absolute;
    right: 14px;
    top: 12px;
  }
}

input {
  padding: 0.7rem;
  border-radius: 8px;
  border: 1px solid #24242475;
  width: 100%;
}
</style>
