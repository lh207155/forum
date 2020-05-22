<template>
	<div class="girls">
		<div class="wrapper card bg-white">
			<div class="flex girlList">
				<ListItem v-for="(item,i) in modelList" :key="i+1" :model="item"></ListItem>
			</div>
			<Pager :currentPage="currentPage" :cate="'videos'"></Pager>
		</div>
	</div>

</template>

<script>
  import ListItem from "../../components/commonComponents/ListItem";
  import Pager from '../../components/commonComponents/Pager'
  export default {
    name: "Essays",
    components: {ListItem,Pager},
    data(){
      return {
        modelList:[],
        page:1
      }
    },
    methods:{
      async fetch(){
        const res = await this.$http.get(`/rest/article/list?cate=videos&page=${this.page}`)
        this.modelList = res.data.model
      },
      currentPage(page){
        this.page = page
        this.fetch()
      }
    },
    created() {
      this.fetch()
    }
  }
</script>

<style scoped lang="scss">
	.girls{
		width: 91.667rem;
		margin: 0 auto;
		.wrapper{
			border-bottom-right-radius:0 ;
			border-bottom-left-radius:0 ;
			.girlList{
				
				flex-wrap: nowrap;
				
			}
		}
	}

</style>
