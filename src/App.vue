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
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    box-sizing: border-box;
}
</style>