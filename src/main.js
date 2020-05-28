import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/index.scss'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
// 日期格式化插件
import './plugins/dateFormat'
import http from './http'
Vue.prototype.$http = http
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

Vue.config.productionTip = false
Vue.mixin({
  data(){
    //各种正则
    return {
      usernameRegExp : /^[0-9a-zA-Z\u4e00-\u9fa5]{1,14}$/,
      emailRegExp : /^[0-9a-zA-Z]+([.-_]*[0-9a-zA-Z]+)*@([0-9a-zA-Z]+[-_]*[0-9a-zA-Z]+.)+[0-9a-zA-Z]{2,6}$/,
      passwordRegExp : /^[0-9a-zA-Z\w]{6,16}$/
    }
  },
  methods: {
    //返回顶部
    toTop(){
      const size = document.documentElement.scrollTop/50
      const id = setInterval(()=>{
        document.documentElement.scrollTop = document.documentElement.scrollTop -= size
        if(document.documentElement.scrollTop<=0){
          clearInterval(id)
        }
      },1)

    },
    //时间格式处理，格式化为：**时间前
    dateHandle(date){
      const timeDiff = (new Date()).getTime() - (new Date(date)).getTime()
      let t = 0
      if((t =Math.floor( timeDiff/(365*24*60*60*1000)))>0){
        date = t+'年'
      }else if((t = Math.floor( timeDiff/(30*24*60*60*1000)))>0){
        date = t+'个月'
      }else if((t =Math.floor( timeDiff/(24*60*60*1000)))>0){
        date = t+'天'
      }else if((t =Math.floor( timeDiff/(60*60*1000)))>0){
        date = t+'小时'
      }else if((t =Math.floor( timeDiff/(60*1000)))>0){
        date = t+'分钟'
      }else{
        date = '1分钟'
      }
      return date
    },
    // 查询用户表，检查用户名或者邮箱有没有重复 option：String=('username'/'email')
    // return Promise 交给后续处理
    // 使用常规函数，这里this指的是TheRegisterLoginCard.vue组件里data的model
    async verify(option){
      return await this.$http.get(`/${option}/${this.model[option]}`)
    }
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
