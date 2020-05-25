import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    lists:[],
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
    },{
      text:'测试',
      className: 'dev'
    },{
      text:'置顶',
      className: 'top'
    }],
    isloading:true,
    page:1
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
