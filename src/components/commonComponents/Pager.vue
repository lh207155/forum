<template>
	<div class="pager flex px-3 py-3">
		<div class="pageList flex" >
			<li v-for="(i) in count"
					:key="i+1" class="pageItem ml-2 text-blue"
					:class="{active:index===i}"
					@click="turn(i)">{{i}}</li>
		</div>
		<div class="pageUpDown flex-1 flex jc-e">
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
      async fetch(){
        const res = await this.$http.get(`rest/article/list/${this.cate}`)
				this.count = Math.ceil(res.data.model/12)
			},
      turn(i){
        this.index=i
				this.currentPage(i)
			},
      pageUp(){
        if(this.index===1){
          return
				}else{
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
