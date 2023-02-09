<template>
  <div>
    <q-btn flat label="Login" @click="onLoginRequested" />

    <q-dialog v-model="loginOpened">
      <q-card style="min-width: 350px" flat bordered>
        <q-card-section>
          <div class="text-h6">Your address</div>
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
            />
            <q-input
              filled
              label="Password"
              stack-label
              dense
              v-model="userCredentials.password"
              autofocus
              type="password"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="around" class="text-primary">
          <q-btn flat label="Log-in" @click="onLogin" />
          <q-btn flat label="Sign-on" @click="onSignOn" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import {
  QBtn,
  QCard,
  QCardActions,
  QCardSection,
  QDialog,
  QForm,
  QInput,
} from "quasar";
import { ref } from "vue";
import { useLoginUser } from "@/gateway/gateway";

const loginOpened = ref(false);
const userCredentials = ref({
  login: "",
  password: "",
});

const onLoginRequested = () => {
  loginOpened.value = true;
};

const loginUser = useLoginUser();

const onLogin = () => {
  if (userCredentials.value.login && userCredentials.value.password) {
    loginOpened.value = false;
    loginUser.execute(userCredentials.value);
  }
};

const onSignOn = () => {
  if (userCredentials.value.login && userCredentials.value.password) {
    loginOpened.value = false;
    loginUser.execute(userCredentials.value);
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
