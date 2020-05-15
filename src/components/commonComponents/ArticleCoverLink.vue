<template>
	<router-link v-if="Object.keys(ad).length" tag="div" :to="`/article/${ad._id}`" class="adItem">
		<img class="image" :src="ad.cover">
		<div class="adsInfo flex fd-c p-4">
			<span class="text-white cate mt-3 text-whiteOpacity">
				<b class="mr-2"></b>{{ad.category.name}}</span>
			<span v-if="swiper" class="swiperTitle mt-3 text-whiteOpacity">{{ad.title}}</span>
			<span v-else class="staticTitle mt-3 text-whiteOpacity">{{ad.title}}</span>
			<span class="author mt-3">
				<img class="authorAvatar mr-2" :src="ad.author.avatar" alt="">
				<span class="mr-2 text-whiteOpacity">{{ad.author.username}}</span>
				<span class="text-whiteOpacity">2020-05-10</span>
			</span>
		</div>
		<slot></slot>
	</router-link>
</template>

<script>
  export default {
    props:{
      swiper:Boolean,
			ad: Object
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
		.image {
		/*border-radius: 0.667rem;*/
		object-fit: cover;
		width: 100%;
		height: 100%;
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
						border-left: 0.4rem solid grey;
						height: .8rem
				}
			}
			.swiperTitle{
				font-size: 1.833rem;
			}
			.staticTitle{
				font-size: 1rem;
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
