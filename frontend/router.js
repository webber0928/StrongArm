import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: () => import("@/pages/index").then(m => m.default || m),
        name: '首頁'
      },
      {
        path: '/users',
        component: () => import("@/pages/user/index").then(m => m.default || m)
      },
      {
        path: '/404',
        name: '404',
        component:  () => import("@/pages/systemPage/404").then(m => m.default || m),
      },
      {
        path: '*',
        // name: '404 not Found',
        redirect: '/404'
      }
    ]
  })
}