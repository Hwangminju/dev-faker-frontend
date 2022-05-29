<template>
  <div class="dummy-image">
    <div class="dummy-image-size">
      <p class="dummy-image-size-label">Size Start :</p>
      <div class="dummy-image-size-value">
        <input type="text" class="ds-input" />
        <span>x</span>
        <input type="text" class="ds-input" />
      </div>
    </div>
    <div class="dummy-image-size">
      <p class="dummy-image-size-label">Size End :</p>
      <div class="dummy-image-size-value">
        <input type="text" class="ds-input" />
        <span>x</span>
        <input type="text" class="ds-input" />
      </div>
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
.dummy-image {
  display: flex;

  .dummy-image-size {
    align-items: center;
    display: flex;
    flex: 1 0 50%;
    .dummy-image-size-label {
      flex: 1 0 100px;
      font-size: 0.875rem;
      text-align: right;
      padding: 0 0.25rem;
    }
    .dummy-image-size-value {
      align-items: center;
      display: flex;
      flex: 1 0 auto;

      > input {
        margin: 0 0.5rem;
        width: 7rem;
        &:first-child {
          margin-left: 0;
        }
      }
    }
  }
}
</style>
