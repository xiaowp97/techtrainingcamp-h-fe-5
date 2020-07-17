// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import vant from "vant"
import 'vant/lib/index.css';
Vue.use(vant);
// import Divider from 'vant/lib/divider'
// import 'vant/lib/divider/style'
// Vue.use(Divider)
//
// import Button from 'vant/lib/button'
// import 'vant/lib/button/style'
// Vue.use(Button)
//
// import Overlay from 'vant/lib/overlay'
// import 'vant/lib/overlay/style'
// Vue.use(Overlay)
//
// import  Loading from 'vant/lib/loading'
// import 'vant/lib/loading/style'
// Vue.use(Loading)
//
// import Picker from 'vant/lib/picker'
// import 'vant/lib/picker/style'
// Vue.use(Picker)
//
// import Toast from "vant/lib/toast";
// import  'vant/lib/toast/style'
// Vue.use(Toast)

import store from './store'
import axios from 'axios'
Vue.config.productioyinTip = false;
// Vue.prototype.$axios = axios;
Vue.use(MintUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
