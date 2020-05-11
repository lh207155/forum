<template>
	<div class="adItem">
		<img class="image" src="../assets/imgs/007I6HASly1gdfeh82x9fj30p00an3zk.jpg">
		<div class="adsInfo flex fd-c p-4">
			<span class="text-white cate mt-3 text-whiteOpacity">
				<b class="mr-2"></b>老司机</span>
			<span v-if="swiper" class="swiperTitle mt-3 text-white">善用搜索：更聪明的寻找想要的资源</span>
			<span v-else class="staticTitle mt-3 text-white">善用搜索：更聪明的寻找想要的资源</span>
			<span class="author mt-3">
				<img class="authorAvatar mr-2" src="../assets/imgs/defultAvatar.png" alt="">
				<span class="mr-2">一个好人</span>
				<span>2020-05-10</span>
			</span>
		</div>
	</div>
</template>

<script>
  export default {
    props:{
      swiper:Boolean
		},
    name: "AdImgLink"
  }
</script>

<style scoped lang="scss">
	@import '../assets/scss/variables';
	.adItem {
		border-radius: 0.667rem;
		overflow: hidden;
		position: relative;
		width: 100%;
		height: 100%;
		.image {
		border-radius: 0.667rem;
		object-fit: cover;
		width: 100%;
		height: 100%;
		}
		.adsInfo {
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
					height: 2rem;
					border-radius: 50%;
					vertical-align: top;
				}
				span{
					line-height: 2rem;
					color: #fff;
					display: inline-block;
					font-size: 1.2rem;
				}
			}
		}
	}
</style>
