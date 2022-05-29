<template>
  <div class="address-type">
    <p>Type :</p>
    <select class="ds-form-select data-row-options">
      <option value="">일반전화</option>
      <option value="">휴대전화</option>
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
}

.address-type {
  align-items: center;
  display: flex;
  p {
    width: 80px;
    font-size: 0.875rem;
    text-align: right;
    padding: 0 0.25rem;
  }
  select {
    width: 150px;
  }
}
</style>
