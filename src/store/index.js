import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginCardState:0
  },
  mutations: {
    toLogin(state){
      state.loginCardState = 1
    },
    toReg(state){
      state.loginCardState = 2
    },
    closeLoginCard(state){
      state.loginCardState = 0
    }
  },
  actions: {
  },
  modules: {
  }
})
