<template>
  <div class="q-mx-md">
    <div v-if="isLogged">
      <span>Hello, {{ user.name }}</span>
    </div>
    <div v-else>
      <LoginButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import LoginButton from "@/components/LoginButton.vue";
import { computed } from "vue";

let { user } = storeToRefs(useUserStore());

const isLogged = computed(() => {
  if (!user.value) {
    return false;
  }

  return !!user.value.login;
});
</script>
