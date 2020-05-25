import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      redirect:'/tab/all'
    },
    {
      path: '/tab',
      component: () => import('../components/mainList.vue'),
      children:[
        {
          name:'list',
          path: '/tab/:id',
          component: () => import('../components/topicsLists.vue')
        },
      ]
    },
    {
      path: '/topics/:id',
      name: 'topicContent',
      component: () => import('../components/Article.vue')
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
