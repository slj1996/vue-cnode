<template>
  <div>
    <div v-if="isloading" class="loading">
      <h1>loading...</h1>
    </div>
    <div v-else class="topicsContent" v-for="(list,idx) in lists" :key="idx">
      <div class="topics_title">
        <a class="ava" href=""><img class="ava-img" :src="list.author.avatar_url" alt="头像"></a>
        <span class="reply-count"><em>{{ list.reply_count }}</em>/{{ list.visit_count }}</span>
        <span class="topicTag" :class="[{top:(list.top==true),good:(list.good==true)}]">{{list | formatTopicType}}</span>
        <router-link :to="{name:'topicContent',params:{id:list.id}}" >
          <span class="title">{{ list.title }}</span>
        </router-link>
      </div>
      <div class="last-reply-time">
        <span>{{ list.last_reply_at | fromNow }}</span>
      </div>
    </div>
    <div class="topicsFooter" :now="this.states.page">
      <span class="firstTag" @click="getPreTopicsPage">&lt;&lt;</span>
      <span class="pageTag" v-if="states.page>3">...</span>
      <span v-for="(it,idx) in pageList" 
            :key="idx+1" class="pageTag"
            @click="getTopicsPage">{{ it }}</span>
      <span class="pageTag">...</span>
      <span class="lastTag" @click="getNextTopicsPage">&gt;&gt;</span>
      <input class="input" type="text">
      <button @click="setPage">跳转</button>
    </div>
  </div>
</template>

<script>
import api from '@/axios/api'

export default {
  name:'topicsLists',
  data(){
    return {
      lists:[],
      pageList:[1,2,3,4,5],
      states:{
        isloading:true,
        count:1,
        page:1
      },
      isloading:false,
      
    }
    
  },
  methods:{
    getTopicsPage(e){
      if(this.states.page!=e.target.textContent){
        this.states.page = e.target.textContent
        this.getData()
        if(e.target.textContent>3){
          let num = e.target.textContent - this.pageList[2]
          this.pageList = this.pageList.map(it => it+num)
        }
        if(e.target.textContent<4 && this.pageList[2]!=3){
          this.pageList=[1,2,3,4,5]
        }
      }
    },
    getTopicsList(e){
      console.log(e.target.textContent)
      this.headerTag.forEach(it=>it.className ='')
      e.target.classList.remove('headerTag')
      e.target.classList.add('action')
      if(e.target.textContent == "精华"){
        this.tab = "good"
        this.getData()
      } else if (e.target.textContent == "分享"){
        this.tab = "share"
        this.getData()
      } else if (e.target.textContent == "问答"){
        this.tab = "ask"
        this.getData()
      } else if (e.target.textContent == "招聘"){
        this.tab = "job"
        this.getData()
      } else if (e.target.textContent == "全部"){
        this.tab = ""
        this.getData()
      }
    },
    getNextTopicsPage(){
      this.states.page += 1 
      this.getData()
      
    },
    getPreTopicsPage(){
      if(this.states.page>1){
        this.states.page -= 1 
        this.getData()
        
      }
    },
    getData() {
      this.isloading=true
      this.$https.get(api.topics,{
        params:{
          page:this.states.page,
          limit:40,
          tab:this.$route.params.id
        }
      }).then(res => {
        this.lists=res.data.data
        window.scrollTo(0, 0)
        this.isloading=false
        })
        .catch(err => console.log(err))
    },
    setPage(e){
      let val = e.target.previousElementSibling.value
      this.states.page = val
      this.getData()
      e.target.previousElementSibling.value = ''
      if(this.states.page!=val){
      this.states.page = val
      this.getData()
      if(val>3){
        let num = val - this.pageList[2]
        this.pageList = this.pageList.map(it => it+num)
      }
      if(val<4 && this.pageList[2]!=3){
        this.pageList=[1,2,3,4,5]
      }
      
    }
    }
  },
  created(){
    this.getData()
  }
}
</script>

<style lang="scss">
  .loading{
    color: rgba($color: #80BD01, $alpha: .5);
    width: 100%;
    height: 200px;
  }
</style>