<template>
	<div class="NewsFlashList px-3 pt-3">
		<div class="newsFlashItem" v-for="i in list" :key="i">
			<div class="newsInfo flex ai-c dashLineTop">
				<div class="author bg-newsFlashInfoBg p-1 pr-3 flex ai-c">
					<img src="../../assets/imgs/defultAvatar.png" class="mr-2">
					<span class="text-blackOpacity">昊哥哥</span>
				</div>
				<span class="date bg-white px-2">14:08</span>
				<div class="cateWrapper flex-1"><span class="cate px-2 bg-white">免费活动</span></div>
			</div>
			<div class="newSummary py-3 pl-5 pr-3" :class="{dashLineLeft:list.length-i}">
				<p class="title">内容正在建设中...</p>
				<p class="summary my-3 text-publishText">内容正在建设中...</p>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: "NewsFlashItem",
		data(){
      return {
        list:[1,2,3]
			}
		}
  }
</script>

<style scoped lang="scss">
	@import "../../assets/scss/variables";
	.newsFlashItem{
		.newsInfo{
			position: relative;
			.author{
				border-radius: 1.25rem;
				z-index: 2;
				img{
					height: 1.667rem;
					width: 1.667rem;
					border-radius: 50%;
				}
				span{
					display: inline-block;
					font-weight: 400;
					/*color: #333;*/
				}
			}
			.date{
				z-index: 2;
			}
			.cateWrapper{
				text-align: right;
				z-index:2;
				.cate{
					display: inline-block;
				}
			}
		}
		.newSummary{
			position: relative;
		}
	}
</style>
