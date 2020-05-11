<template>
  <div class="header mb-3">
    <div class="header-banner bg-blue">
      <ul class="header-banner-menu flex jc-s ai-c text-white">
        <li class="header-banner-item">公告</li>
        <li class="header-banner-item"><i class="iconfont icon-huiyuan"></i>会员</li>
        <li class="header-banner-item">永久地址</li>
        <li class="header-banner-item"><i class="iconfont icon-qiandao"></i>签到</li>
        <li class="header-banner-item">饿了么红包</li>
      </ul>
    </div>
    <div class="header-nav">
      <div class="header-nav-wrapper flex ai-c">
        <div class="header-nav-logo">
          <a>
            <img src="../assets/imgs/logo.png">
          </a>
        </div>
        <ul class="header-nav-menu flex flex-1 ai-c">
          <li class="header-nav-item"><i class="iconfont icon-man"></i> 老司机</li>
          <li class="header-nav-item"><i class="iconfont icon-women"></i> 小姐姐</li>
          <li class="header-nav-item"><i class="iconfont icon-tool"></i> 神兵利器</li>
          <li class="header-nav-item"><i class="iconfont icon-game"></i> 游戏鸡</li>
          <li class="header-nav-item"><i class="iconfont icon-video"></i> 值得看</li>
          <li class="header-nav-item"><i class="iconfont icon-cart"></i> 值得买</li>
        </ul>
        <div v-if="0" class="header-nav-avatar">
          <img src="../assets/imgs/defultAvatar.png">
        </div>
        <div v-else class="noLogin">
          <button class="loginBtn bg-white text-blue mr-3" @click="toLogin">登录</button>
          <button class="registerBtn bg-blue text-white" @click="toReg">快速注册</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FHeader",
    methods:{
      toLogin(){
        this.$store.commit('toLogin')
      },
      toReg(){
        this.$store.commit('toReg')
      },
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/scss/variables.scss";
  .header{
    background-color: #fff;
    box-shadow: 0px 0.417rem 3.333rem 0px rgba(17, 58, 93, 0.1);
    /*backdrop-filter: blur(10px);*/
    .header-banner{
      height: 3.167rem;
      width: 100vw;
      background-image: url("../assets/imgs/bg-top.png");
      .header-banner-menu{
        list-style: none;
        width: 91.667rem;
        max-width: 100%;
        height: 100%;
        margin: 0 auto;
        .header-banner-item{
          opacity: .5;
          transition: opacity .2s ease-out;
          margin-right: 1.167rem;
          &.header-banner-item:hover{
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
            font-size: 1.333rem;
          }
        }
        .header-nav-avatar{
          height: 3rem;
          img{
            height: 3rem; border-radius: 0.417rem;
          }
        }
        .noLogin{
          .loginBtn{
            cursor: pointer;
            font-size: 1rem;
            outline: none;
            height: 2.333rem;
            width: 4.333rem;
            border-radius: 0.5rem;
            border: 1px solid map-get($colors,'blue');
            text-align: center;
            line-height: 2rem;
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
            line-height: 2rem;
            box-sizing: border-box;
            transition: all .2s;
            &.registerBtn:hover{
              background-color: map-get($colors,'white');
              color: map-get($colors,'blue');
            }
          }
        }
      }
    }
  }
</style>
