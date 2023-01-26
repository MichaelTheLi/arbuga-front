<template>
  <div>
    <q-form @submit="onSubmit" class="q-gutter-y-sm">
      <q-input filled v-model="ecosystemData.name" label="Name" stack-label dense />
      <q-input filled v-model="ecosystemData.width" label="Width" stack-label dense />
      <q-input filled v-model="ecosystemData.height" label="Height" stack-label dense />
      <q-input filled v-model="ecosystemData.length" label="Length" stack-label dense />
      <q-input filled v-model="ecosystemData.volumeManual" :placeholder="ecosystemData.volume" hint="Volume calculated based on the dimensions. Manually enter the volume if required" dense />

      <q-btn label="Save" type="submit" color="primary" />
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { QBtn, QInput } from "quasar";

export default defineComponent({
  name: "EditEcosystem",
  components: { QBtn, QInput },
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
