<template>
	<div class="NewsFlashCard card bg-white">
		<div class="title px-3 flex">
			<div class="titleLeft flex-1">
				<i class="iconfont icon-iconset0451 mr-2"></i><span>快讯</span>
			</div>
			<div class="titleRight">
				<span>全部</span>
			</div>
		</div>
		<div>
			<NewsFlashItem></NewsFlashItem>
		</div>
	</div>
</template>

<script>
	import NewsFlashItem from './NewsFlashItem'
  export default {
    name: "NewsFlashCard",
		components:{NewsFlashItem}
  }
</script>

<style scoped lang="scss">
	@import "../../assets/scss/variables";
	.title{
		height: 3.833rem;
		line-height: 3.833rem;
		border-bottom: 1px solid map-get($colors,'border');
	}
</style>
