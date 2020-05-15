<template>
	<div class="articleBody card bg-white p-4">
		<p class="cate"><b class="mr-2"></b>{{model.category.name}}</p>
		<h1 class="title text-blackOpacity my-4 text-blackOpacity">{{model.title}}</h1>
		<p class="publishedInfo">
			<span class="mr-3">发表于：{{model.date}}</span>
			<span><i class="iconfont icon-review1" style="font-size: 0.333rem"></i> {{model.reads.length}}</span>
		</p>
		<div class="authorInfo flex px-4 py-3 ai-c">
			<div class="avatar">
				<img src="../../assets/imgs/defultAvatar.png" alt="">
			</div>
			<div class="name flex fd-c ml-2 jc-sb flex-1">
				<b class="text-blackOpacity">{{model.author.username}}</b>
				<span class="text-blackOpacity">管理员</span>
			</div>
			<div class="followBtn">
				<button class="button text-white bg-blue btn px-3">
					<i class="iconfont icon-plus mr-1"></i>关注
				</button>
			</div>
			<div class="contact">
				<button class="button text-blue bg-white btn px-3 ml-3">
					<i class="iconfont icon-letter mr-1"></i>私信
				</button>
			</div>
		</div>
		<div class="content" v-html="model.content"></div>
		<div class="contentCopyright flex fd-c jc-sa ai-c text-white">
			<p class="mt-2">有些资源有时效性,且用且珍惜。</p>
			<p>文章均为玉簟秋整理分享,仅作个人学习使用,转载请注明链接,谢谢！</p>
			<p class="mb-2"><router-link tag="span" to="/" class="returnHome text-white">返回首页</router-link><span> | </span><router-link tag="span" to="/" class="returnTop text-white">回到顶部</router-link></p>
		</div>
		<div class="share flex jc-sb mt-5 borderBottom">
			<div class="shareMenu text-blackOpacity">
				<span><i class="iconfont icon-sina p-2"></i></span>
				<span><i class="iconfont icon-qq p-2"></i></span>
				<span><i class="iconfont icon-we-chat p-2"></i></span>
				<span><i class="iconfont icon-q_zone p-2"></i></span>
			</div>
			<div class="collect mb-5">
				<i class="iconfont icon-xiai-1"></i> 收藏
			</div>
		</div>
		<!--			<div class="tags mt-5">-->
		<!--				-->
		<!--			</div>-->
	
	</div>
</template>

<script>
  export default {
    name: "ArticleBody",
		props:{
      model:Object
		}
  }
</script>
<style lang="scss">
	@import '../../assets/scss/variables.scss';
	.articleBody{
		box-sizing: border-box;
		width: 100%;
		overflow: inherit;
		.cate{
			b{
				display: inline-block;
				border-left: 0.4rem solid map-get($colors,titleMark);
				height: .8rem
			}
		}
		.title{
			font-size: 2.5rem;
			font-weight: normal;
		}
		.publishedInfo{
			span{
				padding: 0.083rem 0.167rem;
				color:map-get($colors,publishText);
				display: inline-block;
				background-color: map-get($colors,publishBg);
				border-radius: 0.5rem;
			}
		}
		.authorInfo{
			width: 100%;
			background-color: map-get($colors,'articleAuthorBg');
			margin: 0.833rem -1.667rem;
			/*padding: 1.667rem;*/
			border-left: 3px solid map-get($colors,'blue');
			.avatar{
				width: 3rem;
				height: 3rem;
				border-radius: 0.5rem;
				img{
					width: 100%;
					height: 100%;
					object-fit: cover;
					border-radius: 0.5rem;
				}
			}
		}
		.content{
			*{
				max-width: 100%;
				height: auto;
			}
			p{
				line-height: 2.7rem;
				font-size: 1.417rem;
				color:#262626;
				margin: 2.5rem 0;
			}
			img{
				margin: 1rem 0;
			}
			strong{
				vertical-align: baseline;
				font-size: 2.5rem;
				line-height: 6rem;
			}
			h2{
				font-weight: 400;
				line-height: 3rem;
				font-size: 2rem;
				&::before{
					content: "#";
					color: map-get($colors,'blue');
					display: inline-block;
					margin-right: 0.833rem;
					/*fonts-size: 2rem;*/
				}
			}
		}
		.contentCopyright{
			font-size: 1.167rem;
			width: 100%;
			height: 11.583rem;
			border-radius: 0.5rem;
			background-image: linear-gradient(120deg, #48c6ef 0%, #6f86d6 100%);
			.returnHome,.returnTop{
				cursor: pointer;
			}
		}
		.share{
			.shareMenu{
				i{
					font-size: 2rem;
				}
			}
			.collect{
				font-size: 1.35rem;
				i{
					font-size: 1.8rem;
				}
				
			}
		}
	}
</style>
