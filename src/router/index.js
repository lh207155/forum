import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "../views/Main";
import Home from "../views/home/Home";
import Article from "../views/article/Article";

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    component:Main,
    children:[
      {
        path:'/',
        component:Home
      },
      {
        path: '/article/:id',
        component: Article,
        props:true
      }
    ]
  }
]
const router = new VueRouter({
  routes
})

export default router
