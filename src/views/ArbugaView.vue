<script setup lang="ts">
import EditEcosystem from "@/components/EditEcosystem.vue";
import { useEcosystemsStore, Ecosystem } from "@/stores/ecosystems";
import _ from "lodash";
import { ref } from "vue";

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

const store = useEcosystemsStore();

function getRandom() {
  const index = getRandomInt(0, store.list.length);
  return store.list[index];
}

let ecosystem = ref(getRandom());

const onsave = function (ecosystemData: Ecosystem) {
  ecosystem.value = _.assign({}, ecosystemData);
};
const createNew = function () {
  ecosystem.value = store.createNew("New");
  store.list.push(ecosystem.value);
};
const selectRandom = function () {
  ecosystem.value = getRandom();
};
</script>

<template>
  <main>
    <button @click="createNew">Create new</button>
    <button @click="selectRandom">Select random</button>
    {{ ecosystem.name }}
    <EditEcosystem :ecosystem="ecosystem" @save="onsave" />
  </main>
</template>
