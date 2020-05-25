<template>
  <header>
    <div class="header">
      <div class="header-box">
        <div class="header-box-left">
          <img src="https://static2.cnodejs.org/public/images/cnodejs_light.svg" alt="logo">
        </div>
        <div class="header-box-right">
          <router-link class="Tag" to="/tab/all">首页</router-link>
          <a href="">登陆</a>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name:"headerList",
}
</script>

<style lang="scss">
  body{
    margin: 0;
    padding: 0;
  }
  .header{
    width: 100%;
    min-width: 960px;
    height: 50px;
    background-color: #444;
    line-height: 50px;
    
    position: relative;
  }
  .header-box{
    width: 90%;
    margin: 0 auto;
  }
  .header-box-left{
    width: 160px;
    height: 40px;
    margin-top: 5px;
    float: left;
    img{
      width: 120px;
    }
  }
  .header-box-right{
    float: right;
    .Tag{
      width: 40px;
      height: 40px;
      display: inline-block;
      color: #CCCCCC;
      line-height: 40px;
      margin-right: 5px;
    }
  }
</style>