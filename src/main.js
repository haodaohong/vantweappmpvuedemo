import Vue from 'vue'
import App from './App'
import api from './common/wx-request.js'
import globalData from './global.js'
Vue.prototype.$http = api

Vue.config.productionTip = false
Vue.prototype.$globalData = globalData
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
