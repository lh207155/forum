import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "../views/Main";
import Index from "../views/home/Index";

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:Main,
    children:[
      {
        path:'/',
        component:Index
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
