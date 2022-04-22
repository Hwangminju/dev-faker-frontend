<template>
    <div>
        <p>Dev Faker</p>
        <img alt="Vue logo" src="./assets/logo.png">
        <router-view></router-view>
  </div>
  
</template>

<script>
// import ProjectList from './views/ProjectList.vue'

export default {
    name: 'App',
    components: {
        // ProjectList
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
