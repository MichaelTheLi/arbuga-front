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
      <q-input
        filled
        type="number"
        v-model.number="ecosystemData.volumeManual"
        :placeholder="ecosystemData.volume"
        hint="Volume calculated based on the dimensions. Manually enter the volume if required"
        dense
        data-testid="edit-ecosystem-volume"
      />
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { QForm, QInput } from "quasar";

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

    return {
      ecosystemData,
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
