<template>
	<transition name="fade">
		<div v-if="isRegLogin" class="bgShadow flex jc-c ai-c">
			<div class="fixedCard bg-white pb-4" :class="{isReg:isRegLogin===2,isLogin:isRegLogin===1}">
				<div class="logo flex fd-c jc-e ai-c pt-5">
					<div class="closeBtn text-closeBtn btnLink" @click="closeCard">×</div>
					<img src="../../assets/imgs/logo.png" alt="">
					<span class="mt-3 text-summary">{{isRegLogin===1?'登录':'注册'}}</span>
				</div>
				<form class="flex fd-c ai-c mt-5">
					<label v-if="isRegLogin===2" class="inputItem">
						<input type="text" class="inputBox p-3">
						<p class="title"><span class="px-3 text-publishText">可爱的昵称</span></p>
						<span class="des mt-2 text-publishText">中文、字母或数字的组合</span>
					</label>
					<label class="inputItem mt-4">
						<input type="text" class="inputBox p-3">
						<p class="title"><span class="px-3 text-publishText">登录邮箱</span></p>
						<span  v-if="isRegLogin===2" class="des mt-2 text-publishText">用作登录</span>
					</label>
					<label v-if="isRegLogin===2" class="inputItem mt-4">
						<input type="text" class="inputBox p-3">
						<p class="title"><span class="px-3 text-publishText">验证码</span></p>
						<button class="inputBtn verify px-4">发送验证码</button>
					</label>
					<label class="inputItem mt-4">
						<input :type="inputType" class="inputBox p-3">
						<p class="title"><span class="px-3 text-publishText">密码</span></p>
						<button class="inputBtn checkPass px-4" @click="togglePassBox"><i class="iconfont" :class="{'icon-checkPassOff':!checkPass,'icon-checkPassOn':checkPass}"></i></button>
						<span v-if="isRegLogin===2" class="des mt-2 text-publishText">最少6位字符</span>
					</label>
				</form>
				<div class="cardFooter">
					<p v-if="isRegLogin===2" class="mt-4">
						<span>已有帐号？</span>
						<span class="text-blue btnLink" @click="toLogin">登录</span>
					</p>
					<p v-else class="mt-4 flex px-4">
						<span class="flex-1 text-blue btnLink" style="text-align: left">忘记密码？</span>
						<span>新用户？</span>
						<span class="text-blue btnLink" @click="toReg">注册</span>
					</p>
					<button class="regBtn bg-blue text-white mt-4 btnLink">{{isRegLogin===2?'快速注册':'快速登录'}}</button>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
  export default {
    name: "TheRegisterLoginCard",
		data(){
      return {
        checkPass:true,
				isReg:false,
			}
		},
		methods:{
      toLogin(){
        this.$store.commit('toLogin')
      },
      toReg(){
        this.$store.commit('toReg')
      },
      closeCard(){
        this.$store.commit('closeLoginCard')
      },
      togglePassBox(){
        this.checkPass = !this.checkPass
			}
		},
		computed:{
      inputType(){
        return this.checkPass ? 'text' : 'password'
			},
      isRegLogin(){
        return this.$store.state.loginCardState
			}
		}
  }
</script>

<style scoped lang="scss">
	@import "../../assets/scss/variables";
	.bgShadow{
		position: fixed;
		z-index: 10;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0,0,0,.5);
		.fixedCard{
			position: fixed;
			height: 33.75rem;
			width: 28rem;
			border-radius: 0.5rem;
			overflow: hidden;
			transition: all .3s;
			/*transform-origin: center bottom;*/
			&.isReg{
				height: 46.75rem;
				/*animation: card1 .5s;*/
			}
			/*&.isLogin{*/
			/*	height: 33.75rem;*/
			/*	animation: card2 .5s;*/
			/*}*/
			.logo{
				background-image: url("../../assets/imgs/model-bg.png");
				background-size: 100%;
				background-repeat: no-repeat;
				position: relative;
				.closeBtn{
					position: absolute;
					top: 0;
					right: 0;
					width: 3.167rem;
					height: 3.583rem;
					line-height: 2.833rem;
					font-size: 2.5rem;
					text-align: center;
					color: #b2bac2;
					cursor: pointer;
					&.closeBtn:hover{
						color:map-get($colors,'black')
					}
				}
				img{
					height: 2.75rem;
				}
			}
			.inputItem{
				width: 24rem;
				height: 5.75rem;
				position: relative;
				.title{
					position: absolute;
					top:-0.708rem;
					left: 1.2rem;
					span{
						/*z-index 只对定位元素有效*/
						position: relative;
						z-index: 1;
						font-weight: 300;
						font-size: 1.083rem;
						transition: all .3s;
					}
					&::after{
						z-index: 0;
						content:'';
						position: absolute;
						width: 100%;
						/*2px 防止视口变动的出现错位造成无法遮挡的bug*/
						border-top: 0.167rem solid #fff;
						top: 0.667rem;
						left: 0;
						transition: all .3s;
					}
				}
				.inputBox{
					box-sizing: border-box;
					outline: none;
					border: 0.083rem solid map-get($colors,'inputBorder');
					width: 100%;
					height: 4rem;
					border-radius: 0.5rem;
					font-size: 1.667rem;
					line-height: 4rem;
					transition: all .3s;
					&:focus{
						border: 0.083rem solid map-get($colors,'blue');
						&~span,&~p>span{
							color:map_get($colors,'blue')
						}
					}
				}
				.des{
					font-size: 1rem;
					display: block;
					width: 100%;
					text-align: right;
				}
				.inputBtn{
					position: absolute;
					border: 0;
					outline: none;
					top: 0;
					right: 0;
					height: 4rem;
					cursor: pointer;
					background: rgba(255,255,255,0);
				}
			}
			.cardFooter{
				width: 100%;
				text-align: center;
				p{
					font-size: 1.083rem;
					/*fonts-weight: 300;*/
				}
				.regBtn{
					outline: none;
					height: 3.75rem;
					width: 24rem;
					border: 0;
					border-radius: 0.5rem;
					
				}
			}
		}
	}
	.fade-enter-active, .fade-leave-active {
		transition: all .3s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		transform: scale(1.2);
		opacity: 0;
	}
</style>
