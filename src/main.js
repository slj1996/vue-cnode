import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'
import axios from 'axios'
import moment from 'moment'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' 

moment.locale('zh-cn');



// import service from '@/axios/service'
axios.defaults.baseURL = 'https://cnodejs.org';
Vue.prototype.$https = axios
Vue.config.productionTip = false

router.beforeEach((to,from,next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

Vue.filter('fromNow', date => {
	return moment(date).fromNow();
});

Vue.filter('formatTopicType', function (list) {
  if (list.good == true) {
    return '精华'
  } else if (list.top == true) {
    return '置顶'
  } else if (list.tab == 'ask') {
    return '问答'
  } else if (list.tab == 'share') {
    return '分享'
  } else if (list.tab == 'job') {
    return '招聘'
  } else if (list.tab == 'dev') {
    return '测试'
  }
})

Vue.filter('formatFrom', function (list) {
  if (list.tab == 'ask') {
    return '问答'
  } else if (list.tab == 'share') {
    return '分享'
  }else if (list.tab == 'job') {
    return '招聘'
  }else if (list.tab == 'dev') {
    return '客户端测试'
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
