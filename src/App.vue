<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import Vue from "vue"
  import {setCookie, delCookie, getCookie} from "./util/util"

  export default {
    name: 'App',
    beforeMount() {
      Vue.prototype.$cookieStore = {
        setCookie,
        getCookie,
        delCookie
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 10px;
  }
</style>
