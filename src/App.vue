<template>
    <div>
        <HeaderMenu />
        <button @click="handleClick">Open LoginModal</button>
        <p>{{ result }}</p>
        <router-view />
        <LoginModal ref="modal" :content="modalContent" />
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