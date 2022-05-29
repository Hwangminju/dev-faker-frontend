<template>
  <div class="full-address">
    <div class="address-type">
      <p>주소타입 :</p>
      <select class="ds-form-select data-row-options">
        <option value="">도로명주소</option>
        <option value="">지번명주소</option>
      </select>
    </div>
    <div class="post-code">
      <label><input type="checkbox" />우편번호</label>
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
.full-address {
  display: flex;

  .address-type {
    align-items: center;
    display: flex;
    flex: 1 0 30%;
    p {
      flex: 1 0 80px;
      font-size: 0.875rem;
      text-align: right;
      padding: 0 0.25rem;
    }
    select {
      flex: 1 0 150px;
    }
  }
  .post-code {
    flex: 1 0 70%;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    padding-left: 3rem;
    label {
      display: flex;
      align-items: center;
      margin-right: 1rem;
      input {
        margin-right: 0.25rem;
      }
    }
  }
  .data-row-options {
    appearance: auto !important;
  }
}
</style>
