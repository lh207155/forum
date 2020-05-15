<template>
	<div class="adsDisplay flex">
		<div class="adsSwiperDisplay">
			<swiper ref="mySwiper" :options="swiperOptions" class="swiper-wrapper">
				<swiper-slide>
					<ArticleCoverLink swiper :ad="model.ads1"></ArticleCoverLink>
				</swiper-slide>
				<swiper-slide>
					<ArticleCoverLink swiper :ad="model.ads2"></ArticleCoverLink>
				</swiper-slide>
				<swiper-slide>
					<ArticleCoverLink swiper :ad="model.ads3"></ArticleCoverLink>
				</swiper-slide>
				<div class="swiper-pagination" slot="pagination">
				</div>
			</swiper>
		</div>
		<div class="adsStaticWrapper flex flex-1 fd-c ml-3">
			<div class="ad1 flex-1">
				<ArticleCoverLink :ad="model.ad1"></ArticleCoverLink>
			</div>
			<div class="ad2 mt-3 flex-1">
				<ArticleCoverLink :ad="model.ad2"></ArticleCoverLink>
			</div>
		</div>
	</div>
</template>

<script>
	import ArticleCoverLink from '../commonComponents/ArticleCoverLink'
  export default {
    name: "AdsDisplay",
		components:{ArticleCoverLink},
    data(){
      return {
        swiperOptions:{
          // loop:true,
          autoplay:true,
          // 分页器 元素选择器
          pagination: {
            el: '.swiper-pagination',
          }
        },
        model: {
          ads1: {},
          ads2:{},
          ads3:{},
          ad1:{},
          ad2:{},
        }
      }
    },
    methods:{
      async fetch(){
        const res = await this.$http.get('/rest/ad')
        const resArr = res.data[0]
        this.model.ads1=(await this.$http.get(`/rest/article/${resArr.ads1}`)).data
        this.model.ads2=(await this.$http.get(`/rest/article/${resArr.ads2}`)).data
        this.model.ads3=(await this.$http.get(`/rest/article/${resArr.ads3}`)).data
        this.model.ad1=(await this.$http.get(`/rest/article/${resArr.ad1}`)).data
        this.model.ad2=(await this.$http.get(`/rest/article/${resArr.ad2}`)).data
      }
    },
    created() {
      this.fetch()
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
				left: 85%;
				width: auto;
				height: 0;
				position: absolute;
				display: inline-block;
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
		.adsStaticWrapper{
			height: 100%;
			.ad1{
				width: 100%;
				/*这里不知道为什么非要一个不是100%的高度才可以适应*/
				height: 1%;
			}
			.ad2{
				width: 100%;
				height: 1%;
			}
		}
	}
</style>
