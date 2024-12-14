<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <MainNavbar/>
  <router-view></router-view>
</template>

<script>
import MainNavbar from './components/Navbar/MainNavbar.vue'

export default {
  name: 'App',
  components: {
    MainNavbar,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
}
</style>
