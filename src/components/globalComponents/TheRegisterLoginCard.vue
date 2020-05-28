<template>
	<transition name="fade">
		<!--这里登录和注册共用一个页面，也绑定在同一个model上，展示和提交根据全局的vuex的isRegLogin返回的状态决定，1：登录，2：注册，0：表示关闭-->
		<div v-if="isRegLogin" class="bgShadow flex jc-c ai-c">
			<div class="fixedCard bg-white pb-4" :class="{'isReg':isRegLogin===2,'isLogin':isRegLogin===1,'isForget':isRegLogin===3}">
				<div class="logo flex fd-c jc-e ai-c pt-5">
					<div class="closeBtn text-closeBtn btnLink" @click="closeCard">×</div>
					<img src="../../assets/imgs/logo.png" alt="">
					<span class="mt-3 text-summary">{{isRegLogin===1?'登录':isRegLogin===2?'注册':'重置密码'}}</span>
					<span class="goLogin" :class="messageColor" v-if="isRegLogin===1">{{message1}}</span>
					<span class="goLogin" :class="messageColor" v-if="isRegLogin===2">{{message2}}</span>
					<span class="goLogin" :class="messageColor" v-if="isRegLogin===3">{{message3}}</span>
				</div>
				<form  id="userForm" >
					<transition-group class="flex fd-c ai-c mt-5" name="list-move">
						<label v-if="isRegLogin===2" class="inputItem" key="1">
							<div>
								<input type="text" class="inputBox p-3" v-model="model.username" @focusout="usernameVerify">
								<p class="title"><span class="px-3 text-publishText">可爱的昵称</span></p>
								<span class="des1 mt-2 pl-2" style="box-sizing: border-box" :class="verification.usernameColor" v-text="verification.username"></span>
								<span class="des2 mt-2 text-publishText">中文字母数字14位</span>
							</div>
							
						</label>
						<label class="inputItem mt-4" key="3">
							<div>
								<input type="text" class="inputBox p-3" v-model="model.email" @focusout="emailVerify">
								<p class="title"><span class="px-3 text-publishText">登录邮箱</span></p>
								<span v-if="isRegLogin!=1" :class="verification.emailColor" class="des1 mt-2 pl-2" style="box-sizing: border-box" v-text="verification.email"></span>
								<span  v-if="isRegLogin===2" class="des2 mt-2 text-publishText">用作登录和验证</span>
							</div>
							
						</label>
						
					
						
						
						<label v-if="isRegLogin===2||isRegLogin===3" class="inputItem mt-4" key="2">
							<div>
								<input type="text" class="inputBox p-3" v-model="model.emailCode">
								<p class="title"><span class="px-3 text-publishText">验证码</span></p>
								<div class="inputBtn verify px-4" :class="{'text-grey2':sendCD}" @click="sendVerificationCode">{{'发送验证码'+restTime}}</div>
								<span class="des1 mt-2 pl-2" style="box-sizing: border-box" :class="verification.emailCodeColor" v-text="verification.emailCode"></span>
							</div>
							
						</label>
						<label class="inputItem mt-4" key="4">
							<div>
								<input :type="inputType" class="inputBox p-3" v-model="model.password" @focusout="passwordVerify">
								<p class="title"><span class="px-3 text-publishText">{{isRegLogin===3?'重置密码':'密码'}}</span></p>
								<div class="inputBtn checkPass px-4" @click="togglePassBox"><i class="iconfont" :class="{'icon-checkPassOff':!checkPass,'icon-checkPassOn':checkPass}"></i></div>
								<span v-if="isRegLogin!=1" :class="verification.passwordColor" class="des1 mt-2 pl-2" style="box-sizing: border-box" v-text="verification.password"></span>
								<span v-if="isRegLogin===2" class="des2 mt-2 text-publishText">6到16位字符</span>
							</div>
							
						</label>
					</transition-group>
					<div class="cardFooter">
						<p v-if="isRegLogin===2" class="mt-4">
							<span>已有帐号？</span>
							<span class="text-blue btnLink" @click="toLogin">登录</span>
						</p>
						<p v-else class="mt-4 flex px-4">
							<span v-if="isRegLogin!=3" class="flex-1 text-blue btnLink pl-5" style="text-align: left" @click="toForget">忘记密码？</span>
							<span v-if="isRegLogin===3" class="flex-1 text-blue btnLink pl-5" style="text-align: left" @click="toLogin">登录</span>
							<span>新用户？</span>
							<span class="text-blue btnLink pr-5" @click="toReg">注册</span>
						</p>
						<button v-if="isRegLogin===2" class="regBtn bg-blue text-white mt-4 btnLink" @click="register">快速注册</button>
						<button v-if="isRegLogin===1" class="regBtn bg-blue text-white mt-4 btnLink" @click="login">快速登录</button>
						<button v-if="isRegLogin===3" class="regBtn bg-blue text-white mt-4 btnLink" @click="updatePassword">重置密码</button>
					</div>
				</form>
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
        //注册登录卡头部提示信息文本,
        message1:'',
        message2:'',
        message3:'',
				
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
					password:'',
          //输入框验证提示颜色
          usernameColor:'',
          emailColor:'',
          emailCodeColor:'',
          passwordColor:'',
				},
				//发送验证码按钮倒计时和按钮禁用切换
				restTime:'',
        sendCD:false
			}
		},
		methods:{
   
			// 切换卡片的时候清除提示
      clearTips(){
				
        Object.keys(this.verification).forEach(item=>{
          this.verification[item] = ''
        })
      },
      // 打开登录卡
      toLogin(){
        this.$store.commit('toLogin')
				//清空注册提示信息
        this.message2=''
        this.clearTips()
      },
			// 打开注册卡
      toReg(){
        this.$store.commit('toReg')
        //清空登录提示信息
        this.message1=''
        this.clearTips()
      },
			toForget(){
        this.$store.commit('toForget')
				this.message3=''
        this.clearTips()
			},
			// 关闭
      closeCard(){
        this.$store.commit('closeLoginCard')
      },
			// 切换查看密码 改变icon和密码框类型
      togglePassBox(){
        this.checkPass = !this.checkPass
			},
      async usernameVerify() {
        //屏蔽登录时的验证
        if(this.$store.state.loginCardState===1){
          return
        }
        //1.判断有输入，为了提高用户体验，无输入就不验证，返回true
				//2.判断通过正则，未通过返回false
				//3.判断数据库没有重复，返回true，有重复发挥false
        if(this.model.username){
          if(this.usernameRegExp.test(this.model.username)){
            // verify返回一个Promise，在此处捕获处理200和422
            try{
              const res = await this.verify('username')
              this.verification.username = res.data.message
              this.verification.usernameColor = 'text-pink'
              return true
            }catch (e) {
              this.verification.username = e.response.data.message
              this.verification.usernameColor = 'text-red'
              return false
            }
            //这里一定要else，因为上面的if有异步，会先执行下面的
						//如果先返回了false，后续处理会出错
					}else{
            this.verification.username = '格式有误'
            this.verification.usernameColor = 'text-red'
            return false
					}
				}else{
          this.verification.username = ''
          return true
        }
      },
      async emailVerify(){
        //同用户名验证
        if(this.$store.state.loginCardState===1||this.$store.state.loginCardState===3){
          return
        }
        if(this.model.email){
          if(this.emailRegExp.test(this.model.email)){
						try{
              const res = await this.verify('email')
              this.verification.email = res.data.message
              this.verification.emailColor = 'text-pink'
							return true
						}catch (e) {
              this.verification.email = e.response.data.message
              this.verification.emailColor = 'text-red'
              return false
            }
          }else{
            this.verification.email = '格式有误'
            this.verification.emailColor = 'text-red'
            return false
					}
        }else{
          this.verification.email = ''
          return true
				}
      },
      passwordVerify(){
        //登陆时无需验证
        if(this.$store.state.loginCardState===1){
          return
				}
        if(!this.passwordRegExp.test(this.model.password)&&this.model.password){
          this.verification.password='密码格式错误'
					this.verification.passwordColor = 'text-red'
					return false
        }else{
          this.verification.password=''
					return true
        }
      },
      async sendVerificationCode(){
        //发送验证码
				const sendEmailCode = ()=> {
          this.verification.emailCode='验证码已发送到您邮箱'
          this.verification.emailCodeColor = 'text-pink'
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
        }
        //检查按钮是否冷却中
        if(this.sendCD){
          return
					
        }	//忘记密码
        else if(this.$store.state.loginCardState===3){
          //判断通过正则，发送验证码
          if(this.model.email&&this.emailRegExp.test(this.model.email)){
            //带一个类型，服务器判断发送后发送对应的邮件
            await this.$http.post('/emailCode', {email:this.model.email,type:'forgetting'})
            sendEmailCode()
					}else{
            this.verification.emailCode='再检查一下您的邮箱'
            this.verification.emailCodeColor = 'text-red'
					}
				}	//正常注册，这里正则和服务器查重已经在emailVerify里验证了
        else if(await this.emailVerify()&&this.model.email){
          //带一个类型，服务器判断发送后发送对应的邮件
          await this.$http.post('/emailCode', {email:this.model.email,username:this.model.username,type:'registration'})
          sendEmailCode()
        }else{
          //未通过验证，提示信息
          this.verification.emailCode='请输入正确的邮箱地址！'
					this.verification.emailCodeColor = 'text-red'
				}
			},
			// 注册
      async register(){
        //先判断需要的信息是否完备
				if(!this.model.username){
          this.verification.username='用户名不能为空'
          this.verification.usernameColor='text-red'
					return
				}
				if(!this.model.email){
          this.verification.email='邮箱不能为空'
          this.verification.emailColor='text-red'
					return
				}
				if(!this.model.emailCode){
          this.verification.emailCode='验证码不能为空'
          this.verification.emailCodeColor='text-red'
					return
				}
				if(!this.model.password){
          this.verification.password='密码不能为空'
          this.verification.passwordColor='text-red'
					return
				}
				//再把所有输入信息统一判断
				//这里在判断时已经将错误信息显示在了对应的地方，后面catch到的错误一般是验证码出错了
        if(await this.usernameVerify()&&await this.emailVerify()&&this.passwordVerify()){
          try {
            //尝试发送用户信息，在服务端查询验证码是否正确，或者用户是否重复
            const res = await this.$http.post('/registration',this.model)
						//注册成功跳转到登录页面
            this.toLogin()
						//并提示是否要登录
            this.message1 = res.data.message
            this.messageColor = 'text-pink'
          }catch (e) {
            //失败,拿到错误信息，一般是验证码错误
            this.message2 = e.response.data.message
						this.messageColor = 'text-red'
          }
				}
			},
			//登录
			async login(){
        try {
          // 尝试登录，成功，vuex存入用户信息，关闭登录卡，将token写入localStorage
          const res = await this.$http.post('/login',this.model)
					this.$store.commit('hasLogin',res.data.user)
					this.$store.commit('closeLoginCard')
					//只有登录成功了才写入token
          localStorage.setItem('token',res.data.token)
					this.message1=''
          window.location.reload()
        }catch (e) {
          // 失败，拿到错误信息，并显示
					this.message1 = e.response.data.message
					this.messageColor = 'text-red'
        }
			},
			//重置密码提交
      async updatePassword(){
        //判断信息完备
        if(this.model.email&&this.model.emailCode&&this.model.password){
          try{
            const res = await this.$http.post('/forgetting',this.model)
						//跳转到登录
						this.toLogin()
						this.message1 = res.data.message
						this.messageColor = 'text-pink'
          }catch (e) {
            //一般是验证码邮箱对不上号，统一提示验证码错误
            this.message3 = e.response.data.message
            this.messageColor = 'text-red'
          }
				}else{
          //少了信息
          this.message3 = '您似乎忘了什么'
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
			&.isForget{
				height: 39.5rem;
			}
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
				/*position: relative;*/
				transition: all .3s ;
				/*&:last-of-type{*/
				/*	position: absolute;*/
				/*	bottom: 9.667rem;*/
				/*}*/
				/*&:nth-of-type(1){*/
				/*	position: sticky;*/
				/*	!*top:5rem*!*/
				/*}*/
				&>div{
					position: relative;
				}
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
					line-height: 4rem;
					font-size: 1.1rem;
					cursor: pointer;
					background: rgba(255,255,255,0);
				}
			}
			.cardFooter{
				position: absolute;
				bottom: 1.5rem;
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
	.fade-enter-active,.fade-leave-active {
		transition: all .3s;
	}
	.fade-enter,.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		transform: scale(1.2);
		opacity: 0;
	}
	.list-move-active-active,.list-move-leave-active{
		transition: all .3s;
	}
	.list-move-enter,.list-move-leave-to /* .fade-leave-active below version 2.1.8 */ {
		opacity: 0;
	}
	.list-move-leave-active{
		position: absolute;
	}
</style>
