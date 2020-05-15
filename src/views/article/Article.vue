<template>
	<div class="article" v-if="model">
		<ArticleBody class="mt-3" :model="model"></ArticleBody>
		<ArticleRecommend class="mt-3" :randomArticles="randomArticles"></ArticleRecommend>
		<ArticleComments class="mt-3" :comments="comments"></ArticleComments>
		<PublishCard></PublishCard>
	</div>
</template>

<script>
  import ArticleBody from "../../components/ArticleComponents/ArticleBody";
  import ArticleRecommend from "../../components/ArticleComponents/ArticleRecommend";
  import ArticleComments from "../../components/ArticleComponents/ArticleComments";
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
        const res = await this.$http.get(`/rest/article/${this.id}`)
				const res2 = await this.$http.get('/rest/article')
				let randomSet = new Set()
        while(randomSet.size<2){
					randomSet = randomSet.add(Math.floor(Math.random()*(res2.data.length-1)))
        }
				randomSet.forEach(r=>{
          this.randomArticles.push((res2.data)[r])
				})
				this.model = res.data
        this.model.date = this.dateHandle(this.model.date)

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
