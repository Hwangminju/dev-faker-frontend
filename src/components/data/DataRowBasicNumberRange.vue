<template>
  <div class="number-range">
    <div class="number-range-between">
      <p>Between :</p>
      <input type="text" class="ds-input" />
    </div>
    <div class="number-range-and">
      <p>And :</p>
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
.number-range {
  display: flex;

  .number-range-between {
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
  .number-range-and {
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
</style>
