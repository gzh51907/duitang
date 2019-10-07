import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import router from "./routers";
import Element from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element);

import axios from 'axios';
Vue.prototype.$axios = axios;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
