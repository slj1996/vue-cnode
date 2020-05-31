<template>
  <div>
    <div v-if="isloading" class="loading">
      <h1>loading...</h1>
    </div>
    <div v-else class="topicsContent" v-for="(list,idx) in lists" :key="idx">
      <div class="topics_title">
        <a class="ava" href>
          <img class="ava-img" :src="list.author.avatar_url" alt="头像" />
        </a>
        <span class="reply-count">
          <em>{{ list.reply_count }}</em>
          /{{ list.visit_count }}
        </span>
        <span
          class="topicTag"
          :class="[{top:(list.top==true),good:(list.good==true)}]"
        >{{list | formatTopicType}}</span>
        <router-link :to="{name:'topicContent',params:{id:list.id}}">
          <span class="title">{{ list.title }}</span>
        </router-link>
      </div>
      <div class="last-reply-time">
        <span>{{ list.last_reply_at | fromNow }}</span>
      </div>
    </div>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
      @prev-click="getTopicsPage"
      @current-change="getTopicsPage"
      @next-click="getTopicsPage">
    </el-pagination>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { Pagination } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

export default {
  name: "topicsLists",
  components:{'el-pagination':Pagination},
  computed: mapState(["lists", "pageList", "count", "page", "isloading"]),
  methods: {
    getTopicsPage(val) {
      this.$store.commit("setTopicsPage", val);
      this.getData();
      window.scrollTo(0, 0);
    },
    getData() {
      this.$store.dispatch("getData", this.$route.params.id);
      window.scrollTo(0, 0);
    },
    finishEnter(e) {
      e.target.nextElementSibling.click();
    },
    goToPage(e) {
      let val = e.target.previousElementSibling.value;
      this.$store.commit("setPage", val);
      this.getData();
      e.target.previousElementSibling.value = "";
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="scss">
.loading {
  color: rgba($color: #80bd01, $alpha: 0.5);
  width: 100%;
  height: 200px;
}
</style>