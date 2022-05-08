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
        name: '首頁',
        component: () => import("@/pages/example/index").then(m => m.default || m),
        // component: () => import("@/pages/home/index").then(m => m.default || m),
      },
      {
        path: '/about',
        name: '關於我',
        component: () => import("@/pages/example/topics").then(m => m.default || m),
        // component: () => import("@/pages/home/index").then(m => m.default || m),
      },
      {
        path: '/basic-components',
        name: '關於我',
        component: () => import("@/pages/example/basic-components").then(m => m.default || m),
        // component: () => import("@/pages/home/index").then(m => m.default || m),
      },
      {
        path: '/work',
        name: '關於我',
        component: () => import("@/pages/example/coming-soon").then(m => m.default || m),
        // component: () => import("@/pages/home/index").then(m => m.default || m),
      },
      // {
      //   path: '/player/:id',
      //   name: '球員資料',
      //   component: () => import("@/pages/player/_id").then(m => m.default || m)
      // },
      // {
      //   path: '/team',
      //   name: '球隊介紹',
      //   component: () => import("@/pages/teamInfo/index").then(m => m.default || m)
      // },
      // {
      //   path: '/team/pref',
      //   name: '球員數據',
      //   component: () => import("@/pages/teamPref/index").then(m => m.default || m),
      // },
      // {
      //   path: '/404',
      //   name: '404',
      //   component:  () => import("@/pages/systemPage/404").then(m => m.default || m),
      // },
      // {
      //   path: '*',
      //   name: '404 not Found',
      //   redirect: '/404'
      // }
    ]
  })
}