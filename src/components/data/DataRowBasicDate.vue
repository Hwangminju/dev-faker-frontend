<template>
  <div class="data-row-date">
    <p>Format :</p>
    <input type="text" class="ds-input" />
  </div>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {},
});
</script>

<style lang="scss" scoped>
.data-row-date {
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
</style>
