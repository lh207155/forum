<template>
  <div class="header bg-white mb-3">
    <div class="header-banner bg-pink">
      <ul class="header-banner-menu flex jc-s ai-c text-white">
        <li class="header-banner-item">公告</li>
        <li class="header-banner-item"><i class="iconfont icon-huiyuan"></i>会员</li>
        <li class="header-banner-item">永久地址</li>
        <li class="header-banner-item"><i class="iconfont icon-qiandao"></i>签到</li>
        <li class="header-banner-item">红包</li>
      </ul>
    </div>
    <div class="header-nav">
      <div class="header-nav-wrapper flex ai-c">
        <router-link to="/" class="header-nav-logo">
            <img src="../../assets/imgs/logo.png">
        </router-link>
        <ul class="header-nav-menu flex flex-1 ai-c text-purple3 ml-5">
          <router-link tag="li" to="/girls" class="header-nav-item" :class="{active:$route.path==='/girls'}">小姐姐</router-link>
          <router-link tag="li" to="/essays" class="header-nav-item" :class="{active:$route.path==='/essays'}">文章</router-link>
          <router-link tag="li" to="/games" class="header-nav-item" :class="{active:$route.path==='/games'}">玩什么</router-link>
          <router-link tag="li" to="/videos" class="header-nav-item" :class="{active:$route.path==='/videos'}">我要看</router-link>
        </ul>
        <div v-if="userInfo" class="header-nav-avatar">
          <img :src="userInfo.avatar" ref="img" @click="popUserNavOpened">
          <transition name="fade">
            <div ref="popUserNav" name="fade" tag="div" v-show="popUserNav" class="popUserNav flex fd-c card bg-white text-blackOpacity">
              <div class="private py-3 px-3 borderBottom flex" @click="toProfile">
                <i class="iconfont icon-profile1 text-blue"></i>
                <div class="userInfo flex fd-c ml-2">
                  <span>{{userInfo.username}}</span>
                  <span class="text-grey2 mt-2">个人中心</span>
                </div>
              </div>
              <div class="post px-3 py-3 flex">
                <i class="iconfont icon-xie text-blue"></i>
                <div class="flex fd-c ml-2">
                  <span>投稿</span>
                  <span class="text-grey2 mt-2">向站点投稿</span>
                </div>
              </div>
              <div class="exit px-3 py-3 flex" @click="exit">
                <i class="iconfont icon-exit text-blue"></i>
                <div class="flex fd-c ml-2">
                  <span>退出</span>
                  <span class="text-grey2 mt-2">退出登录</span>
                </div>
              </div>
            </div>
          </transition>
          
        </div>
        <div v-else class="noLogin">
          <button class="loginBtn btn bg-white text-blue mr-3 px-3" @click="toLogin">登录</button>
          <button class="registerBtn btn bg-blue text-white px-3" @click="toReg">快速注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FHeader",
    data(){
      return {
        popUserNav:false
      }
    },
    methods:{
      // 点击注册
      toLogin(){
        this.$store.commit('toLogin')
      },
      // 点击登录
      toReg(){
        this.$store.commit('toReg')
      },
      // 个人信息导航卡点击事件处理函数
      clickEventHandler(e){
        //通过ref获取到DOM，contains函数判断是否包含触发点击事件的DOM
          if(!this.$refs.popUserNav.contains(e.target)&&!this.$refs.img.contains(e.target)){
            //关闭卡片
            this.popUserNav=false
          }
      },
      //打开个人信息导航卡，并监听点击事件
      popUserNavOpened(){
        this.popUserNav=!this.popUserNav
        document.addEventListener('click',this.clickEventHandler,false)
        
      },
      toProfile(){
        document.removeEventListener('click',this.clickEventHandler,false)
        this.popUserNav=false
        this.$router.push('/profile/overview')
      },
      //退出登录
      exit(){
        //移除点击事件
        document.removeEventListener('click',this.clickEventHandler,false)
        this.popUserNav=false
        //设置vuex状态
        this.$store.commit('exit')
        //重载页面，让路由守卫判断是否需要登录
        location.reload()
      }
    },
    computed:{
      //获取store中的用户信息
      userInfo(){
        return this.$store.state.user
      }
    },
    created() {
    
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/scss/variables";
  .header{
    box-shadow: 0px 0.417rem 3.333rem 0px rgba(17, 58, 93, 0.1);
    z-index: 100;
    .header-banner{
      height: 3.167rem;
      width: 100vw;
      background-image: url("../../assets/imgs/bg-top.png");
      .header-banner-menu{
        list-style: none;
        width: 91.667rem;
        max-width: 100%;
        height: 100%;
        margin: 0 auto;
        .header-banner-item{
          cursor: pointer;
          opacity: .8;
          transition: opacity .3s ease-out;
          margin-right: 1.167rem;
          &:hover{
            opacity: 1;
          }
        }
      }
    }
    .header-nav{
      height: 4.833rem;
      width: 100vw;
      .header-nav-wrapper{
        width: 91.667rem;
        height: 100%;
        margin: 0 auto;
        .header-nav-logo{
          img{
            height:4.833rem;
          }
        }
        .header-nav-menu{
          list-style: none;
          .header-nav-item{
            padding: 0 1.667rem;
            line-height: 4.833rem;
            font-size: 1.5rem;
            height: 100%;
            position: relative;
            cursor: pointer;
            &::after{
              content: "";
              width: 100%;
              border-bottom: 0 solid rgba(255,255,255,0);
              position: absolute;
              bottom: -1px;
              left: 0;
              transition: all .1s ease-in;
            }
            &:hover,&.active{
              color: map-get($colors,'blue');
              transition: all .1s ease-out;
              &::after{
                content: "";
                width: 100%;
                border-bottom: 3px solid map-get($colors,'blue');
                position: absolute;
                bottom: -1px;
                left: 0;
                transition: all .1s ease-in;
              }
            }
          }
        }
        .header-nav-avatar{
          position: relative;
          height: 3rem;
          img{
            width: 3rem;
            height: 3rem;
            border-radius: 0.417rem;
            cursor: pointer;
            object-fit: cover;
          }
          .fade-enter-active, .fade-leave-active {
            transition: 0s max-height 0.15s linear,0.1s opacity cubic-bezier(0.39,0.575,0.565,1),0.15s transform cubic-bezier(0.1,1.26,0.83,1);
          }
          .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
            transform: scale(0.9);
            opacity: 0;
          }
          .popUserNav{
            transform-origin: center top;
            border-radius: 0.333rem;
            overflow: inherit;
            box-shadow: 0 1rem 2rem rgba(73,80,87,0.3);
            position: absolute;
            width: 12rem;
            top:4.25rem;
            left: 0;
            >div{
              cursor: pointer;
              &:hover {
                background-color: map-get($colors, 'border');
                border-radius: 0.333rem;
              }
            }
            &::before{
              content: '';
              display: block;
              position: absolute;
              border-bottom: 0.5rem solid map-get($colors,'arrow');
              border-left: 0.5rem solid transparent;
              border-right: 0.5rem solid transparent;
              border-top: 0.5rem solid transparent;
              top:-1.333rem;
              left: 0.667rem;
            }
          }
        }

       /* .noLogin{
          .loginBtn{
            cursor: pointer;
            font-size: 1rem;
            outline: none;
            height: 2.333rem;
            width: 4.333rem;
            border-radius: 0.5rem;
            border: 1px solid map-get($colors,'blue');
            text-align: center;
            line-height: 2.335rem;
            box-sizing: border-box;
            transition: all .2s;
            &.loginBtn:hover{
              background-color: map-get($colors,'blue');
              color: map-get($colors,'white');
            }
          }
          .registerBtn{
            cursor: pointer;
            font-size: 1rem;
            outline: none;
            height: 2.333rem;
            width: 6.333rem;
            border-radius: 0.5rem;
            border: 1px solid map-get($colors,'blue');
            text-align: center;
            line-height: 2.333rem;
            box-sizing: border-box;
            transition: all .2s;
            &.registerBtn:hover{
              background-color: map-get($colors,'white');
              color: map-get($colors,'blue');
            }
          }
        }*/
      }
    }
  }
</style>
