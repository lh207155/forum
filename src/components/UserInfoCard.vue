<template>
	<div class="userInfoCard card flex fd-c p-3 bg-white">
		<p class="title">嗨! 朋友</p>
		<p class="slogan flex-1 mt-3">所有的伟大都源于一个勇敢的开始！</p>
		<div class="mt-4">
			<button class="button text-white bg-blue btn" @click="()=>this.$store.commit('toLogin')">
				登录
			</button>
		</div>
	</div>
</template>

<script>
  export default {
    name: "UserInfoCard"
  }
</script>

<style scoped lang="scss">
	.userInfoCard{
		font-size: 1.167rem;
		.title{
			color:#bcbcbc;
		}
		.slogan{
			color:rgba(0,0,0,.8)
		}
		.button{
			outline: none;
			font-size: 1rem;
			border: 0;
			border-radius: 0.5rem;
			height:2.833rem;
			width: 4.833rem;
			text-align: center;
			line-height: 3rem;
			cursor: pointer;
			transition: opacity .3s;
			&.button:hover{
				opacity: .8;
			}
		}
		
	}
</style>
