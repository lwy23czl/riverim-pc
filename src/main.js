import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/font/fonts.css'
import './style/element-ui-reset.scss'
import './assets/font_icon/iconfont.css'

Vue.use(ElementUI)
Vue.config.productionTip = false
const app = new Vue({
  router,
  store,
  render: (h) => h(App)
})
//创建全局websocket
app.$socket = null
app.$on('loginSuccess', (id) => {
  let ws = 'ws://localhost:8001/websocket/chat/' + id
  console.log(ws)
  app.$socket = new WebSocket(ws)
  app.$router.push('/')
})
app.$mount('#app')
