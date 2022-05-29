<template>
  <div class="data-row-auto">
    <div class="auto-start">
      <p>Start at :</p>
      <input type="text" class="ds-input" />
    </div>
    <div class="auto-increment">
      <p>Increment :</p>
      <input type="text" class="ds-input" />
    </div>
    <div class="auto-placeholder">
      <p>placeholder string :</p>
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

  .auto-start {
    align-items: center;
    display: flex;
    flex: 1 0 20%;
    p {
      flex: 1 0 100px;
      font-size: 0.875rem;
      text-align: right;
      padding: 0 0.25rem;
    }
  }
  .auto-increment {
    align-items: center;
    display: flex;
    flex: 1 0 20%;
    p {
      flex: 1 0 100px;
      font-size: 0.875rem;
      text-align: right;
      padding: 0 0.25rem;
    }
  }
  .auto-placeholder {
    align-items: center;
    display: flex;
    flex: 1 0 auto;
    p {
      flex: 1 0 150px;
      font-size: 0.875rem;
      text-align: right;
      padding: 0 0.25rem;
    }
  }
}
</style>
