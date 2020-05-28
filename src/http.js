import axios from 'axios'
import store from './store/index'
const http = axios.create({
  // baseURL:'http://localhost:3000/web/api'
  // baseURL:'http://192.168.0.104:3000/web/api'
  baseURL: process.env.VUE_APP_API_URL || '/web/api'
})
http.interceptors.request.use((config)=>{
  // 每次请求接口的时候，有token就带上token，有的页面需要登录，但有的也不需要
  // 只要浏览器存在token，每次请求接口，就会根据token返回用户信息，就相当于登录了
  if(localStorage.token){
    // 如果有， 加上请求头
    config.headers.Authorization = 'Bearer '+localStorage.token
    return config
  }
  return config
},err=>{
  return Promise.reject(err)
})
http.interceptors.response.use((res)=>{
  // 这里的处理主要是为了，浏览器关闭后打开，在vuex获取不到已经被清除了的session的情况下，
  // 通过在请求头里附加的在localStorage里的token给服务器（任意请求），服务器都会返回用户信息
  // 这样即使没有登录，localStorage里只要存在token，也能直接变为登录状态
  // 如果服务器通过客户端的token找到了对应的用户，并响应给客户端用户信息，说明已经登录过了
  if(res.data.currentUser){
    //分别存如vueX和session
    store.commit('hasLogin',res.data.currentUser)
    //这里存入session前要先转成json
    sessionStorage.user = JSON.stringify(res.data.currentUser)
    //把res返回给axios请求
    return res
  }
  //如果没有用户信息也直接返回
  return res
},(err)=>{
  //继续包装成rejected状态的promise，可以让后续错误处理捕获
  return Promise.reject(err)
})

export default http
