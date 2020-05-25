<template>
  <div id="app">
    <headerList></headerList>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import headerList from '@/components/headerList.vue'

export default {
  name:'app',
  components:{
    headerList,
  }
}
</script>

<style lang="scss">
  body{
    background-color: #cccccc;
  }


</style>
