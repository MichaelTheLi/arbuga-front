<template>
  <a
    v-for="ecosystem in list"
    :key="ecosystem.name"
    @click="onEcosystemSelect(ecosystem)"
  >
    <div>{{ ecosystem.name || "New" }}</div>
    <div class="additional-info">
      <span>{{ ecosystem.volume }} L</span>,&nbsp;
      <span>
        {{ ecosystem.length }}x{{ ecosystem.width }}x{{ ecosystem.height }}
      </span>
    </div>
  </a>
</template>

<script lang="ts" setup>
import { useEcosystemsStore } from "@/stores/ecosystems";
import type { Ecosystem } from "@/stores/ecosystems";
import { storeToRefs } from "pinia";
import type { UnwrapRef } from "vue";

const store = useEcosystemsStore();

const { list } = storeToRefs(store);

const onEcosystemSelect = (ecosystem: UnwrapRef<Ecosystem>) => {
  store.changeCurrent(ecosystem);
};
</script>

<style scoped>
a {
  cursor: pointer;
  display: block;
  padding: 4px 6px;
}

.additional-info {
  font-size: 10px;
  font-weight: 300;
  line-height: 12px;
}
</style>
