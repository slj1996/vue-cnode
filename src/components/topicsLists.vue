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
    <div class="topicsFooter" :now="page">
      <span class="firstTag" @click="getPreTopicsPage">&lt;&lt;</span>
      <span class="pageTag" v-if="page>3">...</span>
      <span
        v-for="(it,idx) in pageList"
        :key="idx+1"
        class="pageTag"
        @click="getTopicsPage"
      >{{ it }}</span>
      <span class="pageTag">...</span>
      <span class="lastTag" @click="getNextTopicsPage">&gt;&gt;</span>
      <input class="input" type="text" @keyup.enter="finishEnter" />
      <button @click="goToPage">跳转</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "topicsLists",
  computed: mapState(["lists", "pageList", "count", "page", "isloading"]),
  methods: {
    getTopicsPage(e) {
      this.$store.commit("setTopicsPage", e.target.textContent);
      this.getData();
      window.scrollTo(0, 0);
    },
    getNextTopicsPage() {
      this.$store.commit("setNextTopicsPage");
      this.getData();
    },
    getPreTopicsPage() {
      this.$store.commit("setPreTopicsPage");
      this.getData();
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