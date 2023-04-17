<template>
  <div>
    <q-form @submit="onSubmit" class="q-gutter-y-sm">
      <q-input
        filled
        v-model="ecosystemData.name"
        label="Name"
        stack-label
        dense
        data-testid="edit-ecosystem-name"
      />
      <div>
        <h5 class="q-my-sm q-pa-sm">Water parameters</h5>
        <div class="row q-col-gutter-x-sm">
          <q-input
            class="col"
            filled
            v-model.number="ecosystemData.width"
            label="Width"
            stack-label
            dense
            suffix="cm"
            data-testid="edit-ecosystem-width"
          />
          <q-input
            class="col"
            filled
            v-model.number="ecosystemData.height"
            label="Height"
            stack-label
            dense
            suffix="cm"
            data-testid="edit-ecosystem-height"
          />
          <q-input
            class="col"
            filled
            v-model.number="ecosystemData.length"
            label="Length"
            stack-label
            dense
            suffix="cm"
            data-testid="edit-ecosystem-length"
          />
        </div>
      </div>
      <q-input
        filled
        type="number"
        v-model.number="ecosystemData.volumeManual"
        :placeholder="volume"
        hint="Volume calculated based on the dimensions. Manually enter the volume if required"
        dense
        data-testid="edit-ecosystem-volume"
      />

      <div>
        <h5 class="q-my-sm q-pa-sm">Equipment</h5>
        <div class="row q-col-gutter-x-sm">
          <q-input
            class="col"
            filled
            v-model.number="ecosystemData.equipment.filtersFlow"
            label="Filter flow"
            stack-label
            dense
            suffix="liters/hour"
            data-testid="edit-ecosystem-filters-flow"
          />
          <q-input
            class="col"
            filled
            v-model.number="ecosystemData.equipment.heatersPower"
            label="Heater power"
            stack-label
            dense
            suffix="watts"
            data-testid="edit-ecosystem-heaters-power"
          />
          <q-input
            class="col"
            filled
            v-model.number="ecosystemData.equipment.lightingLux"
            label="Lighting power"
            stack-label
            dense
            suffix="lux"
            data-testid="edit-ecosystem-lighting-lux"
          />
        </div>
      </div>

      <div>
        <h5 class="q-my-sm q-pa-sm">Water parameters</h5>
        <div class="row q-col-gutter-x-sm">
          <q-input
            class="col"
            filled
            v-model.number="ecosystemData.waterReplacement.waterParameters.ph"
            label="PH"
            stack-label
            dense
            data-testid="edit-ecosystem-ph"
          />
          <q-input
            class="col"
            filled
            v-model.number="ecosystemData.waterReplacement.waterParameters.gh"
            label="GH"
            stack-label
            dense
            data-testid="edit-ecosystem-gh"
          />
          <q-input
            class="col"
            filled
            v-model.number="ecosystemData.waterReplacement.waterParameters.kh"
            label="KH"
            stack-label
            dense
            data-testid="edit-ecosystem-kh"
          />
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
