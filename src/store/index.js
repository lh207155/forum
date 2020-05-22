import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //登录卡默认隐藏，1登录，2注册，0关闭
    loginCardState:0,
    //user信息在axios拦截器拦截了res之后首先存进session，然后state初始化从session里拿，防止刷新页面状态丢失
    //先判断有没有，不然报Unexpected end of JSON input
    user: sessionStorage.user?JSON.parse(sessionStorage.user):'',
    profileCardIndex:1
  },
  mutations: {
    toLogin(state){
      //切换登录卡状态，1=登陆状态
      state.loginCardState = 1
    },
    toReg(state){
      //切换登录卡状态，2=注册状态
      state.loginCardState = 2
    },
    toForget(state){
      state.loginCardState = 3
    },
    closeLoginCard(state){
      //切换登录卡状态，0=关闭登录卡
      state.loginCardState = 0
    },
    switchProfileCard(state,index){
      state.profileCardIndex = index
    },
    hasLogin(state,user){
      //登录成功后，把用户信息存入state
      state.user = Object.assign({},state.user,user)
      //也存入session
      sessionStorage.user = JSON.stringify(user)
    },
    //用户上传头像，这里传上来的url实际上已经存入数据库了，不用重新获取用户所有数据
    avatarUpload(state,url){
      state.user.avatar = url
      const s = JSON.parse(sessionStorage.user)
      s.avatar = url
      sessionStorage.user = JSON.stringify(s)

    },
    exit(state){
      //退出，清空所有存储器的数据
      state.user = ''
      localStorage.clear()
      sessionStorage.clear()
    }
  },
  actions: {
  },
  modules: {
  }
})
