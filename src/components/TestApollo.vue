<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import gql from "graphql-tag";
import { watch } from "vue";

const { result, loading, error } = useQuery(gql`
  query getUsers {
    users(options: { paginate: { page: 0, limit: 2 } }) {
      data {
        id
        name
      }
    }
  }
`);

watch(result, (value) => {
  console.log(value);
});
</script>

<template>
  <div v-if="loading">Loading...</div>

  <div v-else-if="error">Error: {{ error.message }}</div>

  <ul v-else-if="result && result.users">
    <li v-for="user of result.users.data" :key="user.id">
      {{ user.name }}
    </li>
  </ul>
</template>

<style scoped></style>
