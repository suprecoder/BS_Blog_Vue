import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Notfound from "../views/Notfound";
import axios from "axios"
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
    name: 'login',
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
    name: 'myblog',
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
    path: '/personal/:username',
    component: () => import('../views/MyPersonal.vue')
  },
  {
    name: 'edit',
    path: '/edit/:blogid',
    component: () => import('../views/Publish.vue')
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('../views/MyBlog.vue')
  },
  {
    path: "*", // 此处需特别注意置于最底部
    redirect: "/404"
  }

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  axios.get("islogin").then(response=>{
    console.log(response)
    if(response.status==200 && response.data.data!='reject' || to.name=='login'){
      next()
    }
    else{
      next({
        name: 'login'
      })
    }
  })
      .catch(error=>{
        next({
          name: 'login'
        })
        //this.$router.push("/login")
        console.log("status:"+error)})
  // //用你的方式获取登录的用户信息
  // let username = this.$cookies.get("username")
  // if(username || to.name === 'login'){
  //   //如果存在用户信息，或者进入的页面是登录页面，则直接进入
  //   next()
  // }else {
  //   //不存在用户信息则说明用户未登录，跳转到登录页面，带上当前的页面地址，登录完成后做回跳，
  //   //如未登录用户进入用户中心的页面地址，检测到未登录，
  //   //自动跳转到登录页面，并且带上用户中心的页面地址，登录完成后重新跳到个人中心页面。
  //   next({
  //     name: 'login',
  //     query: {
  //       redirect: to.path
  //     }
  //   })
  // }
})
export default router
