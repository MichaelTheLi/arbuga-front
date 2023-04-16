<template>
  <div>
    <div class="text-body2">
      <p>Actual volume: {{ volume }}l</p>
      <q-btn flat label="Show analysis" @click="onFullAnalysisClicked" />

      <div>
        <div class="row q-col-gutter-md">
          <div class="col">
            <h4 class="q-my-md">
              <span>Fish</span>
              <q-btn
                class="q-ml-md"
                dense
                flat
                round
                icon="add"
                color="primary"
                @click="onAddFishClicked"
              />
            </h4>
            <FishList :list="ecosystem.fish" />
          </div>
          <div class="col">
            <h4 class="q-my-md">
              <span>Plants</span>
              <q-btn
                class="q-ml-md"
                dense
                flat
                round
                icon="add"
                color="primary"
                @click="onAddPlantsClicked"
              />
            </h4>
            <PlantsList :list="ecosystem.plants" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ecosystem } from "@/stores/ecosystems";
import FishList from "@/components/Fish/FishList.vue";
import PlantsList from "@/components/Plants/PlantsList.vue";
import { useEcosystemDynamicVolume } from "@/stores/ecosystems";
import { toRef } from "vue";
import { useRouter } from "vue-router";
import { QBtn } from "quasar";

const router = useRouter();

const props = defineProps<{
  ecosystem: Ecosystem;
}>();

const onFullAnalysisClicked = () => {
  router.push("/");
};

const onAddFishClicked = () => {
  router.push("add_fish");
};

const onAddPlantsClicked = () => {
  router.push("add_plants");
};

const ecosystemForVolume = toRef(props, "ecosystem");

const { volume } = useEcosystemDynamicVolume(ecosystemForVolume);
</script>

<style scoped></style>
