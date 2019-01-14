import Vue from 'vue'
import Router from 'vue-router'
import Signin from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'signin',
      component: Signin
    },
    {
      path: '/chat',
      name: 'chat',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Chat.vue')
    },
    {
      path: '/handshake',
      name: 'handshake',
      component: () => import('./views/HandShake.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./components/Signup.vue')
    }
  ]
})
