<template>
	<div class="p-4 flex borderBottom" v-if="model">
		<div class="avatar mr-4">
			<img :src="model.avatar" alt="" class="mb-2">
			<span class="title text-white bg-pink px-1">{{`Lv.${model.level}`}}</span>
		</div>
		<div class="comment flex fd-c">
			<div class="commentHeader flex pb-3">
				<div class="author flex-1 flex ai-c">
					<span class="name">{{model.username}}</span>
					<span v-if="model.userType===1" class="flex-1 text-blue2 ml-3"><i class="admin userType admin">M</i></span>
				</div>
				<div class="date text-grey2">{{new Date(comment.date).format('MM-dd  hh:mm:ss')}}</div>
			</div>
			<div class="commentBody mt-3 bg-grey py-2 px-3">
				<p>{{comment.content}}</p>
			</div>
			<div class="commentFuntion mt-5 flex">
				<div class="flex-1">
					<span class="like px-2 mr-2 py-1 text-grey2" :class="{'text-pink':comment.praisers.length}" @click="like"><i class="iconfont icon-like mr-2" :class="{'text-pink2':comment.praisers.length}"></i>{{comment.praisers.length}}</span>
					<span class="unlike px-2 py-1 text-grey2" :class="{'text-pink':comment.dispraisers.length}"><i class="iconfont icon-unlike mr-2" :class="{'text-pink2':comment.dispraisers.length}"></i>{{comment.dispraisers.length}}</span>
				</div>
<!--				<span class="reply">回复</span>-->
			</div>
		</div>
		<div></div>
	</div>
</template>

<script>
  export default {
    name: "CommentItem",
    props:{
			comment:Object
    },
		data(){
      return {
        model:''
			}
		},
		methods:{
      async fetch(){
        const res = await this.$http.get(`rest/user/${this.comment.author}`)
        this.model = res.data.model
			},
      async like(){
        this.comment.praise.push({})
			}
		},
		created() {
			this.fetch()
    }
  }
</script>

<style scoped lang="scss">
	@import "../../assets/scss/variables";
	.avatar{
		width: 4rem;
		/*height: 4rem;*/
		text-align: center;
		img{
			height: 4rem;
			width: 4rem;
			object-fit: cover;
			border-radius: 0.333rem;
		}
		.title{
			font-size: 1rem;
			/*font-weight: bold;*/
			border-radius: 0.333rem;
			
		}
	}
	.comment{
		width: 100%;
		.commentHeader{
			.name{
				font-size: 1.2rem;
				font-family: Dialog;
				color: #725e82;
			}
			
		}
	}
	.commentBody{
		line-height: 2rem;
		border-radius: 0.667rem;
		color: #cca4e3;
	}
	.commentFuntion{
		height: 2rem;
		line-height: 2rem;
		vertical-align: baseline;
		span{
			cursor: pointer;
			font-size: 1rem;
			border-radius: 0.333rem;
			background-color: #f0f0f4;
			box-sizing: border-box;
			i{
				font-size: 1rem;
			}
		}
	}
</style>
