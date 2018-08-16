import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'dashboard',
      component: (resolve) => {
        require(['@/views/dashboard/index.vue'], resolve)
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: (resolve) => {
        require(['@/views/dashboard/index.vue'], resolve)
      }
    },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => {
        require(['@/views/login/index.vue'], resolve)
      }
    }
  ]
})
