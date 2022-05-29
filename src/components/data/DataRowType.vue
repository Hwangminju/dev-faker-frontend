<template>
  <div>
    <select 
      v-model="selectedDataRowType"
      @change="emitSelectedDataRowType"
      class="ds-form-select data-row-type-list"
    >
      <option value="basic_boolean">Basic / Boolean</option>
      <option value="basic_color">Basic / Color</option>
      <option value="">Basic / Date</option>
      <option value="">Basic / Month</option>
      <option value="">Basic / Week</option>
      <option value="">Basic / Number Range</option>
      <option value="">Basic / Word</option>
      <option value="">Basic / Sentences</option>
      <option value="">Basic / Time</option>
      <option value="">Basic / Auto-Increment</option>
      <option value="">Commerce / Credit-Card</option>
      <option value="">Commerce / Currency</option>
      <option value="">Commerce / Money</option>
      <option value="">Commerce / Pin</option>
    </select>
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  emits: ['emitSelectedDataRowType'],
  setup(props, { emit }) {
    let selectedDataRowType = ref("basic_boolean");
    const emitSelectedDataRowType = (() => { emit("emitSelectedDataRowType", selectedDataRowType.value); });

    return {
      emitSelectedDataRowType
    }
  },
});
</script>

<style lang="scss" scoped>
.data-row-type-list {
  appearance: auto !important;
}
</style>
