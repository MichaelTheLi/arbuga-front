<template>
  <div>
    <div class="text-body2">
      <p>Actual volume: {{ ecosystem.volume }}l</p>
      <p>Something else: 123i</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps(["ecosystem"]);
</script>

<style scoped></style>
