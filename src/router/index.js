import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home/Home'
import DateList from '@/pages/DateList/DateList'
import VotePage from '@/pages/VotePage/VotePage'
import PEMILU from '@/pages/PEMILU/PEMILU'
import Rule from '@/pages/Rule/Rule'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/DateList',
      name: 'DateList',
      component: DateList
    },
    {
      path: '/VotePage',
      name: 'VotePage',
      component: VotePage
    },
    {
      path: '/PEMILU',
      name: 'PEMILU',
      component: PEMILU
    },
    {
      path: '/Rule',
      name: 'Rule',
      component: Rule
    },
  ]
})
