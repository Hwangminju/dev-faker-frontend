<template>
  <div class="month">
    <div class="month-language">
      <p>Language :</p>
      <select class="ds-form-select data-row-options">
        <option value="">Korean</option>
        <option value="">English</option>
      </select>
    </div>
    <div class="month-type">
      <p>Type :</p>
      <select class="ds-form-select data-row-options">
        <option value="">Long</option>
        <option value="">Short</option>
      </select>
    </div>
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {},
});
</script>

<style lang="scss" scoped>
.month {
  display: flex;

  .month-language {
    align-items: center;
    display: flex;
    flex: 1 0 50%;
    p {
      flex: 1 0 100px;
      font-size: 0.875rem;
      text-align: right;
      padding: 0 0.25rem;
    }
  }
  .month-type {
    align-items: center;
    display: flex;
    flex: 1 0 50%;
    p {
      flex: 1 0 100px;
      font-size: 0.875rem;
      text-align: right;
      padding: 0 0.25rem;
    }
  }
}
.data-row-options {
  appearance: auto !important;
}
</style>
