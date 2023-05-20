<template>
  <LoginButtonInner @login="onLogin" @signon="onSignOn" />
</template>

<script setup lang="ts">
import { useLoginUser, useRegisterUser } from "@/gateway/gateway";
import LoginButtonInner from "@/components/Account/LoginButtonInner.vue";
import type { UserCredentials } from "@/components/Account/LoginForm.vue";

const loginUser = useLoginUser();
const registerUser = useRegisterUser();

const onLogin = (userCredentials: UserCredentials) => {
  loginUser.execute(userCredentials);
};

const onSignOn = (userCredentials: UserCredentials) => {
  registerUser.execute({
    ...userCredentials,
    name: "New user",
  });
};
</script>
