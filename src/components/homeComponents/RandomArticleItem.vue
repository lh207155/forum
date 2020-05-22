<template>
	<div class="randomArticle">
		<div class="articleItem borderBottom p-3 flex ai-c" v-for="i in 3" :key="i">
			<div class="articleImg">
				<img src="../../assets/imgs/73401818_2120780644884722_3255013328003230127_n.jpg" alt="">
			</div>
			<div class="articleInfo ml-3 flex fd-c jc-sb">
				<p class="title text-blackOpacity">内容正在建设中...</p>
				<p class="date text-publishText mt-2">2020-05-10</p>
			</div>
		
		</div>
	</div>
</template>

<script>
  export default {
    name: "RandomArticleItem"
  }
</script>

<style scoped lang="scss">
	@import "../../assets/scss/variables";
	.randomArticle{
		.articleItem{
			.articleImg{
				width: 6.917rem;
				height: 4.25rem;
				border-radius: 0.5rem;
				overflow: hidden;
				img{
					height: 100%;
					width: 100%;
					object-fit: cover;
				}
			}
			.articleInfo{
			}
		}
	}
</style>
