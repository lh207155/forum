<template>
	<transition name="fade">
		<div v-if="isRegLogin" class="bgShadow flex jc-c ai-c">
			<div class="fixedCard bg-white pb-4" :class="{'isReg':isRegLogin===2,'isLogin':isRegLogin===1}">
				<div class="logo flex fd-c jc-e ai-c pt-5">
					<div class="closeBtn text-closeBtn btnLink" @click="closeCard">×</div>
					<img src="../../assets/imgs/logo.png" alt="">
					<span class="mt-3 text-summary">{{isRegLogin===1?'登录':'注册'}}</span>
					<span class="goLogin" :class="messageColor" v-if="isRegLogin===1">{{message1}}</span>
					<span class="goLogin" :class="messageColor" v-if="isRegLogin===2">{{message2}}</span>
				</div>
				<form class="flex fd-c ai-c mt-5" id="userForm" >
					<label v-if="isRegLogin===2" class="inputItem">
						<input type="text" class="inputBox p-3" v-model="model.username" @focusout="usernameVerify">
						<p class="title"><span class="px-3 text-publishText">可爱的昵称</span></p>
						<span class="des1 mt-2 text-red" v-text="verification.username"></span>
						<span class="des2 mt-2 text-publishText">中文字母数字14位</span>
					</label>
					<label class="inputItem mt-4">
						<input type="text" class="inputBox p-3" v-model="model.email" @focusout="emailVerify">
						<p class="title"><span class="px-3 text-publishText">登录邮箱</span></p>
						<span :class="{hidden:isRegLogin===1}" class="des1 mt-2 text-red"  v-text="verification.email"></span>
						<span  v-if="isRegLogin===2" class="des2 mt-2 text-publishText">用作登录和验证</span>
					</label>
					<label v-if="isRegLogin===2" class="inputItem mt-4">
						<input type="text" class="inputBox p-3" v-model="model.emailCode">
						<p class="title"><span class="px-3 text-publishText">验证码</span></p>
						<button class="inputBtn verify px-4" :class="{'text-grey2':sendCD}" :disabled="sendCD" @click="sendVerificationCode">{{'发送验证码'+restTime}}</button>
						<span class="des1 mt-2 text-red"  v-text="verification.emailCode"></span>
					</label>
					<label class="inputItem mt-4">
						<input :type="inputType" class="inputBox p-3" v-model="model.password" @focusout="passwordVerify">
						<p class="title"><span class="px-3 text-publishText">密码</span></p>
						<button class="inputBtn checkPass px-4" @click="togglePassBox"><i class="iconfont" :class="{'icon-checkPassOff':!checkPass,'icon-checkPassOn':checkPass}"></i></button>
						<span :class="{hidden:isRegLogin===1}" class="des1 mt-2 text-red"  v-text="verification.password"></span>
						<span v-if="isRegLogin===2" class="des2 mt-2 text-publishText">6到16位字符</span>
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
					<button v-if="isRegLogin===2" class="regBtn bg-blue text-white mt-4 btnLink" @click="register">快速注册</button>
					<button v-else class="regBtn bg-blue text-white mt-4 btnLink" @click="login">快速登录</button>
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
				//查看密码切换
        checkPass:false,
				//注册登录卡头部提示信息颜色
        messageColor:'',
        //注册登录卡头部提示信息文本
        message1:'',
        message2:'',
				//输入信息绑定
				model:{
          username:'',
					email:'',
					emailCode:'',
					password:''
        },
				//注册时输入框输入验证提示
				verification:{
          username:'',
          email:'',
					emailCode:'',
					password:''
				},
				//发送验证码按钮倒计时和按钮禁用切换
				restTime:'',
        sendCD:false
			}
		},
		methods:{
      // 打开登录卡
      toLogin(){
        this.$store.commit('toLogin')
				//清空注册提示信息
        this.message2=''
      },
			// 打开注册卡
      toReg(){
        this.$store.commit('toReg')
        //清空登录提示信息
        this.message1=''
      },
			// 关闭
      closeCard(){
        this.$store.commit('closeLoginCard')
      },
			// 切换查看密码 改变icon和密码框类型
      togglePassBox(){
        this.checkPass = !this.checkPass
			},
			// 输入框有信息才验证，增加用户体验
      async usernameVerify() {
        //登陆时无需验证
        if(this.$store.state.loginCardState===1){
          return
        }
    
        //请求服务器验证昵称是否存在
				//存在返回422，不存在返回200，
				//接收到422，返回true，200返回false
        const verify = async ()=>{
          try{
            await this.$http.get(`/rest/user/username/${this.model.username}`)
            return false
          }catch (e) {
            return true
          }
        }
        const regExp = /^[0-9a-zA-Z\u4e00-\u9fa5]{1,14}$/
        // 首先判断有输入，并且未通过正则，显示提示信息，并返回false
        if(!regExp.test(this.model.username)&&this.model.username){
          this.verification.username='昵称格式错误'
          return false
          //否则如果 有输入也通过正则，请求服务器验证，验证存在返回true，显示提示信息，并返回false
        }else if(this.model.username&&await verify()){
          this.verification.username='昵称已经被别人用啦！'
          return false
          //否则 就是 无输入，或者有输入且验证用户不存在，不显示提示信息，并返回true
        } else {
          this.verification.username=''
          return true
        }
				
				// if(this.model.username){
        //   if(regExp.test(this.model.username)){
        //     const message =await verify()
        //     if(message){
        //       this.username.tips='昵称已被使用啦！'
        //       this.username.switch=false
				// 			return false
				// 		}else{
        //       this.username.tips=''
        //       this.username.switch=true
        //       return true
				// 		}
				// 	}else{
        //     this.username.tips='昵称格式错误'
        //     this.username.switch=false
        //     return false
				// 	}
				// }
				
				
      },
      async emailVerify(){
        //登陆时无需验证
        if(this.$store.state.loginCardState===1){
          return
        }
        const regExp = /^[0-9a-zA-Z]+([.-_]*[0-9a-zA-Z]+)*@([0-9a-zA-Z]+[-_]*[0-9a-zA-Z]+.)+[0-9a-zA-Z]{2,6}$/
				const verify = async ()=>{
          try{
            await this.$http.get(`/rest/user/email/${this.model.email}`)
						return false
          }catch (e) {
						return true
          }
				}
        if(!regExp.test(this.model.email)&&this.model.email){
          this.verification.email='不是邮箱'
					return false
        }else if(this.model.email&&await verify()){
          this.verification.email='邮箱已被使用！'
					return false
				}else{
          this.verification.email=''
					return true
        }
      },
      passwordVerify(){
        //登陆时无需验证
        if(this.$store.state.loginCardState===1){
          return
				}
        const regExp = /^[0-9a-zA-Z\w]{6,16}$/
        if(!regExp.test(this.model.password)&&this.model.password){
          this.verification.password='密码格式错误'
					return false
        }else{
          this.verification.password=''
					return true
        }
      },
      async sendVerificationCode(){
        //发送之前先验证有输入，且通过邮箱验证（邮箱验证方法包含服务器验证）
        if(await this.emailVerify()&&this.model.email) {
          this.verification.emailCode=' '
					//发送用户名和邮箱信息，
          await this.$http.post('/emailCode', {email:this.model.email,username:this.model.username})
					//设置按钮倒计时，防止多次点击发送
          this.restTime = 60
					//设置按钮禁用
					this.sendCD = true
					//开启定时器，倒计时，结束之后恢复按钮
					const id = setInterval(()=>{
            if(this.restTime===0){
              this.restTime=''
              this.sendCD = false
              clearInterval(id)
						}else{
              this.restTime--
						}
					},1000)
        }else{
          //未通过验证，提示信息
          this.verification.emailCode='请输入正确的邮箱地址！'
				}
			},
			// 注册
      async register(){
        //先判断需要的信息是否完备
				if(!this.model.username){
          this.verification.username='用户名不能为空'
					return
				}
				if(!this.model.email){
          this.verification.email='邮箱不能为空'
					return
				}
				if(!this.model.emailCode){
          this.verification.emailCode='验证码不能为空'
					return
				}
				if(!this.model.password){
          this.verification.password='密码不能为空'
					return
				}
				//再把所有输入信息统一判断
        if(await this.usernameVerify()&&await this.emailVerify()&&this.passwordVerify()){
          try {
            //尝试发送用户信息，在服务端查询验证码是否正确，或者用户是否重复
            const res = await this.$http.post('/register',this.model)
						//成功
            this.toLogin()
            this.message1 = res.data.message
            this.messageColor = 'text-pink'
          }catch (e) {
            //失败,拿到错误信息
            this.message2 = e.response.data.message
						this.messageColor = 'text-red'
          }

          // 注册成功
				}
    
				
			},
			async login(){
        try {
          // 尝试登录成功，vuex存入用户信息，关闭登录卡，将token写入localStorage
          const res = await this.$http.post('/login',this.model)
					this.$store.commit('hasLogin',res.data.user)
					this.$store.commit('closeLoginCard')
					//只有登录成功了才写入token
          localStorage.setItem('token',res.data.token)
					this.message1=''
        }catch (e) {
          // 失败，拿到错误信息，并显示
					this.message1 = e.response.data.message
					this.messageColor = 'text-red'
        }
			}
		},
		computed:{
      // 切换密码框类型 根据checkPass的值
      inputType(){
        return this.checkPass ? 'text' : 'password'
			},
			// 切换 卡片的class，通过获取store的loginCardState实时值
			// 1:登录 2：注册 0：关闭
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
				.goLogin{
					position: absolute;
					top:9rem;
				}
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
						&~.des2,&~p>span{
							color:map_get($colors,'blue')
						}
					}
				}
				.des1{
					text-align: left;
					width: 50%;
					font-size: 1rem;
					display: inline-block;
					&.hidden{
						visibility: hidden;
					}
				}
				.des2{
					width: 50%;
					font-size: 1rem;
					display: inline-block;
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
	/*隐藏输入验证提示左边的提示信息*/
	.hidden{
		visibility: hidden;
	}
</style>
