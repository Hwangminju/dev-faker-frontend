<template>
  <div>
    <select class="ds-form-select data-row-options">
      <option value="">en-US</option>
      <option value="">ko-KR</option>
      <option value="">fr-FR</option>
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
