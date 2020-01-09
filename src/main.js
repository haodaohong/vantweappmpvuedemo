import Vue from 'vue'
import App from './App'
import api from './common/wx-request.js'
import global_msg from './global.js'
Vue.prototype.$http = api

Vue.config.productionTip = false
Vue.prototype.$global_msg = global_msg
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
