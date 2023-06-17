<template>
  <div class="copyright text-blue-grey-13 q-pa-lg">
    © 2023–{{ currentYear }}, Werel
  </div>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>
