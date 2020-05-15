import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/scss/index.scss'
// import './assets/fonts/iconfont.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import http from './http'
Vue.prototype.$http = http
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)

Vue.config.productionTip = false
Vue.mixin({
  methods: {
    dateHandle(date){
      const timeDiff = (new Date()).getTime() - (new Date(date)).getTime()
      let t = 0
      if((t =Math.floor( timeDiff/(365*24*60*60*1000)))>0){
        date = t+'年前'
      }else if((t = Math.floor( timeDiff/(30*24*60*60*1000)))>0){
        date = t+'个月前'
      }else if((t =Math.floor( timeDiff/(24*60*60*1000)))>0){
        date = t+'天前'
      }else if((t =Math.floor( timeDiff/(60*60*1000)))>0){
        date = t+'小时前'
      }else if((t =Math.floor( timeDiff/(60*1000)))>0){
        date = t+'分钟前'
      }else{
        date = '1分钟前'
      }
      return date
    },
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
