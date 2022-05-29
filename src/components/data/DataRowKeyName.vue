<template>
  <div>
    <input type="text" class="ds-input" :placeholder="placeholder" />
  </div>
</template>
<script>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  props: {
    dataType: String,
  },
  setup(props) {
    const placeholder = ref(props.dataType);

    console.log(placeholder);

    return { placeholder };
  },
});
</script>

<style lang="scss" scoped></style>
