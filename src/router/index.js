import Vue from 'vue'
import VueRouter from 'vue-router'
import Passport from "@/views/passport/Passport.vue"
import Login from "@/views/passport/Login"
import Register from "@/views/passport/Register"
import MyCall from "@/views/User/MyCall";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Passport',
    component: Passport
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/user/mycall',
    name: 'MyCall',
    component: MyCall
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
