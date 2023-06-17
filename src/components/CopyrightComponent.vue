<template>
  <div class="copyright text-blue-grey-13 q-pa-lg">
    {{ $t("project.name") }} © 2023–{{ currentYear }}
  </div>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>
