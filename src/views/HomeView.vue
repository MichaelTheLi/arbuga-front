<script setup lang="ts">
import { QPage } from "quasar";
</script>

<template>
  <q-page padding>
    <h2>{{ $t("home.heading") }}</h2>
    <div class="text-body1">
      <p>{{ $t("home.welcome_message") }}</p>
      <!-- Here goes some usage guide and helpful links -->
    </div>
  </q-page>
</template>
