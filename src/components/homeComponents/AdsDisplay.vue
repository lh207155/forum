<template>
	<div class="adsDisplay flex">
		<div class="adsSwiperDisplay" :options="swiperOptions">
			<swiper ref="mySwiper1" :options="swiperOptions" class="swiper-wrapper">
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
          },
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
        const resArr = res.data.model[0]
        this.model.ads1=(await this.$http.get(`/rest/article/${resArr.ads1}`)).data.model
        this.model.ads2=(await this.$http.get(`/rest/article/${resArr.ads2}`)).data.model
        this.model.ads3=(await this.$http.get(`/rest/article/${resArr.ads3}`)).data.model
        this.model.ad1=(await this.$http.get(`/rest/article/${resArr.ad1}`)).data.model
        this.model.ad2=(await this.$http.get(`/rest/article/${resArr.ad2}`)).data.model
      }
    },
    created() {
      this.fetch()
    },
		mounted() {
      // console.log(this.$refs.mySwiper1)
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
				/*后来知道了，因为：ad1,ad2是flex项目，设置了flex-grow：1，只在有剩余空间的时候才会分配剩余空间*/
				/*而这里，因为里面的子元素img设置的是宽高100%，根据图片大小，它应该是超过了容器的宽高，但是，因为是垂直排列，宽度固定，所以图片按照宽度等比缩放高度*/
				/*ad1，ad2，两个项目都被图片撑开高度，所以容器已经没有剩余空间可以分配了，所以整个被撑开，flex1就不起作用*/
				/*而如果ad1，ad2都设置了一个不超过50%的任意高度，就会存在剩余空间，平均分配给两个项目*/
				/*如果不给boxsizing设置borderbox的话，设置margin也不影响平均分配*/
				height: 1px;

			}
			.ad2{
				width: 100%;
				height: 1px;

			}
		}
	}
</style>
