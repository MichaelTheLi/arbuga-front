<template>
  <div>
    <q-form @submit="onSubmit">
      <div>
        <q-input
          filled
          v-model="ecosystemData.name"
          :label="$t('ecosystem.fields.name')"
          stack-label
          dense
          data-testid="edit-ecosystem-name"
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
          </div>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { QForm, QInput } from "quasar";
import { useEcosystemDynamicVolume } from "@/stores/ecosystems";

// TODO Rewrite in setup-style
export default defineComponent({
  name: "EditEcosystem",
  components: { QForm, QInput },
  emits: ["save"],
  props: ["ecosystem"],
  setup(props) {
    const ecosystemData = ref(props.ecosystem);

    watch(
      () => props.ecosystem,
      (newValue) => {
        ecosystemData.value = newValue;
      }
    );

    const { volume } = useEcosystemDynamicVolume(ecosystemData);

    return {
      ecosystemData,
      volume,
    };
  },
  methods: {
    onSubmit(e: Event) {
      if (this.validate()) {
        this.save();
      }

      e.preventDefault();
    },
    validate(): boolean {
      return (this.ecosystemData.name &&
        this.fullDimensions() &&
        this.ecosystemData.volume > 0) as boolean;
    },
    fullDimensions: function () {
      return (
        this.ecosystemData.width > 0 &&
        this.ecosystemData.height > 0 &&
        this.ecosystemData.length > 0
      );
    },
    save() {
      this.$emit("save", this.ecosystemData);
    },
  },
});
</script>

<style scoped></style>
