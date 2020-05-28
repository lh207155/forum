<template>
	<div class="overview ">
		<div class="overviewItem borderBottom">
			<div class="itemWrapper px-4">
				<span class="text-grey3">昵称</span>
				<span v-if="!usernameInputActive" class="ml-3 content px-4">{{userInfo.username}}</span>
				<input v-else class="ml-3 bg-white px-4 input" v-model="model.username" />
				<button v-if="!usernameInputActive" class="ml-3 updateBtn text-blue" @click="usernameInputActive=true">修改</button>
				<button v-if="usernameInputActive" class="ml-3 updateBtn text-blue" @click="updateUsername">保存</button>
				<button v-if="usernameInputActive" class="ml-3 updateBtn text-blue" @click="usernameInputActive=false">取消</button>
				<span :class="verification.usernameColor" class="ml-5">{{verification.username}}</span>
			</div>
		</div>
		<div class="overviewItem borderBottom">
			<div class="itemWrapper px-4">
				<span class="text-grey3">邮箱</span>
				<span v-if="!emailInputActive" class="ml-3 content px-4">{{userInfo.email}}</span>
				<input v-else class="ml-3 bg-white px-4 input" v-model="model.email" />
				<button v-if="!emailInputActive" class="ml-3 updateBtn text-blue" @click="emailInputActive=true">修改</button>
				<button v-if="emailInputActive" class="ml-3 updateBtn text-blue" @click="updateEmail">保存</button>
				<button v-if="emailInputActive" class="ml-3 updateBtn text-blue" @click="emailInputActive=false">取消</button>
				<span>{{verification.email}}</span>
			</div>
		</div>
		<div class="overviewItem borderBottom">
			<div class="itemWrapper px-4">
				<span class="text-grey3">性别</span>
				<span v-if="!sexInputActive" class="ml-3 content px-4">{{userInfo.sex||'未知'}}</span>
				<span v-if="sexInputActive" class="ml-3 sexInput px-4">
					<input type="radio" class="bg-white px-4 radio" v-model="model.sex" name="sex" value="男" id="boy"/>
					<label for="boy" class="ml-2">男</label>
					<input type="radio" class="ml-3 bg-white px-4 radio" v-model="model.sex" name="sex" value="女" id="girl"/>
					<label for="girl" class="ml-2">女</label>
				</span>
				<button v-if="!sexInputActive" class="ml-3 updateBtn text-blue" @click="sexInputActive=true">修改</button>
				<button v-if="sexInputActive" class="ml-3 updateBtn text-blue" @click="updateSex">保存</button>
				<button v-if="sexInputActive" class="ml-3 updateBtn text-blue" @click="sexInputActive=false">取消</button>
			</div>
		
		</div>
		<div class="overviewItem borderBottom">
			<div class="itemWrapper px-4">
				<span class="text-grey3">时间</span>
				<span class="ml-3 px-4 content">{{`您已经来到这里${dateHandle(userInfo.registerDate)}`}}</span>
			</div>
		</div>
		<div class="overviewItem borderBottom">
			<div class="itemWrapper px-4">
				<span class="text-grey3">积分</span>
				<span class="content ml-3">
					<span class="points bg-purple text-blackOpacity py-2 px-3 ml-3">
						<i class="iconfont icon-jifen"></i>{{userInfo.points}}
					</span>
				</span>
			</div>
		</div>
		
		<div class="overviewItem borderBottom">
			<div class="itemWrapper px-4">
				<span class="text-grey3">简介</span>
				<span v-if="!introductionInputActive" class="ml-3 content px-4">{{userInfo.introduction||'无'}}</span>
				<input type="textarea" v-else class="ml-3 bg-white px-4 input" v-model="model.introduction" />
				<button v-if="!introductionInputActive" class="ml-3 updateBtn text-blue" @click="introductionInputActive=true">修改</button>
				<button v-if="introductionInputActive" class="ml-3 updateBtn text-blue" @click="updateIntroduction">保存</button>
				<button v-if="introductionInputActive" class="ml-3 updateBtn text-blue" @click="introductionInputActive=false">取消</button>
				<span :class="verification.introductionColor" class="ml-5">{{verification.introduction}}</span>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: "Overview",
		data(){
      return{
        model:{
          username: '',
					email:'',
					sex:'',
					introduction:''
				},
        //注册时输入框输入验证提示
        verification:{
          username:'',
          email:'',
          sex:'',
          introduction:'',
          //输入框验证提示颜色
          usernameColor:'',
          emailColor:'',
          sexColor:'',
          introductionColor:'',
        },
        usernameInputActive:false,
        emailInputActive:false,
        sexInputActive:false,
        introductionInputActive:false,
			}
		},
		methods:{
      async updateEmail(){
        if(this.emailRegExp.test(this.model.email)){
          try{
            const verify = await this.verify('email')
            const res = await this.$http.put('/rest/User',{email:this.model.email})
            console.log(verify.data.message,res.data.model)
            this.verification.email = '修改成功'
						this.verification.emailColor = 'text-pink'
            this.usernameInputActive = false
          }catch (e) {
            this.verification.email = e.response.data.message
            this.verification.emailColor = 'text-red'
          }
        }else{
          this.verification.email = '格式有误'
          this.verification.emailColor = 'text-red'
				}
			},
      async updateUsername(){
        if(this.usernameRegExp.test(this.model.username)){
          try{
            const verify = await this.verify('username')
						const res = await this.$http.put('/rest/User',{username:this.model.username})
						console.log(verify.data.message,res.data.model)
            this.verification.username = '修改成功'
            this.verification.usernameColor = 'text-pink'
            this.usernameInputActive = false
          }catch (e) {
            this.verification.username = e.response.data.message
            this.verification.usernameColor = 'text-red'
          }
				}else{
          this.verification.username = '格式有误'
          this.verification.usernameColor = 'text-red'
        }
			},
      async updateSex(){
        await this.$http.put('/rest/user',{sex:this.model.sex})
        this.sexInputActive = false
			},
      async updateIntroduction(){
        const reg = new RegExp( /^[0-9a-zA-Z\u4e00-\u9fa5]{0,32}$/,)
				if(reg.test(this.model.introduction)){
          await this.$http.put('/rest/user',{introduction:this.model.introduction})
				}else{
          this.verification.introduction = '不要写太多噢(0~32个字)'
          this.verification.introductionColor = 'text-red'
				}
			}
		},
		computed:{
      userInfo(){
        return this.$store.state.user
			}
		}
  }
</script>

<style scoped lang="scss">
	@import '../../../assets/scss/variables';
	.overview{
		.overviewItem{
			.itemWrapper{
				box-sizing: border-box;
				height: 4.5rem;
				line-height: 4.5rem;
				font-size: 1.25rem;
				.content{
					box-sizing: border-box;
					display: inline-block;
					width: 16.667rem;
					height: 4.5rem;
					line-height: 4.5rem;
					font-size: 1.25rem;
				}
				button{
					border: 0;
					outline: none;
					background-color: transparent;
				}
				.input{
					box-sizing: border-box;
					width: 16.667rem;
					height: 3rem;
					border-radius: 0.25rem;
					outline: none;
					border: 1px solid map_get($colors,'blue');
					font-size: 1.25rem;
				}
				.sexInput{
					box-sizing: border-box;
					display: inline-block;
					width: 16.667rem;
					height: 3rem;
					font-size: 1.2rem;
				}
			}
		}
	}
	.points{
		border-radius: 1rem;
	}
	
</style>
