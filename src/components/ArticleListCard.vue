<template>
	<div class="articleListCard card">
		<div v-for="(item,i) in model" :key="i" class="articleItem borderBottom flex px-3 py-3 bg-white jc-c">
			<div class="imgWrapper">
				<img :src="item.cover" alt="">
			</div>
			<div class="articleInfo flex fd-c flex-1 jc-sa px-4">
				<p class="cate"><b class="mr-2"></b>{{item.category.name}}</p>
				<p class="title text-blackOpacity">{{item.title}}</p>
				<p class="summary text-summary">{{item.summary}}</p>
				<div class="publishedInfo flex">
					<span class="mr-3">发表于：{{item.date}}</span>
					<p class="flex-1"><span>最后更新：{{item.date}}</span></p>
					<span class="mr-3"><i class="iconfont icon-review" style="font-size: 0.5rem"></i> {{item.reviews.length}}</span>
					<span><i class="iconfont icon-review1" style="font-size: 0.333rem"></i> {{item.reads.length}}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: "ArticleListCard",
		data(){
      return {
        model:[]
			}
		},
		methods:{
      async fetch(){
        const res = await this.$http.get('/rest/article')
				this.model = res.data
				// 计算时间差
				this.model.forEach(item=>{
          const timeDiff = (new Date()).getTime() - (new Date(item.date)).getTime()
          let t = 0
          if((t =Math.floor( timeDiff/(365*24*60*60*1000)))>0){
            item.date = t+'年前'
          }else if((t = Math.floor( timeDiff/(30*24*60*60*1000)))>0){
            item.date = t+'个月前'
          }else if((t =Math.floor( timeDiff/(24*60*60*1000)))>0){
            item.date = t+'天前'
          }else if((t =Math.floor( timeDiff/(60*60*1000)))>0){
            item.date = t+'小时前'
          }else if((t =Math.floor( timeDiff/(60*1000)))>0){
            item.date = t+'分钟前'
          }else{
            item.date = '1分钟前'
          }
				})
			}
		},
		computed:{
		},
		created() {
      this.fetch()
    }
  }
</script>

<style scoped lang="scss">
	@import '../assets/scss/variables.scss';
	.articleListCard{
			width: 65.5rem;
	}
	.articleItem{
		width: 100%;
		height: 14.984rem;
		box-sizing: border-box;
		.imgWrapper{
			width: 16.314rem;
			height: 100%;
			img{
				border-radius: 0.667rem;
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
		.articleInfo{
			overflow: hidden;
			.cate{
				b{
					display: inline-block;
					border-left: 0.4rem solid map-get($colors,titleMark);
					height: .8rem
				}
			}
			.title{
				font-size: 1.5rem;
				font-weight: 700;
				
			}
			.summary{
				font-size: 1.083rem;
				font-weight: 400;
				overflow: hidden;
				/*white-space: nowrap;*/
				text-overflow: ellipsis;
				
				display: -webkit-box;
				-webkit-line-clamp:2;
				-webkit-box-orient: vertical;
			}
			.publishedInfo{
				span{
					padding: 0.083rem 0.167rem;
					color:map-get($colors,publishText);
					display: inline-block;
					background-color: map-get($colors,publishBg);
				}
			}
		}
	}
</style>
