<template>
  <div class="ChooseView">
    <div class="title">Select database</div>
    <div class="btns">
      <button @click="linkClick('sql1')">SQL1</button>
      <button @click="linkClick('sql2')">SQL2</button>
    </div>

  </div>
</template>

<script>
export default {
  name: "ChooseView",
  data() {
    return{

    }
  },
  methods: {
    linkClick(type) {
      this.$router.push({
        path: './home',
        query: {
          type: type
        }
      })
    }
  }
}
</script>

<style scoped>
.ChooseView{
  width: 100%;
  /*height: 100vh;*/
}
.title{
  width: 100%;
  text-align: center;
  font-family: 'Teko', cursive;
  font-size: 6vw;
  margin-top: 4vw;
}
.btns{
  width: 100%;
  text-align: center;
  margin-top: 4vw;
}
.btns>button{
  margin: 0 20px;
  width: 200px;
  font-family: 'Hanalei Fill', cursive;
  font-size: 3vw;
  background: white;
  border-radius: 5px;
}
</style>
