<template>
	<div class="contentWrapper mt-3 flex">
		<div class="leftSide">
			<ArticleListCard></ArticleListCard>
		</div>
		<div class="rightSide flex fd-c ml-3">
			<UserInfoCard class=""></UserInfoCard>
			<SignInCard class="mt-3"></SignInCard>
			<NewsFlashCard class="mt-3"></NewsFlashCard>
			<RandomArticleListCard class="mt-3"></RandomArticleListCard>
		</div>
	</div>
</template>

<script>
  import UserInfoCard from "./UserInfoCard";
  import ArticleListCard from "./ArticleListCard";
  import SignInCard from "./SignInCard";
  import NewsFlashCard from "./NewsFlashCard";
  import RandomArticleListCard from "./RandomArticleListCard";
  export default {
    name: "HomeContent",
    components: {RandomArticleListCard, NewsFlashCard, SignInCard, ArticleListCard,UserInfoCard}
  }
</script>

<style lang="scss">
	.contentWrapper{
		width: 91.667rem;
		margin:auto;
		.rightSide{
			width: 100%;
		}
	}

</style>
