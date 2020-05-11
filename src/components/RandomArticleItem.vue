<template>
	<div class="randomArticle">
		<div class="articleItem borderBottom p-3 flex ai-c" v-for="i in 3" :key="i">
			<div class="articleImg">
				<img src="../assets/imgs/007I6HASly1gej3fgzlljj30ie0c9tah.jpg" alt="">
			</div>
			<div class="articleInfo ml-3 flex fd-c jc-sb">
				<p class="title text-blackOpacity">支持使用的加速器集</p>
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
	@import "../assets/scss/variables.scss";
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
