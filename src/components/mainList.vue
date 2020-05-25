<template>
  <main>
    <div id="topicsList">
      <div id="topicsHeader">
        <router-link  class="headerTag" v-for="(item,idx) in headerTag" :key="idx" :to="{name:'list',params:{id:item.className}}">
          {{item.text}}</router-link>
      </div>
      <router-view :key="$route.fullPath"></router-view>
    </div>

  </main>
</template>

<script>

export default {
  props:['val'],
  name:'mainList',
  data(){
    return {
      headerTag:[{
        text:'全部',
        className:'all'
      },{
        text:'精华',
        className: 'good'
      },{
        text:'分享',
        className: 'share'
      },{
        text:'问答',
        className: 'ask'
      },{
        text:'招聘',
        className: 'job'
      }],
    }
    
  },
}
</script>

<style lang="scss">
  main{
    width: 90%;
    max-width: 1440px;
    min-width: 960px;
    margin: 10px auto;
  }
  
  
  #topicsList{
    width: 100%;
    #topicsHeader{
      height: 40px;
      background-color: #F6F6F6;
      display: flex;
      align-items: center;
      .headerTag{
        display: inline-block;
        width: 28px;
        height: 16px;
        font-size: 14px;
        margin: 0 10px;
        color: #80bd01;
        cursor:pointer;
        text-decoration: none;
      } & .router-link-active{
            color: #F6F6F6;
            height: 18px;
            background-color: #80bd01;
            border-radius: 2px;
            display: inline-block;
            width: 28px;
            font-size: 14px;
            margin: 0 10px;
            cursor:pointer;
            line-height: 18px;
          }
    }
  }
  .topicsContent{
    width: calc(100% - 20px);
    height: 30px;
    padding: 10px;
    background-color: #F6F6F6;
    em{
      color: #9e78c0;
      font-size: 14px;
    } 
  }
  .topics_title{
    height: 30px;
    float: left;
    display: flex;
    align-items: center;
    .reply-count{
      font-size: 12px;
      width: 70px;
      display: inline-block;
      text-align: center;
    }
  }
  .title{
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    font-size: 16px;
    color: #888888;
    margin-left: 5px;
  }
  .title:hover{
      text-decoration: underline;
    }
  .last-reply-time{
    height: 30px;
    float: right;
    z-index: 5;
    span{
      font-size: 12px;
    }
  }
  .ava{
    font-size: 0;

  }
  .ava-img{
    width: 30px;
    height: 30px;
    border-radius: 3px;
  }
  .pageTag,.firstTag,.lastTag{
    width: 32px;
    height: 30px;
    display: inline-block;
    text-align: center;
    line-height: 30px;
  }
  .topicsFooter{
    width: calc(100% - 20px);
    height: 30px;
    padding: 10px;
    background-color: #F6F6F6;
    span{
      font-size: 12px;
      border: 1px solid #888888;
      color: black;
    } & span:hover{
      background-color: #888888;
    }
  }
  .firstTag{
    border-radius: 3px 0 0 3px;
  }
  .lastTag{
    border-radius: 0 3px 3px 0;
  }
  .topicTag{
    display: inline-block;
    width: 32px;
    height: 18px;
    color: gray;
    font-size: 12px;
    text-align: center;
    background-color: rgba($color: #888888, $alpha: .5);
    border-radius: 3px;
  }
  .good,.top{
    color: white;
    background-color: #80BD01;
  }
  .input{
    width: 30px;
    margin-left: 10px;
  }
  button{
    margin-left: 5px;
  }
  
</style>