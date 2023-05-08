<template>
  <div>
    <q-btn
      flat
      :label="$t('account.login_action')"
      @click="onLoginRequested"
      data-testid="login-button"
    />

    <q-dialog v-model="loginOpened" data-testid="login-dialog">
      <LoginForm @login="onLogin" @signon="onSignOn" />
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { QBtn, QDialog } from "quasar";
import { ref } from "vue";
import LoginForm, {
  type UserCredentials,
} from "@/components/Account/LoginForm.vue";

const emit = defineEmits(["login", "signon"]);

const loginOpened = ref(false);

const onLoginRequested = () => {
  loginOpened.value = true;
};

const onLogin = (userCredentials: UserCredentials) => {
  loginOpened.value = false;
  emit("login", userCredentials);
};

const onSignOn = (userCredentials: UserCredentials) => {
  loginOpened.value = false;
  emit("signon", userCredentials);
};
</script>
