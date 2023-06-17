<template>
  <div>
    <q-form @submit="onSubmit">
      <div class="row q-gutter-x-xs">
        <q-input
          filled
          v-model="ecosystemData.name"
          :label="$t('ecosystem.fields.name')"
          stack-label
          dense
          data-testid="edit-ecosystem-name"
          class="col-grow"
        />
        <q-btn
          @click="onRemoveClick"
          dense
          stack
          icon="delete"
          :title="$t('ecosystem.remove')"
        />
      </div>
      <div class="row q-col-gutter-x-md">
        <div class="col-12 col-md-6 col-lg">
          <h6 class="q-my-sm q-pa-sm">
            {{ $t("ecosystem.dimensions_header") }}
          </h6>
          <div class="q-gutter-y-sm column">
            <q-input
              class="col"
              filled
              v-model.number="ecosystemData.width"
              :label="$t('ecosystem.fields.width')"
              stack-label
              dense
              :suffix="$t('ecosystem.fields.dim_suffix')"
              data-testid="edit-ecosystem-width"
            />
            <q-input
              class="col"
              filled
              v-model.number="ecosystemData.height"
              :label="$t('ecosystem.fields.height')"
              stack-label
              dense
              :suffix="$t('ecosystem.fields.dim_suffix')"
              data-testid="edit-ecosystem-height"
            />
            <q-input
              class="col"
              filled
              v-model.number="ecosystemData.length"
              :label="$t('ecosystem.fields.length')"
              stack-label
              dense
              :suffix="$t('ecosystem.fields.dim_suffix')"
              data-testid="edit-ecosystem-length"
            />
            <q-input
              filled
              type="number"
              v-model.number="ecosystemData.volumeManual"
              :placeholder="volume"
              :hint="$t('ecosystem.fields.volume.hint')"
              dense
              data-testid="edit-ecosystem-volume"
              class="q-mb-lg"
            />
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg">
          <h6 class="q-my-sm q-pa-sm">
            {{ $t("ecosystem.equipment_header") }}
          </h6>
          <div class="q-gutter-y-sm column">
            <q-input
              class="col"
              filled
              v-model.number="ecosystemData.equipment.filtersFlow"
              :label="$t('ecosystem.fields.filter_flow')"
              stack-label
              dense
              :suffix="$t('ecosystem.fields.filter_flow_suffix')"
              data-testid="edit-ecosystem-filters-flow"
            />
            <q-input
              class="col"
              filled
              v-model.number="ecosystemData.equipment.heatersPower"
              :label="$t('ecosystem.fields.heater_power')"
              stack-label
              dense
              :suffix="$t('ecosystem.fields.heater_suffix')"
              data-testid="edit-ecosystem-heaters-power"
            />
            <q-input
              class="col"
              filled
              v-model.number="ecosystemData.equipment.lightingLux"
              :label="$t('ecosystem.fields.lighting_power')"
              stack-label
              dense
              :suffix="$t('ecosystem.fields.lighting_suffix')"
              data-testid="edit-ecosystem-lighting-lux"
            />
          </div>
        </div>

        <div class="col-12 col-md-12 col-lg">
          <h6 class="q-my-sm q-pa-sm">
            {{ $t("ecosystem.water_params_header") }}
          </h6>
          <div class="q-gutter-y-sm column">
            <q-input
              class="col"
              filled
              v-model.number="ecosystemData.waterReplacement.waterParameters.ph"
              :label="$t('ecosystem.fields.ph')"
              stack-label
              dense
              data-testid="edit-ecosystem-ph"
            />
            <q-input
              class="col"
              filled
              v-model.number="ecosystemData.waterReplacement.waterParameters.gh"
              :label="$t('ecosystem.fields.gh')"
              stack-label
              dense
              data-testid="edit-ecosystem-gh"
            />
            <q-input
              class="col"
              filled
              v-model.number="ecosystemData.waterReplacement.waterParameters.kh"
              :label="$t('ecosystem.fields.kh')"
              stack-label
              dense
              data-testid="edit-ecosystem-kh"
            />

            <q-input
              class="col"
              filled
              v-model.number="
                ecosystemData.waterReplacement.waterParameters.temperature
              "
              :label="$t('ecosystem.fields.temperature')"
              stack-label
              dense
              data-testid="edit-ecosystem-temperature"
            />
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { QBtn, QForm, QInput } from "quasar";
import {
  type Ecosystem,
  useEcosystemDynamicVolume,
  useEcosystemsStore,
} from "@/stores/ecosystems";
import { useRemoveEcosystem } from "@/gateway/gateway";
import _ from "lodash";

const { execute: removeEcosystem } = useRemoveEcosystem();

const props = defineProps<{
  ecosystem: Ecosystem;
}>();

const emit = defineEmits<{
  (e: "save", selected: Ecosystem): void;
}>();

const ecosystemData = ref(props.ecosystem);

watch(
  () => props.ecosystem,
  (newValue) => {
    ecosystemData.value = newValue;
  }
);

const { volume } = useEcosystemDynamicVolume(ecosystemData);

const areDimensionsFull = (): boolean => {
  const ecosystem = ecosystemData.value;
  if (!ecosystem) {
    return false;
  }

  return (ecosystem.width &&
    ecosystem.height &&
    ecosystem.length &&
    ecosystem.width > 0 &&
    ecosystem.height > 0 &&
    ecosystem.length > 0) as boolean;
};

const validate = (): boolean => {
  return (ecosystemData.value.name &&
    areDimensionsFull() &&
    volume.value > 0) as boolean;
};

const onSubmit = (e: Event) => {
  if (validate()) {
    emit("save", ecosystemData.value);
  }

  e.preventDefault();
};

const ecosystemsStore = useEcosystemsStore();
const onRemoveClick = () => {
  const index = _.findIndex(ecosystemsStore.list, (ecosystem) => {
    return ecosystem === ecosystemData.value;
  });

  if (index !== -1) {
    ecosystemsStore.list.splice(index, 1);
  }

  if (ecosystemData.value.id && !ecosystemData.value.id.startsWith("new_")) {
    removeEcosystem({ id: ecosystemData.value.id });
  }

  ecosystemsStore.changeCurrent(ecosystemsStore.list[0] || null);
};
</script>
