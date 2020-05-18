import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "../views/Main";
import Home from "../views/home/Home";
import Article from "../views/article/Article";
import Profile from "../views/profile/Profile";
import store from '../store/index'

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
      },
      {
        path: '/profile',
        component: Profile,
        props:true,
        meta: {
          requireLogin:true
        }
      },
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next)=>{
  if(to.meta.requireLogin&&!store.state.user){
    return next('/')
  }else{
    next()
  }
})
export default router
