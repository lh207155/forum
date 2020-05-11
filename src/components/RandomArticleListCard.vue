<template>
	<div class="randomArticleListCard card bg-white">
		<div class="title px-3 flex">
			<div class="titleLeft flex-1">
				<i class="iconfont icon-iconset0451 mr-2"></i><span>随机文章</span>
			</div>
		</div>
		<div>
			<RandomArticleItem></RandomArticleItem>
		</div>
	</div>
</template>

<script>
  import RandomArticleItem from "./RandomArticleItem";
  export default {
    name: "RandomArticleListCard",
    components: {RandomArticleItem}
  }
</script>

<style scoped lang="scss">
	@import "../assets/scss/variables.scss";
	.title{
		height: 3.833rem;
		line-height: 3.833rem;
		border-bottom: 1px solid map-get($colors,'border');
	}
</style>
