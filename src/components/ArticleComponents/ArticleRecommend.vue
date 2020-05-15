<template>
	<div class="articleRecommend bg-white card flex p-2">
		<div class="recommendItem1 flex-1 mr-2">
			<ArticleCoverLink :ad="randomArticles[0]">
				<template>
					<div class="shadow"></div>
				</template>
			</ArticleCoverLink>
		</div>
		<div class="recommendItem2 flex-1">
			<ArticleCoverLink :ad="randomArticles[1]">
				<template>
					<div class="shadow"></div>
				</template>
			</ArticleCoverLink>
		</div>
	</div>
</template>

<script>
  import ArticleCoverLink from "../commonComponents/ArticleCoverLink";
  export default {
    name: "ArticleRecommend",
		components:{
      ArticleCoverLink
		},
		props:{
      randomArticles:Array
		}
  }
</script>

<style lang="scss">
	.articleRecommend{
		/*border-radius: 0.333rem;*/
		box-sizing: border-box;
		height: 11.417rem;
		width: 100%;
		.recommendItem1,.recommendItem2{
			.adItem{
				border-radius: 0;
			}
			height: 100%;
			.shadow{
				position: absolute;
				width: 100%;
				height: 100%;
				top: 0;
				left: 0;
				background-color: rgba(0,0,0,.5);
			}
		}
	}
</style>
