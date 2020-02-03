import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Notfound from "../views/Notfound";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'abc',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/back',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/myblog',
    component: () => import( '../views/MyBlog.vue')
  },
  {
    path: '/publish',
    name: 'publish',
    component: () => import(/* webpackChunkName: "about" */ '../views/Publish.vue')
  },
  {
    path: "/404",
    name: "notFound",
    component: Notfound
  },

  {
    name: 'showblog',
    path: '/showblog/:blogid',
    component: () => import('../views/ShowBlog.vue')
  },
  {
    name: 'mylike',
    path: '/mylike',
    component: () => import('../views/MyLike.vue')
  },
  {
    name: 'myfavourite',
    path: '/myfavourite',
    component: () => import('../views/MyFavourite.vue')
  },
  {
    name: 'myfollow',
    path: '/myfollow',
    component: () => import('../views/MyFollow.vue')
  },
  {
    name: 'personal',
    path: '/personal',
    component: () => import('../views/Personal.vue')
  },
  {
    name: 'edit',
    path: '/edit/:blogid',
    component: () => import('../views/Publish.vue')
  },
  {
    path: "*", // 此处需特别注意置于最底部
    redirect: "/404"
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
