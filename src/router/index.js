import Vue from 'vue'
import VueRouter from 'vue-router'
import Passport from "@/views/passport/Passport.vue"
import Login from "@/views/passport/Login"
import Register from "@/views/passport/Register"
import Home from "@/views/user/Home"
import Find from "@/views/user/Find"
import Call from "@/views/user/Call"
import Response from "@/views/user/Response"
import Report from "@/views/user/Report"

Vue.use(VueRouter)

const routes = [
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
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/find',
        name: 'Find',
        component: Find
    },
    {
        path: '/call',
        name: 'Call',
        component: Call
    },
    {
        path: '/response',
        name: 'Response',
        component: Response
    },
    {
        path: '/report',
        name: 'Report',
        component: Report
    },
    {
        path: '*',
        name: 'Passport',
        component: Passport
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
