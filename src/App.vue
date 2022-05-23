<template>
  <div>
    <!-- 상단 메뉴 -->
    <HeaderMenu />
    <router-view />
  </div>
</template>
<script>
import { defineComponent, defineAsyncComponent } from 'vue';

export default defineComponent({
  components: {
    HeaderMenu: defineAsyncComponent(() => import('./components/layout/HeaderMenu.vue')),
  },
  setup() {},
});
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'Nanum Barun Gothic';
  src: url('@/assets/fonts/NanumBarunGothic.ttf');
}

#app {
  font-family: 'Nanum Barun Gothic';
  text-align: center;
  box-sizing: border-box;
}

@import '@/assets/scss/forms';
</style>
