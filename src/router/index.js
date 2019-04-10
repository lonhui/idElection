import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
   },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ()=> import("@/pages/Home/Home")
    },
    {
      path: '/DateList',
      name: 'DateList',
      component: ()=> import("@/pages/DateList/DateList")
    },
    {
      path: '/VotePage',
      name: 'VotePage',
      component: ()=> import("@/pages/VotePage/VotePage")
    },
    {
      path: '/PEMILU',
      name: 'PEMILU',
      component: ()=> import("@/pages/PEMILU/PEMILU")
    },
    {
      path: '/Rule',
      name: 'Rule',
      component: ()=> import("@/pages/Rule/Rule")
    },
  ]
})
