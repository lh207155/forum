<template>
	<div class="articleComments card bg-white">
		<div class="tip flex p-4 text-blackOpacity borderBottom">
			<span>{{`${comments.length}条回复`}}</span>
			<span class="text-red2"><i class="userType author">A</i> 文章作者</span>
			<span class="flex-1 text-blue2"><i class="userType admin">M</i> 管理员</span>
			<span>欢迎留言噢！</span>
		</div>
		<transition-group name="fade" tag="div">
			<CommentItem :comment="item" v-for="(item,i) in comments" :key="i+1"></CommentItem>
		</transition-group>
		
	</div>
</template>

<script>
  import CommentItem from "./CommentItem";
  export default {
    name: "ArticleComments",
    components: {CommentItem},
		props:{
      comments:Array
		},
  }
</script>

<style scoped lang="scss">
	@import "../../assets/scss/variables";
	.articleComments{
		.tip{
			span{
				margin-right: 1rem;
				
			}
		}
	}
	.fade-enter-active,.fade-leave-active{
		transition: all .3s;
	}
	.fade-enter,.fade-leave-to{
		opacity: 0;
		transform: translateX(30px);
	}
	.fade-enter-to,.fade-leave{
		opacity: 1;
	}
</style>
