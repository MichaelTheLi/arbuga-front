<template>
  <div class="q-mx-md">
    <div v-if="isLogged" class="row no-wrap flex-center q-gutter-x-sm">
      <span>{{ $t("account.greeting", { name: user?.name }) }}</span>
      <q-btn
        data-testid="logout-icon"
        icon="logout"
        size="sm"
        flat
        @click="onLogoutClick"
      />
    </div>
    <div v-else>
      <LoginButton />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { storeToRefs } from "pinia";
import LoginButton from "@/components/Account/LoginButton.vue";
import { computed } from "vue";
import { QBtn } from "quasar";
import { useLogoutUser } from "@/gateway/gateway";

const store = useUserStore();
const { execute: logout } = useLogoutUser();
const { user } = storeToRefs(store);

const isLogged = computed(() => {
  if (!user.value) {
    return false;
  }

  return !!user.value.login;
});

const onLogoutClick = () => logout();
</script>
