<template>
    <div>
        <!-- 상단 메뉴 -->
        <HeaderMenu />
        <router-view />
    </div>
</template>

<script>
import HeaderMenu from "./components/layout/HeaderMenu.vue";
export default {
    name: "App",
    components: {
        HeaderMenu
    }
};
</script>

<style>
@font-face {
    font-family: 'Nanum Barun Gothic';
    src: url('@/assets/fonts/NanumBarunGothic.ttf');
}

#app {
    font-family: 'Nanum Barun Gothic';
    text-align: center;
    box-sizing: border-box;
}
</style>