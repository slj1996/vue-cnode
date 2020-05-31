import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/axios/api'
import axios from 'axios'

Vue.use(Vuex)
// TODO:
// The different between  `export const store`  and export default
// or `export { store }` and export default
// or import store from 'xxx' 
// or import { store } from 'xxx'

export const store = new Vuex.Store({
  state: {
    count: 1,
    page: 1,
    lists: [],
    pageList: [1, 2, 3, 4, 5],
    isloading: false,
    articleContent: {},
    replyLists: [],
    authorName: '',
    authorPoint: 0,
    authorContent: [],
    headerTag: [{
      text: '全部',
      className: 'all'
    }, {
      text: '精华',
      className: 'good'
    }, {
      text: '分享',
      className: 'share'
    }, {
      text: '问答',
      className: 'ask'
    }, {
      text: '招聘',
      className: 'job'
    }, {
      text: '测试',
      className: 'dev'
    }]
  },
  mutations: {
    setPage(state, page) {
      state.page = page
    },
    setData(state, res) {
      state.lists = res.data.data
    },
    setTopicsPage(state, content) {
      if (state.page != content) {
        state.page = content
      }
    },
    setUserInfo(state, res) {
      state.authorContent = res.data.data.recent_topics
      state.authorPoint = res.data.data.score
    },
    setArticleData(state, res) {
      state.articleContent = res.data.data
      state.replyLists = res.data.data.replies
      state.authorName = res.data.data.author.loginname
    },
    loadingState(state) {
      if (state.isloading) {
        state.isloading = false
      } else {
        state.isloading = true
      }
    },
  },
  actions: {
    getData({ commit }, id) {
      commit('loadingState')
      axios.get(api.topics, {
        params: {
          page: this.state.page,
          limit: 40,
          tab: id
        }
      }).then(res => {
        commit('setData', res)
        commit('loadingState')
      })
    },
    getArticleData({ commit }, id) {
      commit('loadingState')
      axios.get(`api/v1/topic/${id}`)
        .then(res => {
          commit('setArticleData', res)
          commit('loadingState')
        })
    },
    getUserInfo({ commit }) {
      axios.get(`api/v1/user/${this.state.authorName}`)
        .then(res => {
          commit('setUserInfo', res)
        })
    },
  },
  modules: {
  }
})
