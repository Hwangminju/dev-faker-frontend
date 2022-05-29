<template>
  <div>
    <select class="ds-form-select data-row-options">
      <option value="">Name</option>
      <option value="">Hex</option>
      <option value="">RGB</option>
    </select>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {},
});
</script>

<style lang="scss" scoped>
.data-row-options {
  appearance: auto !important;
  width: auto;
}
</style>
