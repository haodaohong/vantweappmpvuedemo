import Vue from 'vue'
import App from './App'
import api from './common/wx-request.js';
Vue.prototype.$http= api

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue( App )
app.$mount()
