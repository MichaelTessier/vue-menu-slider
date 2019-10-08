import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/about',
          name: 'about',
          component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
          path: '/contact',
          name: 'contact',
          component: () => import(/* webpackChunkName: "about" */ './views/Contact.vue')
        },
        {
          path: '/page-a',
          name: 'page-a',
          component: () => import(/* webpackChunkName: "about" */ './views/PageA.vue')
        },
        {
          path: '/page-b',
          name: 'page-b',
          component: () => import(/* webpackChunkName: "about" */ './views/PageB.vue')
        }
      ]
    }
  ]
})
