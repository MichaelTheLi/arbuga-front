<template>
  <q-card style="min-width: 350px" flat bordered>
    <q-card-section>
      <div class="text-h6">Your credentials</div>
    </q-card-section>

    <q-card-section>
      <q-form class="q-col-gutter-sm">
        <q-input
          filled
          label="Login"
          stack-label
          dense
          v-model="userCredentials.login"
          autofocus
          type="email"
          data-testid="login-login-input"
        />
        <q-input
          filled
          label="Password"
          stack-label
          dense
          v-model="userCredentials.password"
          autofocus
          type="password"
          data-testid="login-password-input"
        />
      </q-form>
    </q-card-section>

    <q-card-actions align="around" class="text-primary">
      <q-btn
        flat
        label="Log-in"
        @click="onLogin"
        data-testid="login-actual-button"
      />
      <q-btn
        flat
        label="Sign-on"
        @click="onSignOn"
        data-testid="signon-actual-button"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QBtn, QCard, QCardActions, QCardSection, QForm, QInput } from "quasar";

export interface UserCredentials {
  login: string;
  password: string;
}

const emit = defineEmits(["login", "signon"]);

const userCredentials = ref({
  login: "",
  password: "",
});

const onLogin = () => {
  if (userCredentials.value.login && userCredentials.value.password) {
    emit("login", userCredentials.value);
  }
};

const onSignOn = () => {
  if (userCredentials.value.login && userCredentials.value.password) {
    emit("signon", userCredentials.value);
  }
};
</script>

<style>
input:-webkit-autofill,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-text-fill-color: yellow !important;
  -webkit-box-shadow: 0 0 0 1000px #24333b inset !important;
  transition: background-color 5000s ease-in-out 0s;
}

input:-webkit-autofill:hover {
  -webkit-text-fill-color: yellow !important;
  -webkit-box-shadow: 0 0 0 1000px #334149 inset !important;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
