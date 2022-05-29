<template>
  <div>
    <select class="ds-form-select data-row-options">
      <option value="">Visa</option>
      <option value="">Master</option>
      <option value="">American Express</option>
      <option value="">True/False</option>
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
