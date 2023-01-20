<template>
  <form @submit="submit" class="form">
    <label for="name">Name: </label>
    <input v-model="ecosystemData.name" id="name" name="name" type="text" />
    <label for="width">Width, cm: </label>
    <input
      v-model.number="ecosystemData.width"
      id="width"
      name="width"
      type="number"
    />
    <label for="height">Height, cm: </label>
    <input
      v-model.number="ecosystemData.height"
      id="height"
      name="height"
      type="number"
    />
    <label for="length">Length, cm: </label>
    <input
      v-model.number="ecosystemData.length"
      id="length"
      name="length"
      type="number"
    />
    <label for="volumeManual">volume, l: ({{ ecosystemData.volume }})</label>
    <input
      v-model.number="ecosystemData.volumeManual"
      :placeholder="ecosystemData.volume"
      id="volumeManual"
      name="volumeManual"
      type="number"
    />
    <br>
    <button type="submit">Save</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "EditEcosystem",
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
    submit(e: SubmitEvent) {
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

<style scoped>
.form {
  display: flex;
  flex-direction: column;
}
</style>
