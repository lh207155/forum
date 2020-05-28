<template>
	<div class="signInfoCard card flex fd-c bg-white">
		<div v-if="!$store.getters.signed" class="title py-4" @click="sign">
			<i class="iconfont icon-gift mr-3 text-red"></i><span>点击领取今天的签到奖励!</span>
		</div>
		<div v-else class="title py-4">
			<i class="iconfont icon-gift1 mr-3 text-blue3"></i><span>{{$store.state.user.reward}}</span>
		</div>
		<div class="signBtnBg py-3 bg-pink flex jc-sa mx-3">
			<button class="signToday text-white" @click="slideTo(0)">今日签到</button>
			<button class="signContinuously text-white" @click="slideTo(1)">连续签到</button>
			<button class="btnBGSlide" :class="{right:toggle}"></button>
		</div>
		<div>
<!--			这里监听swiper组件的自定义方法-->
			<SignUserItem ref="SignUserItem" @toggle="changeBtn"></SignUserItem>
		</div>
		<div class="signRank text-blackOpacity">
			<span>签到排行</span>
		</div>
	</div>
</template>

<script>
  import SignUserItem from "./SignUserItem";
  export default {
    name: "SignInCard",
    components: {SignUserItem},
		data(){
      return {
        toggle:false
			}
		},
		methods: {
      // 按钮事件：切换swiper的slide，ref获取子组件的实例
			// 查看结构，似乎还有一层封装，所以再向下取一层子组件
      slideTo(index){
        this.$refs.SignUserItem.$children[0].$swiper.slideTo(index)
			},
			// swiper组件换页之后切换按钮的样式
			changeBtn(index){
        this.toggle = index === 0 ? false :true
			},
      // 签到
      async sign(){
        // 服务器验证是否今天已经签到
        if(!this.$store.state.user){
          return this.$store.commit('toLogin')
        }else{
          const res = await this.$http.get('/rest/sign/sign')
          console.log(res.data.message)
          this.$root.$emit('signed')
        }
      },
    },
  }
</script>

<style scoped lang="scss">
	.signInfoCard{
		width: 100%;
		.title{
			text-align: center;
			cursor: pointer;
			i{
			}
			span{
				color:rgba(0,0,0,.8);
				font-size: 1.083rem;
			}
		}
		.signBtnBg{
			background-image: url("../../assets/imgs/site-bg.png");
			border-radius: 0.333rem;
			overflow: hidden;
			position: relative;
			button{
				cursor: pointer;
				border: 0;
				outline: none;
				width: 7.667rem;
				height: 2.333rem;
				border-radius: 3.583rem;
			}
			.signToday{
				background-color: rgba(255,255,255,0);
			}
			.signContinuously{
				background-color: rgba(255,255,255,0);
			}
			.btnBGSlide{
				position: absolute;
				background-color: rgba(255,255,255,.4);
				transition: all .3s;
				left: 2rem;
				&.right{
					transform: translateX(11.5rem);
					/*right: 2rem;*/
				}
			}
		}
		.signRank{
			text-align: center;
			font-weight: bold;
			width: 100%;
			height: 3.083rem;
			line-height: 3.083rem;
			background-image: url("../../assets/imgs/geopattern.png");
		}
	}
</style>
