import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket-io'

Vue.config.productionTip = false
Vue.use(VueSocketIO, 'http://localhost:3001')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
