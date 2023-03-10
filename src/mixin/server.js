// 引入axios
import router from '../router'
import axios from 'axios'
import store from '../store/index'
// import localStorage from '../storage/localStorage'
import Cookie from 'js-cookie'

const service = axios.create({
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true,
  timeout: 20000 // 请求超时 20s
})

// 请求拦截器
service.interceptors.request.use((config) => {
  // 是否为当前的请求加上请求头 token
  if (Cookie.get('token')) {
    config.headers['Authorization'] = 'Bearer ' + Cookie.get('token')
  }
  return config
})

// 响应拦截器
service.interceptors.response.use((response) => {
  if (response.data.status === 401) {
    store.commit('resetVuex')
    Cookie.remove('token')
    router.push({ path: '/login' })
  }
  return response
})
export default service
