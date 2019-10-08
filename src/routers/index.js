import vueRouter from "vue-router";
import Vue from "vue";
import Home from "../pages/Home.vue";
import Reg from "../pages/Reg.vue";
import Cart from "../pages/Cart.vue";
import Login from "../pages/Login.vue";
import XQ from "../pages/XQ.vue";
import NotFound from "../pages/NotFound.vue";
Vue.use(vueRouter);
let router = new vueRouter({
    routes: [{
        name: 'home',
        path: '/home',
        component: Home
    },
    {
        path: '/',  //当浏览器地址为/home时，显示Home组件的内容
        redirect: '/home'
    },
    // 动态路由
    {
        name:'xiangqing',
        path:'/xiangqing/:id',
        component:XQ    
    },
    {
        name: 'cart',
        path: '/cart',
        component: Cart
    },
    {
        name: 'reg',
        path: '/reg',
        component: Reg
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        path: '/404',
        component: NotFound
    },
    {
        path: '*',
        redirect: '/404'
    }]
});

export default router;