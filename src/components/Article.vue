<template>
  <div class="wrap">
    <div class="content-replies">
      <div class="content-top">
        <div class="content-title">
          <div class="title-header">
            <div>
              <span :class="[{title_top:(articleContent.top==true),title_good:(articleContent.good==true)}]">{{ articleContent | formatTopicType }}</span>
              <span class="thisTitle">{{ articleContent.title }}</span>
            </div>
            <span class="intro">
              发布于{{ articleContent.create_at | fromNow}}
              •作者{{ authorName }}
              •{{ articleContent.visit_count }}次浏览
              •最后一次编辑是{{ articleContent.last_reply_at | fromNow }}
              •来自 {{articleContent | formatFrom}}
            </span>
          </div>
        </div>
        <div class="content">
          <div class="htmlContent" v-html="articleContent.content"></div>
        </div>
      </div>
      <div class="replies">
        <div class="replies-top">
          <span class="replies-count">{{ articleContent.reply_count }} 回复</span>
        </div>
        <div class="replies-content">
          <div class="reply-item" v-for="(item,idx) in replyLists" :key="idx">
            <div class="replyer">
              <img class="item-ava" :src="item.author['avatar_url']" alt="头像">
              <span class="replyer-name">
                {{ item.author.loginname }} <em>{{idx+1}}楼•{{item.create_at | fromNow}}</em>
              </span>
              <span>{{ item.id == articleContent.author_id ? "作者" : "" }}</span>
            </div>
            <div class="htmlContent" v-html="item.content"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="ava-box">
      <div class="ava-box-header">
        <span>作者</span>
      </div>
      <div class="ava-box-content">
        <img :src="articleContent.author['avatar_url']" alt="头像" @click="getUserInfo">
        <div>
          <span class="sorce">积分：<em>{{ authorPoint }}</em></span>
        </div>
      </div>
      <div class="another">
        <em>其他帖子：</em>
        <div v-for="(it,idx) in authorContent" :key="idx" style="margin-top:5px;"> 
          <span>{{ idx+1 }}. {{ it.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name:'Article',
  data(){
    return {
      articleContent:{},
      replyLists:[],
      authorName:'',
      authorPoint:0,
      authorContent:[]
      }
  },
  methods:{
    getdata(){
      console.log(this.articleContent)
      console.log(this.replyLists)
    },
    getUserInfo(){
      this.$https.get(`api/v1/user/${this.authorName}`)
                  .then(res=>{
                  this.authorContent = res.data.data.recent_topics
                  this.authorPoint = res.data.data.score
                })
    }
  },
  created(){
    this.$https.get(`api/v1/topic/${this.$route.params.id}`)
                .then(res=>{
                  this.articleContent = res.data.data
                  this.replyLists = res.data.data.replies
                  this.authorName = res.data.data.author.loginname
                })
  },
  beforeUpdate(){
    this.getUserInfo()
  }
}
</script>

<style lang="scss">
  .wrap{
    width: 90%;
    max-width: 1440px;
    min-width: 960px;
    margin: 10px auto;
    background-color: #E1E1E1;
    display: flex;
  }
  .content-replies{
    width: 68%;
    
  }
  .wrap div{
    border-radius: 3px;
  }
  .thisTitle{
    font-size: 22px;
    font-weight: bold;
  }
  .title_good,.title_top{
    color: white;
    background-color: #80BD01;
    display: inline-block;
    width: 32px;
    height: 18px;
    font-size: 12px;
    text-align: center;
    border-radius: 3px;
    margin-right: 5px;
  }
  .title-header{
    padding: 10px;
    div{
      margin: 8px 0;
    }
  }
  .intro{
    font-size: 12px;
    color: #838383;
  }
  .content{
    border-top-style:solid;
    border-top-width:1px;
    border-top-color:rgba($color: #838383, $alpha: 0.5);
    padding: 10px;
  }
  .content a{
    font-size: 14px;
    color: #0088cc;
    text-decoration: none;
  }
  .content a:hover{
      text-decoration: underline;
    }
  .replies,.content-top{
    background-color: #F6F6F6;
    box-shadow: 0px 0px 1px 1px rgba($color: #888888, $alpha: .2);
  }
  .replies-top{
    padding: 10px;
    height: 20px;
    margin-top: 10px;
    .replies-count{
      font-size: 14px;
      color: #444444;
    }
  }
  .item-ava{
    width: 30px;
    height: 30px;
  }
  .reply-item{
    padding: 10px;
  }
  .reply-item{
    border-top-style:solid;
    border-top-width:1px;
    border-top-color:rgba($color: #E1E1E1, $alpha: 0.8);
  }
  .replyer-name{
    font-size: 12px;
    color: #838383;
    margin-left: 5px;
    em{
      color: #0088cc;
    }
  }

  .htmlContent img{
    max-width: 100%;
  }
  .ava-box{
    margin-left: 10px;
    height: 700px;
    width: calc(32% - 30px);
    background-color: #F6F6F6;
    img{
      width: 48px;
      height: 48px;
    }
  }
  .ava-box-header,.ava-box-content{
    padding: 10px;
  }
  .ava-box-header{
    background-color: rgba($color: #c2bdbd, $alpha: .5);
    color: #51585C;
    font-size: 14px;
    border: 1px solid rgba($color: #838383, $alpha: 0.5);
  }
  .sorce{
    font-size: 14px;
    color: #888888;
  }
  .another{
    padding: 10px;
    border-top-style:solid;
    border-top-width:1px;
    border-top-color:rgba($color: #838383, $alpha: 0.5);
    margin-top: 10px;
    color: #888888;
    font-size: 14px;
  }
  .another span:hover{
    color: #80BD01;
    cursor: pointer;
  }
</style>