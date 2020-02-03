import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCookies from 'vue-cookies'
Vue.use(scroll)
var axios = require('axios')
Vue.use(VueCookies)
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:8081/api'
axios.defaults.withCredentials=true
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
