<script setup lang="ts">
import EcosystemsList from "@/components/EcosystemsList.vue";
</script>

<template>
  <div class="greetings">
    <h1 class="green">Arbuga</h1>
    <EcosystemsList />
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

.greetings h1 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1 {
    text-align: left;
  }
}
</style>
