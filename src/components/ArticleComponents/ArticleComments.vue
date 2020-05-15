<template>
	<div class="articleComments card bg-white">
		<div class="tip flex p-4 text-blackOpacity borderBottom">
			<span>2条回复</span>
			<span><i></i>文章作者</span>
			<span class="flex-1"><i></i>管理员</span>
			<span>禁止留联系方式，防止被骗！</span>
		</div>
		<CommentItem></CommentItem>
		<CommentItem></CommentItem>
	</div>
</template>

<script>
  import CommentItem from "./CommentItem";
  export default {
    name: "ArticleComments",
    components: {CommentItem}
  }
</script>

<style scoped lang="scss">
	.articleComments{
		.tip{
			span{
				margin-right: 1rem;
			}
		}
	}
</style>
