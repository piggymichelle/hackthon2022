<template>
  <div CLASS="app-con">
<!--    <NavBar></NavBar>-->
    <transition name="fade-transform" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
// import NavBar from "@/layout/nav/Navbar";
export default {
  name: "layoutIndex",
  components:{
    // NavBar
  }
}
</script>

<style scoped>
@import "~@/styles/style.css";
</style>
