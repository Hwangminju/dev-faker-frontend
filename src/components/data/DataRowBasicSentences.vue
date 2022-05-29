<template>
  <div class="sentences">
    <div class="sentences-min">
      <p>Min :</p>
      <input type="text" class="ds-input" />
    </div>
    <div class="sentences-max">
      <p>Max :</p>
      <input type="text" class="ds-input" />
    </div>
    <div class="sentences-string">
      <label><input type="checkbox" />한글</label>
      <label><input type="checkbox" />대문자</label>
      <label><input type="checkbox" />소문자</label>
      <label><input type="checkbox" />특수문자</label>
      <label><input type="checkbox" />숫자</label>
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
.sentences {
  display: flex;

  .sentences-min {
    align-items: center;
    display: flex;
    flex: 1 1 25%;
    p {
      flex: 1 0 50px;
      font-size: 0.875rem;
      text-align: right;
      padding: 0 0.25rem;
    }
  }
  .sentences-max {
    align-items: center;
    display: flex;
    flex: 1 1 25%;
    p {
      flex: 1 0 50px;
      font-size: 0.875rem;
      text-align: right;
      padding: 0 0.25rem;
    }
  }
  .sentences-string {
    flex: 1 0 auto;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    padding-left: 1rem;
    label {
      display: flex;
      align-items: center;
      margin-right: 1rem;
      input {
        margin-right: 0.25rem;
      }
    }
  }
}
</style>
