<template>
	<div>
		<div class="articleListCard card" ref="articleListCard">
			<router-link tag="div" :to="`/article/${item._id}`" v-for="(item,i) in model" :key="i" class="articleItem borderBottom flex px-3 py-3 bg-white jc-c">
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
						<span class="mr-3"><i class="iconfont icon-review" style="font-size: 0.5rem"></i> {{item.comments.length}}</span>
						<span><i class="iconfont icon-review1" style="font-size: 0.333rem"></i> {{item.reads.length}}</span>
					</div>
				</div>
			</router-link>
		</div>
		<div v-if="loadingState" class="loading pt-5 mt-5">
			<LoadingAnimation></LoadingAnimation>
		</div>
		<div v-else class="loaded text-purple3 m-5">没有了 😝</div>
	</div>
</template>

<script>
  import LoadingAnimation from "../commonComponents/LoadingAnimation";
  export default {
    name: "ArticleListCard",
    components: {LoadingAnimation},
    data(){
      return {
        model:[],
				loadingState:''
			}
		},
		methods:{
      async fetch(){
        
        const res = await this.$http.get('/rest/article')
				this.model = res.data.model
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
			},
			lazyLoading(){
        // 这里利用闭包，让每次回调都可以访问到变量
				// 最后一次高度改变后的高度
        let lastHeight = null
				return async ()=>{
          // document.documentElement.scrollTop：html滚动条距离顶部的高度
					// this.$refs.articleListCard.offsetTop：文章列表卡片距离它最近的定位父元(offsetParent)的顶部距离，这里刚好在顶部
					// this.$refs.articleListCard.offsetHeight：文章列表卡片自身高度
					// window.innerHeight：视口高度
					// 在将要触发懒加载的临界点时：
					// 文章列表卡片距离它最近的定位父元(offsetParent)的顶部距离+文章列表卡片自身高度=html滚动条距离顶部的高度+视口高度
          if(document.documentElement.scrollTop>=this.$refs.articleListCard.offsetTop+this.$refs.articleListCard.offsetHeight-window.innerHeight){
            // 记录当前卡片高度
            let currentHeight = this.$refs.articleListCard.offsetHeight
						// 如果当前卡片高度超过了最后一次高度改变后的高度：即已经有过懒加载了，才能继续触发
						// 相当于函数节流，因为，在触发了一次懒加载后，因为异步请求数据，造成dom可能还没有更新，但是还具备懒加载条件时让他不要继续懒加载
            if(currentHeight>lastHeight||!lastHeight){
              // 触发了dom更新，卡片高度变化，可以触发下一次
							// 记录现在的高度，作为下次的对比
              lastHeight = this.$refs.articleListCard.offsetHeight
							this.loadingState = true
							// 请求数据
              const res = await this.$http.get('/rest/article')
							if(res.data.model){
                // push到数组，数据驱动dom更新
                this.model.push(...res.data.model)
							}else{
                this.loadingState = false
							}
							
						}
          }
				}
			},
   
		},
		computed:{
		},
		created() {
      this.fetch()
			//
			// this.$nextTick(()=>{
      //   document.addEventListener('scroll',this.lazyLoading())
			// })
    },
		mounted() {
      // document.addEventListener('scroll',this.lazyLoading())
    }
  }
</script>

<style scoped lang="scss">
	@import '../../assets/scss/variables';
	.articleListCard{
		width: 65.5rem;
		overflow: inherit;
		.articleItem{
			cursor: pointer;
			width: 100%;
			height: 14.984rem;
			box-sizing: border-box;
			transition: transform .3s;
			/*box-shadow: */
			&:hover{
				box-shadow: 0 .5rem .5rem 0rem #f3f3f3,0 -.5rem .5rem 0rem #f3f3f3;
				transform: translate(-1rem,0);
			}
			&:nth-of-type(1){
				border-top-left-radius: 0.5rem;
				border-top-right-radius: 0.5rem;
			}
			&:last-of-type{
				border-bottom-left-radius: 0.5rem;
				border-bottom-right-radius: 0.5rem;
			}
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
						border-radius: 0.5rem;
					}
				}
			}
		}
	}
	.loading{
		height: 6rem;
	}
	.loaded{
		text-align: center;
		font-size: 2rem;
	}
	
</style>
