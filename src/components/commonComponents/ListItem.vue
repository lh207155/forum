<template>
	<div class="listItem p-4 flex fd-c">
		<div class="img">
			<ArticleCoverLink :ad="model" :cate="true"></ArticleCoverLink>
			<div class="floatInfo"></div>
		</div>
		<router-link tag="h2" :to="`/article/${model._id}`" class="title mt-3 text-blackOpacity">{{model.title}}</router-link>
		<p class="summary mt-3 text-summary pb-3">{{model.summary}}</p>
		<span class="date mt-3 text-summary">{{`发表于：${dateHandle(model.date)}前`}}</span>
	</div>
</template>

<script>
  import ArticleCoverLink from "./ArticleCoverLink";
  export default {
    props:{model:Object},
    name: "ListItem",
    components: {ArticleCoverLink}
  }
</script>

<style scoped lang="scss">
	@import "../../assets/scss/variables";
	.listItem{
		width: 22.917rem;
		box-sizing: border-box;
		border-right: 1px solid map_get($colors,'border');
		border-bottom: 1px solid map_get($colors,'border');
		.img{
			width: inherit/4;
			height: 12.5rem;
			box-sizing: border-box;
		}
		.title{
			height: 3rem;
			font-size: 1.25rem;
			font-weight: normal;
			line-height: 1.5rem;
			cursor: pointer;
		}
		.summary{
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			border-bottom: 1px solid map_get($colors,'topBorder');
		}
	}
</style>
