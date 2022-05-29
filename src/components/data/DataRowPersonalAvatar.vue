<template>
  <div class="avatar">
    <div class="avatar-size">
      <p class="avatar-size-label">size :</p>
      <div class="avatar-size-value">
        <input type="text" class="ds-input" />
        <span>x</span>
        <input type="text" class="ds-input" />
      </div>
    </div>
    <div class="avatar-format">
      <p class="avatar-format-label">image format :</p>
      <select class="ds-form-select data-row-options">
        <option value="">png</option>
        <option value="">jpg</option>
        <option value="">bmp</option>
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
.data-row-options {
  appearance: auto !important;
  // width: auto;
}
.avatar {
  display: flex;

  .avatar-size {
    align-items: center;
    display: flex;
    // flex: 1 0 50%;

    .avatar-size-label {
      flex: 1 0 50px;
      font-size: 0.875rem;
      text-align: right;
      padding: 0 0.25rem;
    }
    .avatar-size-value {
      align-items: center;
      display: flex;
      // flex: 1 0 auto;

      > input {
        margin: 0 0.5rem;
        width: 7rem;
        &:first-child {
          margin-left: 0;
        }
      }
    }
  }

  .avatar-format {
    align-items: center;
    display: flex;
    // justify-content: flex-start;
    flex: 1 0 50%;
    .avatar-format-label {
      flex: 1 0 150px;
      font-size: 0.875rem;
      text-align: right;
      padding: 0 0.5rem;
    }
  }
}
</style>
