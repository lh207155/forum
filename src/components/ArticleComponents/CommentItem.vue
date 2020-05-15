<template>
	<div class="p-4 flex borderBottom">
		<div class="avatar mr-4">
			<img src="../../assets/imgs/defultAvatar.png" alt="">
		</div>
		<div class="comment flex fd-c">
			<div class="commentHeader flex">
				<div class="author flex-1 flex fd-c">
					<b class="name">admin</b>
					<span class="title">管理员</span>
				</div>
				<div class="date">2020-05-15</div>
			</div>
			<div class="commentBody mt-3">
				<p>好看</p>
			</div>
			<div class="commentFuntion mt-3 flex">
				<div class="flex-1">
					<span class="praise"><i class="iconfont icon-praise"></i></span>
					<span class="unPraise"><i class="iconfont icon-unpraise"></i></span>
				</div>
				<span class="reply">回复</span>
			</div>
		</div>
		<div></div>
	</div>
</template>

<script>
  export default {
    name: "CommentItem"
  }
</script>

<style scoped lang="scss">
	.avatar{
		width: 4rem;
		img{
			height: 4rem;
		}
	}
	.comment{
		width: 100%;
	}
</style>
