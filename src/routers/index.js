import vueRouter from "vue-router";
import Vue from "vue";
import Home from "../pages/Home.vue";
import Reg from "../pages/Reg.vue";
import Cart from "../pages/Cart.vue";
import Login from "../pages/Login.vue";
Vue.use(vueRouter);
let router = new vueRouter({
    routes: [{
        name: 'home',
        path: '/home',
        component: Home
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
    }]
});

export default router;