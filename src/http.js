import axios from 'axios'
import store from './store/index'
const http = axios.create({
  baseURL:'http://localhost:3000/web/api'
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
  // 如果服务器通过客户端的token找到了对应的用户，并响应给客户端用户信息，说明已经登录过了
  if(res.data.currentUser){
    //先存入session
    store.commit('hasLogin',res.data.currentUser)
    sessionStorage.user = JSON.stringify(res.data.currentUser)
    //调用commit直接覆盖state的用户信息

    return res
  }
  return res
},(err)=>{
  // 处理注册重复用户错误
  // let temp = err.response.data.message

  // 将message处理后抛给后续处理
  // console.log(err.response.data.message)
  return Promise.reject(err)
})

export default http
