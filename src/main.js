import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

// import GoogleAuth from 'vue-google-auth'
// Vue.use(GoogleAuth, { client_id: '272883542308-4s1570et2p3gjhj9imf8s9g54p7kku7o.apps.googleusercontent.com' })
// Vue.googleAuth().load()
Vue.config.productionTip = false


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
