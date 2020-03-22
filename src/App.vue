<template>
  <div id="app">
      <router-view/>
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
  </div>
</template>

<style>
  body,html{
    height: 100%;
    width: 100%;
  }
  #app {
    height: 100%;
    width: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

</style>
<script>
  import Nav from "./components/Nav";
  export default {
    components: {Nav}
  }
</script>