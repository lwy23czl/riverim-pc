import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import login from '../views/login/login'
import register from '../views/login/register'
import home from '../views/home/index'
import chat from '../views/chat'
import friends from '../views/friends'

Vue.use(VueRouter)

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: '/',
    name: 'home',
    component: home,
    redirect: { name: 'chat' },
    children: [
      {
        path: '/chat',
        component: chat,
        name: 'chat'
      },
      {
        path: '/friends',
        component: friends,
        name: 'friends'
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  }
]

const router = new VueRouter({
  routes
})

export default router
