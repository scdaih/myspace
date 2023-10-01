<template>
  <NavBar />
  <router-view :key="$route.fullPath" /><!--强制刷新-->
</template>


<script>
import NavBar from './components/NavBar.vue';
export default {
  name: "App",
  components: {//将用到的组件放到components里面
    NavBar
  }
}

</script>

<style></style>
