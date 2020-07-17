// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import vant from "vant"
import 'vant/lib/index.css';
import 'mint-ui/lib/style.css'
import store from './store'
import axios from 'axios'
import 'lib-flexible'
Vue.config.productionTip = false;
// Vue.prototype.$axios = axios;
Vue.use(MintUI);
Vue.use(vant);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
