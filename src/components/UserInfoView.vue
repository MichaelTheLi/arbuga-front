<template>
  <div>
    <q-item v-if="user" class="q-pa-xs">
      <q-item-section>
        <q-item-label>Hello, {{ user.login ? user.name : 'anonymous' }}</q-item-label>
        <div v-if="!user.login">
          <q-item-label caption class="q-my-sm">Please log-in or sign-in to save your ecosystems</q-item-label>
          <q-btn color="secondary" size="md" class="q-my-sm" @click="onLoginRequested">
            <span class="q-pr-xs">Log-in</span>
            <q-icon name="login" />
          </q-btn>
        </div>
      </q-item-section>
    </q-item>

    <q-dialog v-model="loginOpened">
      <q-card style="min-width: 350px" flat bordered>
        <q-card-section>
          <div class="text-h6">Your address</div>
        </q-card-section>

        <q-card-section class="q-col-gutter-sm">
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
import { useUserStore } from "@/stores/user";
import {
  QBtn,
  QCard,
  QCardActions,
  QCardSection,
  QDialog,
  QIcon,
  QInput,
  QItem,
  QItemLabel,
  QItemSection
} from "quasar";
import { storeToRefs } from "pinia";
import { ref } from "vue";

let { user } = storeToRefs(useUserStore());

const loginOpened = ref(false);
const userCredentials = ref({
  login: "",
  password: "",
});
const onLoginRequested = () => {
  loginOpened.value = true;
};

const onLogin = () => {
  if (userCredentials.value.login && userCredentials.value.password) {
    loginOpened.value = false;
  }
  console.log(userCredentials.value);
};

const onSignOn = () => {
  if (userCredentials.value.login && userCredentials.value.password) {
    loginOpened.value = false;
  }
  console.log(userCredentials.value);
};
</script>
