<template>
  <div>
    <div class="text-body2">
      <p>{{ $t("ecosystem.actual_volume", { volume }) }}</p>
      <q-btn
        flat
        :label="$t('ecosystem.analysis.show_analysis')"
        @click="onFullAnalysisClicked"
      />

      <div>
        <div class="row q-col-gutter-md">
          <div class="col">
            <h4 class="q-my-md">
              <span>{{ $t("ecosystem.fish_list") }}</span>
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
              <span>{{ $t("ecosystem.plants_list") }}</span>
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
