<template>
  <div class="address-type">
    <p>Type :</p>
    <select class="ds-form-select data-row-options">
      <option value="">시/도</option>
      <option value="">시/군/구</option>
      <option value="">(지번주소)읍/면/동</option>
      <option value="">(지번주소)리</option>
      <option value="">(지번주소)번지</option>
      <option value="">(도로명주소)도로명</option>
      <option value="">(도로명주소)빌딩번호</option>
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
