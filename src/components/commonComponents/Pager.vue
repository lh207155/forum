<template>
	<div class="pager flex px-3 py-3">
		<div class="pageList flex" >
			<!--active时：处在该页，不可点击，按钮变灰 设置pointer-events:none;-->
			<li v-for="(i) in count"
					:key="i+1" class="pageItem ml-2 text-blue"
					:class="{active:index===i}"
					@click="turn(i)">{{i}}</li>
		</div>
		<div class="pageUpDown flex-1 flex jc-e">
			<!--active时：上下页按钮变灰色，不可点击，在首页和末页时激活-->
			<div class="pageUp pageItem mr-3 text-blue" :class="{active:index===1}" @click="pageUp">&lt;</div>
			<div class="pageDown pageItem text-blue"  :class="{active:index===count}" @click="pageDown">&gt;</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: "Pager",
		props:{
      currentPage:Function,
			cate:String
		},
		data(){
      return {
        count:'',
				index:1
			}
		},
		methods:{
      // 获得总页码数：文章总数/每页文章数，ceil向上取整
      async fetch(){
        const res = await this.$http.get(`rest/article/list/${this.cate}`)
				this.count = Math.ceil(res.data.model/12)
			},
			// 点击页数翻页
			// 设置当前页面索引
			// 调用父组件方法，请求分页查询
      turn(i){
        this.index=i
				this.currentPage(i)
			},
      // 点击上一页翻页
      // 调用父组件方法，请求分页查询
      pageUp(){
        //判断 是否已经在第一页
        if(this.index===1){
          return
				}else{
          // 页码-1，分页查询
          this.index--
          this.currentPage(this.index)
				}
    
			},
      pageDown(){
        if(this.index===this.count){
          return
				}else{
          this.index++
          this.currentPage(this.index)
				}
    
			}
		},
		created() {
      this.$nextTick(()=>{
        this.fetch()
			})
    }
  }
</script>

<style scoped lang="scss">
	@import "../../assets/scss/variables";
	.pager{
		border-top: 1px solid map_get($colors,'border');
		margin-top: -1px;
		.pageItem{
			box-sizing: border-box;
			text-align: center;
			line-height: 2.083rem;
			font-weight: 700;
			width: 3.25rem;
			height: 2.083rem;
			border-radius: 0.5rem;
			background-color: map_get($colors,'grey5');
			cursor: pointer;
			&.active{
				color:map-get($colors,'grey2');
				pointer-events:none;
				cursor: default;
			}
			i{
				font-size: 1.6rem;
			}
		}
		.pageList{
			list-style: none;
		}
		.pageUpDown{
			.pageUp{
			
			}
		}
	}

</style>
