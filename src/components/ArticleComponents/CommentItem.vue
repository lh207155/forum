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
					<span class="like px-2 mr-2 py-1 text-grey2" :class="{'text-pink':praiseState===1}" @click="praise"><i class="iconfont icon-like mr-2" :class="{'text-pink2':praiseState===1}"></i>{{comment.praisers.length}}</span>
					<span class="unlike px-2 py-1 text-grey2" :class="{'text-pink':praiseState===2}" @click="dispraise"><i class="iconfont icon-unlike mr-2" :class="{'text-pink2':praiseState===2}"></i>{{comment.dispraisers.length}}</span>
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
        model:'',
        praiseState:''
			}
		},
		methods:{
      async initPraiseState(){
        //查询当前用户对该评论的点赞状态(先判断登录没)
        //0：未点赞未点踩；1：点赞；2：点踩
        if(this.$store.state.user){
          const praiseState = await this.$http.get(`/rest/comment/praiseState/${this.comment._id}`)
          //给动态class赋值，样式根据动态class变化
          praiseState.data===0?this.praiseState=0:praiseState.data===1?this.praiseState=1:this.praiseState=2
        }
			},
      async fetch(){
        //通过父组件传来的comment查询author
        const comment = await this.$http.get(`/rest/user/${this.comment.author}`)
        this.model = comment.data.model
				await this.initPraiseState()
			},
      praise(){
        //点赞动作（先判断登录没）
				//如果当前用户已经点了赞：把状态改为0，并且点赞数-1
				//如果点了踩，状态改为1，并且点赞数+1，点踩数-1（因为点踩和点赞不能共存）
				//都没有，状态改为1，点赞数+1
				if(this.$store.state.user) {
          if(this.praiseState === 1) {
            this.praiseState = 0
            this.comment.praisers.length--
          }else if(this.praiseState === 2){
            this.praiseState = 1
            this.comment.praisers.length++
            this.comment.dispraisers.length--
          }else{
            this.praiseState = 1
            this.comment.praisers.length++
					}
          // 最后，发请求修改数据库数据：query：{commentID：文章id，praiseState：动作：{1：点赞或取消点赞操作；2：点踩或取消点餐操作}
          // 服务器会根据是否点了或没点插入或删除相应的数据
          this.$http.put(`/rest/comment/praiseState?commentID=${this.comment._id}&praiseState=1`)
					//重新初始化点赞状态
        }else{
          this.$store.commit('toLogin')
				}
			},
      dispraise(){
        //点踩操作同点赞
        if(this.$store.state.user) {
          if(this.praiseState === 2) {
            this.praiseState = 0
            this.comment.dispraisers.length--
          }else if(this.praiseState === 1){
            this.praiseState = 2
            this.comment.dispraisers.length++
            this.comment.praisers.length--
          }else{
            this.praiseState = 2
            this.comment.dispraisers.length++
          }
          this.$http.put(`/rest/comment/praiseState?commentID=${this.comment._id}&praiseState=2`)
        }else {
          this.$store.commit('toLogin')
        }
			},
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
