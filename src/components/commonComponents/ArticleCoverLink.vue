<template>
	<router-link v-if="ad&&ad.author&&ad.category" tag="div" :to="`/article/${ad._id}`" class="adItem">
		<img class="image" :src="ad.cover">
		<div v-if="cate" class="articleInfo flex px-4 py-2 bg-blackOpacity2">
			<span class="mr-3 text-white bg-whiteOpacity2 px-1"><i class="iconfont icon-review" style="font-size: 0.333rem"></i> {{ad.comments.length}}</span>
			<span class="text-white bg-whiteOpacity2 px-1"><i class="iconfont icon-review1 text-white" style="font-size: 0.333rem"></i> {{ad.reads.length}}</span>
		</div>
		<div v-if="!cate" class="adsInfo flex fd-c p-4">
			<span class="cate mt-3 text-whiteOpacity">
				<b class="mr-2"></b>{{ad.category.name}}</span>
			<span v-if="swiper" class="swiperTitle mt-3 text-whiteOpacity">{{ad.title}}</span>
			<span v-else class="staticTitle mt-3 text-whiteOpacity">{{ad.title}}</span>
			<span v-if="0" class="author mt-3">
				<img class="authorAvatar mr-2" :src="ad.author.avatar" alt="">
				<span class="mr-2 text-whiteOpacity">{{ad.author.username}}</span>
				<span class="text-whiteOpacity">{{(new Date(ad.date)).format('yyyy-MM-dd')}}</span>
			</span>
		</div>
		<slot></slot>
	</router-link>
</template>

<script>
  export default {
    props:{
      displayType:String,
      swiper:Boolean,
			cate:Boolean,
			ad: {Type:Object,default:''}
		},
		data(){
      return {
			}
		},
    name: "ArticleCoverLink",
		methods:{
		},
  }
</script>

<style scoped lang="scss">
	@import '../../assets/scss/variables';
	.adItem {
		border-radius: 0.667rem;
		overflow: hidden;
		position: relative;
		width: 100%;
		height: 100%;
		cursor: pointer;
		&:hover .articleInfo{
			transform: translateY(-27px);
		}
		.image {
		/*border-radius: 0.667rem;*/
		object-fit: cover;
		width: 100%;
		height: 100%;
		}
		.articleInfo{
			position: absolute;
			box-sizing: border-box;
			bottom: -2.25rem;
			left: 0rem;
			width: 100%;
			transition: all .3s;
			span{
				border-radius: 0.167rem;
			}
		}
		.adsInfo {
			z-index: 1;
			box-sizing: border-box;
			background: linear-gradient(0deg,rgba(0,0,0,.7) 0,transparent 100%);
			/*background-image: linear-gradient(0deg,#000 0,rgba(0,0,0,.917) 5.3%,rgba(0,0,0,.834) 10.6%,rgba(0,0,0,.753) 15.9%,rgba(0,0,0,.672) 21.3%,rgba(0,0,0,.591) 26.8%,rgba(0,0,0,.511) 32.5%,rgba(0,0,0,.433) 38.4%,rgba(0,0,0,.357) 44.5%,rgba(0,0,0,.283) 50.9%,rgba(0,0,0,.213) 57.7%,rgba(0,0,0,.147) 65%,rgba(0,0,0,.089) 72.9%,rgba(0,0,0,.042) 81.4%,rgba(0,0,0,.011) 90.6%,transparent 100%);*/
			width: 100%;
			position: absolute;
			left: 0;
			bottom: 0;
			span{
				display: block;
			}
			.cate{
				b{
						display: inline-block;
						border-left: 0.4rem solid map-get($colors,'white');
						height: .8rem
				}
			}
			.swiperTitle{
				font-size: 1.833rem;
			}
			.staticTitle{
				font-size: 1.2rem;
			}
			.author{
				.authorAvatar{
					display: inline-block;
					font-weight: 100;
					height: 1rem;
					border-radius: 50%;
					vertical-align: top;
				}
				span{
					line-height: 1rem;
					font-weight: 100;
					display: inline-block;
					font-size: 1.2rem;
				}
			}
		}
	}
</style>
