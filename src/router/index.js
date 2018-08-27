import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/index.vue'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        component: (resolve) => {
          require(['@/views/dashboard/index.vue'], resolve)
        },
        meta: {title: '仪表板', icon: 'fa fa-dashboard'}
      },
      {
        path: '/content',
        name: 'content',
        component: (resolve) => {
          require(['@/views/content/index.vue'], resolve)
        },
        meta: {title: '内容管理', icon: 'fa fa-list'}
      },
      {
        path: '/release',
        name: 'release',
        component: (resolve) => {
          require(['@/views/release/index.vue'], resolve)
        },
        meta: {title: '内容发布', icon: 'fa fa-send'}
      },
      {
        path: '/columns',
        name: 'columns',
        component: (resolve) => {
          require(['@/views/columns/index.vue'], resolve)
        },
        meta: {title: '栏目管理', icon: 'fa fa-columns'}
      },
      {
        path: '/comment',
        name: 'comment',
        component: (resolve) => {
          require(['@/views/comment/index.vue'], resolve)
        },
        meta: {title: '评论管理', icon: 'fa fa-comment'}
      }
      // {
      //   path: 'test',
      //   name: 'test',
      //   component: (resolve) => {
      //     require(['@/views/test/index.vue'], resolve)
      //   },
      //   meta: {title: '测试主题', icon: 'fa fa-comment'},
      //   children: [
      //     {
      //       path: '/test/ce',
      //       name: 'ce',
      //       // redirect: 'ce',
      //       component: (resolve) => {
      //         require(['@/views/test/ce.vue'], resolve)
      //       },
      //       meta: {title: '测试', icon: 'fa fa-comment'}
      //     }
      //   ]
      // }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: (resolve) => {
      require(['@/views/login/index.vue'], resolve)
    },
    hidden: true
  }
]

export default new Router({
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
