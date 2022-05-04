import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 解決vue-router 3.1.0版後的重複點極路由報錯bug
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
        path: '/login',
        component: () => import("@/pages/login/index").then(m => m.default || m)
      },
      {
        path: '/register',
        component: () => import("@/pages/register/index").then(m => m.default || m),
        name: '註冊'
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