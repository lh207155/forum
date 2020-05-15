<template>
	<div class="userInfoCard card flex fd-c p-3 bg-white">
		<div v-if="0">
			<p class="title text-grey2">嗨! 朋友</p>
			<p class="slogan flex-1 mt-3 text-blackOpacity">所有的伟大都源于一个勇敢的开始！</p>
			<div class="mt-4">
				<button class="button text-white bg-blue btn px-3" @click="()=>this.$store.commit('toLogin')">
					登录
				</button>
			</div>
		</div>
		<div v-else>
			<div class="userInfo borderBottom flex pb-3">
				<div class="avatar">
					<img src="../../assets/imgs/defultAvatar.png" alt="">
				</div>
				<div class="user flex fd-c ml-4 jc-e">
					<span class="name">lh207155</span>
					<span class="title">
						斗之气<i></i>
					</span>
				</div>
			</div>
			<div class="userCommunication borderBottom flex mt-3 pb-3">
				<div class="flex-1"><p>文章</p><span>0</span></div>
				<div class="flex-1"><p>评论</p><span>0</span></div>
				<div class="flex-1"><p>关注</p><span>0</span></div>
				<div class="flex-1"><p>粉丝</p><span>0</span></div>
			</div>
			<div class="points bg-purple text-blackOpacity mt-3 py-2 px-3">
				<i class="iconfont icon-jifen"></i>9
			</div>
	
		</div>
	</div>
</template>

<script>
  export default {
    name: "UserInfoCard"
  }
</script>

<style scoped lang="scss">
	@import "../../assets/scss/variables";
	.userInfoCard{
		font-size: 1.167rem;
		box-sizing: border-box;
		.userInfo{
			width: 100%;
			height: 5rem;
			.avatar{
				height: 5rem;
				width: 5rem;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.user{
				height: 100%;
				span{
					display: inline-block;
				}
			}
		}
		.userCommunication{
			text-align: center;
			p{
				color:map-get($colors,'grey2')
			}
		}
		.points{
			display: inline-block;
			border-radius: 2.5rem;
		}
	}
</style>
