<template>
	<div class="article" v-if="model">
		<ArticleBody class="mt-3" :model="model"></ArticleBody>
		<ArticleRecommend class="mt-3" :randomArticles="randomArticles"></ArticleRecommend>
		<ArticleComments :comments="comments" class="mt-3" :displayType="'recommend'"></ArticleComments>
		<PublishCard :id="id" @update="updateComments"></PublishCard>
	</div>
</template>

<script>
  import ArticleBody from "../../components/articleComponents/ArticleBody";
  import ArticleRecommend from "../../components/articleComponents/ArticleRecommend";
  import ArticleComments from "../../components/articleComponents/ArticleComments";
  import PublishCard from "../../components/commonComponents/PublishCard";
  export default {
    name: "Article",
    components: {PublishCard, ArticleComments, ArticleRecommend, ArticleBody},
    props:{
      id:String
		},
		data(){
      return {
        model: '',
				randomArticles:[],
        comments:[]
			}
		},
		methods:{
      async fetch(){
        //当前文章
        const res = await this.$http.get(`/rest/article/${this.id}`)
        this.model = res.data.model
				this.comments = res.data.model.comments
				
				//推荐文章2篇
				const res2 = await this.$http.get('/rest/article')
				let randomSet = new Set()
        while(randomSet.size<2){
					randomSet = randomSet.add(Math.floor(Math.random()*(res2.data.model.length-1)))
        }
				randomSet.forEach(r=>{
          this.randomArticles.push((res2.data.model)[r])
				})
			},
      async updateComments(fixedHeight){
        //监听到评论更新的事件后，更新数据刷新dom，固定视口在评论区的滚动条高度
        await this.fetch()
        document.documentElement.scrollTop = document.body.clientHeight - fixedHeight
				
			}
		},
		computed:{
      //格式化日期显示
      date(){
        return this.dateHandle(this.model.date)
			}
		},
		created() {
			this.fetch()
    }
  }
</script>

<style lang="scss">
	@import '../../assets/scss/variables.scss';
	.article{
		width: 65.333rem;
		margin: auto;
	}

</style>
