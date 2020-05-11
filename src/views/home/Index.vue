<template>
	<div>
			<div class="adsDisplay flex">
				<div class="adsSwiperDisplay">
					<swiper ref="mySwiper" :options="swiperOptions" class="swiper-wrapper">
						<swiper-slide>
							<AdImgLink swiper></AdImgLink>
						</swiper-slide>
						<swiper-slide>
							<AdImgLink swiper></AdImgLink>
						</swiper-slide>
						<swiper-slide>
							<AdImgLink swiper></AdImgLink>
						</swiper-slide>
						<div class="swiper-pagination" slot="pagination">
						</div>
					</swiper>
				</div>
				<div class="adsStaticWrapper flex flex-1 fd-c ml-3">
					<div class="ad1 flex-1">
						<AdImgLink></AdImgLink>
					</div>
					<div class="ad2 mt-3 flex-1">
						<AdImgLink></AdImgLink>
					</div>
				</div>
			</div>
			<HomeContent></HomeContent>
	</div>
</template>

<script>
  import HomeContent from "../../components/HomeContent";
  import AdImgLink from "../../components/AdImgLink";
  export default {
    name: "index",
    components: {AdImgLink, HomeContent},
    data(){
      return {
        swiperOptions:{
          loop:true,
          autoplay:true,
					// 分页器 元素选择器
          pagination: {
            el: '.swiper-pagination',
					}
        }
			}
		}
  }
</script>

<style lang="scss">
	@import '../../assets/scss/variables';
		/* 广告展示区 */
	.adsDisplay{
		width: 91.667rem;
		height: 29.581rem;
		margin: 0 auto;
		/* 	滑动广告展示区 */
		.adsSwiperDisplay{
			width: 70%;
			height: 100%;
			/* 	设置轮播容器 */
			.swiper-wrapper{
				border-radius: 0.667rem;
				width: 100%;
				height: 100%;
			}
			/* 	自定义分页器样式 */
			.swiper-pagination{
				top: 1.25rem;
				left: 25rem;
				.swiper-pagination-bullet{
					border-radius: 0;
					width: 1.333rem;
					height: 0.333rem;
					background-color: map-get($colors,'white');
					opacity: .5;
				}
				.swiper-pagination-bullet-active{
					opacity: 1;
				}
			}
		}
	}
</style>
