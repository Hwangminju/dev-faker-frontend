<template>
  <div class="data-row-auto">
    <div class="money-type">
      <p>Type :</p>
      <select class="ds-form-select data-row-options">
        <option value="">원화</option>
        <option value="">달러</option>
        <option value="">유로</option>
        <option value="">파운드</option>
        <option value="">엔화</option>
        <option value="">위안</option>
      </select>
    </div>
    <div class="money-start">
      <p>Start :</p>
      <input type="text" class="ds-input" />
    </div>
    <div class="money-end">
      <p>End :</p>
      <input type="text" class="ds-input" />
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
.data-row-auto {
  display: flex;

  .money-type {
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
  .money-start {
    align-items: center;
    display: flex;
    flex: 1 0 auto;
    p {
      flex: 1 0 100px;
      font-size: 0.875rem;
      text-align: right;
      padding: 0 0.25rem;
    }
  }
  .money-end {
    align-items: center;
    display: flex;
    flex: 1 0 auto;
    p {
      flex: 1 0 100px;
      font-size: 0.875rem;
      text-align: right;
      padding: 0 0.25rem;
    }
  }
}
</style>
