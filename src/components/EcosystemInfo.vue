<template>
  <p>Name: {{ ecosystem.name }}</p>
  <p>Volume: {{ ecosystem.volume }}l</p>
  <p>Dimensions: {{ ecosystem.length }}cm x {{ ecosystem.width }}cm x {{ ecosystem.height }}cm</p>
</template>

<script setup lang="ts">
defineProps(["ecosystem"]);
</script>

<style scoped></style>
