<template>
	<div class="overview ">
		<div class="overviewItem borderBottom">
			<div class="itemWrapper py-3 px-4">
				<span class="text-grey3">昵称</span>
				<span class="ml-3">{{userInfo.username}}</span>
				<button class="ml-3 updateBtn text-blue" @click="model.username={}">修改</button>
			</div>
<!--			<div class="pb-3 px-4 updateInput" v-if="model.username">-->
<!--				<input type="text" class="px-3 py-2" v-model="model.username.username">-->
<!--				<button class="ml-3 confirmBtn text-blue" @click="updateUsername">确认</button>-->
<!--				<button class="ml-3 cancelBtn text-blue" @click="model.username=''">取消</button>-->
<!--				<div class="flex mt-2"><p></p><p style="margin-left: auto">中文数字字母</p></div>-->
<!--			</div>-->
		
		</div>
		
		<div class="overviewItem borderBottom">
			<div class="itemWrapper py-3 px-4">
				<span class="text-grey3">邮箱</span>
				<span class="ml-3">{{userInfo.email}}</span>
				<button class="ml-3 updateBtn text-blue">修改</button>
			</div>
<!--			<div class="py-1 px-4 updateInput">-->
<!--				<input type="text" class="px-3 py-2">-->
<!--				<button class="ml-3 confirmBtn text-blue">确认</button>-->
<!--				<button class="ml-3 cancelBtn text-blue">取消</button>-->
<!--			</div>-->
		
		</div>
		<div class="overviewItem borderBottom">
			<div class="itemWrapper py-3 px-4">
				<span class="text-grey3">性别</span>
				<span class="ml-3">{{userInfo.sex}}</span>
				<button class="ml-3 updateBtn text-blue">修改</button>
			</div>
<!--			<div class="py-1 px-4 updateInput">-->
<!--				<input type="text" class="px-3 py-2">-->
<!--				<button class="ml-3 confirmBtn text-blue">确认</button>-->
<!--				<button class="ml-3 cancelBtn text-blue">取消</button>-->
<!--			</div>-->
		
		</div>
		<div class="overviewItem borderBottom">
			<div class="itemWrapper py-3 px-4">
				<span class="text-grey3">时间</span>
				<span class="ml-3">{{`您已经来到这里${dateHandle(userInfo.registerDate)}`}}</span>
			</div>
<!--			<div class="py-1 px-4 updateInput">-->
<!--				<input type="text" class="px-3 py-2">-->
<!--				<button class="ml-3 confirmBtn text-blue">确认</button>-->
<!--				<button class="ml-3 cancelBtn text-blue">取消</button>-->
<!--			</div>-->
		
		</div>
		<div class="overviewItem borderBottom">
			<div class="itemWrapper py-3 px-4">
				<span class="text-grey3">积分</span>
				<span class="points bg-purple text-blackOpacity py-2 px-3 ml-3">
					<i class="iconfont icon-jifen"></i>{{userInfo.points}}
				</span>
<!--				<button class="ml-3 updateBtn text-blue">修改</button>-->
			</div>
<!--			<div class="py-1 px-4 updateInput">-->
<!--				<input type="text" class="px-3 py-2">-->
<!--				<button class="ml-3 confirmBtn text-blue">确认</button>-->
<!--				<button class="ml-3 cancelBtn text-blue">取消</button>-->
<!--			</div>-->
		
		</div>
		
		<div class="overviewItem borderBottom">
			<div class="itemWrapper py-3 px-4">
				<span class="text-grey3">简介</span>
				<span class="ml-3">{{userInfo.introduction}}</span>
				<button class="ml-3 updateBtn text-blue">修改</button>
			</div>
			<!--			<div class="py-1 px-4 updateInput">-->
			<!--				<input type="text" class="px-3 py-2">-->
			<!--				<button class="ml-3 confirmBtn text-blue">确认</button>-->
			<!--				<button class="ml-3 cancelBtn text-blue">取消</button>-->
			<!--			</div>-->
		
		</div>
	</div>
</template>

<script>
  export default {
    name: "Overview",
		data(){
      return{
        model:{
          username: ''
				}
			}
		},
		methods:{
      async updateUsername(){
        await this.$http.put('/rest/User',this.model.username)
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
	.overview{
		.overviewItem{
			button{
					border: 0;
					outline: none;
					background-color: transparent;
			}
			.itemWrapper{
				box-sizing: border-box;
				height: 4.5rem;
				line-height: 2.417rem;
				font-size: 1.25rem;
				.points{
					border-radius: 1rem;
				}
				
			}
			.updateInput{
				input{
					border: 0;
					border-bottom: 1px solid blue;
					outline: none;
					box-sizing: border-box;
					font-size: 1.25rem;
				}
			}
		}
	}
	
</style>
