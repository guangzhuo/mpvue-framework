import Vue from 'vue'
import App from './App'
import fly from './http/fly'
import store from './store'
import MpvueRouterPatch from 'mpvue-router-patch'

Vue.config.productionTip = false
Vue.prototype.$fly = fly
Vue.prototype.$store = store
Vue.use(MpvueRouterPatch)
const app = new Vue(App)

App.mpType = 'app'

app.$mount()
