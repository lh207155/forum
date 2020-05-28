import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "../views/Main";
import Home from "../views/home/Home";
import Article from "../views/article/Article";
import Profile from "../views/profile/Profile";
import store from '../store/index'
import Overview from "../views/profile/rightMenuItem/Overview";
import Published from "../views/profile/rightMenuItem/Published";
import Collection from "../views/profile/rightMenuItem/Collection";
import Girls from "../views/girls/Girls";
import Games from "../views/games/Games";
import Essays from "../views/essays/Essays";
import Videos from "../views/videos/Videos";

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
        path: 'article/:id',
        component: Article,
        props:true
      },
      {
        path:'girls',
        component: Girls
      },
      {
        path:'games',
        component: Games
      },
      {
        path:'essays',
        component: Essays
      },
      {
        path:'videos',
        component: Videos,
      },
      {
        path: 'profile',
        component: Profile,
        props:true,
        meta: {
          requireLogin:true
        },
        children:[
          {
            path:'/',
            component:Overview,
            meta: {
              requireLogin:true
            },
          },
          {
            path:'overview',
            component:Overview,
            meta: {
              requireLogin:true
            },
          },
          {
            path:'published',
            component:Published,
            meta: {
              requireLogin:true
            },
          },
          {
            path:'collection',
            component:Collection,
            meta: {
              requireLogin:true
            },
          },
        ]
      },
    ]
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next)=>{
  if(to.meta.requireLogin&&!store.state.user){
    store.commit('toLogin')
    return next('/')
  }else{
    next()
  }
  if(to.path === '/profile/overview'){
    store.commit('switchProfileCard',1)
    next()
  }
  if(to.path === '/profile/published'){
    store.commit('switchProfileCard',2)
    next()
  }
  if(to.path === '/profile/collection'){
    store.commit('switchProfileCard',3)
    next()
  }
})
export default router
